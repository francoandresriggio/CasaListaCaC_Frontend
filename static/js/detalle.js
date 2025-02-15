const mostrarDetalleEspecialista = function () {

    let detalleEspecialista = JSON.parse(sessionStorage.getItem("FiltradoEspecialistaBuscado")).find(especialista => especialista.id === parseInt(sessionStorage.getItem("especialistaDetalle")))

    fetch("https://francoriggio.pythonanywhere.com/solicitarEspecialistaComentarios/" + sessionStorage.getItem("especialistaDetalle"))
        .then(response => response.json())
        .then(comentarios => {
            const seccionEspecialista = document.getElementById("detalleEspecialista")
            const especialistaContenido = document.createElement("div")

            valoracionEspecialista = ""

            if(detalleEspecialista.valoracion > 0){
                valoracionEspecialista = `${Math.floor(detalleEspecialista.valoracion)}/5 ⭐`
            }
            else{
                valoracionEspecialista = `Sin evaluar`
            }

            opiniones = ""

            if(comentarios.length > 0){
                opiniones = `
                    <h4>Opiniones sobre el profesional</h4>
                `
                comentarios.forEach(comentario => {
                    opiniones += `
                        <div class="opiniones">
                            <h5 class="comentarista">${comentario.nombre_comentario}</h5>
                            <p class="comentario">${comentario.comentario}</p>
                        </div>
                    `
                })
            }

            especialistaContenido.innerHTML = `
            <div class="fila1">
                    <div class="imagen"><img class="foto" src="${detalleEspecialista.foto_perfil}" alt="imagen"></div>
                    <div class="medio">           
                <h3>

                    ${detalleEspecialista.profesion} 
                    ${detalleEspecialista.apellido} ${detalleEspecialista.nombre}
                            </h3>
                                </div>
                                <div class="derecha">
                            <p>
                    Teléfono: ${detalleEspecialista.telefono}
                    Zona: ${detalleEspecialista.zona}
                    Valoración: ${valoracionEspecialista}</p>
                    </div>
                </div>
                <div class="fila2">
                    
                    <h4>Descripción:</h4>
                    <p>
                        ${detalleEspecialista.descripcion}
                    </p>
                    
                </div>
                <div class="fila3"><button class="boton" onclick="confirmarPedido(${detalleEspecialista.id})">Confirmar</button>
                </div>
                <div class="fila4">
                    ${opiniones}
                </div>
            `

            seccionEspecialista.appendChild(especialistaContenido)
        })
}

const confirmarPedido = idEspecialista => {

    let url = "https://francoriggio.pythonanywhere.com/altaPedido"

    let datosPedido = {
        clienteId: parseInt(localStorage.getItem("usuarioLogueado")),
        profesionalId: idEspecialista
    }

    let options = {
        body: JSON.stringify(datosPedido),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }

    fetch(url, options)
                .then(function(){
                    alert("Pedido confirmado")
                    window.location.replace("servicios.html")
                })
                .catch(err => {
                    alert("Error al grabar" )
                    console.error(err);
                })
}

mostrarDetalleEspecialista()