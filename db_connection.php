<?php
// Database configuration
$servername = "localhost";
$username = "newuser";
$password = "newuser";
$database = "Moffatbay";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Uncomment the line below if you want to set the character set (optional)
// $conn->set_charset("utf8mb4");
?>