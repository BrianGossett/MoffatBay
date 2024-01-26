<?php
// Assuming you have a database connection file
include 'db_connection.php';

// Unset session variables
session_start();
session_unset();
session_destroy();

// Delete the remember me cookie
setcookie("remember_token", "", time() - 3600, "/");

// Redirect to the login page
header("Location: login.html");
exit();
?>