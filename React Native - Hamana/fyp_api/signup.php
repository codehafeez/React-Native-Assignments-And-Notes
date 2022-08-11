<?php
include("connection_db.php"); 
header('Access-Control-Allow-Origin: *');
header('Response: HTTP/1.1 200 OK');
$json = json_decode(file_get_contents('php://input'), true);

    $name = $json['name'];
    $email = $json['email'];
    $password = $json['password'];
    $pass = base64_encode($password);
    $department = $json['department'];

    $arr_data = array();
    $sql = "SELECT * FROM users WHERE user_email='$email'";
    $result = $con->query($sql);
    if ($result->num_rows > 0) { $arr_data[] = array('message' => 'Sorry this email is already exist.'); } 
    else 
    { 
        $sql = "INSERT INTO users (user_name, user_email, user_password, user_dep) VALUES ('$name', '$email', '$pass', '$department')";
        if ($con->query($sql) === TRUE) { $arr_data[] = array('message' => 'Success'); } 
        else { $arr_data[] = array('message' => 'Database insert error.'.$con->error); }
    }
    echo json_encode($arr_data);

?>
