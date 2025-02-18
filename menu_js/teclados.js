let teclas = {}; // Objeto global para almacenar las teclas asignadas
let isChangingKey = false; // Variable para evitar múltiples cambios simultáneos

function changeKey(key) {
    if (isChangingKey) return; // Evitar múltiples cambios
    isChangingKey = true;

    let button = document.getElementById(`btn_ck_${key}`);
    if (!button) return;

    button.textContent = 'Presiona una tecla...';

    // Deshabilitar botones mientras se elige una tecla
    document.querySelectorAll('.changeKeyBtn').forEach(btn => btn.disabled = true);

    document.addEventListener("keydown", function eventHandler(event) {
        // Guardar en objeto 
        teclas[key] = event.key;


        // Actualizar el botón
        button.textContent = event.key;

        // Habilitar botones
        document.querySelectorAll('.changeKeyBtn').forEach(btn => btn.disabled = false);
        isChangingKey = false;

        document.removeEventListener("keydown", eventHandler);
    }, { once: true });
}

// Guardar todas las teclas con validación de repetidos
function saveKeys() {
    let errorMsg = document.getElementById("errormsg_savekeys");

    let keysArray = Object.keys(teclas).map(key => teclas[key]);
    let uniqueKeys = new Set(keysArray);

    if (uniqueKeys.size !== keysArray.length) {
        errorMsg.textContent = "⚠️ No puedes guardar teclas repetidas.";
        errorMsg.style.color = "red";
        return;
    }

    for (let key in teclas) {
        localStorage.setItem(`key_${key}`, teclas[key]);
    }

    errorMsg.textContent = "✅ Configuración guardada correctamente.";
    errorMsg.style.color = "green";
}

// Cargar teclas guardadas al iniciar
function loadKeys() {
    let keys = ["Atq", "Def", "Sup", "Esp1", "Esp2", "Skip"];
    keys.forEach(key => {
        let savedKey = localStorage.getItem(`key_${key}`);
        if (savedKey) {
            teclas[key] = savedKey;
            let button = document.getElementById(`btn_ck_${key}`);
            if (button) {
                button.textContent = savedKey;
            }
        }
    });
}

// Valores por defecto
const defaultKeys = {
    Atq: '1',
    Def: '2',
    Sup: '3',
    Esp1: '4',
    Esp2: '5',
    Skip: 's'
};

// Reiniciar una tecla específica
function resetKey(key) {
    if (!defaultKeys[key]) return;

    teclas[key] = defaultKeys[key];
    localStorage.setItem(`key_${key}`, defaultKeys[key]);

    let button = document.getElementById(`btn_ck_${key}`);
    if (button) button.textContent = defaultKeys[key];

    let msg = document.getElementById('errormsg_savekeys');
    if (msg) {
        msg.textContent = `Tecla ${key} reiniciada a ${defaultKeys[key]}`;
        msg.style.color = "green";
    }
}

// Reiniciar todas las teclas
function resetAllKeys() {
    for (let key in defaultKeys) {
        teclas[key] = defaultKeys[key];
        localStorage.setItem(`key_${key}`, defaultKeys[key]);

        let button = document.getElementById(`btn_ck_${key}`);
        if (button) button.textContent = defaultKeys[key];
    }

    let msg = document.getElementById('errormsg_savekeys');
    if (msg) {
        msg.textContent = "Todas las teclas han sido reiniciadas.";
        msg.style.color = "green";
    }

    loadKeys(); // Para asegurar que todo se actualice correctamente
}

// Cargar las teclas cuando la página cargue
document.addEventListener("DOMContentLoaded", loadKeys);
