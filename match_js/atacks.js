//ATAQUES
//////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function(){
    ActVida();
});
function ActVida() {
    // Cálculo de la nueva anchura para las barras de vida
    let nuevaAnchura = Math.max(0, Math.min((pers_vida / vida_total) * 450, 450));
    let nuevaAnchura2 = Math.max(0, Math.min((enem_vida / vida_total_enem) * 450, 450));
    
    // Actualización de las barras de vida
    let barra = document.getElementById('per_cant');
    let barra_e = document.getElementById('ene_cant');
    let barra_t = document.getElementById('per_vi');
    let barra_e_t = document.getElementById('ene_vi');
    
    barra.style.width = nuevaAnchura + 'px';
    barra_e.style.width = nuevaAnchura2 + 'px';
    barra_t.textContent = `Vida: ${pers_vida}/${vida_total}`;
    barra_e_t.textContent = `Vida: ${enem_vida}/${vida_total_enem}`;
    

    // Actualización de los textos de defensa y superioridad
    document.getElementById('DefP').textContent = `${def}/2`;
    document.getElementById('SupP').textContent = `${sup}/3`;
    let shoot = document.getElementById('shootP');
    if(shoot){
        shoot.textContent = `Power: ${shootpoint}`;
    }
    let explo = document.getElementById('explocionP');
    if(explo){
        explo.textContent = `${explocionpoint}/10`;
    }
    
}
// Define la función manejadora del evento
function handleKeydown(event) {
    if (event.key === '1') {
        Atq();
    } else if (event.key === '2') {
        Def();
    } else if (event.key === '3') {
        Sup();
    } else if (event.key === 's') {
        skipEne();
    }
}

// Agrega el evento
document.addEventListener('keydown', handleKeydown);
function stopListening() {
    document.removeEventListener('keydown', handleKeydown);
}

let ene_sup=4;//PUNTOS DE SUPER DEL ENEMIGO (INICIALES) 

function AtqEne(){//ATAQUE DEL ENEMIGO( elige normal o super)
    if(enem_vida>0){
        if(ene_sup>=3){
            let rnd_n=rnd(1,3);
            if(rnd_n==1){
                AttackPer(1);
            }
            else{
                AttackPer(3);
                ene_sup-=3;
            }
        }
        else{
            AttackPer(1);
        }
    }
}
function AttackPer(multi){//DAÑAR AL PERSONAJE
    ocultarDaño();
    
    cant_dmg=Math.floor(Daño_total_enem*0.8*multi+Math.floor(Math.random()*Daño_total_enem*0.1));
    if(multi==3 && defendiendo_per==false){
        mostrarSuper('ene');
    }
    if(defendiendo_per){
        defendiendo_per=false;
        if(cant_dmg>=0 && cant_dmg<1000){
            mostrarDañoBloqueado(cant_dmg);
        }
        else if(cant_dmg>1000){
            mostrarDañoBloqueado(1000);
            cant_dmg-=1000;
            pers_vida-=cant_dmg;
            mostrarDaño('per', cant_dmg);
            audioPer();
            DañoRecibido+=cant_dmg;
        }
        var audio = new Audio('SFX/minecraft-block.mp3');
        audio.play();
    }
    else{
        pers_vida -= cant_dmg; 
        mostrarDaño('per', cant_dmg);
        audioPer();
        DañoRecibido+=cant_dmg;
    }
    
    checkVida();
    saveStats();
    
    atq++;
    sup++;
    def++;
    esp_loadp++;
    explocionpoint++;
    freezed=false;
    ActVida(); 
    checkButton();
}
//VARIABLES PARA MOSTRAR DAÑOS Y BLOCKS
let cant_dmg=0;
let dmg_per = document.getElementById('dmg_per');
let esq_per = document.getElementById('esq_per');
let dmg_ene = document.getElementById('dmg_ene');
let esq_ene = document.getElementById('esq_ene');
let Daño_total;
let Daño_total_enem;
document.addEventListener('DOMContentLoaded', function(){
    Daño_total = espada[pers.espada].dañomax;
    Daño_total_enem = espada[enemigo.espada].dañomax;
});
let atq = 1;
let freezed = false;
function Atq(){//ATAQUE 1
    if(atq>=1&&freezed===false){
        atq--;
        freezed=true;
        freeze();
        fun_Ataque(1);
        setTimeout(() => {
            AtqEne();
            unfreeze();
        }, 500);
    }
    
}
function fun_Ataque(multi) {//ATAQUE AL ENEMIGO
    cant_dmg=Daño_total*0.9*multi+Math.floor(Math.random()*Daño_total*0.1);
    enem_vida -= cant_dmg; 
    ActVida();
    checkVida();
    ocultarDaño();
    saveStats();
    mostrarDaño('ene', cant_dmg);
    audioEne();
    DañoInfligido+=cant_dmg;
    ene_sup++;
}
let sup=3; //PUNTOS SUPER INICIAL DEL PERSONAJE
function checkButton(){//FUNCION PARA VERIFICAR SI EL BOTON SE PUEDE DESBLOQUEAR O NO
    if(sup>=3){
        unblockButton('Sup');
    }
    if(def>=2){
        unblockButton('Def');
    }
    if(esp_loadp>=1){
        unblockButton('Esp1');
    }
    if(shootpoint>=1){
        unblockButton('Esp2');
    }
    if(explocionpoint>=10){
        unblockButton('Esp1');
    }
}

