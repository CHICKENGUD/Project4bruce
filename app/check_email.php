<?php
require_once('includes/db_connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = mysqli_real_escape_string($link, $_POST['email']);

    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($link, $sql);

    if (mysqli_num_rows($result) > 0) {
        $response = array("unique" => false);
    } else {
        $response = array("unique" => true);
    }

    mysqli_close($link);

    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    header('Content-Type: application/json');
    echo json_encode(array("success" => false, "error" => "Invalid request method"));
}
?>