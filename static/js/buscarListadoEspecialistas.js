//Solicita a la API el listado con todos los especialistas y lo guarda
const solicitarEspecialistas = function() {
    if(localStorage.getItem("usuarioLogueado") !== null){
        fetch("https://francoriggio.pythonanywhere.com/solicitarEspecialistas/" + localStorage.getItem("usuarioLogueado"))
        .then(response => response.json())
        .then(data => {
        sessionStorage.setItem("listadoEspecialistas", JSON.stringify(data))
        sessionStorage.setItem("FiltradoEspecialistaBuscado", JSON.stringify(data))
    })
    .catch(error => console.error(error))
    }
}

solicitarEspecialistas()