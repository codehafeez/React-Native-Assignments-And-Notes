<?php
include("connection_db.php"); 
header('Access-Control-Allow-Origin: *');
header('Response: HTTP/1.1 200 OK');
$json = json_decode(file_get_contents('php://input'), true);

    $arr_data = array();
    $email = $json['email'];
    $password = $json['password'];
    $pass = base64_encode($password);

    $sql = "SELECT * FROM users WHERE user_email='$email' AND user_password='$pass'";
    $result = $con->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) { 
            $arr_data[] = array(
                'message' => 'Success',
                'name' => $row['user_name'],
                'department' => $row['user_dep'],
            );
        }
    } 
    else { $arr_data[] = array('message' => 'Sorry Email or Password Incorrect...!'); }
 	echo json_encode($arr_data);
?>


