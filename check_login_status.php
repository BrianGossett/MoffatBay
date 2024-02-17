<?php
session_start();

if (isset($_SESSION['customer_id'], $_SESSION['first_name'], $_SESSION['last_name'], $_SESSION['email_address'], $_SESSION['telephone'])) {
    $customerId = $_SESSION['customer_id'];
    $firstName = $_SESSION['first_name'];
    $lastName = $_SESSION['last_name'];
    $emailAddress = $_SESSION['email_address'];
    $telephone = $_SESSION['telephone'];
    echo "var customer_id = $customerId;
          var first_name = '$firstName';
          var last_name = '$lastName';
          var email_address = '$emailAddress'; 
          var telephone = '$telephone';";
} else {
    echo "var customer_id = null;";
}
?>