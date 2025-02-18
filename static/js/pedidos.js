const identificadorUsuarioActual = parseInt(localStorage.getItem("usuarioLogueado"))

let listadoPedidos = []

const mostrarPedidos = function (listadoPedidosUsuario) {
    const pedidos = document.getElementById("pedidos")
    const pedidosPendientes = []

    //Verifica si hay que limpiar el listado de pedidos que muestra actualmente
    const limpiarListado = document.querySelectorAll("div.pedido")
    if (limpiarListado.length > 0) {
        limpiarListado.forEach(pedido => pedido.remove())
    }

    listadoPedidosUsuario.forEach(pedidoPendiente => {
        const pedido = document.createElement("div")
        pedido.className = "pedido"
        pedido.innerHTML = `
                <h4 class="Cli">Cliente</h4> 
                <img class="foto" src="${pedidoPendiente.foto_perfil}" alt="">
                <div class="nombre">
<p>${pedidoPendiente.nombre}</p>     
<p>${pedidoPendiente.apellido}</p>     
<p id="telefonoCliente">${pedidoPendiente.telefono}</p>
                </div>
<button class="boton" onclick="pedidoRealizado(${pedidoPendiente.id})">Aceptar</button>              
        `
        pedidosPendientes.push(pedido)
    })

    pedidos.append(...pedidosPendientes)
}

const cargarPedidos = function () {

    fetch("https://francoriggio.pythonanywhere.com/solicitarPedidos/" + localStorage.getItem("usuarioLogueado"))
        .then(response => response.json())
        .then(data => {
        if(data.length === 0){
            Swal.fire({
                title: "Sin pedidos",
                confirmButtonText: "Aceptar",
                text: "No hay pedidos pendientes",
                background: "#E9F5DB",
                icon: "info"
            });
        }
        else{
            mostrarPedidos(data)
        }
    })
    .catch(error => console.error(error))
}

const pedidoRealizado = function (idPedido) {

    let url = "https://francoriggio.pythonanywhere.com/pedidoRealizado/" + idPedido
    let options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    }
    fetch(url, options)
        .then(function(){
            window.location.reload()
        })
        .catch(err => {
            console.error(err);
            alert("Error al Modificar")
        })
}

cargarPedidos()