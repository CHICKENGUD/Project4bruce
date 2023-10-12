<?php

$host = "localhost:3306";
$db = "foodsurvey";
$user = "Brianyee";
$pass = "";

$link = mysqli_connect($host, $user, $pass, $db);

$db_response = [];
$db_response['success'] = 'not set';

if(!$link){
  $db_response['success'] = false;
}else{
  $db_response['success'] = true;
}
//echo out when live
//echo json_encode($db_response);


?>
