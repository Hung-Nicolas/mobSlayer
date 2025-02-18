let first = localStorage.getItem('first');
let updated = localStorage.getItem('version');
if(updated!='1.4'){
    localStorage.clear();
    first = false;
}
if (!first){
    localStorage.clear();
    //ITEMS
    localStorage.setItem('coins', 0);
    localStorage.setItem('gems', 0);
    localStorage.setItem('pillagerMap', 0);
    localStorage.setItem('marinoMap', 0);
    localStorage.setItem('trialchamberMap', 0);
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
        localStorage.setItem('version', '1.4');
    });
    let arrayItems = ['coins', 'gems', 'ch', 'dch', 'gch', 'ech', 'v', 'ov', 's', 'pillagerMap', 'marinoMap', 'trialchamberMap'];
    for(let item of arrayItems){
        localStorage.setItem('items_'+item, "true");
    }
    //PROGRESO
    localStorage.setItem('progress', 'start');
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
    localStorage.setItem('gch', 0);
    localStorage.setItem('ech', 0);
    localStorage.setItem('v', 0);
    localStorage.setItem('ov', 0);
    localStorage.setItem('s', 0);
    //MUSICA
    localStorage.setItem('playMusic', true);
    //NIVELES//TUTORIAL
    localStorage.setItem('playedLevel', 'false');
    //KEYS
    localStorage.setItem('key_Atq', '1');
    localStorage.setItem('key_Def', '2');
    localStorage.setItem('key_Sup', '3');
    localStorage.setItem('key_Esp1', '4');
    localStorage.setItem('key_Esp2', '5');
    localStorage.setItem('key_Skip', 's');
    //PROBANDO
    localStorage.setItem('Probando', 'false');
    localStorage.setItem('ProbandoArma', 'false');
    //DROPS
    localStorage.setItem('dropped', JSON.stringify([]));
    //RAID
    localStorage.setItem('canRaid', 'false');
    localStorage.setItem('raiding', 'false');

}