let first = localStorage.getItem('first');
let updated = localStorage.getItem('version');
if(updated!='1.3.3'){
    localStorage.clear();
    first = false;
    
}
if (!first){
    localStorage.clear();
    //COINS
    localStorage.setItem('coins', 0);
    localStorage.setItem('gems', 0);
    //KIT INICIAL
    document.addEventListener('DOMContentLoaded', function(){
        let pers = {
            casco:'casco_nada',
            pechera:'pechera_nada',
            pantalon:'pantalon_nada',
            botas:'botas_nada',
            espada:'espada_nada'
        };
        let setss = ['casco', 'pechera', 'pantalon', 'botas', 'espada'];
        for (let set of setss) {
            Unlock(set+ '_nada');
        }
        localStorage.setItem('pers', JSON.stringify(pers));
        localStorage.setItem('first', true);
        localStorage.setItem('version', '1.3.3');
    });
    //DIFICULTAD
    localStorage.setItem('diff', 'normal');
    //STATS
    localStorage.setItem('PartidaGanada', 0);
    localStorage.setItem('PartidaPerdida', 0);
    localStorage.setItem('PartidaTotal', 0);
    localStorage.setItem('DañoInfligido', 0);
    localStorage.setItem('DañoRecibido', 0);   
    //CHESTS
    localStorage.setItem('ch', 0);
    localStorage.setItem('dch', 0);
    localStorage.setItem('ech', 0);
    localStorage.setItem('v', 0);
    localStorage.setItem('ov', 0);
    localStorage.setItem('s', 0);
    //MUSICA
    localStorage.setItem('playMusic', true);

}