function Sup(){//ATAQUE SUPER
    if(sup >= 3&&freezed===false){
        sup -= 3;
        freezed=true;
        freeze();
        blockButton('Sup');
        fun_Ataque(3);
        mostrarSuper('per');
        setTimeout(() => {
            AtqEne();
            unfreeze();
        }, 500);
    }   
}
let def=2;//PUNTOS DE DEFENZA INICIAL DEL PERSONAJE
let defendiendo_per=false;//ESTADO DE DEFENZA
function Def(){//DEFENDER
    if(def>=2&&freezed===false){
        defendiendo_per=true;
        blockButton('Def');
        mostrarDefensa('per');
        def-=2;
    }
}
//BLOQUEAR Y DESBLOQUEAR BOTONES
function blockButton(buttonId) {
    let boton = document.getElementById(`${buttonId}Att`);
    if(boton){
        boton.style.cursor = "not-allowed";
        boton.disabled = true;
        boton.style.opacity = "0.5";
    }
    
}

function unblockButton(buttonId) {
    let boton = document.getElementById(`${buttonId}Att`);
    if(boton){
        boton.style.cursor = "pointer";
        boton.removeAttribute('disabled');
        boton.style.opacity = "1";
    }
    
}
//AUDIOS
function audioEne(){
    if(enem_vida>0){
        let r = Math.floor(Math.random()*2);
        var z1= new Audio(`SFX/${JSON.parse(localStorage.getItem('enemy')).entity}_hurt.mp3`);
        var z2= new Audio(`SFX/${JSON.parse(localStorage.getItem('enemy')).entity}_hurt2.mp3`);
        if(r==0){
            z1.play();
        }
        else{
            z2.play();
        }
    }
}
function audioPer(){
    if(pers_vida>0){
        let r = Math.floor(Math.random()*2);
        var z1= new Audio('SFX/player_hurt.mp3');
        var z2= new Audio('SFX/player_hurt2.mp3');
        if(r==0){
            z1.play();
        }
        else{
            z2.play();
        }
    }
}

//CONGELAR Y DESCONGELAR BOTONES(FUNCIONES)
function freeze() {
    let atqBtn = document.getElementById('AtqAtt');
    let defBtn = document.getElementById('DefAtt');
    let supBtn = document.getElementById('SupAtt');
    let esp1btn = document.getElementById('Esp1Att');
    let esp2btn = document.getElementById('Esp2Att');

    if (atqBtn) {
        atqBtn.setAttribute('onclick', '');
        atqBtn.style.cursor = 'not-allowed';
        atqBtn.style.opacity = '0.5';
    }
    if (defBtn) {
        defBtn.setAttribute('onclick', '');
        defBtn.style.cursor = 'not-allowed';
        defBtn.style.opacity = '0.5';
    }
    if (supBtn) {
        supBtn.setAttribute('onclick', '');
        supBtn.style.cursor = 'not-allowed';
        supBtn.style.opacity = '0.5';
    }
    if(esp1btn){
        esp1btn.setAttribute('onclick', ``);
        esp1btn.style.cursor = 'not-allowed';
        esp1btn.style.opacity = '0.5';
    }
    if(esp2btn){
        esp2btn.setAttribute('onclick', ``);
        esp2btn.style.cursor = 'not-allowed';
        esp2btn.style.opacity = '0.5';
    }
}

