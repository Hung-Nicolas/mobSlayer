//MOSTRAR CONTENEDORES
//////////////////////////
let estados_contenedores = {};

function toggle_c(cont) {
    if (typeof estados_contenedores[cont] === 'undefined') {
        estados_contenedores[cont] = false; // Inicializar el estado si no existe
    }
    let contenedor = document.getElementById(`cont_${cont}`);
    estados_contenedores[cont] = !estados_contenedores[cont]; // Alternar el estado del contenedor

    if (estados_contenedores[cont]) {
        contenedor.style.display = 'block';
    } else {
        contenedor.style.display = 'none';
    }
    if(cont==='batalla'&&localStorage.getItem('playedLevel') ==='false'){
        document.getElementById('btn_pelear').disabled = true;
        document.getElementById('tut_h1').textContent = 'Hola, bienvenido al tutorial, haz click en niveles';
    }else{
        if(document.getElementById('btn_pelear').disabled){
            document.getElementById('btn_pelear').disabled = false;
            document.getElementById('tut_h1').textContent = '';
        }
        
    }
}
let opacando;
function desopacar(cont = opacando) { 
    if (!cont) return; // Evita errores si aún no hay un valor en opacando
    toggle_c('opacar');
    document.getElementById('cont_opacar').style.zIndex=200;
    toggle_c(cont);
    document.getElementById(`cont_${cont}`).style.zIndex=201;
    opacando = cont;
    document.getElementById('showArmInfoCont').style.display = 'none';
    showingItem = 'none';
    showArmInfo_t=false;
}
let showArmInfo_t = false;
let showingItem = 'none';
const calidades = {
    'basica': 'Basic',
    'especial': 'Special',
    'superespecial': 'Super special',
    'epica': 'Epic',
    'legendaria': 'Legendary',
    'exclusiva': 'Exclusive',
    'mitica': 'Mythical'
}
const calidadesColor = {
    'basica': 'rgb(128, 128, 128)',
    'especial': 'rgb(0, 255, 0)',
    'superespecial': 'rgb(0, 255, 255)',
    'epica': 'rgb(255, 0, 128)',
    'legendaria': 'rgb(255, 255, 0)',
    'exclusiva': 'rgb(255, 128, 225)',
    'mitica': 'rgb(255, 0, 0)'
}
function showArmInfo(item) {
    let infoCont = document.getElementById('showArmInfoCont');
    let btn = document.getElementById('useItem_btn');
    let progreso = localStorage.getItem('progress') || 'start';

    // Si se vuelve a hacer clic en el mismo ítem, cerrar la ventana de información
    if (showArmInfo_t && showingItem === item) {
        infoCont.style.display = 'none';
        showingItem = 'none';
        showArmInfo_t = false;
        return;
    }

    // Mostrar la ventana de información
    infoCont.style.display = 'block';

    let isItem = item.startsWith('items');
    let itemKey = isItem ? item.replace('items_', '') : item;
    let itemData = isItem ? items[itemKey] : eval(item.split("_")[0])[item];

    // Verificar si está bloqueado
    let isLocked = itemData.showing === 'afterBoss1' && progreso === 'start';
    let itemImage = isLocked ? 'images/locked.png' : itemData.src;

    // Actualizar imagen, título y calidad
    document.getElementById('showArmInfoImg').style.backgroundImage = `url(${itemImage})`;
    let itemQuantity = isItem ? localStorage.getItem(itemKey) || 1 : ''; 
    document.getElementById('showArmInfoTitle').textContent = isLocked 
        ? 'Bloqueado' 
        : isItem 
            ? `${itemData.name} (x${itemQuantity})` 
            : itemData.name;

    document.getElementById('showArmInfoCalidad').textContent = isLocked ? '' : calidades[itemData.calidad];
    document.getElementById('showArmInfoCalidad').style.color = isLocked ? 'gray' : calidadesColor[itemData.calidad];
    document.getElementById('showArmInfoCalidad').style.border = isLocked ? 'none' : `1px solid ${calidadesColor[itemData.calidad]}`;
    document.getElementById('showArmInfoTxt').querySelector('p').innerHTML = isLocked ? 'Debes derrotar al jefe de la tercera seccion para desbloquear este ítem.' : itemData.descr.replace(/\n/g, "<br>");

    if (isLocked) {
        btn.style.display = 'none';
        document.getElementById('testItem_btn').style.display = 'none';
    } else {
        if (isItem) {
            let usable = ['ch', 'dch', 'ech', 'gch', 'v', 'ov', 's'];
            if (usable.includes(itemKey)) {
                btn.onclick = () => openChest(itemKey);
                btn.style.display = 'block';
                actUseBtn(item);
                actBtnTxt(item);
            } else {
                btn.style.display = 'none';
            }
            document.getElementById('testItem_btn').style.display = 'none';
        } else {
            btn.onclick = () => equip(item);
            btn.style.display = 'block';
            let testBtn = document.getElementById('testItem_btn');
            testBtn.onclick = () => testItem(item);
            testBtn.style.display = 'block';

            if (localStorage.getItem(item) !== "true") {
                btn.disabled = true;
                btn.style.color = 'red';
                btn.textContent = '🔒';
                btn.style.backgroundColor = 'rgba(128, 0, 0, 0.7)';
            } else {
                btn.disabled = false;
                btn.style.color = 'black';
                btn.textContent = 'Usar';
                btn.style.backgroundColor = 'rgba(255, 255, 0, 0.7)';
            }
        }
    }

    // Actualizar estado de visualización
    showArmInfo_t = true;
    showingItem = item;
}


