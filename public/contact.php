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

// Sanitize
$name    = htmlspecialchars(strip_tags(trim($input['name'] ?? '')));
$phone   = htmlspecialchars(strip_tags(trim($input['phone'] ?? '')));
$service = htmlspecialchars(strip_tags(trim($input['service'] ?? '')));
$car     = htmlspecialchars(strip_tags(trim($input['car'] ?? '')));
$message = htmlspecialchars(strip_tags(trim($input['message'] ?? '')));

// Validate required
if (empty($name) || empty($phone) || empty($service)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Proszę wypełnić wymagane pola']);
    exit;
}

// Build email
$to = 'serwis@klima-kar.pl';
$subject = "Nowe zapytanie ze strony www — $service";
$body  = "Imię i nazwisko: $name\n";
$body .= "Telefon: $phone\n";
$body .= "Usługa: $service\n";
if ($car)     $body .= "Pojazd: $car\n";
if ($message) $body .= "\nWiadomość:\n$message\n";

$headers  = "From: noreply@klima-kar.wroclaw.pl\r\n";
$headers .= "Reply-To: noreply@klima-kar.wroclaw.pl\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Dziękujemy! Skontaktujemy się wkrótce.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Wystąpił błąd. Proszę zadzwonić: 71 337 14 50']);
}
