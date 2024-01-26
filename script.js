document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if(loginForm)
{    loginForm.addEventListener("submit", function (e) {
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
{    registrationForm.addEventListener("submit", function (e) {
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
            document.getElementById("headerContainer").innerHTML = data;

            // Now, menuIcon and navLinks are part of the DOM
            const menuIcon = document.getElementById("menuIcon");
            const navLinks = document.getElementById("navLinks");
            
            
            menuIcon.addEventListener("click", function () {
                navLinks.classList.toggle("show");
            });
        });
});