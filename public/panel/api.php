<?php
// api.php — backend of the owner's panel (/panel/): the notice and the extra days off (owner, 2026-10-17).
// Writes www/status.json, which all three sites read in the browser (src/scripts/site-status.ts).
// The password hash is in klimakar-panel.php in the FTP root, next to www/ (outside the web root, never
// in the repo): `npm run panel:haslo` makes it. Needs PHP 7.3+ (the hosting runs 8.4).
//
// GET  → {zalogowany, csrf?, dane?}
// POST {akcja: "zaloguj", haslo, website (honeypot, must stay empty)} | {akcja: "zapisz", csrf, komunikat, dniWolne: [{od, do?}]} | {akcja: "wyloguj", csrf}

const CONFIG_FILE = __DIR__ . '/../../klimakar-panel.php';
const LIMIT_FILE = __DIR__ . '/../../klimakar-panel-proby.json';
const STATUS_FILE = __DIR__ . '/../status.json';
const MAX_TEXT = 300;
const MAX_DAYS = 60;
const MAX_TRIES = 5;          // failed logins per IP …
const TRY_WINDOW = 15 * 60;   // … within 15 minutes

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow');
date_default_timezone_set('Europe/Warsaw');

function reply($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (!is_file(CONFIG_FILE)) {
    reply(['error' => 'Panel nie jest jeszcze skonfigurowany (brak pliku z hasłem na serwerze).'], 503);
}
$config = require CONFIG_FILE;

session_name('kkpanel');
session_set_cookie_params(['lifetime' => 0, 'path' => '/panel/', 'secure' => true, 'httponly' => true, 'samesite' => 'Strict']);
// A visitor without the session cookie only learns "not logged in"; no session file is made for them.
if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_COOKIE['kkpanel'])) reply(['zalogowany' => false]);
session_start();

/** The stored hash is "pbkdf2_sha256$<iterations>$<salt, base64>$<hash, base64>" (scripts/panel-haslo.mjs). */
function password_ok($password, $stored) {
    $parts = explode('$', (string) $stored);
    if (count($parts) !== 4 || $parts[0] !== 'pbkdf2_sha256') return false;
    $hash = hash_pbkdf2('sha256', (string) $password, base64_decode($parts[2]), (int) $parts[1], 32, true);
    return hash_equals(base64_decode($parts[3]), $hash);
}

function status_data() {
    $data = is_file(STATUS_FILE) ? json_decode((string) file_get_contents(STATUS_FILE), true) : null;
    return [
        'komunikat' => isset($data['komunikat']) && is_string($data['komunikat']) ? $data['komunikat'] : '',
        'dniWolne' => isset($data['dniWolne']) && is_array($data['dniWolne']) ? $data['dniWolne'] : [],
        'zmieniono' => isset($data['zmieniono']) ? $data['zmieniono'] : null,
    ];
}

function state() {
    if (empty($_SESSION['ok'])) return ['zalogowany' => false];
    return ['zalogowany' => true, 'csrf' => $_SESSION['csrf'], 'dane' => status_data()];
}

/** "YYYY-MM-DD" of a real date, or null. */
function valid_date($value) {
    if (!is_string($value) || !preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $value, $m)) return null;
    return checkdate((int) $m[2], (int) $m[3], (int) $m[1]) ? $value : null;
}

/**
 * Failed logins per IP (hashed) within the window. The file stays locked from reading to writing, so
 * parallel attempts can't slip past the limit. $update gets the counts and returns them changed.
 */
function with_tries($update) {
    $file = @fopen(LIMIT_FILE, 'c+');
    if (!$file || !flock($file, LOCK_EX)) return $update([]);
    $tries = json_decode((string) stream_get_contents($file), true);
    $fresh = [];
    foreach (is_array($tries) ? $tries : [] as $ip => $times) {
        $times = array_values(array_filter((array) $times, function ($t) { return $t > time() - TRY_WINDOW; }));
        if ($times) $fresh[$ip] = $times;
    }
    $result = $update($fresh);
    ftruncate($file, 0);
    rewind($file);
    fwrite($file, json_encode($result['tries']));
    flock($file, LOCK_UN);
    fclose($file);
    return $result;
}

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET') reply(state());
if ($method !== 'POST') reply(['error' => 'Metoda niedozwolona'], 405);

