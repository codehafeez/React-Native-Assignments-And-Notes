<?php
$servername = "localhost";
$username = "abdulwahab_fyp";
$password = "abdulwahab_fyp";
$dbname = "abdulwahab_fyp";

$con = new mysqli($servername, $username, $password, $dbname);
if (!$con) { die("Connection failed: " . mysqli_connect_error()); }

