<?php
// Assuming you have a database connection file
include 'db_connection.php';

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $emailAddress = $_POST['username'];  // Assuming email is used as the username
    $password = $_POST['password'];
    $remember = isset($_POST['remember']);

    $query = "SELECT CustomerID, EmailAddress, FirstName, LastName, Telephone, Password FROM customer WHERE EmailAddress = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $emailAddress);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();

        if (password_verify($password, $row['Password'])) {
            // Set session variables
            session_start();
            $_SESSION['customer_id'] = $row['CustomerID'];
            $_SESSION['first_name'] = $row['FirstName'];
            $_SESSION['last_name'] = $row['LastName'];
            $_SESSION['email_address'] = $row['EmailAddress'];
            $_SESSION['telephone'] = $row['Telephone'];

            // Generate a unique token for remember me
            if ($remember) {
                $rememberToken = bin2hex(random_bytes(32));
                $updateQuery = "UPDATE customer SET remember_token = ? WHERE CustomerID = ?";
                $updateStmt = $conn->prepare($updateQuery);
                $updateStmt->bind_param("si", $rememberToken, $row['CustomerID'], $row['firstName'], $row['lastName'], $row['emailAddress'], $row['telephone']);
                $updateStmt->execute();

                // Set a cookie with the remember token
                setcookie("remember_token", $rememberToken, time() + (30 * 24 * 60 * 60), "/");
            }

            echo json_encode(['success' => true]);
            exit();
        }
    }

    echo json_encode(['success' => false]);
}
?>