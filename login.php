<?php
// Assuming you have a database connection file
include 'db_connection.php';

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $remember = isset($_POST['remember']);

    $query = "SELECT id, username, password FROM users WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();

        if (password_verify($password, $row['password'])) {
            // Set session variables
            session_start();
            $_SESSION['user_id'] = $row['id'];

            // Generate a unique token for remember me
            if ($remember) {
                $rememberToken = bin2hex(random_bytes(32));
                $updateQuery = "UPDATE users SET remember_token = ? WHERE id = ?";
                $updateStmt = $conn->prepare($updateQuery);
                $updateStmt->bind_param("si", $rememberToken, $row['id']);
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