<?php
// Include the database connection file
include 'db_connection.php';

// Query to select rooms from the database
$query = "SELECT RoomID, RoomSize FROM roomsize";
$result = $conn->query($query);

// Check if query was successful
if ($result) {
    // Start building the dropdown menu
    $dropdown = '<select name="room_size" required id="RoomID">';

    // Loop through the retrieved rooms
    while ($row = $result->fetch_assoc()) {
        $roomId = $row['RoomID'];
        $roomSize = $row['RoomSize'];
        // Add an option for each room
        $dropdown .= "<option value='$roomId'>$roomSize</option>";
    }

    // Close the select tag
    $dropdown .= '</select>';

    // Output the dropdown menu
    echo $dropdown;
} else {
    // If the query fails, display an error message
    echo "Error: " . $conn->error;
}

// Close the database connection
$conn->close();
?>

