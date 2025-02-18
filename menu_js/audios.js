// VARIABLE INICIAL
let playMusic = JSON.parse(localStorage.getItem('playMusic')); // Cargar como booleano
let savedTime = parseFloat(localStorage.getItem('audioTime')) || 0; // Cargar tiempo guardado o iniciar en 0

document.addEventListener('DOMContentLoaded', function() {
    let miAudio = document.getElementById('lobby_theme');
    miAudio.currentTime = savedTime; // Establecer la posición del audio

    if (playMusic) {
        miAudio.play().catch(function(error) {
            console.log("Error playing audio:", error);
        });
    }

    // Guardar la posición actual del audio antes de salir
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('audioTime', miAudio.currentTime); // Guardar posición actual
        miAudio.pause(); // Pausar el audio
    });
});

// OPCIONES DE MÚSICA
function pausar() {
    let miAudio = document.getElementById('lobby_theme');
    miAudio.pause();
    playMusic = false;
    localStorage.setItem('playMusic', JSON.stringify(playMusic)); // Guardar estado
}

function despausar() {
    let miAudio = document.getElementById('lobby_theme');
    miAudio.play().catch(function(error) {
        console.log("Error playing audio:", error);
    });
    playMusic = true;
    localStorage.setItem('playMusic', JSON.stringify(playMusic)); // Guardar estado
}
