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


function handleLanding() {
    // Your existing landing page logic here...

    // Assuming landing is successful, redirect to lodgeReservation.html with query parameters
    const checkInDate = document.getElementById("check-in").value;
    const checkOutDate = document.getElementById("check-out").value;
    const numberOfGuests = document.getElementById("guests").value;

    // Redirect to lodgeReservation.html with query parameters
    window.location.href = `lodgeReservation.html?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&numberOfGuests=${numberOfGuests}`;

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