function unfreeze() {
    let atqBtn = document.getElementById('AtqAtt');
    let defBtn = document.getElementById('DefAtt');
    let supBtn = document.getElementById('SupAtt');
    let esp1btn = document.getElementById('Esp1Att');
    let esp2btn = document.getElementById('Esp2Att');

    if (atqBtn) {
        atqBtn.setAttribute('onclick', 'Atq(1)');
        atqBtn.style.cursor = 'default';
        atqBtn.style.opacity = '1';
    }
    if (defBtn) {
        defBtn.setAttribute('onclick', 'Def()');
        defBtn.style.cursor = 'default';
        defBtn.style.opacity = '1';
    }
    if (supBtn) {
        supBtn.setAttribute('onclick', 'Sup()');
        supBtn.style.cursor = 'default';
        supBtn.style.opacity = '1';
    }
    if(esp1btn){
        esp1btn.setAttribute('onclick', `esp_${espada[pers.espada].atq_esp[0]}()`);
        esp1btn.style.cursor = 'default';
        esp1btn.style.opacity = '1';
    }
    if(esp2btn){
        esp2btn.setAttribute('onclick', `esp_${espada[pers.espada].atq_esp[1]}()`);
        esp2btn.style.cursor = 'default';
        esp2btn.style.opacity = '1';
    }
    
}
let win = new Audio('SFX/levelup.mp3');
let givegema = false;
let game = 'lost';
const reward = +localStorage.getItem('reward');
PartidaTotal++;
PartidaPerdida++;
saveStats();
function checkVida() {//VERIFICAR SI EL ENEMIGO O PERSONAJE ESTA MUERTO
    if (pers_vida <= 0) { // Si la vida es menor o igual a cero //PERDER
        document.getElementById('opacar').style.display='block';
        stopListening();
        setTimeout(() => {
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    PlayAgain();
                } else if (event.key === ' ') {
                    PlayAgain();
                }
            });
            document.getElementById('perder').style.display='block';
            document.getElementById('personaje').style.opacity='0';
            coins+=50;
            saveStats();
            let mobOnLevel = localStorage.getItem('mobOnLevels');
            if(mobOnLevel==='true'){
                document.getElementById('revengeL').removeAttribute('hidden');
            }
            document.getElementById('rewardL').textContent = `+50 (total: ${coins})`;
        }, 1000);
    }
    if(enem_vida <= 0){ //GANAR
        game = 'win';
        var zd=new Audio(`SFX/${JSON.parse(localStorage.getItem('enemy')).entity}_death.mp3`);
        zd.play();
        document.getElementById('opacar').style.display='block';
        stopListening();
        setTimeout(() => {
            document.getElementById('ganar').style.display='block';
            document.getElementById('enem').style.opacity='0';
            let mobOnLevel = localStorage.getItem('mobOnLevels');
            if(mobOnLevel==="true"){
                let level = localStorage.getItem('playingLevel');
                localStorage.setItem(`${level}Completed`, 'true');
                const [seccion, nivel] = level.split('_');
                if(nivel==='nivel10'){
                    localStorage.setItem(`${seccion}_completed`, 'true');
                }else{
                    document.getElementById('skipLvl').removeAttribute('hidden');
                }
            }
            
            if(gema()==1){
                givegema=true;
                gems++;
                let p = document.getElementById('gems_msg');
                p.textContent=`+1 Gema (total: ${gems})`;
            }
            coins+=reward;
            document.getElementById('reward_p').textContent=`+${reward} coins (total: $${coins})`;
            win.play();
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    PlayAgain();
                } else if (event.key === ' ') {
                    PlayAgain();
                }
            });
        }, 1000);
    }
}
//MOSTRAR DAÑOS Y BLOQUEOS
function mostrarDaño( pers ,cant_dmg){
    if(pers=='per'){
        dmg_per.textContent=`-${cant_dmg}`;
        dmg_per.style.color='red';
    }
    else if(pers=='ene'){
        dmg_ene.textContent=`-${cant_dmg}`;
        dmg_ene.style.color='green';
    }
}
function mostrarSuper(persona){
    if(persona=='per'){
        esq_ene.textContent=`Golpe Fuerte`;
        esq_ene.style.color='green';
    }
    else if(persona=='ene'){
        esq_per.textContent=`Golpe Fuerte`;
        esq_per.style.color='red';
    }
}
function mostrarDefensa(){
        esq_per.textContent=`Bloqueado`
        esq_per.style.color='green';
}
function mostrarDañoBloqueado(daño){
    esq_per.textContent=`Se bloqueó ${daño} de daño`;
    esq_per.style.color='green';
}
function ocultarDaño(){
    dmg_per.textContent='';
    esq_per.textContent='';
    dmg_ene.textContent='';
    esq_ene.textContent='';
}
function gema(){//GENERAR UNA GEMA(1/10 true)
    let g= Math.floor(Math.random()*10+1);
    if(g==1){
        return 1;
    }
    else{
        return 0;
    }
}
//ESPECIALES
let esp_loadp = 1;
let shootpoint = 0;
function esp_load(){
    if(esp_loadp>=1&&freezed===false){
        esp_loadp--;
        shootpoint++;
        blockButton('Esp1');
        document.getElementById('shootP').textContent = `Power: ${shootpoint}`;
    }
}
function esp_shoot(){
    if(shootpoint>=1&&freezed===false){
        freezed=true;
        freeze();
        fun_Ataque(shootpoint*3);
        shootpoint=0;
        document.getElementById('shootP').textContent = `Power: ${shootpoint}`;
        setTimeout(() => {
            AtqEne();
            unfreeze();
        }, 500);
    }
}
let explocionpoint = 5;
function esp_explocion(){
    if(explocionpoint>=10&&freezed===false){
        freezed=true;
        defendiendo_per=true;
        mostrarDefensa('per');
        freeze();
        fun_Ataque(3);
        explocionpoint-=10;
        document.getElementById('explocionP').textContent = `${explocionpoint}/5`;
        setTimeout(() => {
            AtqEne();
            unfreeze();
        }, 500);
    }
}