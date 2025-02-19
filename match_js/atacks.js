//ATAQUES
//////////////////////////////////////////////////////////////

let quitar = [];
let enemyStuned = false;

function ActVida() {
    // Cálculo de la nueva anchura para las barras de vida
    let nuevaAnchura = Math.max(0, Math.min((persPoints['pers_vida'] / vida_total) * 450, 450));
    let nuevaAnchura2 = Math.max(0, Math.min((enem_vida / vida_total_enem) * 450, 450));
    
    // Actualización de las barras de vida
    let barra = document.getElementById('per_cant');
    let barra_e = document.getElementById('ene_cant');
    let barra_t = document.getElementById('per_vi');
    let barra_e_t = document.getElementById('ene_vi');
    
    barra.style.width = nuevaAnchura + 'px';
    barra_e.style.width = nuevaAnchura2 + 'px';
    barra_t.textContent = `Vida: ${persPoints['pers_vida']}/${vida_total}`;
    barra_e_t.textContent = `Vida: ${enem_vida}/${vida_total_enem}`;
    

    // Actualización de los textos de defensa y superioridad
    document.getElementById('DefP').textContent = `${persPoints['def']}/2`;
    document.getElementById('SupP').textContent = `${persPoints['sup']}/3`;
    changeHabilidadesP();
}
// Define la función manejadora del evento
function handleKeydown(event) {
    if (event.key === localStorage.getItem('key_Atq')) {
        Atq();
    } else if (event.key === localStorage.getItem('key_Def')) {
        Def();
    } else if (event.key === localStorage.getItem('key_Sup')) {
        Sup();
    } else if (event.key === localStorage.getItem('key_Esp1')){
        if(habilidades[0]){
            eval(`esp_${habilidades[0]}()`);
        }
    } else if (event.key === localStorage.getItem('key_Esp2')){
        if(habilidades[1]){
            eval(`esp_${habilidades[1]}()`);
        }
    } else if (event.key === localStorage.getItem('key_Skip')) {
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
    if(!enemyStuned){
        cant_dmg=Math.floor(Daño_total_enem*0.8*multi+Math.floor(Math.random()*Daño_total_enem*0.2));
        if(multi==3 && defendiendo_per==false){
            mostrarSuper('per', 'Golpe fuerte', 'red');
        }
        if(defendiendo_per){
            defendiendo_per=false;
            if(cant_dmg>=0 && cant_dmg<escudop){
                mostrarDañoBloqueado(cant_dmg);
            }
            else if(cant_dmg>escudop){
                mostrarDañoBloqueado(escudop);
                cant_dmg-=escudop;
                persPoints['pers_vida']-=cant_dmg;
                mostrarDaño('per', `-${cant_dmg}`, 'red');
                audioPer();
                if(enemigo.entity!=='soporte'){
                    DañoRecibido+=cant_dmg;
                    saveStats();
                }
            }
            var audio = new Audio('SFX/minecraft-block.mp3');
            audio.play();
            escudop = 0;
        }
        else{
            persPoints['pers_vida'] -= cant_dmg; 
            mostrarDaño('per', `-${cant_dmg}`, 'red');
            audioPer();
            if(enemigo.entity!=='soporte'){
                DañoRecibido+=cant_dmg;
                saveStats();
            }
        }
    }else{
        mostrarDaño('ene', 'Aturdido', 'orange');
        enemyStuned = false;
    }
    
    
    checkVida();
    saveStats();
    
    for (let key in persPoints) {
        if (typeof persPoints[key] === "number") {
            if(key!=='pers_vida'){
                persPoints[key] += 1;
            }
        }
    }
    
    freezed = false;

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
    Daño_total_enem = espada[enemigo.espada].dañomax+entity[enemigo.entity].extradmg;
});
let freezed = false;
function Atq(){//ATAQUE 1
    if(persPoints['atq']>=1&&freezed===false){
        persPoints['atq']-=1;
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
    ocultarDaño();
    mostrarDaño('ene', `-${cant_dmg}`, 'green');
    checkVida();
    if(enemigo.entity!=='soporte'){
        DañoInfligido+=cant_dmg;
        saveStats();
    }
    audioEne();
    ene_sup++;
    if(quitar.length>0){
        setTimeout(() => {
            cant_dmg=quitar[0]*0.9+Math.floor(Math.random()*quitar[0]*0.1);
            enem_vida -= cant_dmg; 
            quitar.shift();
            ActVida();
            checkVida();
            ocultarDaño();
            if(enemigo.entity!=='soporte'){
                DañoInfligido+=cant_dmg;
                saveStats();
            }
            if(cant_dmg>0){
                mostrarDaño('ene', `-${cant_dmg}`, 'green');
                audioEne();
            }
           
        }, 250);

    }
}
function checkButton(){//FUNCION PARA VERIFICAR SI EL BOTON SE PUEDE DESBLOQUEAR O NO
    if(persPoints['sup']>=3){
        unblockButton('Sup');
    }
    if(persPoints['def']>=2){
        unblockButton('Def');
    }
    for (let i = 0; i < habilidades.length; i++) { 
        let button = 'Esp'+(i+1);
        if(persPoints[habilidades[i]+'point']>=ataquesEspeciales[habilidades[i]].starterPoints){
            unblockButton(button);
            
        }
    }
    

}

function Sup(){//ATAQUE SUPER
    if(persPoints['sup'] >= 3&&freezed===false){
        persPoints['sup'] -= 3;
        freezed=true;
        freeze();
        blockButton('Sup');
        fun_Ataque(3);
        mostrarSuper('ene', 'Golpe fuerte', 'green');
        setTimeout(() => {
            AtqEne();
            unfreeze();
        }, 500);
    }   
}
let escudop = 0;
let defendiendo_per=false;//ESTADO DE DEFENZA
function Def(){//DEFENDER
    if(persPoints['def']>=2&&freezed===false){
        defendiendo_per=true;
        escudop+=1000;
        blockButton('Def');
        mostrarSuper('per', 'Bloqueando', 'green');
        persPoints['def']-=2;
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
    if(persPoints['pers_vida']>0){
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
let game = 'lost';
PartidaTotal++;
PartidaPerdida++;
saveStats();
function checkVida() {//VERIFICAR SI EL ENEMIGO O PERSONAJE ESTA MUERTO
    if (persPoints['pers_vida'] <= 0) { // Si la vida es menor o igual a cero //PERDER
        document.getElementById('opacar').style.display='block';
        document.getElementById('WLtitle').textContent = 'Has perdido! Tus tesoros:';
        stopListening();
        
        mobDropArray.push('10 coins');
        localStorage.setItem('dropped', JSON.stringify(mobDropArray));
        mobDropArray = checkIArray(mobDropArray);
        cRewardsP();
        dropear(mobDropArray);
        if(localStorage.getItem('raiding')==="true"){
            document.getElementById('WLtitle').textContent = `Has perdido en etapa ${localStorage.getItem('currentStage').replace('nivel', '')}!Tus tesoros:`;
            let boton = document.getElementById('volverBtn');
            boton.style.display = 'none';
        }
        if(localStorage.getItem('ProbandoArma')==="true"){
            document.getElementById('volverBtn').style.display = 'none';
        }
        setTimeout(() => {
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Enter'||event.key === ' ') {
                    if(localStorage.getItem('mobOnLevels')){
                        revenge();
                    }else{
                        PlayAgain();
                    }
                }
            });
            document.getElementById('end_cont').style.display='block';
            
            document.getElementById('personaje').style.opacity='0';
            saveStats();
            let mobOnLevel = localStorage.getItem('mobOnLevels');
            if(mobOnLevel==='true'){
                document.getElementById('revengeL').removeAttribute('hidden');
            }
        }, 1000);
    }
    if(enem_vida <= 0){ //GANAR
        if(localStorage.getItem('mobOnLevels')==='true'){
            if(localStorage.getItem('playingLevel')==='seccion1_nivel1'){
                mostrarDaño('ene', 'grr...', 'red');
            }
            if(localStorage.getItem('playingLevel')==='seccion3_nivel10'){
                localStorage.setItem('progress', 'afterBoss1');
                localStorage.setItem('canRaid', 'true');
            }
        }
        if(localStorage.getItem('raiding')==="true"){
            if(evaluarStage()){
                let boton = document.getElementById('volverBtn');
                let h1 = document.getElementById('WLtitle');
                h1.textContent = `Etapa ${localStorage.getItem('currentStage').replace('nivel', '')} vencido!Tus tesoros:`;
            
                boton.textContent = 'Siguiente enemigo'; // Corregido el texto
                boton.onclick = () => {
                    newStage();
                };
            }else{
                let boton = document.getElementById('volverBtn');
                boton.style.display = 'none';
            }
            
            
        }else{
            document.getElementById('WLtitle').textContent = 'Has Ganado! Tus tesoros:';
        }
        mobDrop();
        cRewardsP();
        game = 'win';
        var zd=new Audio(`SFX/${JSON.parse(localStorage.getItem('enemy')).entity}_death.mp3`);
        zd.play();
        
        if(localStorage.getItem('ProbandoArma')==="true"){
            document.getElementById('volverBtn').style.display = 'none';
        }
        document.getElementById('opacar').style.display='block';
        stopListening();
        setTimeout(() => {
            document.getElementById('end_cont').style.display='block';
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
            
            win.play();
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Enter'||event.key === ' ') {
                    if(localStorage.getItem('raiding')==="true"&&evaluarStage()){
                        newStage();
                    }else if(localStorage.getItem('mobOnLevels')==="true"&&!localStorage.getItem('playingLevel')?.endsWith("nivel10")){
                        skipLvl();
                    }else{
                       PlayAgain(); 
                    }
                } 
            });
        }, 1000);
    }
}
//MOSTRAR DAÑOS Y BLOQUEOS
const elementos = { 
    dmg_per, esq_per, 
    dmg_ene, esq_ene 
};

