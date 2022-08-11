<?php
include("connection_db.php"); 
header('Access-Control-Allow-Origin: *');
header('Response: HTTP/1.1 200 OK');
$json = json_decode(file_get_contents('php://input'), true);

    $arr_data = array();
    $email = $json['email'];
    $name = $json['name'];
    $department = $json['department'];

    $sql2 = "UPDATE users SET user_name='$name', user_dep='$department' WHERE user_email='$email' ";
    if($con->query($sql2) === true){ $arr_data[] = array('message' => 'Success'); }
    else { $arr_data[] = array('message' => 'Database Error : '.$con->error);  } 
	echo json_encode($arr_data);

?>


