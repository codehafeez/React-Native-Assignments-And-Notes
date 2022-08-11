<?php
include("connection_db.php"); 
header('Access-Control-Allow-Origin: *');
header('Response: HTTP/1.1 200 OK');
$json = json_decode(file_get_contents('php://input'), true);

    $email = $json['email'];
    $sql = "SELECT * FROM users WHERE user_email='$email'";
    $result = $con->query($sql);
    if ($result->num_rows > 0) { 
        while($row = mysqli_fetch_assoc($result)) 
        {
            $password = base64_decode($row['user_password']);
            $to = $email;
            $subject = "Hamana FYP Project";
            $message = "Hamana FYP Project Login password is : ".$password;
            $header = "From: codehafeez@gmail.com";
            if(mail($to, $subject, $message, $header)){ $arr_data[] = array('message' => 'Success'); }
            else { $arr_data[] = array('message' => 'Can not send mail'); }
        }
    } 
    else { $arr_data[] = array('message' => 'Please enter a valid email address.'); }
    echo json_encode($arr_data);
?>
