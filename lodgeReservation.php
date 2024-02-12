<?php
// Include the database connection file
include 'db_connection.php';

// Query to select rooms from the database
$query = "SELECT RoomID, RoomName FROM room";
$result = $conn->query($query);

// Check if query was successful
if ($result) {
    // Start building the dropdown menu
    $dropdown = '<select name="rooms">';

    // Loop through the retrieved rooms
    while ($row = $result->fetch_assoc()) {
        $roomId = $row['RoomID'];
        $roomName = $row['RoomName'];
        // Add an option for each room
        $dropdown .= "<option value='$roomId'>$roomName</option>";
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

<script>
// Get reservation details and redirect to summary page
function submitReservation() {
    var RoomID = document.getElementById("RoomID").value;
    var NumberofGuests = document.getElementById("NumberofGuests").value;
    var CheckInDate = document.getElementById("CheckInDate").value;
    var CheckOutDate = document.getElementById("CheckOutDate").value;

    // Construct the URL parameters
    var formData = "RoomID=" + encodeURIComponent(RoomID) +
                   "&NumberofGuests=" + encodeURIComponent(NumberofGuests) +
                   "&CheckInDate=" + encodeURIComponent(CheckInDate) +
                   "&CheckOutDate=" + encodeURIComponent(CheckOutDate);

    // Redirect to reservation summary page 
    window.location.href = "reservationSummary.html?" + formData;
}
</script>

