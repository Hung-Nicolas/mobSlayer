let diff = localStorage.getItem('diff');

// Establecer la opción seleccionada en el <select>

// Función para cambiar la dificultad y actualizar la página
function changeDiff(newDiff) {
    localStorage.setItem('diff', newDiff);
    configurarEne(newDiff+'Set');
    localStorage.setItem('reward', diffReward[newDiff]);
    diff = newDiff;
    localStorage.setItem('raiding', 'false');
}
function changeRaid(raidType){
    localStorage.setItem('diff', raidType);
    localStorage.setItem('raiding', 'true');
}
function configurarEne(diff) {
    let enemy = {
        entity:ChooseEne(),
        casco: generarArmadura('casco', diff),
        pechera: generarArmadura('pechera', diff),
        pantalon: generarArmadura('pantalon', diff),
        botas: generarArmadura('botas', diff),
        espada: generarEspada(diff) // Generar la espada con mapeo especial
    };
    
    localStorage.setItem('enemy', JSON.stringify(enemy)); // Guardar el enemigo en localStorage
}

const difficulty = {
    facilSet: { 'nada': 25, 'cuero': 35, 'malla': 30, 'oro': 9, 'hierro': 1 },
    normalSet: { 'nada': 10, 'cuero': 15, 'malla': 20, 'oro': 25, 'hierro': 20, 'diamante': 9, 'netherite': 1 },
    dificilSet: { 'cuero': 10, 'malla': 15, 'oro': 20, 'hierro': 25, 'diamante': 20, 'netherite': 10 },
    extremoSet: { 'hierro': 25, 'diamante': 40, 'netherite': 35 }
};


function generarArmadura(arm, diff) {
    return `${arm}_${chooseDifficultyElement(diff)}`; // Genera una pieza de armadura según la dificultad
}
function generarEspada(diff) {
    let material = chooseDifficultyElement(diff); // Generar material base
    // Mapeo especial para la espada
    if (material === 'cuero') {
        return 'espada_madera';
    } else if (material === 'malla') {
        return 'espada_piedra';
    }
    return `espada_${material}`; // Otros materiales se mantienen igual
}
const diffReward = {
    'facil':100,
    'normal':200,
    'dificil':300,
    'extremo':400
}
function chooseDifficultyElement(difficultyName) {
    const schema = difficulty[difficultyName]; // Obtener el esquema de dificultad
    if (!schema) {
        return null;
    }

    let sum = 0;
    for (let element in schema) {
        sum += schema[element]; // Sumar las probabilidades
    }

    let weightedRandom = rnd(0, sum - 1); // Generar número aleatorio

    for (let element in schema) {
        if (weightedRandom < schema[element]) {
            return element; // Si el número aleatorio cae dentro del rango, devolver el elemento
        }
        weightedRandom -= schema[element];
    }

    return null;
}
function ChooseEne() {
    let entitys = ['zombi', 'zombiePig', 'esqueleto'];
    let randomIndex = rnd(0, entitys.length - 1);
    return entitys[randomIndex];
}
function playLevel(seccionName, levelName){
    if(localStorage.getItem('playedLevel')==='false'){
        localStorage.setItem('playedLevel', 'true');
    }
    let seccion = eval(seccionName);
    let level = seccion[levelName];
    localStorage.setItem('enemy', JSON.stringify(level.mob));
    localStorage.setItem('reward', JSON.stringify(100));
    localStorage.setItem('mobOnLevels', 'true');
    localStorage.setItem('playingLevel', `${seccionName}_${levelName}`);
    window.location.href = 'Match.html';
}
function playGame(){
    if(localStorage.getItem('raiding')==='true'){
        desopacar('confRaid');
        confRaidPChange();
    }else{
        if(localStorage.getItem('diff')==="pillager"||localStorage.getItem('diff')==="marino"||localStorage.getItem('diff')==="trialchamber"){
            configurarEne('normalSet');
        }else{
            configurarEne(localStorage.getItem('diff')+'Set');
        }
        window.location.href = 'Match.html'; 
    }
    
}
function practica(){
    let enemy = {
        entity:'soporte',
        casco: 'casco_nada',
        pechera: 'pechera_nada',
        pantalon: 'pantalon_nada',
        botas: 'botas_nada',
        espada: 'espada_nada' // Generar la espada con mapeo especial
    };
    localStorage.setItem('Probando', 'true');
    localStorage.setItem('reward', '50');
    localStorage.setItem('enemy', JSON.stringify(enemy)); // Guardar el enemigo en localStorage
    window.location.href = 'Match.html';
}
function testItem(item){
    let parte = item.split('_')[0];
    let usaba = pers[parte];
    localStorage.setItem('usaba', usaba);
    localStorage.setItem('ProbandoArma', 'true');
    pers[parte] = item;
    localStorage.setItem('pers', JSON.stringify(pers));
    practica();
}
function confRaidPChange(){
    let p = document.getElementById('confRaidP');
    let typeRaid = localStorage.getItem('diff');
    let obj = {
        'pillager':'¿Quiere gastar 2500 coins para raid de pillagers?',
        'marino':'¿Quiere gastar 5000 coins para raid marino?',
        'trialchamber':'¿Quiere gastar 10000 coins para raid de la trial chambers?'
    }
    if(parseInt(localStorage.getItem(typeRaid+'Map'))>0){
        obj = {
            'pillager':'¿Quiere gastar 1 mapa de raid de pillagers?',
            'marino':'¿Quiere gastar 1 mapa de raid de mares?',
            'trialchamber':'¿Quiere gastar 1 mapa de raid de trial chambers?'
        }
    }
    p.textContent = obj[typeRaid];
}
function playRaid(){
    let raidPrice = {
        'pillager': 2500,
        'marino': 5000,
        'trialchamber':10000
    }
    let typeRaid = localStorage.getItem('diff');
    if(parseInt(localStorage.getItem(typeRaid+'Map'))>0){
        let maps = parseInt(localStorage.getItem(typeRaid+'Map'));
        maps--;
        localStorage.setItem(typeRaid+'Map', maps);
        localStorage.setItem('currentStage', 'nivel1');
        window.location.href = 'Match.html'; 
    }else if(parseInt(localStorage.getItem('coins'))>raidPrice[typeRaid]){
        let coins = parseInt(localStorage.getItem('coins'));
        coins-=raidPrice[typeRaid];
        localStorage.setItem('coins', coins);
        localStorage.setItem('currentStage', 'nivel1');
        window.location.href = 'Match.html'; 
    }
}