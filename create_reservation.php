<?php
// Include the database connection file
include 'db_connection.php';

// Retrieve reservation data from the POST request
$data = json_decode(file_get_contents("php://input"));

// Extract reservation details
$customerId = $data->customerId;
$roomId = $data->roomId;
$numberOfGuests = $data->numberOfGuests;
$checkInDate = $data->checkInDate;
$checkOutDate = $data->checkOutDate;

// Prepare and execute the SQL query to insert reservation into the database
$query = "INSERT INTO reservation (CustomerID, RoomID, NumberofGuests, CheckInDate, CheckOutDate) 
          VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("iiiss", $customerId, $roomId, $numberOfGuests, $checkInDate, $checkOutDate);

if ($stmt->execute()) {
    // If the insertion is successful, return a success message
    echo "Reservation created successfully.";
} else {
    // If there's an error, return an error message
    echo "Error: " . $conn->error;
}

// Close the database connection
$stmt->close();
$conn->close();
?>
