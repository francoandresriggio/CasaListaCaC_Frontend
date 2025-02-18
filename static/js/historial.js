const mostrarHistorialEspecialistas = function (listadoEspecialistas) {
    const especialistas = document.getElementById("historialEspecialistas")
    const especialistaHistorial = []

    listadoEspecialistas.forEach(especialista => {
        const nuevoEspecialista = document.createElement("div")
        nuevoEspecialista.className = "en-linea"
        nuevoEspecialista.innerHTML =
            `
            <div>
                <img class="foto" src="${especialista.foto_perfil}" alt="imagen">
            </div>
            <div class="derecha">
                <h3>${especialista.profesion}: 
${especialista.apellido} ${especialista.nombre}</h3>
                <p><strong>Fecha de realización: ${especialista.fecha_trabajo}</strong></p>
            <p>Dejar comentario 
            
           <span class="boton" onclick="enviarDetalleHistorial(${especialista.id_pedido})"> Click </span>
                </p>
            </div>
        `
        especialistaHistorial.push(nuevoEspecialista)
    })

    especialistas.append(...especialistaHistorial)
}

const enviarDetalleHistorial = function (idPedido) {
    sessionStorage.setItem("historialEspecialistaDetalle", idPedido)
    window.location.replace("../templates/trabajador.html")
}

const obtenerHistorial = function(){
    fetch("https://francoriggio.pythonanywhere.com/solicitarHistorial/" + localStorage.getItem("usuarioLogueado"))
    .then(response => response.json())
    .then(data => {
        if(data.length == 0){
            Swal.fire({
                title: "Sin pedidos sin evaluar",
                text: "No hay pedidos sin evaluar",
                icon: "info",
                background: "#E9F5DB",
                confirmButtonText: "Confirmar"
            });
        }
        else{
            mostrarHistorialEspecialistas(data)
        }
    })
    .catch(error => console.error(error))
}

obtenerHistorial()