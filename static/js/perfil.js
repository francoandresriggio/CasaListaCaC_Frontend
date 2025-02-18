const mailUsuario = document.getElementById("mail")
const nombreUsuario = document.getElementById("nombre")
const apellidoUsuario = document.getElementById("apellido")
const fotoUsuario = document.getElementById("fotoPerfil")
const imagenNuevaUsuario = document.getElementById("imagenNueva")
const telefonoUsuario = document.getElementById("telefono")
const zonaUsuario = document.getElementById("zona")
const generoUsuario = document.getElementById("genero")
const contrasenaUsuario = document.getElementById("contrasenaNueva")
const repetirContrasenaUsuario = document.getElementById("repetir_contrasena_nueva")
const usuarioEspecialidad = document.getElementById("especialidadPerfil")
const descripcionEspecialidad = document.getElementById("descripcion")

const validarEspecialidad = function(especialidad, usuarioEspecialidad, descripcionEspecialidad){
    if(!especialidad || especialidad && usuarioEspecialidad !== "" && descripcionEspecialidad !== ""){
        return true
    }
    else{
        return false
    }
}

function validarDatos(){
    let mailUsuarioValidar = document.getElementById("mail").value.trim();
    let nombreUsuarioValidar = document.getElementById("nombre").value.trim();
    let apellidoUsuarioValidar = document.getElementById("apellido").value.trim();
    let telefonoUSuarioValidar = document.getElementById("telefono").value.trim();
    let contrasenaUsuarioValidar = document.getElementById("contrasenaNueva").value.trim();
    let contraRepetidaUsuarioValidar = document.getElementById("repetir_contrasena_nueva").value.trim();
    let campos = document.getElementById("campos");

    if (!/^[a-zA-Z\s]+$/.test(nombreUsuarioValidar)) {
        campos.textContent = "❌ Ingrese un nombre valido. "
        campos.style.color = "red"
        return false
    }
    if (!/^[a-zA-Z\s]+$/.test(apellidoUsuarioValidar)) {
        campos.textContent = "❌ Ingrese un apellido valido. "
        campos.style.color = "red"
        return false
    }
    if(!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(mailUsuarioValidar)){
        campos.textContent = "❌ Ingrese un correo valido. "
        campos.style.color = "red"
        return false
    }
    if (telefonoUSuarioValidar.length !== 10 || !/^\d+$/.test(telefonoUSuarioValidar)) {
        campos.textContent = "❌ El telefono debe tener solamente números y 10 caracteres. "
        campos.style.color = "red"
        return false
    }
    if (contrasenaUsuarioValidar !== contraRepetidaUsuarioValidar) {
        campos.textContent = "❌ Las contraseñas deben de ser iguales "
        campos.style.color = "red"
        return false
    }
    return true;
}

const cargarPerfilUsuario = function(idUsuario, imagenNuevaUsuario, mailUsuario, nombreUsuario, apellidoUsuario, fotoUsuario, telefonoUsuario, generoUsuario, zonaUsuario, contrasenaUsuario, repetirContrasenaUsuario, usuarioEspecialidad, descripcionEspecialidad){
    let url = "https://francoriggio.pythonanywhere.com/consultaUsuario/" + idUsuario
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        imagenNuevaUsuario.value = data.imagen
        mailUsuario.value = data.mail
        nombreUsuario.value = data.nombre
        apellidoUsuario.value = data.apellido
        cargarFoto(data, fotoUsuario)
        generoUsuario.value = data.genero
        zonaUsuario.value = data.zona
        telefonoUsuario.value = data.telefono
        contrasenaUsuario.value = data.contrasena
        repetirContrasenaUsuario.value = data.contrasena
        if(data.profesion !== null){
            usuarioEspecialidad.value = data.profesion
            descripcionEspecialidad.value = data.descripcion_profesion
        }
        return data
    })
}

const cargarFoto = function(usuario, fotoUsuario){
    const foto = document.createElement("img")
    foto.className = "imagen"
    foto.setAttribute("src", usuario.imagen)
    foto.setAttribute("alt", "foto de perfil")
    fotoUsuario.appendChild(foto)
}

