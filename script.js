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
    const checkInDate = urlParams.get("checkInDate");
    const checkOutDate = urlParams.get("checkOutDate");
    const numberOfGuests = urlParams.get("NumberOfGuests");
    const RoomID = urlParams.get("RoomID");


    // Set the values in the reservation form if the elements exist
    const checkInDateInput = document.getElementById("CheckInDate");
    const checkOutDateInput = document.getElementById("CheckOutDate");
    const numberOfGuestsInput = document.getElementById("NumberOfGuests");
    const RoomIDInput = document.getElementById("RoomID");


    if (checkInDateInput) {
        checkInDateInput.value = checkInDate;
    }

    if (checkOutDateInput ) {
        checkOutDateInput.value = checkOutDate;
    }

    if (numberOfGuestsInput) {
        numberOfGuestsInput.value = numberOfGuests;
    }

    if (RoomIDInput) {
        RoomIDInput.value = RoomID;
    }
    
});


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