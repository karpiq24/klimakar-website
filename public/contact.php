<?php
// contact.php — Klima-Kar contact form handler (OVH shared hosting, no dependencies)
// Also served on the brand sites (copied into dist-<name>/ at build time).
//
// Spam protection (2026-10-17), no captcha, no third parties:
// - honeypot `website`, off-screen in the form (bots fill it, people don't see it): pretend success;
// - signed time token: GET ?token returns "<time>.<HMAC>"; the form fetches it on first focus and sends
//   it back. Missing or forged → error; sent within 3 s → pretend success; older than a day → error;
// - at most 5 enquiries per IP per hour;
// - no links in the name or car fields, at most one in the message.
// The HMAC key and the per-IP counts live in the FTP root next to www/ (created automatically).

const SPAM_KEY_FILE = '/../klimakar-formularz.key';
const SPAM_LIMIT_FILE = '/../klimakar-formularz-limity.json';
const MIN_SECONDS = 3;
const MAX_SECONDS = 86400;
const MAX_PER_HOUR = 5;

/** The HMAC key, made on first use; null when the FTP root isn't writable (then no token check). */
function form_key() {
    $file = __DIR__ . SPAM_KEY_FILE;
    if (!is_file($file)) @file_put_contents($file, bin2hex(random_bytes(32)), LOCK_EX);
    $key = @file_get_contents($file);
    return $key ? trim($key) : null;
}
function form_sign($time, $key) {
    return hash_hmac('sha256', 'formularz|' . $time, $key);
}

// GET ?token → a fresh time token for the form.
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['token'])) {
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    $key = form_key();
    $now = time();
    echo json_encode(['token' => $key ? $now . '.' . form_sign($now, $key) : '']);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Metoda niedozwolona']);
    exit;
}

// Set headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Read JSON body
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Nieprawidłowe dane']);
    exit;
}

// Honeypot check
if (!empty($input['website'])) {
    // Bot detected — pretend success
    echo json_encode(['success' => true, 'message' => 'Dziękujemy! Skontaktujemy się wkrótce.']);
    exit;
}

// Time token (see the top of the file).
$key = form_key();
if ($key) {
    $token = explode('.', isset($input['token']) && is_string($input['token']) ? $input['token'] : '');
    if (count($token) !== 2 || !ctype_digit($token[0]) || !hash_equals(form_sign($token[0], $key), $token[1])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Odśwież stronę i wyślij formularz ponownie.']);
        exit;
    }
    $age = time() - (int) $token[0];
    if ($age < MIN_SECONDS) {
        echo json_encode(['success' => true, 'message' => 'Dziękujemy! Skontaktujemy się wkrótce.']);
        exit;
    }
    if ($age > MAX_SECONDS) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Formularz wygasł. Odśwież stronę i wyślij go ponownie.']);
        exit;
    }
}

// Sanitize (no `??`, as written for the old PHP 5.4; the hosting runs 8.4 since the launch and the spam checks need 7+)
function field($input, $key) {
    return isset($input[$key]) && is_scalar($input[$key]) ? (string) $input[$key] : '';
}
function clean_field($input, $key, $max = 200) {
    $value = trim(strip_tags(field($input, $key)));
    $value = function_exists('mb_substr') ? mb_substr($value, 0, $max, 'UTF-8') : substr($value, 0, $max);
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
$name    = clean_field($input, 'name');
$email   = trim(field($input, 'email'));
$phone   = preg_replace('/[^0-9+()\- ]/', '', clean_field($input, 'phone', 30));
$contact = field($input, 'contact') === 'telefon' ? 'telefon' : 'e-mail';
$car     = clean_field($input, 'car');
$vin     = strtoupper(preg_replace('/[^A-Za-z0-9]/', '', clean_field($input, 'vin', 17)));
$message = clean_field($input, 'message', 5000);

// Validate required (phone only when the customer prefers a call)
if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || ($contact === 'telefon' && empty($phone))) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Proszę wypełnić wymagane pola']);
    exit;
}

// Links: none in the name or car fields, at most one in the message.
$links = '~(https?://|www\.|\[url)~i';
if (preg_match($links, field($input, 'name') . ' ' . field($input, 'car')) || preg_match_all($links, field($input, 'message')) > 1) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Usuń linki z formularza albo zadzwoń: 71 337 14 50']);
    exit;
}

// At most MAX_PER_HOUR enquiries per IP (hashed) per hour; the counter file is locked while in use.
$limits = @fopen(__DIR__ . SPAM_LIMIT_FILE, 'c+');
if ($limits && flock($limits, LOCK_EX)) {
    $ip = hash('sha256', isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '');
    $counts = json_decode((string) stream_get_contents($limits), true);
    $fresh = [];
    foreach (is_array($counts) ? $counts : [] as $who => $times) {
        $times = array_values(array_filter((array) $times, function ($t) { return $t > time() - 3600; }));
        if ($times) $fresh[$who] = $times;
    }
    $blocked = isset($fresh[$ip]) && count($fresh[$ip]) >= MAX_PER_HOUR;
    if (!$blocked) $fresh[$ip][] = time();
    ftruncate($limits, 0);
    rewind($limits);
    fwrite($limits, json_encode($fresh));
    flock($limits, LOCK_UN);
    fclose($limits);
    if ($blocked) {
        http_response_code(429);
        echo json_encode(['success' => false, 'message' => 'Wysłano już kilka zapytań. Spróbuj później albo zadzwoń: 71 337 14 50']);
        exit;
    }
}

// Build email
$to = 'serwis@klima-kar.pl';
// Which site it came from (klima-kar, webasto or eberspaecher.wroclaw.pl); the host is filtered.
$host = preg_replace('/[^a-z0-9.\-]/', '', strtolower(isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : ''));
$subject = $host ? "Nowe zapytanie ze strony $host" : "Nowe zapytanie ze strony www";
$body  = "Imię i nazwisko: $name\n";
$body .= "E-mail: $email\n";
if ($phone)   $body .= "Telefon: $phone\n";
$body .= "Preferowany kontakt: $contact\n";
if ($car)     $body .= "Pojazd: $car\n";
if ($vin)     $body .= "VIN: $vin\n";
if ($message) $body .= "\nWiadomość:\n$message\n";

// Reply-To is the customer, so "Odpowiedz" in the mail client reaches them.
// FILTER_VALIDATE_EMAIL above rejects line breaks, so the header can't be injected.
$headers  = "From: noreply@klima-kar.wroclaw.pl\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Dziękujemy! Skontaktujemy się wkrótce.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Wystąpił błąd. Proszę zadzwonić: 71 337 14 50']);
}
