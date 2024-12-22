//FUNCIONES DE LA TIENDA
let info = false;
function t_info(chest){
    if(info){
        document.getElementById(`i_${chest}`).style.display='none';
        document.getElementById('opacar').style.display='none';
    }
    else{
        document.getElementById(`i_${chest}`).style.display='block';
        document.getElementById('opacar').style.display='block';
    }
    info=!info;
    

    loadCantCofres(chest);
}

function buyChest(chest){
    let coins = parseInt(localStorage.getItem('coins'));
    let chestPrecio = {
        'ch':100,
        'dch':500,
        'ech':1500,
        'v':2500,
        'ov':4000,
        's':1000
    }
    if(coins>=parseInt(chestPrecio[chest])){
        let cant_chest = parseInt(localStorage.getItem(chest));
        coins-=chestPrecio[chest];
        localStorage.setItem('coins', coins);
        cant_chest++;
        localStorage.setItem(chest, cant_chest);
        document.getElementById(`${chest}_p`).textContent='Compra exitosa!';
        document.getElementById(`${chest}_p`).style.color='green';
        setTimeout(() => {
            document.getElementById(`${chest}_p`).textContent = '';
        }, 5000);
        loadUI();
        loadCantCofres(chest);
    }
    else{
        document.getElementById(`${chest}_p`).textContent='Monedas insuficientes';
        document.getElementById(`${chest}_p`).style.color='red';
        setTimeout(() => {
            document.getElementById(`${chest}_p`).textContent = '';
        }, 5000);
        loadUI();
        loadCantCofres(chest);
    }
}
function loadCantCofres(chest){
    let cant_chest = localStorage.getItem(chest);
    let p =document.getElementById(`cant_${chest}`);
    p.textContent=`Tienes: ${cant_chest}`;
}
//ABRIR COFRES
//////////////////////////
function rnd_arm() {
    let opciones = {
        1: 'espada',
        2: 'casco',
        3: 'pechera',
        4: 'pantalon',
        5: 'botas'
    };
    return opciones[rnd(1, 5)];
}
// Esquemas de probabilidad por tipo de cofre
const schemas = {
    ch_schema: { 'cuero': 10, 'malla': 7, 'oro': 3 },
    dch_schema: { 'cuero': 10, 'malla': 12, 'oro': 10, 'hierro': 7.96, 'diamante': 0.04 },
    ech_schema: { 'malla': 10, 'oro': 12, 'hierro': 10, 'diamante': 7.96, 'netherite': 0.04 },
    v_schema: { 'oro': 23, 'hierro': 21, 'diamante': 15, 'netherite': 1 },
    ov_schema:{'hierro':30, 'diamante':20, 'netherite':10},
    s_schema:{'madera':10, 'piedra':20, 'arco':20, 'oro':25, 'hierro':15, 'diamante':7.5, 'netherite':2.5}
};

