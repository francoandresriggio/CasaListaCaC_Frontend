function validarDatos() {
    let nombre1 = document.getElementById("nombre").value.trim();
    let apellido1 = document.getElementById("apellido").value.trim();
    let mail1 = document.getElementById("mail").value.trim();
    let zona1 = document.getElementById("zona").value.trim();
    let telefono1 = document.getElementById("telefono").value.trim();
    let genero1 = document.getElementById("genero").value.trim();
    let contrasenia1 = document.getElementById("contrasena").value.trim();
    let contraRepetida1 = document.getElementById("repetir_contrasena").value.trim();
    let campos = document.getElementById("campos");

    if (!/^[a-zA-Z\s]+$/.test(nombre1)) {
        campos.textContent = "❌ Ingrese un nombre valido. "
        campos.style.color = "red"
        return false
    }
    if (!/^[a-zA-Z\s]+$/.test(apellido1)) {
        campos.textContent = "❌ Ingrese un apellido valido. "
        campos.style.color = "red"
        return false
    }
    if(!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(mail1)){
        campos.textContent = "❌ Ingrese un correo valido. "
        campos.style.color = "red"
        return false
    }

    if (zona1 === ""){
        campos.textContent = "❌ Debe elegir una opción válida para el género. "
        campos.style.color = "red"
        return false
    }

    if (telefono1.length !== 10 || !/^\d+$/.test(telefono1)) {
        campos.textContent = "❌ El telefono debe tener solamente números y 10 caracteres. "
        campos.style.color = "red"
        return false
    }

    if (genero1 === ""){
        campos.textContent = "❌ Debe elegir una opción válida para el género. "
        campos.style.color = "red"
        return false
    }

    if (contrasenia1 !== contraRepetida1) {
        campos.textContent = "❌ Las contraseñas deben de ser iguales "
        campos.style.color = "red"
        return false
    }

    return true;
}

document.getElementById("altaUsuario").addEventListener('submit', function (event) {

    event.preventDefault()
    if (validarDatos()) {
        let url = "https://francoriggio.pythonanywhere.com/correoExistente?mail=" + document.getElementById("mail").value
    
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.existe){
                alert("Lo siento, ya existe un usuario con el mail especificado")
            }
            else{
                let usuarioNuevo = {
                    nombre: document.getElementById("nombre").value,
                    apellido: document.getElementById("apellido").value,
                    mail: document.getElementById("mail").value,
                    zona: document.getElementById("zona").value,
                    telefono: document.getElementById("telefono").value,
                    genero: document.getElementById("genero").value,
                    imagen: document.getElementById("imagen").value,
                    contrasena: document.getElementById("contrasena").value
                }
                
                let url = "https://francoriggio.pythonanywhere.com/altaUsuario"
    
                let options = {
                    body: JSON.stringify(usuarioNuevo),
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow'
                }
    
                fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem("usuarioLogueado", data.id)
                    window.location.replace("../index.html")
                }
    
                )
                .catch(err => {
                    alert("Error al grabar" )
                    console.error(err);
                })
            }
        })
    }
})