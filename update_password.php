<?php
require_once 'config/database.php';

$database = new Database();
$conn = $database->getConnection();

$newPassword = 'password';
$newHash = password_hash($newPassword, PASSWORD_BCRYPT);

echo "New hash: " . $newHash . "\n";

$query = "UPDATE users SET password = :password WHERE email = 'admin@example.com'";
$stmt = $conn->prepare($query);
$stmt->bindParam(':password', $newHash);
if ($stmt->execute()) {
    echo "Password updated successfully.\n";

    // Verify update
    $query = "SELECT password FROM users WHERE email = 'admin@example.com'";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Updated hash in DB: " . $row['password'] . "\n";

    // Verify password_verify works
    if (password_verify($newPassword, $row['password'])) {
        echo "Password verification successful.\n";
    } else {
        echo "Password verification FAILED (unexpected).\n";
    }
} else {
    echo "Failed to update password.\n";
    print_r($stmt->errorInfo());
}
