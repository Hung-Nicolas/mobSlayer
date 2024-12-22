let diff = localStorage.getItem('diff');

// Establecer la opción seleccionada en el <select>

// Función para cambiar la dificultad y actualizar la página
function changeDiff(newDiff) {
    localStorage.setItem('diff', newDiff);
    configurarEne(newDiff+'Set');
    localStorage.setItem('reward', diffReward[newDiff]);
    diff = newDiff;
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
const entitys = ['zombi', 'zombiePig', 'esqueleto'];
function ChooseEne(){//ELIGE ALEATOREAMENTE QUIEN ES EL ENEMIGO
    let a = rnd(0,2);
    return entitys[a];
}
function playLevel(seccionName, levelName){
    let seccion = eval(seccionName);
    let level = seccion[levelName];
    localStorage.setItem('enemy', JSON.stringify(level.mob));
    localStorage.setItem('reward', JSON.stringify(100));
    localStorage.setItem('mobOnLevels', 'true');
    localStorage.setItem('playingLevel', `${seccionName}_${levelName}`);
    window.location.href = 'Match.html';
}
function playGame(){
    
    window.location.href = 'Match.html';
}