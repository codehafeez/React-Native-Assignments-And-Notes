<?php
include("connection_db.php"); 
header('Access-Control-Allow-Origin: *');
header('Response: HTTP/1.1 200 OK');
$json = json_decode(file_get_contents('php://input'), true);

    $arr_data = array();
    $email = $json['email'];
    $oldPassword = $json['oldPassword'];
    $newPassword = $json['newPassword'];
    $pass_old = base64_encode($oldPassword);
    $pass_new = base64_encode($newPassword);
    
    $sql = "SELECT * FROM users WHERE user_email='$email' AND user_password='$pass_old'";
    $result = $con->query($sql);
    if ($result->num_rows > 0) 
    {
        $sql2 = "UPDATE users SET user_password='$pass_new' WHERE user_email='$email' ";
        if($con->query($sql2) === true){ $arr_data[] = array('message' => 'Success'); }
        else { $arr_data[] = array('message' => 'Database Error : '.$con->error);  } 
    } 
    else { $arr_data[] = array('message' => 'Sorry Password Incorrect...!'); }
	echo json_encode($arr_data);

?>


