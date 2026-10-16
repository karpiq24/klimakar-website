<?php
// contact.php — Klima-Kar contact form handler (OVH shared hosting, no dependencies)

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

// Sanitize (no `??`: it has to run on the hosting's old PHP too)
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
