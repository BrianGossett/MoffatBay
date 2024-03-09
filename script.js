document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if(loginForm) {    
        loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(loginForm);

        // Make an AJAX request to the server to handle login
        fetch("login.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {

            if (data.success) {
                // Redirect to the home page or any other authorized page
                window.location.href = "index.html";
            } else {
                alert("Invalid credentials");
            }
        })
        .catch(error => console.error("Error:", error));
    });}
});

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");

    if(registrationForm)
    {    
        registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(registrationForm);

        // Make an AJAX request to the server to handle registration
        fetch("registration.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Registration successful, you may redirect to another page or show a success message
                alert("Registration successful!");
                // Optionally, redirect to another page
                window.location.href = "index.html";
            } else {
                // Registration failed, display an error message
                alert("Registration failed. Please try again.");
            }
        })
        .catch(error => console.error("Error:", error));
    });}
});

document.addEventListener("DOMContentLoaded", function () {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById("footerContainer").innerHTML = data;
        });
});

document.addEventListener("DOMContentLoaded", function () {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById("headerContainer");
            if (headerContainer) {
                headerContainer.innerHTML = data;
            }

            // Now, menuIcon and navLinks are part of the DOM
            const menuIcon = document.getElementById("menuIcon");
            const navLinks = document.getElementById("navLinks");
            
            
            menuIcon.addEventListener("click", function () {
                navLinks.classList.toggle("show");
            });
        });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const checkInDate = urlParams.get("CheckInDate");
    const checkOutDate = urlParams.get("CheckOutDate");
    const numberOfGuests = urlParams.get("NumberOfGuests");
    const RoomID = urlParams.get("RoomID");


    // Set the values in the reservation form if the elements exist
    const checkInDateInput = document.getElementById("CheckInDate");
    const checkOutDateInput = document.getElementById("CheckOutDate");
    const numberOfGuestsInput = document.getElementById("NumberOfGuests");
    const RoomIDInput = document.getElementById("RoomID");
    const customerIdInput = document.getElementById("CustomerId");


    // Set the values in the reservation summary if the elements exist
    const nameLabel = document.getElementById("name");
    const emailLabel = document.getElementById("email");
    const phoneLabel = document.getElementById("phone");
    const checkInLabel = document.getElementById("checkIn");
    const checkOutLabel = document.getElementById("checkOut");
    const roomLabel = document.getElementById("room");
    const guestsLabel = document.getElementById("guest");
    const costLabel = document.getElementById("cost");


    if (checkInDateInput) {
        checkInDateInput.value = checkInDate;
        if (checkInLabel) {
            checkInLabel.innerText = checkInDate;
        }
    }

    if (checkOutDateInput ) {
        checkOutDateInput.value = checkOutDate;
        if (checkOutLabel) {
            checkOutLabel.innerText = checkOutDate;
        }
    }

    if (numberOfGuestsInput) {
        numberOfGuestsInput.value = numberOfGuests;
        if (guestsLabel) {
            guestsLabel.innerText = numberOfGuests;
        }
    }

    if (RoomIDInput) {
        if (roomLabel) {
            getRoomSize(RoomID).then(roomSize => {            
                roomLabel.innerText = roomSize;
            });
        }
        RoomIDInput.value = RoomID;

    }

    if (customerIdInput) {
       
        // Make an AJAX request to check if the user is logged in
        fetch("check_login_status.php")
            .then(response => response.text())
            .then(data => {
                // Execute the script containing customer_id
                eval(data);
                // Use the customer_id JavaScript variable
                if (customer_id !== null) {
                    nameLabel.innerText = first_name + " " + last_name;
                    emailLabel.innerText = email_address;
                    phoneLabel.innerText = telephone;
                    customerIdInput.value = customer_id;
                } else {
                    // The user is not logged in
                    console.log("Not logged in");
                }
            })
            .catch(error => console.error("Error:", error));
    }

    if (costLabel) {
        // number 1-2 guest is 115 per night and 3-5 guest for 150 per night
        var cost = 0;
        if (numberOfGuests <= 2) {
            cost = 115;
        } else {
            cost = 150;
        }

        // number of days
        var date1 = new Date(checkInDate);
        var date2 = new Date(checkOutDate);

        // calculate the difference in days between the two dates whole number based on 
        var Difference_In_Time =
            date2.getTime() - date1.getTime();
 
        // Calculating the no. of days between
        // two dates
        var Difference_In_Days =
            Math.abs(Math.round(Difference_In_Time / (1000 * 3600 * 24)));
        
        cost = cost * Difference_In_Days;

        costLabel.innerText = cost;
    }
    
});

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");
    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission
            // Get the search term from the form input
            const searchTerm = document.getElementById("searchTerm").value;
            searchReservation(searchTerm);
        });
    }
});

