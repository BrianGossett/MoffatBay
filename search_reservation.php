<?php
// Include the database connection file
include 'db_connection.php';


$searchTerm = $_GET['searchTerm'];


// Query to select the reservation information based on the search term
$query = "SELECT r.ReservationID, c.FirstName, c.LastName, c.EmailAddress, c.Telephone, r.NumberofGuests, r.CheckInDate, r.CheckOutDate, rs.RoomSize
            FROM reservation r
            JOIN customer c ON r.CustomerID = c.CustomerID
            JOIN roomsize rs ON r.RoomID = rs.RoomID
            WHERE c.EmailAddress LIKE '%$searchTerm%' OR r.ReservationID = '$searchTerm'";


$result = mysqli_query($conn, $query);
// Check if any rows were returned
if(mysqli_num_rows($result) > 0) {
    // Fetch and return the reservation information
    $reservations = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($reservations);
} else {
    // No matching reservation found
    echo json_encode(["message" => "No reservation found for the provided search term."]);
}
?>
