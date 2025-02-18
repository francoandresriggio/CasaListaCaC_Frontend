document.getElementById("TerminosYCondiciones").addEventListener('click', function(){
    Swal.fire({
        title: "Términos y condiciones",
        text: "Casa Lista nunca compartirá sus datos personales, más allá de su nombre, apellido, zona en donde vive y número de teléfono",
        icon: "info",
        background: "#E9F5DB",
        confirmButtonText: "Confirmar"
    });
})

document.getElementById("FAQ").addEventListener('click', function(){
    const FAQ = "¿Qué es Casa Lista?\nEs una app que te ayudará a encontrar más fácil al profesional que necesitas para tu hogar?\n\n¿Cómo encuentro al especialista que necesito?\nRegistrate y elige lo que necesitas para tu hogar\n\n¿Cómo contacto al profesional y le pago?\nLa coordinación se realiza en forma personal mediante su contacto telefónico"
    Swal.fire({
        title: "Preguntas frecuentes",
        icon: "info",
        background: "#E9F5DB",
        html: '<pre>' + FAQ + '</pre>',
        customClass: {
            popup: 'tamano-popup'
        },
        width: 970,
        confirmButtonText: "Confirmar"
    });
})

document.getElementById("QuienesSomos").addEventListener('click', function(){
    const equipo = "Desarrolladores:\n- Eduardo Ojeda\n- Mauro Gabriel Pazos\n- Franco Andres Riggio\n- Silvia Gomez"
    Swal.fire({
        title: "¿Quiénes somos?",
        icon: "info",
        background: "#E9F5DB",
        html: '<pre>' + equipo + '</pre>',
        confirmButtonText: "Confirmar"
    });
})