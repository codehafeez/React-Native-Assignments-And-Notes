<?php
include("connection_db.php"); 
header('Access-Control-Allow-Origin: *');
header('Response: HTTP/1.1 200 OK');
$json = json_decode(file_get_contents('php://input'), true);
    
    $email = $json['email'];
    $sql = "SELECT * FROM users_q_ans WHERE user_email='$email'";
    if($email == "admin@gmail.com"){ $sql = "SELECT * FROM users_q_ans"; }
    $arr_data = array();
    $fetchData = mysqli_query($con, $sql);
    while($row = mysqli_fetch_assoc($fetchData)){ $arr_data[] = $row; }
    echo json_encode($arr_data);
    
?>