// JSON only: a cross-site form can't send it without a CORS preflight, which this file never allows.
$type = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
if (stripos($type, 'application/json') !== 0) reply(['error' => 'Nieprawidłowe dane'], 415);
$input = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($input)) reply(['error' => 'Nieprawidłowe dane'], 400);
$action = isset($input['akcja']) ? $input['akcja'] : '';

if ($action === 'zaloguj') {
    $ip = hash('sha256', isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '');
    // A filled honeypot counts as a wrong password; the bot gets the same answer.
    $bot = !empty($input['website']);
    $haslo = isset($input['haslo']) ? $input['haslo'] : '';
    $result = with_tries(function ($tries) use ($ip, $bot, $haslo, $config) {
        if (isset($tries[$ip]) && count($tries[$ip]) >= MAX_TRIES) return ['tries' => $tries, 'state' => 'blocked'];
        if ($bot || !password_ok($haslo, isset($config['haslo']) ? $config['haslo'] : '')) {
            $tries[$ip][] = time();
            return ['tries' => $tries, 'state' => 'wrong'];
        }
        unset($tries[$ip]);
        return ['tries' => $tries, 'state' => 'ok'];
    });
    if ($result['state'] === 'blocked') reply(['error' => 'Zbyt wiele nieudanych prób. Spróbuj ponownie za 15 minut.'], 429);
    if ($result['state'] === 'wrong') {
        sleep(1);
        reply(['error' => 'Nieprawidłowe hasło.'], 401);
    }
    session_regenerate_id(true);
    $_SESSION['ok'] = true;
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
    reply(state());
}

if (empty($_SESSION['ok'])) reply(['error' => 'Sesja wygasła. Zaloguj się ponownie.', 'zalogowany' => false], 401);
if (!hash_equals($_SESSION['csrf'], (string) (isset($input['csrf']) ? $input['csrf'] : ''))) {
    reply(['error' => 'Sesja wygasła. Odśwież stronę i zaloguj się ponownie.'], 403);
}

if ($action === 'wyloguj') {
    $_SESSION = [];
    session_destroy();
    reply(['zalogowany' => false]);
}

if ($action === 'zapisz') {
    // Plain text on one line: no tags, whitespace collapsed.
    $text = preg_replace('/\s+/u', ' ', strip_tags((string) (isset($input['komunikat']) ? $input['komunikat'] : '')));
    if ($text === null) reply(['error' => 'Komunikat zawiera nieprawidłowe znaki.'], 400);
    $text = trim($text);
    if (mb_strlen($text, 'UTF-8') > MAX_TEXT) reply(['error' => 'Komunikat może mieć najwyżej ' . MAX_TEXT . ' znaków.'], 400);

    $today = date('Y-m-d');
    $days = [];
    foreach (isset($input['dniWolne']) && is_array($input['dniWolne']) ? $input['dniWolne'] : [] as $row) {
        $from = valid_date(isset($row['od']) ? $row['od'] : null);
        $to = isset($row['do']) && $row['do'] !== '' ? valid_date($row['do']) : $from;
        if (!$from || !$to) reply(['error' => 'Nieprawidłowa data. Wybierz ją z kalendarza.'], 400);
        if ($to < $from) reply(['error' => "Okres $from – $to kończy się przed początkiem."], 400);
        if ($to < $today) continue;   // past days drop off by themselves
        $days[] = $to === $from ? ['od' => $from] : ['od' => $from, 'do' => $to];
    }
    usort($days, function ($a, $b) { return strcmp($a['od'], $b['od']); });
    if (count($days) > MAX_DAYS) reply(['error' => 'Za dużo pozycji (najwyżej ' . MAX_DAYS . ').'], 400);

    $data = ['komunikat' => $text, 'dniWolne' => $days, 'zmieniono' => date('c')];
    $tmp = STATUS_FILE . '.tmp';
    $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    if (file_put_contents($tmp, $json . "\n", LOCK_EX) === false || !rename($tmp, STATUS_FILE)) {
        reply(['error' => 'Nie udało się zapisać zmian na serwerze.'], 500);
    }
    reply(state());
}

reply(['error' => 'Nieznana akcja'], 400);