// Función para generar número aleatorio
function rnd(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

// Función para elegir un elemento con base en su probabilidad
function chooseElement(schemaName) {
    const schema = schemas[schemaName]; // Obtener el esquema usando el nombre pasado
    if (!schema) {
        console.error("Esquema no encontrado:", schemaName);
        return;
    }

    let sum = 0;
    for (let element in schema) {
        sum += schema[element]; // Sumar las probabilidades
    }

    let weightedRandom = rnd(0, sum - 1); // Generar número aleatorio


    for (let element in schema) {
        if (weightedRandom < schema[element]) {
            console.log(`Selected: ${element}`); // Debugging
            return element; // Si el número aleatorio cae dentro del rango, devolver el elemento
        }
        weightedRandom -= schema[element];
    }

    console.error('Error: No element selected. Check schema.');
    return null;
}

// Función para generar tipo de armadura aleatorio
function rnd_arm() {
    let opciones = {
        1: 'espada',
        2: 'casco',
        3: 'pechera',
        4: 'pantalon',
        5: 'botas'
    };
    return opciones[rnd(1, 5)];
}

// Función para abrir un cofre
function openChest(chest) {
    let cant_chest = localStorage.getItem(chest); // Obtener la cantidad de cofres disponibles

    if (cant_chest > 0) {
        let items = []; // Array para almacenar los ítems generados
        let cantidad = cant_items[chest]; // Obtener la cantidad de ítems que genera este cofre
        if(chest!='s'){
            for (let i = 0; i < cantidad; i++) {
                let armadura = rnd_arm(); // Generar tipo de armadura (por ejemplo, casco, pechera, etc.)
                let material = chooseElement(`${chest}_schema`); // Obtener material según el esquema del cofre
                if(armadura === 'espada'){
                    if(material==='cuero'){
                        material='madera';
                    }
                    else if(material==='malla'){
                    material='piedra';
                    }
                }
            Unlock(armadura+'_' +material); 
            items.push(`${armadura}_${material}`); // Agregar el ítem al array
            }
        }
        else{
            let material = chooseElement('s_schema');
            Unlock(`espada_${material}`);
            items.push(`espada_${material}`);
        }
        
        showUnlock(items);
        var audio = new Audio('SFX/orb.mp3');
        audio.play();

        cant_chest -= 1; // Reducir la cantidad de cofres disponibles
        localStorage.setItem(chest, cant_chest); // Guardar la nueva cantidad de cofres en localStorage
        loadCantCofres(chest);
        return items; // Devolver los ítems generados
    } else {
        document.getElementById(`${chest}_p`).textContent = 'No tienes cofres';
        document.getElementById(`${chest}_p`).style.color = 'red';
        setTimeout(() => {
            document.getElementById(`${chest}_p`).textContent = '';
        }, 5000);
    }

    loadCantCofres(chest); // Actualizar la cantidad de cofres mostrada
}

// Contadores de cofres disponibles
const cant_items = {
    'ch': 1,
    'dch': 2,
    'ech': 2,
    'v': 3,
    'ov': 3,
    's':1
};


        
function showUnlock() {
    var contenedor = document.getElementById('items_unlock');  // Seleccionamos el contenedor donde agregar las imágenes
    contenedor.innerHTML = '';  // Limpiamos el contenido actual del contenedor
    
    // Convertir los argumentos en un array
    let argumentos = [];
    
    // Recorrer los argumentos recibidos
    for (let i = 0; i < arguments.length; i++) {
        // Si el argumento es un array, agregar cada uno de sus elementos a los argumentos
        if (Array.isArray(arguments[i])) {
            argumentos = argumentos.concat(arguments[i]); // Añadir los elementos del array al array `argumentos`
        } else {
            argumentos.push(arguments[i]);  // Si no es un array, añadir el argumento directamente
        }
    }

    const cofresMap = {
        'ch': 'chest.jpeg',
        'dch': 'double_chest.jpeg',
        'ech': 'ender_chest.jpeg',
        'v': 'vault.jpeg',
        'ov': 'ominous_vault.jpeg'
    };

    // Recorrer los argumentos recibidos y crear las imágenes
    for (var i = 0; i < argumentos.length; i++) {
        var item = argumentos[i];
        var cantidad = 1;  // Valor por defecto

        // Crear un contenedor para cada imagen y su cantidad
        var itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');  // Añadimos una clase para aplicar estilos (ver más abajo)

        // Si el item contiene un espacio, probablemente tiene una cantidad (ej. "10 ch")
        if (item.includes(' ')) {
            var partes = item.split(' ');  // Separa el número de la categoría (ej. "10" y "ch")
            cantidad = parseInt(partes[0]);  // Guardamos la cantidad
            item = partes[1];  // El tipo de ítem (por ejemplo, 'ch' o 'coins')
        }

        // Si el item contiene '_', es un ítem que tiene una imagen
        if (item.includes('_')) {
            var img = document.createElement('img');
            var partes = item.split('_')
            img.src = eval(partes[0])[item].src;  // Asumiendo que las imágenes están en la carpeta "images"
            img.alt = item;
            itemContainer.appendChild(img);
        } 
        // Si el item es uno de los cofres
        else if (cofresMap[item]) {
            var img = document.createElement('img');
            img.src = 'images/' + cofresMap[item];  // Obtener la imagen desde el mapa
            img.alt = item;

            // Mostrar la cantidad si es mayor que 1
            if (cantidad > 1) {
                var label = document.createElement('span');
                label.textContent = ` x${cantidad}`;  // Mostrar la cantidad
                itemContainer.appendChild(label);
            }
            itemContainer.appendChild(img);
        } 
        // Si el item es 'coins' (monedas)
        else if (item.includes('coins')) {
            var img = document.createElement('img');
            img.src = 'images/coin.png';  // Imagen de monedas
            img.alt = 'coins';

            // Mostrar la cantidad si es mayor que 1
            if (cantidad > 1) {
                var label = document.createElement('span');
                label.textContent = ` x${cantidad}`;  // Mostrar la cantidad
                itemContainer.appendChild(label);
            }
            itemContainer.appendChild(img);
        } 
        // Si el item es 'gems' (gemas)
        else if (item.includes('gems')) {
            var img = document.createElement('img');
            img.src = 'images/gem.png';  // Imagen de gemas
            img.alt = 'gems';

            // Mostrar la cantidad si es mayor que 1
            if (cantidad > 1) {
                var label = document.createElement('span');
                label.textContent = ` x${cantidad}`;  // Mostrar la cantidad
                itemContainer.appendChild(label);
            }
            itemContainer.appendChild(img);
        }

        // Añadir el contenedor al contenedor principal
        contenedor.appendChild(itemContainer);
    }

    toggle_showUnlock();  // Llamamos a la función para alternar la visibilidad
}





// Asegúrate de declarar e inicializar la variable antes de usarla
let showI = false;  // Declaración correcta de la variable

function toggle_showUnlock() {
    if (showI) {
        document.getElementById('showUnlock').style.display = 'none';
        document.getElementById('opacar107').style.display = 'none';
    } else {
        document.getElementById('showUnlock').style.display = 'block';
        document.getElementById('opacar107').style.display = 'block';
    }
    showI = !showI;  // Cambiar el valor de showI después de la condición
}


// Evento de escucha para las teclas "space" y "enter"
document.addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.key === 'Enter') {  // Verifica si la tecla presionada es espacio o enter
        if (showI) {  // Si el contenedor está visible
            toggle_showUnlock();  // Lo cerramos
        }
    }
});
