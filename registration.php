<?php
// Assuming you have a database connection file
include 'db_connection.php';


// Process form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve form data
    $email = $_POST["email"];
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $telephone = $_POST["telephone"];
    $password = $_POST["password"];
    $confirmPassword = $_POST["confirmPassword"];

    // Perform basic validation
    if ($password != $confirmPassword) {
        echo "Passwords do not match. Please try again.";
    } else {
        // Hash the password before storing it in the database
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert user data into the 'customer' table
        $sql = "INSERT INTO customer (EmailAddress, FirstName, LastName, Telephone, Password)
                VALUES ('$email', '$firstName', '$lastName', '$telephone', '$hashedPassword')";

        if ($conn->query($sql) === TRUE) {
            echo "Registration successful!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

?>