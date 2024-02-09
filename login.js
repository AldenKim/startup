function login() {
    const name = document.querySelector("#name");
    localStorage.setItem("userName", name.value);
    window.location.href = "ratings.html";
}