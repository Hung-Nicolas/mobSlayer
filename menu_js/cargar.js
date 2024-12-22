document.addEventListener('DOMContentLoaded', function(){
    cargar();
});
function cargar() {
    pers = JSON.parse(localStorage.getItem('pers'));
    for(let set of sets){
        //const sets = ['casco', 'pechera', 'pantalon', 'botas', 'espada'];
        load(set);
        loadIArm(set);
    }
    //STATS
    loadUI();//carga las stats de coins y gemas
    cargarEquip();//cargar los botones de las armaduras al seleccionao anterior
    actStats();//carga las stats del equipaje
    cargarStats_T();//cargar estadisticas de partida
    //ZERO
    zero();
    renderItems();
    renderItems2();
    actButtonStore();
    renderItems3();
    loadCantCofres('ch');
    loadCantCofres('dch');
    loadCantCofres('ech');
    loadCantCofres('v');
    loadCantCofres('ov');
    loadCantCofres('s');
    cargarSecciones();
    configurarEne(localStorage.getItem('diff')+'Set');
    
}
function load(tipo_arm) {
    // Determinar el objeto que corresponde al tipo de armamento
    let armamento = eval(tipo_arm);
    if (armamento) {
        // Iterar sobre todas las claves (elementos) del objeto armamento
        for (let key in armamento) {
            // Acceder a cada elemento y cambiar su estilo de fondo
            let element = document.getElementById(key);
            if(element && key.endsWith("nada")){
                element.style.backgroundImage = '';
            }
            if (element) {
                element.style.backgroundImage = `url(${armamento[key].src})`;
            }
        }
    }
}



function loadIArm(tipo_arm) {
    let obj = eval(tipo_arm)
    Object.keys(obj).forEach((material) => {
        const selector = `.i_${material}`;
        const elements = document.querySelectorAll(selector);

        elements.forEach((element) => {
            element.style.backgroundImage = `url(${obj[material].src})`;
        });
    });
}
function loadUI(){
    let coin = document.querySelector('#coins p');
    let gems = document.querySelector('#gems p');
    let ccoin = localStorage.getItem('coins');
    let cgems = localStorage.getItem('gems');
    coin.textContent=`Coins: ${ccoin}`;
    gems.textContent=`Gems: ${cgems}`;
}

function renderItems() {
    const items = [
        { id: 'ch', name: 'chest', price: 100 },
        { id: 'dch', name: 'double_chest', price: 500 },
        { id: 'ech', name: 'ender_chest', price: 1500 },
        { id: 'v', name: 'vault', price: 2500 },
        { id: 'ov', name: 'ominous_vault', price: 4000 },
        { id: 's', name:'shulker', price:1000}
    ];    
    const container = document.getElementById('items_a_comprar');
    container.innerHTML = ''; // Limpia el contenedor por si ya hay contenido

    items.forEach(item => {
        container.innerHTML += `
            <div id="b_${item.id}">
                <div id="${item.name}" class="buy_img"></div>
                <button class="buy_btn" onclick="t_info('${item.id}')">Info</button>
                <p>$${item.price}</p>
            </div>
        `;
    });
}
function renderItems2(){
    const items = [
        {id:'espada_superespada', price:300, type:'gems'}
    ];
    const container = document.getElementById('comprarExtra');
    container.innerHTML = '';
    items.forEach(item => {
        container.innerHTML += `
        <div id="b_${item.id}">
            <div id="${item.id}" style="background-image: url(images/${item.id}.png);" class="buy_img"></div>
            <button id="btn-${item.id}" class="buy_btn" onclick="buyArm('${item.id}', ${item.price})">Comprar</button> <!-- Pasa el id como cadena -->
            <p>💎 ${item.price}</p>
        </div>
        `;

    });
}
function renderItems3() {
    const items = [
        {id: '1000_coins', price: 50, type: 'coins'},
        {id: '2500_coins', price: 125, type: 'coins'},
        {id: '5000_coins', price: 250, type: 'coins'},
        {id: '10000_coins', price: 500, type: 'coins'},
        {id: '25000_coins', price: 1000, type: 'coins'}
    ];
    const container = document.getElementById('comprarCoins');
    container.innerHTML = '';
    items.forEach(item => {
        const idWithoutCoins = item.id.replace('_coins', ''); // Eliminar "coins" del id
        container.innerHTML += `
        <div id="b_${item.id}">
            <div id="${item.id}" style="background-image: url(images/coin.png);" class="buy_img"></div>
            <p>x${idWithoutCoins}</p> <!-- Mostrar el id sin "coins" -->
            <button class="buy_btn" onclick="buyCoins('${item.id}', ${item.price})">Comprar</button> <!-- Pasa el id como cadena -->
            <p>💎 ${item.price}</p>
        </div>
        `;

    });
}

