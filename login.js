function login() {
    const name = document.querySelector("#name");
    const password = document.querySelector("#password");
    localStorage.setItem("userName", name.value);
    localStorage.setItem("password", password.value);
    window.location.href = "ratings.html";
}