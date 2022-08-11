<?php
include("connection_db.php"); 
header('Access-Control-Allow-Origin: *');
header('Response: HTTP/1.1 200 OK');
$json = json_decode(file_get_contents('php://input'), true);

    $q_ans_status = $json['status'];
    $id = $json['id'];

    $sql2 = "UPDATE users_q_ans SET q_ans_status='$q_ans_status' WHERE q_ans_id='$id' ";
    if($con->query($sql2) === true){ $arr_data[] = array('message' => 'Success'); }
    else { $arr_data[] = array('message' => 'Database Error : '.$con->error);  } 
	echo json_encode($arr_data);

?>