// Función para cargar los niveles dinámicamente
function cargarNiveles(seccionNombre) {
    // Buscar el objeto correspondiente utilizando el nombre de la sección
    let seccion = eval(seccionNombre); // Accedemos al objeto de la sección (ej. 'seccion1', 'seccion2', etc.)
    
    if (!seccion) {
        return;
    }

    // Obtener el contenedor usando el nombre de la sección y añadiendo '_div'
    const contenedor = document.getElementById(`${seccionNombre}_div`); // Usamos `${seccionNombre}_div` como el ID del contenedor

    if (!contenedor) {
        return;
    }

    // Recorremos cada nivel dentro de la sección
    for (let nivel in seccion) {
        const nivelDiv = document.createElement("div");
        nivelDiv.id = nivel; // Establecemos un ID para cada nivel
        nivelDiv.className = "nivel"; // Clase para cada nivel

        // Establecemos el estilo dinámico para el `left`
        nivelDiv.style.left = `${10 * Object.keys(seccion).indexOf(nivel)}px`; // Establece la posición de cada nivel

        // Título del nivel
        const title = document.createElement("h1");
        title.className = "mobTitle";
        if(nivel.substring(5)!=10){
            title.textContent = `Nivel ${nivel.substring(5)}`;// Extraemos el número del nivel (nivel1 -> 1)
        }
        else{
            title.textContent = "Boss";
        }
         
        nivelDiv.appendChild(title);

        // Información del mob
        const mobDiv = document.createElement("div");
        mobDiv.className = "mob";
        mobDiv.style.backgroundImage = `url(images/${seccion[nivel].mob.entity}.png)`; // Mostramos la entidad del mob
        nivelDiv.appendChild(mobDiv);

        // Agregamos el botón de Play
        const playButton = document.createElement("button");
        playButton.id = `${seccionNombre}_${nivel.substring(5)}_play`;
        playButton.className = "play";
        playButton.textContent = "Play";
        playButton.onclick = () => playLevel(seccionNombre, `nivel${nivel.substring(5)}`); // Asignamos la función playLevel
        nivelDiv.appendChild(playButton);

        // Agregar los items
        let items = ['Espada', 'Casco', 'Pechera', 'Pantalon', 'Botas'];
        let items_minuscula = ['espada', 'casco', 'pechera', 'pantalon', 'botas'];

        let divC = document.createElement('div');
        divC.className = "mobItemsC";
        for (let i = 0; i < items.length; i++) {
            const div = document.createElement("div");
            div.className = "mobItems"; // Añadir la clase base

            // Añadir la clase correspondiente al item (Ej: "mobEspada", "mobCasco", etc.)
            div.classList.add(`mob${items[i]}`);

            // Acceder a la imagen del item correspondiente desde la sección
            let itemKey = items_minuscula[i]; // 'espada', 'casco', etc.
            let item = seccion[nivel].mob[itemKey]; // Acceder a la entidad (como 'nada', 'cuero', etc.)

            // Establecer la imagen en el fondo
            if(item.endsWith('nada')) {
                div.style.backgroundImage = ''; // Si no hay imagen, no asignamos fondo
            } else {
                div.style.backgroundImage = `url(images/${item}.jpeg)`; // Establecemos la imagen con el item
            }

            // Añadir el div al contenedor de items
            divC.appendChild(div);
        }
        let texto = document.createElement('div');
        let recomp = seccion[nivel].reward;
        let msg;
        if (recomp.startsWith('item_')) {
            const [, item, material] = recomp.split('_');
            
            const capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);  
            const capitalizedMaterial = material.charAt(0).toUpperCase() + material.slice(1);
            
            msg = `${capitalizedItem} de ${capitalizedMaterial}`;
        }
        
        else{
            // Mapeo de abreviaturas a nombres legibles
            const rewardMap = {
                ch: 'chest',
                dch: 'double chest',
                ech: 'ender chest',
                v: 'vault',
                ov: 'ominous vault',
                s:'shulker'
            };

            // Separar la cantidad y el tipo de recompensa
            let [amount, type] = recomp.split(' ');

            // Usar el mapeo para obtener el nombre legible
            let readableType = rewardMap[type] || type; // Si no está en el mapeo, usar el valor original

            // Asignar el texto legible al contenido
            msg = `Reward: ${amount} ${readableType}`;
        }
        
        texto.textContent = msg;
        texto.className = 'reward';
        nivelDiv.appendChild(divC);
        nivelDiv.append(texto);
        let claimButton = document.createElement('button');
        claimButton.className = 'claimButton';
        claimButton.id = `${seccionNombre}_nivel${nivel.substring(5)}_claimButton`;
        claimButton.textContent = 'Reclamar';
        claimButton.onclick = () => claimReward(seccionNombre, nivel);
        nivelDiv.append(claimButton);
        // Añadimos el nivel al contenedor principal
        contenedor.appendChild(nivelDiv);
    }
}
function claimReward(seccionName, levelName) {
    // Crear la clave combinada para guardar en localStorage
    let claimedKey = `${seccionName}_${levelName}Claimed`;
    
    let seccion = eval(seccionName);
    let level = eval(seccion[levelName]);
    // Obtener el estado actual de reclamación
    let claimed = localStorage.getItem(claimedKey) || 'false';

    if (claimed === 'false') {
        // Marcar como reclamado
        localStorage.setItem(claimedKey, 'true');

        // Dar la recompensa
        giveReward(level.reward);

        // Actualizar el botón

        loadUI();
        
    }
    actButton(seccionName, levelName);
}

