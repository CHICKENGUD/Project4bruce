<?php

require_once('includes/db_connect.php');

$username = $_POST['username'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";

$response = array();

if (mysqli_query($link, $sql)) {
    $response['success'] = true;
    $response['message'] = "Registration successful!";
} else {
    $response['success'] = false;
    $response['error'] = "Error: " . $sql . "<br>" . mysqli_error($link);
}

mysqli_close($link);

header('Content-Type: application/json');
echo json_encode($response);

?>