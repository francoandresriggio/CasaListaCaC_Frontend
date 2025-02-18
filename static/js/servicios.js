const filtroEspecialistas = function (listaEspecialistas, filtroZona, filtroValoracion) {
    if (filtroZona !== "") {
        listaEspecialistas = listaEspecialistas.filter(especialista => especialista.zona.toLowerCase() === filtroZona.toLowerCase())
    }
    if (filtroValoracion >= 1) {
        listaEspecialistas = listaEspecialistas.filter(especialista => especialista.valoracion >= filtroValoracion)
    }
    return listaEspecialistas
}

document.getElementById("filtrarBusqueda").addEventListener('submit', function (event) {
    event.preventDefault()

    let zona = document.getElementById("zona").value
    let valoracion = parseFloat(document.getElementById("valoracion").value)
    let especialistasFiltrados = filtroEspecialistas(JSON.parse(sessionStorage.getItem("FiltradoEspecialistaBuscado")), zona, valoracion)
    if (especialistasFiltrados.length > 0) {
        mostrarEspecialistas(especialistasFiltrados)
    }
    else {
        Swal.fire({
            title: "Sin disponibilidad",
            text: "Lo siento, pero no se encontraron especialistas con las especificaciones realizadas",
            icon: "warning",
            background: "#E9F5DB",
            confirmButtonColor: "#356194",
            confirmButtonText: "Aceptar"
        });
    }
})

//Muestra los especialistas, de acuerdo con las especificaciones realizadas
const mostrarEspecialistas = function (listadoEspecialistas) {

    //Verifica si hay que limpiar el listado de especialistas que muestra actualmente
    const limpiarListado = document.querySelectorAll("div.especialista")
    if (limpiarListado.length > 0) {
        limpiarListado.forEach(especialista => especialista.remove())
    }

    const especialistas = document.getElementById("especialistas")
    const especialistaDisponible = []
    listadoEspecialistas.forEach(especialista => {
        const nuevoEspecialista = document.createElement("div")
        nuevoEspecialista.className = "especialista linea"
        nuevoEspecialista.id = `especialista ${especialista.id}`
        nuevoEspecialista.setAttribute("onclick", `enviarDetalleEspecialista(${especialista.id})`)
        nuevoEspecialista.innerHTML =
            `
            <div>
                <img class="foto" src="${especialista.foto_perfil}" alt="">
            </div>
            <div>
                <h4 class="nombreEspecialista">          
 ${especialista.profesion}

 ${especialista.apellido} ${especialista.nombre}
                </h4>
            </div>
            <div class="descripcion">
                <h4>Descripción:</h4>
                <p>
                    ${especialista.descripcion}
                </p>
                
            </div>
        `
        especialistaDisponible.push(nuevoEspecialista)
    })
    especialistas.append(...especialistaDisponible)
}

const enviarDetalleEspecialista = function (idEspecialista) {
    sessionStorage.setItem("especialistaDetalle", idEspecialista)
    window.location.replace("../templates/detalle.html")
}

mostrarEspecialistas(JSON.parse(sessionStorage.getItem("FiltradoEspecialistaBuscado")))