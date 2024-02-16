<?php
session_start();

if (isset($_SESSION['customer_id'], $_SESSION['first_name'], $_SESSION['last_name'])) {
    $customerId = $_SESSION['customer_id'];
    $firstName = $_SESSION['first_name'];
    $lastName = $_SESSION['last_name'];
    echo "var customer_id = $customerId;
          var first_name = '$firstName';
          var last_name = '$lastName';";
} else {
    echo "var customer_id = null;";
}
?>