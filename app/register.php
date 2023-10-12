<?php
require_once('includes/db_connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = mysqli_real_escape_string($link, $_POST['username']);
    $email = mysqli_real_escape_string($link, $_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $stmt = $link->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password); //s = some storage box, 1 for username, email, password

    if ($stmt->execute()) {
        $response = array("success" => true);
    } else {
        $response = array("success" => false, "error" => $stmt->error);
    }

    $stmt->close();
} else {
    $response = array("success" => false, "error" => "Invalid request method");
}

mysqli_close($link);

header('Content-Type: application/json');
echo json_encode($response);
?>