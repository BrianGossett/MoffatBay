<?php
// Include the database connection file
include 'db_connection.php';

// Retrieve the room ID from the query parameters
$roomID = $_GET['roomID'];

// Query to select the room size based on the room ID
$query = "SELECT RoomSize FROM roomsize WHERE RoomID = '$roomID'";
$result = mysqli_query($conn, $query);

if ($result) {
    // Fetch the room size from the result set
    $row = mysqli_fetch_assoc($result);
    $roomSize = $row['RoomSize'];

    // Return the room size as JSON
    echo json_encode(['roomSize' => $roomSize]);
} else {
    // If the query fails, return an error message
    echo json_encode(['error' => 'Failed to retrieve room size']);
}

// Close the database connection
mysqli_close($conn);
?>