function giveReward(reward) {
    // Asegurarse de que reward sea una cadena
    let rewardString = String(reward);
    if (rewardString.startsWith('item_')) {
        rewardString = rewardString.replace("item_", "");  // Asignar el valor modificado a rewardString
        Unlock(rewardString);
        showUnlock(rewardString);
    }
    else{
            // Dividir el valor de reward en cantidad y tipo
        const [amount, rewardType] = rewardString.split(' ');

        // Convertir la cantidad a un número entero
        const numericAmount = parseInt(amount, 10);

        // Obtener el valor actual del tipo de recompensa desde localStorage, o usar 0 si no existe
        const currentValue = parseInt(localStorage.getItem(rewardType) || '0', 10);

        // Sumar la cantidad nueva
        const newValue = currentValue + numericAmount;

        // Guardar el nuevo valor en localStorage
        localStorage.setItem(rewardType, newValue); 
        showUnlock(`${rewardString}`);
    }
}


function actButton(seccion,level){
    let completed = localStorage.getItem(`${seccion}_${level}Completed`)|| 'false';
    let claimedKey = `${seccion}_${level}Claimed`;
    let boton = document.getElementById(`${seccion}_${level}_claimButton`);
    let claimed = localStorage.getItem(claimedKey) || 'false';
    if(completed==='false'){
        boton.style.cursor = "not-allowed";
        boton.disabled = true;
        boton.textContent = 'Incompleto';
        boton.style.opacity = '0.5';
        boton.style.color = "rgba(128, 0, 0, 0.9)";
        boton.style.backgroundColor = "rgba(255, 100, 100, 0.5)";
    }
    if(claimed==='true'){
        boton.style.cursor = "not-allowed";
        boton.disabled = true;
        boton.textContent = 'Reclamado';
        boton.style.opacity = '0.5';
        boton.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
        boton.style.color = "black";
    }
}
function cargarSecciones() {
    // Iterar sobre las 5 secciones
    for (let i = 1; i <= 5; i++) {
        // Obtener la sección actual (ejemplo: seccion1, seccion2, ...)
        let seccionNombre = `seccion${i}`;
        let seccion = eval(seccionNombre); // Accedemos al objeto usando su nombre dinámicamente
        cargarNiveles(seccionNombre);
        if (!seccion) {
            continue;
        }
        // Iterar sobre los niveles dentro de la sección
        for (let nivel in seccion) {
            actButton(seccionNombre, nivel);
        }
        

    }
    actSeccion();
    
}
function actSeccion() {
    let totalSecciones = 5; // Total de secciones
    let seccionBloqueado;
    
    for(let i = 1; i <= totalSecciones; i++){
        let completed = localStorage.getItem(`seccion${i}_completed`);
        document.getElementById(`seccion${i}_div`).style.display = 'flex';
        if(completed===null||completed==='false'){
            seccionBloqueado = i+1;
            break;
        }
    }
    document.getElementById(`seccion${seccionBloqueado-1}_div`).style.display = 'flex';
    if(seccionBloqueado!=totalSecciones+1){
        document.getElementById(`seccion${seccionBloqueado}_div`).style.display = 'flex';
        let botones = document.getElementById(`seccion${seccionBloqueado}_div`).getElementsByClassName('play');
        for (let boton of botones) {
            boton.style.cursor = "not-allowed"; // Cambiar cursor a "no permitido"
            boton.disabled = true; // Deshabilitar el botón
            boton.textContent = '🔒'; // Colocar el emoji de bloqueado
            boton.style.opacity = '0.5'; // Cambiar la opacidad
        }
    }
    
    
}