function searchReservation(searchTerm) {
    // Make a fetch request to the PHP script to search for the reservation
    fetch(`search_reservation.php?searchTerm=${searchTerm}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            // Call a function to display the search results
            displaySearchResults(data);
        })
        .catch(error => {
            console.error('Error:', error);
            // Display an error message to the user
            document.getElementById("searchResults").innerHTML = `<p>Error: Failed to retrieve reservation information.</p>`;
        });
}

// Function to display the search results
function displaySearchResults(data) {
    const searchResultsDiv = document.getElementById("searchResults");

    // Clear any previous search results
    searchResultsDiv.innerHTML = "";

    // Check if there are any search results
    if (data.length > 0) {
        // Create a table to display the search results
        const table = document.createElement("table");
        table.innerHTML = `
            <tr>
                <th>Reservation ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Telephone</th>
                <th>Number of Guests</th>
                <th>Check-in Date</th>
                <th>Check-out Date</th>
                <th>Room Size</th>
            </tr>
        `;

        // Add each reservation as a row in the table
        data.forEach(reservation => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${reservation.ReservationID}</td>
                <td>${reservation.FirstName}</td>
                <td>${reservation.LastName}</td>
                <td>${reservation.EmailAddress}</td>
                <td>${reservation.Telephone}</td>
                <td>${reservation.NumberofGuests}</td>
                <td>${reservation.CheckInDate}</td>
                <td>${reservation.CheckOutDate}</td>
                <td>${reservation.RoomSize}</td>
            `;
            table.appendChild(row);
        });

        // Append the table to the search results div
        searchResultsDiv.appendChild(table);
    } else {
        // If no search results were found, display a message to the user
        searchResultsDiv.innerHTML = `<p>No reservation found for the provided search term.</p>`;
    }
}

function handleLanding() {
    // Your existing landing page logic here...

    // Assuming landing is successful, redirect to lodgeReservation.html with query parameters
    const checkInDate = document.getElementById("check-in").value;
    const checkOutDate = document.getElementById("check-out").value;
    const numberOfGuests = document.getElementById("guests").value;

    // Redirect to lodgeReservation.html with query parameters
    window.location.href = `lodgeReservation.html?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&NumberOfGuests=${numberOfGuests}`;

    // Prevent the form from submitting
    return false;
}

function logout() {
    // Make an AJAX request to logout the user
    fetch("logout.php")
        .then(response => response.text())
        .then(data => {
            // Redirect to the home page or any other authorized page
            window.location.href = "index.html";
        })
        .catch(error => console.error("Error:", error));
}

function checkAndDisplayCustomerId() {
    // Make an AJAX request to check if the user is logged in
    fetch("check_login_status.php")
        .then(response => response.text())
        .then(data => {
            // Execute the script containing customer_id
            eval(data);
            
            // Use the customer_id JavaScript variable
            if (customer_id !== null) {
                // The user is logged in, you can display or use the customer_id
                console.log("Customer ID:", customer_id);
            } else {
                // The user is not logged in
                console.log("Not logged in");
            }
        })
        .catch(error => console.error("Error:", error));
}

function loginPageRedirect() {
    // Make an AJAX request to check if the user is logged in
    fetch("check_login_status.php")
        .then(response => response.text())
        .then(data => {
            // Execute the script containing customer_id
            eval(data);
            
            // Use the customer_id JavaScript variable
            if (customer_id !== null) {
                window.location.href = "lodgeReservation.html";
            }
        })
        .catch(error => console.error("Error:", error));

}


// Get reservation details and redirect to summary page
function submitReservation() {
    var RoomID = document.getElementById("RoomID").value;
    var NumberofGuests = document.getElementById("NumberOfGuests").value;
    var CheckInDate = document.getElementById("CheckInDate").value;
    var CheckOutDate = document.getElementById("CheckOutDate").value;

    // Construct the URL parameters
    var formData = "RoomID=" + encodeURIComponent(RoomID) +
                   "&NumberOfGuests=" + encodeURIComponent(NumberofGuests) +
                   "&CheckInDate=" + encodeURIComponent(CheckInDate) +
                   "&CheckOutDate=" + encodeURIComponent(CheckOutDate);

    // Redirect to reservation summary page 
    window.location.href = "reservationSummary.html?" + formData;

    // Prevent the form from submitting
    return false;
}

function reservationNotLoggedInRedirect() {
    // Make an AJAX request to check if the user is logged in
    fetch("check_login_status.php")
        .then(response => response.text())
        .then(data => {
            // Execute the script containing customer_id
            eval(data);
            
            // Use the customer_id JavaScript variable
            if (customer_id == null) {
                window.location.href = "login.html";
            }
        })
        .catch(error => console.error("Error:", error));
}

async function getRoomSize(roomID) {
    // Construct the URL for the PHP script
    const url = `get_room_size.php?roomID=${roomID}`;

    // Make a fetch request to the PHP script
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Extract and return the room size from the JSON response
            return data.roomSize;
        })
        .catch(error => {
            console.error('Error:', error);
            // Return an error message or handle the error as needed
            return 'Error: Failed to retrieve room size';
        });
}

function submitReservationSummary() {
    // Retrieve reservation details from the form
    var customerId = document.getElementById("CustomerId").value;
    var roomId = document.getElementById("RoomID").value;
    var numberOfGuests = document.getElementById("NumberOfGuests").value;
    var checkInDate = document.getElementById("CheckInDate").value;
    var checkOutDate = document.getElementById("CheckOutDate").value;

    // Construct the data object to send to the PHP file
    var reservationData = {
        customerId: customerId,
        roomId: roomId,
        numberOfGuests: numberOfGuests,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate
    };
        
    // clear params and go to index.html after confirming in alert
    var r = confirm("Are you sure you want to accept the reservation?");
    if (r == true) {
        // Send reservation data to the PHP file using AJAX
        fetch('create_reservation.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData)
        })
        .then(response => response.text())
        .then(data => {
            // Handle the response from the PHP file
            console.log(data); // Log the response for debugging
            // Optionally, display a success message or redirect to another page
            window.location.href = "reservationLookUp.html";
        })
        .catch(error => console.error('Error:', error));
    }
}

function goBack() {
    window.history.back();
}

function cancelReservation() {
    // clear params and go to index.html after confirming in alert
    var r = confirm("Are you sure you want to cancel the reservation?");
    if (r == true) {
        window.location.href = "index.html";
    }
}