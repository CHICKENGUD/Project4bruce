<?php

error_reporting(E_ALL);

session_start();

require_once('includes/db_connect.php');

$email = $_POST['email'];
$password = $_POST['password'];

$response = array();

$sql = "SELECT * FROM users WHERE email='$email'";
$result = mysqli_query($link, $sql);

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_assoc($result);
    if (password_verify($password, $row['password'])) {
        $_SESSION['verify'] = true;
        $response['success'] = true;
        $response['message'] = "Login successful";
    } else {
        $response['success'] = false;
        $response['error'] = "Incorrect password";
    }
} else {
    $response['success'] = false;
    $response['error'] = "User not found";
}

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_assoc($result);
    if (password_verify($password, $row['password'])) {
        $_SESSION['verify'] = true;
        $_SESSION['email'] = $email;
        $response['success'] = true;
        $response['message'] = "Login successful";
    } else {
        $response['success'] = false;
        $response['error'] = "Incorrect password";
    }
} else {
    $response['success'] = false;
    $response['error'] = "User not found";
}

mysqli_close($link);

echo json_encode($response);
?>