//FUNCIONES DE LA TIENDA
let info = false;
function t_info(chest){
    desopacar(chest);
    loadCantCofres(chest);
}

function buyChest(chest) {
    let coins = parseInt(localStorage.getItem('coins')) || 0;
    let chestPrice = chestInfo[chest]?.price || 0; // Obtener el precio desde chestInfo

    if (coins >= chestPrice) {
        let cant_chest = parseInt(localStorage.getItem(chest)) || 0;
        coins -= chestPrice;
        localStorage.setItem('coins', coins);
        localStorage.setItem(chest, cant_chest + 1);

        let chestP = document.getElementById(`${chest}_p`);
        chestP.textContent = 'Compra exitosa!';
        chestP.style.color = 'green';
        
        setTimeout(() => {
            chestP.textContent = '';
        }, 5000);
    } else {
        let chestP = document.getElementById(`${chest}_p`);
        chestP.textContent = 'Monedas insuficientes';
        chestP.style.color = 'red';
        
        setTimeout(() => {
            chestP.textContent = '';
        }, 5000);
    }

    loadUI();
    loadCantCofres(chest);
    actUseBtn('items_' + chest);
    actBtnTxt('items_' + chest);
}

function loadCantCofres(chest){
    let cant_chest = localStorage.getItem(chest);
    let p =document.getElementById(`cant_${chest}`);
    p.textContent=`Tienes: ${cant_chest}`;
}
//ABRIR COFRES
//////////////////////////
const chestInfo = {
    'ch': {
        'drop': {
            'espada_madera': 14,
            'casco_cuero': 14,
            'pechera_cuero': 14,
            'pantalon_cuero': 14,
            'botas_cuero': 14,
            'espada_piedra': 5,
            'casco_malla': 5,
            'pechera_malla': 5,
            'pantalon_malla': 5,
            'botas_malla': 5,
            'espada_oro': 1,
            'casco_oro': 1,
            'pechera_oro': 1,
            'pantalon_oro': 1,
            'botas_oro': 1
        },
        'price': 500,
        'cant': 1
    },
    'dch': {
        'drop': {
            'espada_madera': 9,
            'casco_cuero': 9,
            'pechera_cuero': 9,
            'pantalon_cuero': 9,
            'botas_cuero': 9,
            'espada_piedra': 8,
            'casco_malla': 8,
            'pechera_malla': 8,
            'pantalon_malla': 8,
            'botas_malla': 8,
            'espada_oro': 2.8,
            'casco_oro': 2.8,
            'pechera_oro': 2.8,
            'pantalon_oro': 2.8,
            'botas_oro': 2.8,
            'espada_hierro': 1,
            'casco_hierro': 1,
            'pechera_hierro': 1,
            'pantalon_hierro': 1,
            'botas_hierro': 1
        },
        'price': 1000,
        'cant': 2
    },
    'gch': {
        'drop': {
            'espada_madera': 3,
            'casco_cuero': 3,
            'pechera_cuero': 3,
            'pantalon_cuero': 3,
            'botas_cuero': 3,
            'espada_piedra': 6,
            'casco_malla': 6,
            'pechera_malla': 6,
            'pantalon_malla': 6,
            'botas_malla': 6,
            'espada_oro': 8,
            'casco_oro': 8,
            'pechera_oro': 8,
            'pantalon_oro': 8,
            'botas_oro': 8,
            'espada_hierro': 3,
            'casco_hierro': 3,
            'pechera_hierro': 3,
            'pantalon_hierro': 3,
            'botas_hierro': 3
        },
        'price': 2000,
        'cant': 2
    },
    'ech': {
        'drop': {
            'espada_piedra': 5,
            'casco_malla': 5,
            'pechera_malla': 5,
            'pantalon_malla': 5,
            'botas_malla': 5,
            'espada_oro': 8,
            'casco_oro': 8,
            'pechera_oro': 8,
            'pantalon_oro': 8,
            'botas_oro': 8,
            'espada_hierro': 6,
            'casco_hierro': 6,
            'pechera_hierro': 6,
            'pantalon_hierro': 6,
            'botas_hierro': 6,
            'espada_diamante': 1,
            'casco_diamante': 1,
            'pechera_diamante': 1,
            'pantalon_diamante': 1,
            'botas_diamante': 1
        },
        'price': 4000,
        'cant': 2
    },
    'v': {
        'drop': {
            'espada_oro': 6,
            'casco_oro': 6,
            'pechera_oro': 6,
            'pantalon_oro': 6,
            'botas_oro': 6,
            'espada_hierro': 9.8,
            'casco_hierro': 9.8,
            'pechera_hierro': 9.8,
            'pantalon_hierro': 9.8,
            'botas_hierro': 9.8,
            'espada_diamante': 4,
            'casco_diamante': 4,
            'pechera_diamante': 4,
            'pantalon_diamante': 4,
            'botas_diamante': 4,
            'espada_netherite': 0.2,
            'casco_netherite': 0.2,
            'pechera_netherite': 0.2,
            'pantalon_netherite': 0.2,
            'botas_netherite': 0.2
        },
        'price': 10000,
        'cant': 3
    },
    'ov': {
        'drop': {
            'espada_oro': 1,
            'casco_oro': 1,
            'pechera_oro': 1,
            'pantalon_oro': 1,
            'botas_oro': 1,
            'espada_hierro': 9,
            'casco_hierro': 9,
            'pechera_hierro': 9,
            'pantalon_hierro': 9,
            'botas_hierro': 9,
            'espada_diamante': 8,
            'casco_diamante': 8,
            'pechera_diamante': 8,
            'pantalon_diamante': 8,
            'botas_diamante': 8,
            'espada_netherite': 2,
            'casco_netherite': 2,
            'pechera_netherite': 2,
            'pantalon_netherite': 2,
            'botas_netherite': 2
        },
        'price': 25000,
        'cant': 3
    },
    's': {
        'drop': {
            'espada_madera': 15,
            'espada_piedra': 20,
            'espada_arco': 25,
            'espada_oro': 25,
            'espada_hierro': 14,
            'espada_diamante': 1
        },
        'price': 2500,
        'cant': 1
    }
};



