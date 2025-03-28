//Al seleccionar una especialidad, se valida que el usuario haya iniciado sesión. Si no lo hizo, le pide que se loguee
const validarLogin = function (especialidad) {
  if (localStorage.getItem("usuarioLogueado") !== null) {
    let listaEspecialistasABuscar = JSON.parse(sessionStorage.getItem("listadoEspecialistas"))
    if(listaEspecialistasABuscar.filter(especialista => especialista.profesion === especialidad).length > 0)
    {
      listaEspecialistasABuscar = listaEspecialistasABuscar.filter(especialista => especialista.profesion === especialidad)
      sessionStorage.setItem("FiltradoEspecialistaBuscado", JSON.stringify(listaEspecialistasABuscar))
      window.location.replace("templates/servicios.html")
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
}