function checkCode(event) {
    event.preventDefault(); // Evita el envío del formulario
    let form = event.target; // Obtén el formulario
    let guess = form.codeInput.value.trim(); // Obtén el valor ingresado y elimina espacios extra
    let texto = document.getElementById('canjeo');

    // Mapa para los cofres
    const cofresMap = {
        'chest': 'ch',
        'double chest': 'dch',
        'ender chest': 'ech',
        'vault': 'v',
        'ominous vault': 'ov'
    };

    if (codes.hasOwnProperty(guess)) {
        // Verifica si el código ya fue canjeado
        if (localStorage.getItem(`${guess}_canjeado`) === 'true') {
            texto.textContent = "Ya lo canjeaste";
            texto.style.color = "red";
        } else {
            // Desbloquea cada recompensa asociada al código
            let rewards = codes[guess];
            rewards.forEach(reward => {
                if (reward.includes('_')) {
                    Unlock(reward); // Llama a Unlock con los dos argumentos
                } else {
                    // Es un cofre u otra recompensa
                    let [cantidad, tipo] = reward.split(' '); // Divide la cantidad y el tipo (ejemplo: "1 chest")
                    cantidad = parseInt(cantidad); // Asegura que la cantidad sea un número

                    // Verifica si el tipo está en el mapa de cofres
                    if (cofresMap.hasOwnProperty(tipo)) {
                        let cofreKey = cofresMap[tipo]; // Obtén la clave del cofre (ej: "ch")
                        let currentCount = parseInt(localStorage.getItem(cofreKey)) || 0; // Obtén la cantidad actual
                        localStorage.setItem(cofreKey, currentCount + cantidad); // Incrementa la cantidad
                    } else if (tipo === "coins" || tipo === "gems") {
                        let currentCount = parseInt(localStorage.getItem(tipo)) || 0; // Asegúrate de que sea un número
                        localStorage.setItem(tipo, currentCount + cantidad); // Incrementa la cantidad
                    } else {
                        let currentCount = parseInt(localStorage.getItem(tipo)) || 0; // Asegúrate de que sea un número
                        localStorage.setItem(tipo, currentCount + cantidad); // Incrementa la cantidad
                    }
                    
                    
                }
            });

            // Muestra las recompensas desbloqueadas
            showUnlock(...rewards);
            loadUI();
            texto.textContent = "Canjeado perfectamente";
            texto.style.color = "green";
            localStorage.setItem(`${guess}_canjeado`, 'true'); // Marca el código como canjeado
        }
    } else {
        texto.textContent = "Código no válido";
        texto.style.color = "red";
    }

    form.reset(); // Limpia el formulario
    setTimeout(() => {
        texto.textContent = ""; // Borra el mensaje después de 5 segundos
    }, 5000);
}
