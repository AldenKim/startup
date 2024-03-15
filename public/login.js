/*function login() {
    const name = document.querySelector("#name");
    const password = document.querySelector("#password");
    localStorage.setItem("userName", name.value);
    localStorage.setItem("password", password.value);
    window.location.href = "ratings.html";
}

let loginButtonClicked = localStorage.getItem('loginButtonClicked') === 'true' ? true : false;

function login() {
    const name = document.querySelector("#name").value;
    const password = document.querySelector("#password").value;

    if (!name || !password) {
        alert("Please enter both username and password.");
        return;
    }

    const data = {
        username: name,
        password: password
    };

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result && result.message === 'Login successful') {
            localStorage.clear();
            localStorage.setItem("userName", name);
            window.location.href = "ratings.html";
            localStorage.setItem('loginButtonClicked', true);
        } else {
            alert("Login failed. Please check your username and password.");
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert("An error occurred during login. Please try again later.");
    });
}

function checkInputs() {
    const name = document.querySelector("#name").value;
    const password = document.querySelector("#password").value;

    if (!name || !password) {
        if(!localStorage.getItem('userName')) {
            alert("Please enter both username and password.");
            return false;
        }
    }

    if (!loginButtonClicked) {
        alert("Please login first.");
        return false;
    }

    fetch(`/api/user/${localStorage.getItem('userName')}`)
        .then(response => {
            if (response.status === 404) {
                fetchSuccess = false;
                alert("User not found. Please login again.");
                localStorage.clear();
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error checking server status:', error);
            alert("An error occurred. Please try again later.");
            fetchSuccess = false;
        });

    return fetchSuccess;
}*/

function rate() {
    window.location.href = 'ratings.html';
}

function logout() {
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}