const seccionEspecialidad = function(especialidad){
    const seccionProfesion = document.getElementById("seccionProfesion")
    if(!especialidad){
        seccionProfesion.style.display = "none"
    }
    else{
        seccionProfesion.style.display = "block"
    }
}

const actualizarDatosUsuario = function(perfilUsuario){
    
    let datosUsuario = {
        mail: perfilUsuario.mail,
        nombre: perfilUsuario.nombre,
        apellido: perfilUsuario.apellido,
        zona: perfilUsuario.zona,
        genero: perfilUsuario.genero,
        telefono: perfilUsuario.telefono,
        imagen: perfilUsuario.imagen,
        contrasena: perfilUsuario.contrasena,
        profesion: perfilUsuario.profesion,
        descripcion: perfilUsuario.descripcion
    }

    console.log(datosUsuario)

    let url= "https://francoriggio.pythonanywhere.com/actualizarPerfil/" + perfilUsuario.id
    let options = {
        body: JSON.stringify(datosUsuario),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: "Datos actualizados",
                text: data.mensaje,
                confirmButtonText: "Aceptar",
                background: "#E9F5DB",
                icon: "success"
              }).then((result) =>{
                if(result.isConfirmed){
                    window.location.replace("../index.html")
                }
              });
        })
        .catch(err => {
            console.error(err);
            alert("Error al Modificar")
        })
}

document.getElementById("habilitarEspecialidad").addEventListener('click', function(event){

    event.preventDefault()

    especialidad = !especialidad
    seccionEspecialidad(especialidad)
})

document.getElementById("actualizarDatos").addEventListener('click', function(event){
    
    event.preventDefault()
    let campos = document.getElementById("campos")
    if (validarDatos()) {
        campos.textContent = ""
        if(validarEspecialidad(especialidad, usuarioEspecialidad.value, descripcionEspecialidad.value)){
            let url = "https://francoriggio.pythonanywhere.com/correoExistente?mail=" + mailUsuario.value
                fetch(url)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.existe && perfilUsuario.mail !== mailUsuario.value){
                        campos.textContent = "❌ El mail ingresado pertenece a otro usuario "
                        campos.style.color = "red"
                    }
                    else
                    {
                        perfilUsuario.mail = mailUsuario.value
                        perfilUsuario.nombre = nombreUsuario.value
                        perfilUsuario.apellido = apellidoUsuario.value
                        perfilUsuario.zona = zonaUsuario.value
                        perfilUsuario.genero = generoUsuario.value
                        perfilUsuario.telefono = telefonoUsuario.value
                        perfilUsuario.contrasena = contrasenaUsuario.value
                        perfilUsuario.imagen = imagenNuevaUsuario.value
                        if(especialidad) {
                            perfilUsuario.profesion = usuarioEspecialidad.value
                            perfilUsuario.descripcion = descripcionEspecialidad.value
                        }
                        else {
                            perfilUsuario.profesion = null
                            perfilUsuario.descripcion = null
                        }
                    
                        actualizarDatosUsuario(perfilUsuario)
                    }
                })
        }
        else{
            campos.textContent = "❌ No ha ingresado ninguna especialidad o una descripción sobre el trabajo que hace"
            campos.style.color = "red"
        }
    }
})

let especialidad = null
let perfilUsuario = null

cargarPerfilUsuario(localStorage.getItem("usuarioLogueado"), imagenNuevaUsuario, mailUsuario, nombreUsuario, apellidoUsuario, fotoUsuario, telefonoUsuario, generoUsuario, zonaUsuario, contrasenaUsuario, repetirContrasenaUsuario, usuarioEspecialidad, descripcionEspecialidad)
.then(perfilUsuarioCargado => {
    perfilUsuario = perfilUsuarioCargado
    if(perfilUsuarioCargado.profesion === null) {especialidad = false}
    else {especialidad = true}
    seccionEspecialidad(especialidad)
})