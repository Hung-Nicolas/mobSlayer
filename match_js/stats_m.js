let PartidaGanada = parseInt(localStorage.getItem('PartidaGanada')) || 0;
let PartidaPerdida = parseInt(localStorage.getItem('PartidaPerdida')) || 0;
let PartidaTotal = parseInt(localStorage.getItem('PartidaTotal')) || 0;
let DañoInfligido = parseInt(localStorage.getItem('DañoInfligido')) || 0;
let DañoRecibido = parseInt(localStorage.getItem('DañoRecibido')) || 0;
let coins = parseInt(localStorage.getItem('coins')) || 0;
let gems = parseInt(localStorage.getItem('gems')) || 0;
function saveStats(){
    localStorage.setItem('PartidaGanada', PartidaGanada);
    localStorage.setItem('PartidaPerdida', PartidaPerdida);
    localStorage.setItem('PartidaTotal', PartidaTotal);
    localStorage.setItem('DañoInfligido', DañoInfligido);
    localStorage.setItem('DañoRecibido', DañoRecibido);
    localStorage.setItem('coins', coins);
    localStorage.setItem('gems', gems);
}