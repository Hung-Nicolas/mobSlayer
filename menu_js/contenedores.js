//MOSTRAR CONTENEDORES
//////////////////////////
let estados_contenedores = {};

function toggle_c(cont) {
    if (typeof estados_contenedores[cont] === 'undefined') {
        estados_contenedores[cont] = false; // Inicializar el estado si no existe
    }
    let contenedor = document.getElementById(`cont_${cont}`);
    estados_contenedores[cont] = !estados_contenedores[cont]; // Alternar el estado del contenedor

    if (estados_contenedores[cont]) {
        contenedor.style.display = 'block';
    } else {
        contenedor.style.display = 'none';
    }
}