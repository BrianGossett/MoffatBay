<?php
// Assuming you have a database connection file
include 'db_connection.php';

// Set the content type header to JSON
header('Content-Type: application/json');

// Create a response array
$response = array();

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
        $response['success'] = false;
        $response['message'] = "Passwords do not match. Please try again.";
    } else {
        // Hash the password before storing it in the database
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Check if the email address is already in use
        $query = "SELECT EmailAddress FROM customer WHERE EmailAddress = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $response['success'] = false;
            $response['message'] = "Email address already in use. Please try again.";
        } else {
            // Insert user data into the 'customer' table
            $sql = "INSERT INTO customer (EmailAddress, FirstName, LastName, Telephone, Password)
                    VALUES ('$email', '$firstName', '$lastName', '$telephone', '$hashedPassword')";

            if ($conn->query($sql) === TRUE) {
                $response['success'] = true;
                $response['message'] = "Registration successful!";
            } else {
                $response['success'] = false;
                $response['message'] = "Error: " . $sql . "<br>" . $conn->error;
            }
        }
    }
}

// Encode the response array as JSON and output it
echo json_encode($response);
?>