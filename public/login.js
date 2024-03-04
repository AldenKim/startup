/*function login() {
    const name = document.querySelector("#name");
    const password = document.querySelector("#password");
    localStorage.setItem("userName", name.value);
    localStorage.setItem("password", password.value);
    window.location.href = "ratings.html";
}*/

function login() {
    const name = document.querySelector("#name").value;
    const password = document.querySelector("#password").value;

    // Make sure both username and password are provided
    if (!name || !password) {
        alert("Please enter both username and password.");
        return;
    }

    // Prepare the data to send in the request body
    const data = {
        username: name,
        password: password
    };

    // Make a POST request to the server
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Assuming the server responds with a message indicating login success
        if (result && result.message === 'Login successful') {
            // Save username to localStorage
            localStorage.setItem("userName", name);
            // Redirect to ratings.html
            window.location.href = "ratings.html";
        } else {
            // Handle login failure
            alert("Login failed. Please check your username and password.");
        }
    })
    .catch(error => {
        // Handle any errors
        console.error('Error during login:', error);
        alert("An error occurred during login. Please try again later.");
    });
}