//ESPECIALES
//let loadpoint = 1;
//let shootpoint = 0;
const ataquesEspeciales = {
    "explosion":{
        name:'Explosion',
        starterPoints:7,
        usePoints:7
    },
    "absorcion":{
        name:'Absorcion',
        starterPoints:2,
        usePoints:5
    },
    "shoot":{
        name:'Disparar',
        starterPoints:1,
        usePoints:1
    },
    "fuego":{
        name:'Fuego',
        starterPoints:2,
        usePoints:2
    },
    "lealtad":{
        name:'Lealtad',
        starterPoints:2,
        usePoints:2
    },
    "stun":{
        name:'Stun',
        starterPoints:3,
        usePoints:4
    },
    "directShoot":{
        name:'Disparo',
        starterPoints:1,
        usePoints:1
    }
}
function esp_shoot(){
    if(persPoints['shootpoint']>=1&&freezed===false){
        freezed=true;
        freeze();
        fun_Ataque(shootpoint*3);
        persPoints['shootpoint']=-1;
        document.getElementById('shootP').textContent = `Power: ${shootpoint}`;
        setTimeout(() => {
            AtqEne();
            unfreeze();
        }, 500);
    }
}
//let explosionpoint = 5;
function esp_explosion(){
    if(persPoints['explosionpoint']>=7&&freezed===false){
        freezed=true;
        defendiendo_per=true;
        escudop+=1000;
        mostrarSuper('per', 'Bloqueando', 'green');
        freeze();
        fun_Ataque(5);
        persPoints['explosionpoint']-=7;
        document.getElementById('explosionP').textContent = `${persPoints['explosionpoint']}/7`;
        setTimeout(() => {
            AtqEne();
            unfreeze();
        }, 500);
    }
}
//let absorcionpoint = 2;
function esp_absorcion(){
    if(persPoints['absorcionpoint']>=5&&freezed===false){
        persPoints['absorcionpoint']-=5;
        freezed=true;
        freeze();
        fun_Ataque(2);
        persPoints['pers_vida']+=cant_dmg;
        mostrarSuper('per', `+${cant_dmg}`, 'lightgreen');
        ActVida();
        cant_dmg=0;
        setTimeout(() => {
            AtqEne();
            unfreeze();
        }, 500);
    }
}
function esp_fuego(){
    if(persPoints['fuegopoint']>=2&&freezed===false){
        persPoints['fuegopoint']-=2;
        freezed=true;
        freeze();
        new_quitar = [100, 50, 50, 50, 50];
        let maxLength = Math.max(quitar.length, new_quitar.length);

        quitar = Array.from({ length: maxLength }, (_, i) => 
            (quitar[i] || 0) + (new_quitar[i] || 0)
        );
        fun_Ataque(1);
        setTimeout(() => {
            AtqEne();
            unfreeze();
        }, 500);
    }
}
function esp_lealtad(){
    if(persPoints['lealtadpoint']>=2&&freezed===false){
        persPoints['lealtadpoint']-=2;
        freezed = true;
        freeze();
        fun_Ataque(0.5);
        new_quitar = [ , 400];
        let maxLength = Math.max(quitar.length, new_quitar.length);
        quitar = Array.from({ length: maxLength }, (_, i) => 
            (quitar[i] || 0) + (new_quitar[i] || 0)
        );
        setTimeout(() => {
            AtqEne();
            unfreeze();
        }, 500);
    }
}
function esp_stun(){
    if(persPoints['stunpoint']>=4&&freezed===false){
        persPoints['stunpoint']-=4;
        freezed = true;
        enemyStuned=true;
        freeze();
        fun_Ataque(3);
        setTimeout(() => {
            AtqEne();
            unfreeze();
        }, 500);
    }
}
function esp_directShoot(){
    if(persPoints['directShootpoint']>=1&&freezed===false){
        fun_Ataque(persPoints['directShootpoint']*3);
        persPoints['directShootpoint']=-1;
        document.getElementById('directShootP').textContent = `Power: ${persPoints['directShootpoint']}`;
        blockButton('Esp1');
    }
}
