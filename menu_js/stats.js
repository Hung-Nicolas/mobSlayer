function actStats(){
    vida_arm = casco[pers.casco].extrahp + pechera[pers.pechera].extrahp + pantalon[pers.pantalon].extrahp + botas[pers.botas].extrahp;
    if (isNaN(vida_arm)) {
        vida_arm = 0;
    }
    vida_total = 1000 + vida_arm;
    vida.textContent = `Vida: ${vida_total}(1000 + ${vida_arm})`;
    daño_max=espada[pers.espada].dañomax;
    daño.textContent = `Daño maximo: ${daño_max}`;
}
function cargarEquip() {
    cargarArmadura('casco');
    cargarArmadura('pechera');
    cargarArmadura('pantalon');
    cargarArmadura('botas');
    cargarArmadura('espada');
}
function cargarArmadura(tipo_arm) {
    // Obtener el valor guardado en localStorage
    let valor = pers[tipo_arm];
    // Seleccionar el botón correspondiente y aplicar el estilo
    let boton = document.getElementById(tipo_arm);
    if (valor.endsWith('nada')) {
        boton.style.backgroundColor = '#fff';
        boton.style.backgroundImage = '';
    } else {
        boton.style.backgroundImage = `url(${eval(tipo_arm)[valor].src})`;
    }
}
function cargarStats_T(){
    const keys = ['PartidaGanada', 'PartidaPerdida', 'PartidaTotal', 'DañoInfligido', 'DañoRecibido'];
    const ids = ['PG', 'PP', 'PT', 'DI', 'DR'];
    const labels = ['Partidas ganadas', 'Partidas perdidas', 'Partidas totales', 'Daño infligido', 'Daño recibido'];

    keys.forEach((key, index) => {
        const value = localStorage.getItem(key);
        const element = document.getElementById(ids[index]);
        if (element) {
            element.textContent = `${labels[index]}: ${value}`;
        }
    });
}
