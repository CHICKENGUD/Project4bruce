<?php

require_once('includes/db_connect.php');

$sql = "SELECT * FROM Survey ORDER BY username ASC"; //change to proper table/column
$result = mysqli_query($link, $sql);

if ($result) {
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode(array("success" => false, "error" => mysqli_error($link)));
}

mysqli_close($link);

?>