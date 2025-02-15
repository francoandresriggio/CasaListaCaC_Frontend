const login = document.getElementById("login")

//Si el usuario no inició sesión antes, lo manda de vuelta al main para que lo haga
const validarLogin = function () {
    if (localStorage.getItem("usuarioLogueado") === null) {
        window.location.replace("../index.html")
    }
}

validarLogin()