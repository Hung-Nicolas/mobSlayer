function op(){
    localStorage.setItem('coins', 9999999999);
}
function unlockAll(){
    for(let set of sets){
        Unlock(set, 'nada');
        Unlock(set, 'cuero');
        Unlock(set, 'malla');
        Unlock(set, 'oro');
        Unlock(set, 'hierro');
        Unlock(set, 'diamante');
        Unlock(set, 'netherite');
        if(set ==='espada'){
            Unlock(set, 'madera');
            Unlock(set, 'piedra');
        }
    }
}
function opEne() {
    let enemigo = {
        entity:'zombi',
        casco: 'netherite',
        pechera: 'netherite',
        pantalon: 'netherite',
        botas: 'netherite',
        espada: 'netherite'
    };
    localStorage.setItem('enemy', JSON.stringify(enemigo));
    
}
