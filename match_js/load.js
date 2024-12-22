
document.addEventListener('DOMContentLoaded', function(){
    pers = JSON.parse(localStorage.getItem('pers'));

    cargarEquip();
    
    cargarEnemigo();
    cargarTodoEnemigo();
    let personaje = document.getElementById('personaje');
    personaje.style.backgroundImage = 'url("images/steve.png")';
    
    
    // Llama a la función para actualizar los botones especiales
    actualizarEspeciales();
    vida_arm_ene = casco[enemigo.casco].extrahp + pechera[enemigo.pechera].extrahp + pantalon[enemigo.pantalon].extrahp + botas[enemigo.botas].extrahp;
    vida_total_enem = entity[enemigo.entity].hp + vida_arm_ene;
    vida_arm = casco[pers.casco].extrahp + pechera[pers.pechera].extrahp + pantalon[pers.pantalon].extrahp + botas[pers.botas].extrahp;
    vida_total = 1000 + vida_arm;
    // Actualizar las vidas
    pers_vida = vida_total;
    enem_vida = vida_total_enem;
});
const entitysHP = {'zombi':1000, 'zombiePig':4000, 'esqueleto':2500, 'herobrine':12500};
let vida_arm;
let vida_total;
let vida_arm_ene;
let vida_total_enem;
let pers_vida;
let enem_vida;
//CARGAR LA ARMADURA
function cargarEquip() {
    cargarArmadura('casco');
    cargarArmadura('pechera');
    cargarArmadura('pantalon');
    cargarArmadura('botas');
    cargarArmadura('espada');
}
function cargarArmadura(tipo_arm) {//BUSCA EN LA LOCAL
    let valor = pers[tipo_arm];
    let div = document.getElementById(`pers_${tipo_arm}`);
    if (valor === `${tipo_arm}_nada`) {
        div.style.backgroundImage = '';
    } else {
        div.style.backgroundImage = `url(${eval(tipo_arm)[valor].src})`;
    }
}


//CARGAR ARMADURA ENEMIGA
let enemigo = {};
function cargarEnemigo() {
    const storedEnemy = localStorage.getItem('enemy')||configurarEne('normalSet');
    if (storedEnemy) {
        try {
            enemigo = JSON.parse(storedEnemy); // Parsear los datos
        } catch (error) {
            console.error("Error al cargar enemigo desde localStorage:", error);
        }
    } else {
        console.warn("No se encontraron datos del enemigo en localStorage.");
    }
}
function cargarArmadura_Ene(arm) {
    let valor = enemigo[arm];
    let div = document.getElementById(`enem_${arm}`);
    if (valor === `${arm}_nada`) {
        div.style.backgroundImage = '';
    } else {
        div.style.backgroundImage = `url(images/${valor}.jpeg)`;
    }
}
function cargarTodoEnemigo() {
    cargarSkinEnemigo();
    cargarArmadura_Ene('casco');
    cargarArmadura_Ene('pechera');
    cargarArmadura_Ene('pantalon');
    cargarArmadura_Ene('botas');
    cargarArmadura_Ene('espada');
}

const dañoInicial = {
        "zombi":0,
        "zombiePig":100,
        "esqueleto":100,
        "herobrine":250
    }

function cargarSkinEnemigo() {
    let skinElement = document.getElementById('enem');
    let skin = enemigo.entity;  // Usamos 'entity' para obtener la skin
    
    if (skin === 'nada' || !skin) {
        skinElement.style.backgroundImage = '';  // Si no hay skin, quitar la imagen
    } else {
        skinElement.style.backgroundImage = `url(images/${skin}.png)`;  // Asignar la imagen de la skin
    }
}
/////////////////////
//////////////////777
/////////////////////
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

function chooseDifficultyElement(difficultyName) {
    const schema = difficulty[difficultyName]; // Obtener el esquema de dificultad
    if (!schema) {
        console.error("Esquema de dificultad no encontrado:", difficultyName);
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

    console.error('Error: No element selected. Check schema.');
    return null;
}
function ChooseEne() {
    let entitys = ['zombi', 'zombiePig', 'esqueleto'];
    let randomIndex = rnd(0, entitys.length - 1);
    return entitys[randomIndex];
}


let pers = {};

function actualizarEspeciales() {
    // Seleccionar el contenedor principal
    const contenedorEspeciales = document.getElementById("att");

    // Remover cualquier div existente que contenga botones especiales
    document.querySelectorAll(".special-container").forEach(div => div.remove());

    // Iterar sobre el array de ataques especiales de pers.espada
    espada[pers.espada].atq_esp.forEach((ataque, index) => {
        // Crear un nuevo div contenedor para el botón
        const nuevoDiv = document.createElement("div");
        nuevoDiv.classList.add("special-container");

        // Crear el botón especial
        const nuevoBoton = document.createElement("button");
        nuevoBoton.id = `Esp${index + 1}Att`;
        nuevoBoton.classList.add("special");
        nuevoBoton.innerText = ataque;

        // Asignar una función al evento onclick
        nuevoBoton.onclick = function () {
            eval(`esp_${ataque}()`); // Llama a la función si existe
        };
        const cant = document.createElement('p');
        cant.id = `${ataque}P`;
        // Agregar el botón al nuevo div
        nuevoDiv.appendChild(nuevoBoton);
        nuevoDiv.appendChild(cant);

        // Agregar el nuevo div al contenedor principal
        contenedorEspeciales.appendChild(nuevoDiv);
    });
}