// Función para generar número aleatorio
function rnd(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

// Función para abrir un cofre
function normalizeProbabilities(chest) {
    let dropTable = chestInfo[chest].drop; // Acceder a los drops del cofre
    let total = Object.values(dropTable).reduce((sum, value) => sum + value, 0);
    let normalized = {};

    for (let item in dropTable) {
        normalized[item] = dropTable[item] / total; // Convertir a porcentaje relativo
    }

    return normalized;
}


function getRandomItem(chest) {
    let normalized = normalizeProbabilities(chest);
    let rnd = Math.random();
    let cumulative = 0;

    for (let item in normalized) {
        cumulative += normalized[item];
        if (rnd < cumulative) {
            return item;
        }
    }
}

function openChest(chest) {
    let cant_chest = parseInt(localStorage.getItem(chest)) || 0; 

    if (cant_chest > 0) {
        let items = [];
        let cantidad = chestInfo[chest]?.cant || 1; // Cantidad de ítems que genera este cofre

        for (let i = 0; i < cantidad; i++) {
            let item = getRandomItem(chest);
            Unlock(item);
            items.push(item);
        }

        showUnlock(items);
        new Audio('SFX/orb.mp3').play();

        localStorage.setItem(chest, cant_chest - 1);
        loadCantCofres(chest);
        actUseBtn('items_' + chest);
        actBtnTxt('items_' + chest);

        return items;
    } else {
        let chestP = document.getElementById(`${chest}_p`);
        chestP.textContent = 'No tienes cofres';
        chestP.style.color = 'red';
        setTimeout(() => {
            chestP.textContent = '';
        }, 5000);
    }

    loadCantCofres(chest);
    actUseBtn('items_' + chest);
    actBtnTxt('items_' + chest);
}




        
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
        'dch': 'double_chest.png',
        'ech': 'ender_chest.jpeg',
        'gch':'golden_chest.png',
        'v': 'vault.jpeg',
        'ov': 'ominous_vault.jpeg',
        's': 'shulker.png'
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
function buyCoins(item, price) {
    let gems = parseInt(localStorage.getItem('gems')); 
    if (gems >= price) {
        gems -= price;
        localStorage.setItem('gems', gems);

        const [cant, coins] = item.split('_');
        let currentCoins = parseInt(localStorage.getItem('coins')) || 0; 
        currentCoins += parseInt(cant); 
        localStorage.setItem('coins', currentCoins); 

        showUnlock(`${cant} ${coins}`); 
        loadUI(); 
    } else {
        console.log("No tienes suficientes gemas.");
    }
}
function infoSword(sword){
    desopacar('infoesp');
    let recortado = {
        'espada_superespada': 'Superespada',
        'espada_amatista-staff': 'Staff de amatista',
        'espada_fuego': 'Espada de fuego'
    };
    let infos = {
        'espada_superespada': 'Habilidad especial: explosion(Desata un poderoso golpe que combina la fuerza del ataque con la resistencia del escudo)\nPuntos para la habilidad: 10\nPuntos iniciales: 5',
        'espada_amatista-staff': 'Habilidad especial: absorcion (Al golpear al enemigo, parte del daño infligido se convierte en vida para el usuario)\nPuntos para la habilidad: 5\nPuntos iniciales: 2',
        'espada_fuego': 'Habilidad especial: fuego (Ataca con llamas, causando daño inmediato y quemaduras que infligen daño por turnos)\nPuntos para la habilidad: 2\nPuntos iniciales: 2'
    };
    setTimeout(() => { 
        let imgElement = document.getElementById('infoespimg');
        let infoesptitle = document.getElementById('infoesptitle');
        let infoesptxt = document.getElementById('infoesptxt');
        let buyespbtn = document.getElementById('buyespbtn');
        let errormsg_infoesp = document.getElementById('errormsg_infoesp');
        if (imgElement) {
            imgElement.style.backgroundImage = `url(${espada[sword].src})`;
        }
        if (infoesptitle){
            infoesptitle.textContent = recortado[sword];
        }
        if(infoesptxt){
            infoesptxt.textContent = infos[sword];
            infoesptxt.innerHTML = infos[sword].replace(/\n/g, '<br>');
        }
        if (buyespbtn) {
            buyespbtn.onclick = () => buyArm(sword, 300);
            if(localStorage.getItem(sword)==='true'){
                buyespbtn.opacity = 0.7;
                buyespbtn.style.cursor = "not-allowed";
                boton.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
            }
        }
        if(errormsg_infoesp){
            errormsg_infoesp.textContent = '';
            errormsg_infoesp.style.color = 'red';
        }
        
        
    }, 50); // Espera 50ms para asegurarse de que el HTML se haya cargado
    

}
function buyArm(item, price){
    if(localStorage.getItem(item)==='true'){
        document.getElementById('errormsg_infoesp').textContent = 'Ya lo tienes';
        document.getElementById('errormsg_infoesp').style.color = 'red';
    }else{
      let gems = parseInt(localStorage.getItem('gems')); 
        if (gems >= price) {
            gems -= price;
            localStorage.setItem('gems', gems);
            Unlock(item);
            showUnlock(item);
            loadUI();
            var audio = new Audio('SFX/orb.mp3');
            audio.play();
            document.getElementById('errormsg_infoesp').textContent = 'Compra exitosa';
            document.getElementById('errormsg_infoesp').style.color = 'green';
        } else {
            console.log("No tienes suficientes gemas.");
            document.getElementById('errormsg_infoesp').textContent = 'Gemas Insuficientes';
            document.getElementById('errormsg_infoesp').style.color = 'red';
        }     
    }
    
}
