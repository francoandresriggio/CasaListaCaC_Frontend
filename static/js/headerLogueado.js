let headerContent

if (localStorage.getItem("usuarioLogueado") === null) {
    headerContent = `
        <header>
        <a href="../index.html">
            <div class="logo-completo">
                <img class="encabezado-en-linea logo-imagen" src="../static/img/header/logo/logo.png" alt="logo">
                <img class="encabezado-en-linea logo-letras" src="../static/img/header/logo/letras.png" alt="casalista">
            </div>
        </a>
        <form class="buscador" id="buscadorEspecialidad">
            <input type="text" name="especialidad" id="especialidad" placeholder="Especialidad...">
            <input class="buscador-boton" type="submit" value="🔍">
        </form>
        <div class="menu" id="login">
            <img class="encabezado-en-linea icono" src="../static/img/header/key.png" alt="llave">
            <a href="../templates/login.html"><p class="encabezado-en-linea">Ingresar</p></a>
            <p class="encabezado-en-linea">/</p>
            <a href="../templates/registro.html"><p class="encabezado-en-linea">Registrarme</p></a>
        </div>
        </header>
        `

        document.body.insertAdjacentHTML('afterbegin', headerContent)

        document.getElementById("buscadorEspecialidad").addEventListener('submit', function (event) {
            event.preventDefault()
        
            if (localStorage.getItem("usuarioLogueado") !== null) {
                if (document.getElementById("especialidad").value === "") {
                    sessionStorage.setItem("FiltradoEspecialistaBuscado", JSON.stringify(JSON.parse(sessionStorage.getItem("listadoEspecialistas"))))
                }
                else {
                    let listaEspecialistasFiltrada = JSON.parse(sessionStorage.getItem("listadoEspecialistas"))
                    listaEspecialistasFiltrada = listaEspecialistasFiltrada.filter(especialista => especialista.profesion.toLowerCase() === document.getElementById("especialidad").value.toLowerCase())
                    sessionStorage.setItem("FiltradoEspecialistaBuscado", JSON.stringify(listaEspecialistasFiltrada))
                }
        
                if (JSON.parse(sessionStorage.getItem("FiltradoEspecialistaBuscado")).length > 0) {
                    window.location.replace("templates/servicios.html")
                }
                else {
                    sessionStorage.setItem("FiltradoEspecialistaBuscado", JSON.stringify(JSON.parse(sessionStorage.getItem("listadoEspecialistas"))))

                }
            }
            else {
                Swal.fire({
                    title: "Usuario sin loguearse",
                    text: "Lo siento, pero debe estar logueado para usar la funcionalidad de búsqueda de especialista",
                    icon: "warning",
                    background: "#E9F5DB",
                    confirmButtonColor: "#356194",
                    confirmButtonText: "Aceptar"
                });
            }
        })
}
else {

    let url = "https://francoriggio.pythonanywhere.com/consultaUsuario/" + localStorage.getItem("usuarioLogueado")
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.profesion === null){
            headerContent = `
                <header>
                <a href="../index.html">
                    <div class="logo-completo">
                        <img class="encabezado-en-linea logo-imagen" src="../static/img/header/logo/logo.png" alt="logo">
                        <img class="encabezado-en-linea logo-letras" src="../static/img/header/logo/letras.png" alt="casalista">
                    </div>
                </a>
                <form class="buscador" id="buscadorEspecialidad">
                    <input type="text" name="especialidad" id="especialidad" placeholder="Especialidad...">
                    <input class="buscador-boton" type="submit" value="🔍">
                </form>
                <div class="menu-logueado" id="login">
                    <p class="encabezado-en-linea">Bienvenido</p>
                    <div class="menu-dropdown" id="login-opciones">
                        <a href="../templates/perfil.html">Perfil</a>
                        <a href="../templates/historial.html">Historial</a>
                        <a href="../index.html" id="cerrar_sesion" onclick="cerrarSesion()">Cerrar Sesión</a>
                    </div>
                </div>
                </header>
        `
        }
        else{
            headerContent = `
                <header>
                <a href="../index.html">
                    <div class="logo-completo">
                        <img class="encabezado-en-linea logo-imagen" src="../static/img/header/logo/logo.png" alt="logo">
                        <img class="encabezado-en-linea logo-letras" src="../static/img/header/logo/letras.png" alt="casalista">
                    </div>
                </a>
                <form class="buscador" id="buscadorEspecialidad">
                    <input type="text" name="especialidad" id="especialidad" placeholder="Especialidad...">
                    <input class="buscador-boton" type="submit" value="🔍">
                </form>
                <div class="menu-logueado" id="login">
                    <p class="encabezado-en-linea">Bienvenido</p>
                    <div class="menu-dropdown" id="login-opciones">
                        <a href="../templates/perfil.html">Perfil</a>
                        <a href="../templates/historial.html">Historial</a>
                        <a href="../templates/pedidos.html">Pedidos</a>
                        <a href="../index.html" id="cerrar_sesion" onclick="cerrarSesion()">Cerrar Sesión</a>
                    </div>
                </div>
                </header>
        `
        }
        document.body.insertAdjacentHTML('afterbegin', headerContent)

        document.getElementById("buscadorEspecialidad").addEventListener('submit', function (event) {
            event.preventDefault()
        
            if (localStorage.getItem("usuarioLogueado") !== null) {
                if (document.getElementById("especialidad").value === "") {
                    sessionStorage.setItem("FiltradoEspecialistaBuscado", JSON.stringify(JSON.parse(sessionStorage.getItem("listadoEspecialistas"))))
                }
                else {
                    let listaEspecialistasFiltrada = JSON.parse(sessionStorage.getItem("listadoEspecialistas"))
                    listaEspecialistasFiltrada = listaEspecialistasFiltrada.filter(especialista => especialista.profesion.toLowerCase() === document.getElementById("especialidad").value.toLowerCase())
                    sessionStorage.setItem("FiltradoEspecialistaBuscado", JSON.stringify(listaEspecialistasFiltrada))
                }
        
                if (JSON.parse(sessionStorage.getItem("FiltradoEspecialistaBuscado")).length > 0) {
                    window.location.replace("../templates/servicios.html")
                }
                else {
                    sessionStorage.setItem("FiltradoEspecialistaBuscado", JSON.stringify(JSON.parse(sessionStorage.getItem("listadoEspecialistas"))))
        
                    Swal.fire({
                        title: "Sin disponibilidad",
                        text: "Lo siento, pero no se encontraron especialistas con las especificaciones realizadas",
                        icon: "warning",
                        background: "#E9F5DB",
                        confirmButtonColor: "#356194",
                        confirmButtonText: "Aceptar"
                    });
                }
            }
            else {
                Swal.fire({
                    title: "Usuario sin loguearse",
                    text: "Lo siento, pero debe estar logueado para usar la funcionalidad de búsqueda de especialista",
                    icon: "warning",
                    background: "#E9F5DB",
                    confirmButtonColor: "#356194",
                    confirmButtonText: "Aceptar"
                });
            }
        })
    }

    )
    .catch(err => {
        console.error(err);
    })
}

const cerrarSesion = () => {
    localStorage.removeItem("usuarioLogueado")
    window.location.replace("../index.html")
}
