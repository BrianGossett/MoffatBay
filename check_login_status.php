<?php
session_start();

if (isset($_SESSION['customer_id'])) {
    $customerId = $_SESSION['customer_id'];
    echo "var customer_id = $customerId;";
} else {
    echo "var customer_id = null;";
}
?>