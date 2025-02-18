document.addEventListener('DOMContentLoaded', function(){
    pers = JSON.parse(localStorage.getItem('pers')) || {}; // Asegurar que pers existe

    actualizarEspeciales();
    cargarEquip();

    
    vida_arm = (casco[pers.casco]?.extrahp || 0) + 
               (pechera[pers.pechera]?.extrahp || 0) + 
               (pantalon[pers.pantalon]?.extrahp || 0) + 
               (botas[pers.botas]?.extrahp || 0);
    
    vida_total = 1000 + vida_arm;
     

    if (localStorage.getItem('raiding') === "true") {
        console.log("✅ Modo Raid activado");
    
        if (localStorage.getItem('currentStage') === "nivel1") {
            console.log("🔄 Nueva raid iniciada, restaurando puntos...");
            cargarPuntos(); // 🔥 Resetear puntos SOLO en la primera etapa
            persPoints['pers_vida'] = vida_total;  
        } else {
            console.log("🔄 Raid en progreso, cargando puntos guardados...");
            loadPoints(); // 🔥 Si la raid ya comenzó, cargar puntos de la partida
        }
    
        configurarEneRaid(); // Configurar el enemigo de la raid
        cargarEnemigo();
    } else {
        console.log("🔹 Modo normal, cargando enemigo");
    
        cargarPuntos(); // 🔥 En modo normal, cargar puntos guardados
        persPoints['pers_vida'] = vida_total;  
        cargarEnemigo();
    }
     
    cargarTodoEnemigo();
    
    let personaje = document.getElementById('personaje');
    personaje.style.backgroundImage = 'url("images/steve.png")';

    // Calcular vida del enemigo
    vida_arm_ene = (casco[enemigo.casco]?.extrahp || 0) + 
                   (pechera[enemigo.pechera]?.extrahp || 0) + 
                   (pantalon[enemigo.pantalon]?.extrahp || 0) + 
                   (botas[enemigo.botas]?.extrahp || 0);
    
    vida_total_enem = (entity[enemigo.entity]?.hp || 1000) + vida_arm_ene;

    if (localStorage.getItem('raiding') === "true") {
        vida_total_enem = Math.ceil(vida_total_enem / 5);
    }

    enem_vida = vida_total_enem;
    
    ActVida();
});

let vida_arm;
let vida_total;
let vida_arm_ene;
let vida_total_enem;
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


function cargarSkinEnemigo() {
    let skinElement = document.getElementById('enem');
    let skin = enemigo.entity;  // Usamos 'entity' para obtener la skin
    
    if (skin === 'nada' || !skin) {
        skinElement.style.backgroundImage = '';  // Si no hay skin, quitar la imagen
    } else {
        skinElement.style.backgroundImage = `url(images/${skin}.png)`;  // Asignar la imagen de la skin
    }
    if(entity[enemigo.entity].size==='big'){
        skinElement.style.width = '300px';
    }else if(entity[enemigo.entity].size==='width'){
        skinElement.style.width = '400px';
        skinElement.style.height = '300px';
    }else if(entity[enemigo.entity].size==='width2'){
        skinElement.style.width = '500px';
        skinElement.style.height = '400px';
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
function configurarEneRaid(){
    let typeRaid = localStorage.getItem(('diff'));
    let stage = localStorage.getItem('currentStage');
    let obj = eval(typeRaid+'Raid');
    let mob = obj[stage].mob;
    generateRaidMob(mob);
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
let habilidades = [];
function actualizarEspeciales() {
    habilidades = espada[pers.espada].atq_esp;
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
        nuevoBoton.innerText = ataquesEspeciales[ataque].name;

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
function loadHabilidades(){
    let starter, use;
    for(let habilidad of habilidades){
        starter = ataquesEspeciales[habilidad].starterPoints;
        use = ataquesEspeciales[habilidad].usePoints;
        document.getElementById(habilidad+'P').textContent=starter+'/'+use;
    }
}
function changeHabilidadesP(){
    let point, use, elemento;
    for(let habilidad of habilidades){
        point = persPoints[habilidad + 'point']; // Corregido
        use = ataquesEspeciales[habilidad].usePoints;
        elemento = document.getElementById(habilidad + 'P');

        if (!elemento) continue; // Si el elemento no existe, saltar
        
        if (habilidad === 'shoot' || habilidad === 'directShoot') {
            elemento.textContent = 'Power: ' + point;
        } else {
            elemento.textContent = point + '/' + use;
        }
    }
}

function generateRaidMob(mob){
    let type = localStorage.getItem('diff');
    let difficulty = mob.slice(-1);
    let mapDiff = {
        '1':'facilSet',
        '2':'normalSet',
        '3':'dificilSet'
    }
    let mapBossDiff = {
        1:'espada_madera',
        2:'espada_piedra',
        3:'espada_hierro'
    }
    let boss = {
        'pillager':'evoker',
        'marino':'elderGuardian',
        'trialchamber':'breeze'
    };
    let enemy = {
        entity: '',
        casco: generarArmadura('casco', mapDiff[difficulty]),
        pechera: generarArmadura('pechera', mapDiff[difficulty]),
        pantalon: generarArmadura('pantalon', mapDiff[difficulty]),
        botas: generarArmadura('botas', mapDiff[difficulty]),
        espada: generarEspada(mapDiff[difficulty]) // Generar la espada con mapeo especial
    };
    if(mob.startsWith('random')){
        enemy.entity=elegirRandom(type+'Raid');
    }else{
        enemy.entity=boss[type];
        let num = parseInt(mob.replace('boss', ''));
        enemy.espada = mapBossDiff[num];

    }
    enemy = checkRaidEneArm(enemy);
    localStorage.setItem('enemy', JSON.stringify(enemy)); // Guardar el enemigo en localStorage
    enemigo = enemy;
    
}
function elegirRandom(tipo) {
    const opciones = {
        pillagerRaid: ['pillager', 'vindicator'],
        marinoRaid: ['ahogado', 'guardian'],
        trialchamberRaid: ['husk', 'bogged']
    };
    return opciones[tipo][Math.floor(Math.random() * opciones[tipo].length)];
}
function loadPoints() {
    persPoints['pers_vida'] = parseInt(localStorage.getItem('current_pers_vida')) || 1000;
    persPoints['atq'] = 1;
    persPoints['def'] = parseInt(localStorage.getItem('current_def')) || 2;
    persPoints['sup'] = parseInt(localStorage.getItem('current_sup')) || 3;

    // Cargar habilidades dinámicamente
    for (let habilidad of habilidades) {
        let habilidadKey = `current_${habilidad}point`;
        persPoints[habilidad + "point"] = parseInt(localStorage.getItem(habilidadKey)) || 1;
    }

    ActVida(); // Actualizar la UI de la vida
}

function checkRaidEneArm(enem) {
    let sinArmadura = ['guardian', 'elderGuardian', 'breeze'];
    let mob = enem.entity;

    if (sinArmadura.includes(mob)) {
        enem.casco = 'casco_nada';
        enem.pechera = 'pechera_nada';
        enem.pantalon = 'pantalon_nada';
        enem.botas = 'botas_nada';
    } 
    return enem;
}
let persPoints = {};
function cargarPuntos(){
    persPoints = {
        pers_vida: 1000, 
        atq: 1,
        def: 2, 
        sup: 3, 
    };
    if ( habilidades.length > 0) {
        for (let habilidad of habilidades) {
            persPoints[habilidad + "point"] = ataquesEspeciales[habilidad].starterPoints;
        }
    }
    localStorage.setItem('persPoints', JSON.stringify(persPoints));
}
