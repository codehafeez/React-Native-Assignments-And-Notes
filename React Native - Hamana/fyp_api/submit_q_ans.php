<?php
include("connection_db.php"); 
header('Access-Control-Allow-Origin: *');
header('Response: HTTP/1.1 200 OK');
$json = json_decode(file_get_contents('php://input'), true);

    $q_ans1 = $json['q_ans1'];
    $q_ans2 = $json['q_ans2'];
    $q_ans3 = $json['q_ans3'];
    $q_ans4 = $json['q_ans4'];
    $q_ans_date = $json['q_ans_date'];
    $email = $json['email'];

    $arr_data = array();
    $sql = "INSERT INTO users_q_ans (q_ans1, q_ans2, q_ans3, q_ans4, q_ans_date, user_email) VALUES ('$q_ans1', '$q_ans2', '$q_ans3', '$q_ans4', '$q_ans_date', '$email')";
    if ($con->query($sql) === TRUE) { $arr_data[] = array('message' => 'Success'); } 
    else { $arr_data[] = array('message' => 'Database insert error.'.$con->error); }
    echo json_encode($arr_data);

?>