function mostrarDaño(pers, msg, color) {
    let elemento = elementos[`dmg_${pers}`];
    if (elemento) {
        elemento.textContent = msg;
        elemento.style.color = color;
    } else {
        console.warn(`Elemento dmg_${pers} no encontrado`);
    }
}

function mostrarSuper(persona, msg, color) {
    let elemento = elementos[`esq_${persona}`];
    if (elemento) {
        elemento.textContent = msg;
        elemento.style.color = color;
    } else {
        console.warn(`Elemento esq_${persona} no encontrado`);
    }
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
//TUTORIAL
if(localStorage.getItem('mobOnLevels')==='true'){
    if(localStorage.getItem('playingLevel') === 'seccion1_nivel1'){
        mostrarDaño('ene', 'Cerebros...', 'darkred');
        mostrarSuper('per', 'Usa Ataque', 'blue');
        let sonido = new Audio("SFX/rugido_zombie.mp3"); // Ruta del archivo
        sonido.play(); // Reproduce el sonido

    }
}
let mobDropArray = JSON.parse(localStorage.getItem('dropped'))||[];
function mobDrop() {
    let dropItems = entity[enemigo.entity].drops;
    let claves = Object.keys(dropItems); // Obtener las claves del objeto

    for (let clave of claves) {
        let porc = dropItems[clave]; // Obtener el porcentaje del drop

        if (checkRange(porc)) { 
            let isArmamento = clave.includes("_"); // Verifica si es armamento
            let itemName = isArmamento ? clave.split("_")[1] : clave.split(" ")[1]; // Extrae el nombre del ítem o armamento

            // Si el objeto es un ítem avanzado y el jugador está en 'start', no lo agregamos
            if (!isArmamento && items[itemName]?.showing === 'afterBoss1' && localStorage.getItem('progress') === 'start') {
                continue;
            }

            mobDropArray.push(clave); // Agregar solo si pasa el checkRange y cumple las reglas
        }
    }

    if (game === 'win') {
        mobDropArray.push(`${localStorage.getItem('reward')} coins`);
    }

    mobDropArray = checkIArray(mobDropArray);
    localStorage.setItem('dropped', JSON.stringify(mobDropArray));
    dropear(mobDropArray); // Dropear los ítems guardados en el array
}







function checkRange(num) {
    return Math.random() * 100 < num;
}
function checkIArray(array) {
    let armas = new Set(); // Almacena las armas únicas
    let items = {}; // Almacena los ítems sumados

    for (let item of array) {
        if (item.includes(" ")) {
            // Es un ítem con cantidad (ejemplo: "1 ch")
            let [cantidad, nombre] = item.split(" ");
            cantidad = parseInt(cantidad);

            if (items[nombre]) {
                items[nombre] += cantidad;
            } else {
                items[nombre] = cantidad;
            }
        } else {
            // Es un arma (ejemplo: "espada_madera")
            armas.add(item);
        }
    }

    // Convertimos los ítems sumados de nuevo a formato "X nombre"
    let resultado = [...armas, ...Object.entries(items).map(([nombre, cantidad]) => `${cantidad} ${nombre}`)];

    return resultado;
}


function dropear(array) {
    let cont = document.getElementById('itemsDropeados');
    cont.innerHTML = '';
    array.forEach(item => {
        let nuevoDiv = document.createElement('div'); // Crear un nuevo div
         // Asignar el texto del item
        nuevoDiv.classList.add('dropItemImg'); // Agregar una clase para estilos (opcional)
        if(item.includes(' ')){
            nuevoDiv.style.backgroundImage = `url(${items[item.split(' ')[1]].src})`;
            nuevoDiv.textContent = 'x'+item.split(' ')[0];
        }else{
            nuevoDiv.style.backgroundImage = `url(${eval(item.split("_")[0])[item].src})`;
        }
        cont.appendChild(nuevoDiv); // Agregar el div al contenedor
    });
}
function cRewardsP() {
    let coinsP = document.getElementById('reward_p');
    let gemsP = document.getElementById('gems_msg');
    
    let rewards = { coins: 0, gems: 0 }; // Inicializamos acumuladores

    for (let item of mobDropArray) {
        let [cant, itm] = item.split(' ');
        if (itm === 'coins' || itm === 'gems') {
            rewards[itm] += parseInt(cant);
        }
    }

    // Obtener valores actuales de localStorage
    let coinsPrev = parseInt(localStorage.getItem('coins')) || 0;
    let gemsPrev = parseInt(localStorage.getItem('gems')) || 0;

    // Calcular valores nuevos
    let coinsTotal = coinsPrev + rewards.coins;
    let gemsTotal = gemsPrev + rewards.gems;

    // Actualizar todos los elementos de la clase
    
    coinsP.textContent = `🪙 Tienes ${coinsTotal} monedas (${coinsPrev} + ${rewards.coins})`;
    gemsP.textContent = `💎 Tienes ${gemsTotal} gemas (${gemsPrev} + ${rewards.gems})`;
}
function evaluarStage() {
    let type = localStorage.getItem('diff');
    let currentStage = localStorage.getItem('currentStage');
    let obj = eval(type + 'Raid');
    
    if (!obj) {
        console.error(`⚠ No se encontró el objeto ${type}Raid`);
        return false;
    }

    const keys = Object.keys(obj);
    const lastKey = keys[keys.length - 1];

    return lastKey !== currentStage;
}

function newStage() {
    savePoints(); // Guardar los puntos antes de cambiar de nivel
    let stage = localStorage.getItem('currentStage');
    let num = parseInt(stage.replace("nivel", ""), 10);
    let nStage = `nivel${num + 1}`;
    
    localStorage.setItem('currentStage', nStage);
    window.location.href = 'Match.html';
}
function savePoints() {
    if (!persPoints) {
        console.error("⚠ persPoints no está definido");
        return;
    }

    // Sumar 1 a los atributos principales (excepto pers_vida)
    persPoints['def']++;
    persPoints['sup']++;

    // Guardar atributos en localStorage
    localStorage.setItem('current_pers_vida', persPoints['pers_vida']); // No se suma
    localStorage.setItem('current_def', persPoints['def']);
    localStorage.setItem('current_sup', persPoints['sup']);

    // Sumar 1 a cada habilidad y guardarlas en localStorage
    for (let habilidad of habilidades) {
        let habilidadKey = `current_${habilidad}point`;
        if (persPoints[habilidad + "point"] !== undefined) {
            persPoints[habilidad + "point"]++; // 🔥 Sumar 1 antes de guardar
            localStorage.setItem(habilidadKey, persPoints[habilidad + "point"]);
        }
    }

    console.log("✅ Puntos guardados:", persPoints);
}