function actUseBtn(id){
    let usable = ['ch', 'dch', 'gch', 'ech', 'v', 'ov', 's'];
    let btn = document.getElementById('useItem_btn');
    if (usable.includes(id.replace('items_', ''))) {
        if(parseInt(localStorage.getItem(id.replace('items_', '')))<=0){
            btn.disabled = true;
            btn.style.color = 'red';
            btn.textContent = '🔒';
            btn.style.backgroundColor = 'rgba(128, 0, 0, 0.7)';
        }else{
            btn.disabled = false;
            btn.style.color = 'black';
            btn.textContent = 'Usar';
            btn.style.backgroundColor = 'rgba(255, 255, 0, 0.7)';
        } 
    }
    
}
function actBtnTxt(id){
    let element = document.getElementById(id);
    let item = id.replace('items_','');
    element.textContent = 'x' + localStorage.getItem(item);
}
function showMobInfo(mob) {
    const mobData = entity[mob];

    if (!mobData) return; // Si el mob no existe, no hace nada

    const imgDiv = document.getElementById('mobsInfoImg');
    const title = document.getElementById('mobsInfoTitle');
    const description = document.getElementById('mobsInfoTxt').querySelector('p');

    if (mobData.showing === "afterBoss1" && localStorage.getItem('progress') === "start") {
        imgDiv.style.backgroundImage = "url(images/lockedEnemy.png)";
        imgDiv.style.backgroundColor = '#454545';
        title.textContent = "???";
        description.textContent = "Debes avanzar más para descubrir este enemigo.";
    } else {
        imgDiv.style.backgroundImage = `url(${mobData.src})`;
        title.textContent = mobData.name;
        description.textContent = mobData.descr;
    }

    imgDiv.style.backgroundSize = "contain"; // Ajusta la imagen sin deformarla
    imgDiv.style.backgroundRepeat = "no-repeat";
    imgDiv.style.backgroundPosition = "center";
    mostrarDropsBest(mob);
}
function mostrarDropsBest(mob) {
    const dropsContainer = document.getElementById('mobsInfoDropsCont');
    dropsContainer.innerHTML = ''; // Limpiar antes de agregar

    const mobData = entity[mob];
    if (!mobData || !mobData.drops) return; // Si el mob no tiene drops, no hace nada

    const isLocked = (mobData.showing === 'afterBoss1' && localStorage.getItem('progress') === 'start'); // Ver si el mob está bloqueado

    for (const drop in mobData.drops) {
        const dropDiv = document.createElement('div');
        dropDiv.className = 'mobsInfoDropsItems';
        dropDiv.textContent = `${mobData.drops[drop]}%`;

        // Determinar si es un item o armamento
        let itemSrc = "";
        let isHidden = false; // Control de visibilidad

        if (drop.includes(' ')) { 
            // Es un item (ej: '1 coins')
            const itemKey = drop.split(' ')[1]; // "coins"
            dropDiv.textContent = `${'x'+drop.split(' ')[0]+' '+mobData.drops[drop]}%`;
            itemSrc = items[itemKey]?.src || 'images/defaultItem.png';
            if (items[itemKey]?.showing === 'afterBoss1' && localStorage.getItem('progress') === 'start') {
                isHidden = true; // Ocultar si es del afterBoss1 y el usuario está en start
            }
        } else if (drop.includes('_')) { 
            // Es un armamento (ej: 'espada_diamante')
            const category = drop.split('_')[0]; // "espada"
            itemSrc = eval(category)?.[drop]?.src || 'images/locked.png';
        }

        // Aplicar imagen de fondo
        dropDiv.style.backgroundImage = `url(${itemSrc})`;
        dropDiv.style.backgroundSize = "contain";
        dropDiv.style.backgroundRepeat = "no-repeat";
        dropDiv.style.backgroundPosition = "center";

        // Ocultar si el mob está bloqueado o si el item es del afterBoss1 y el usuario está en start
        if (isLocked || isHidden) {
            dropDiv.hidden = true;
        }

        dropsContainer.appendChild(dropDiv);
    }
}
