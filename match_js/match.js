let exit = false;
function toggleExit() {
    let exit_div = document.getElementById('exit');
    exit = !exit; 
    if (exit) {
        exit_div.style.display = 'block';
        document.getElementById('opacar').style.display='block';
    } else {
        exit_div.style.display = 'none';
        document.getElementById('opacar').style.display='none';
    }
    let enemyData = JSON.parse(localStorage.getItem('enemy')); 

    if(enemyData.entity === 'soporte'){
        document.getElementById('quit_title').textContent = '¿Desea salir?';
    }
}
function cancelarBatalla(){
    let enemyData = JSON.parse(localStorage.getItem('enemy')); 
    if(game==='win'&&enemyData.entity!=='soporte'){
        PartidaGanada++;
        PartidaPerdida--;
        saveStats();
    }
    if(enemyData.entity==='soporte'){
        PartidaPerdida--;
        PartidaTotal--;
        saveStats();
        configurarEne('normalSet');
        localStorage.setItem('Probando', 'false');
    }
    localStorage.setItem('mobOnLevels', 'false');
    if(localStorage.getItem('raiding')==="true"){
        configurarEne('normalSet');
        localStorage.setItem('raiding', 'false');
        
    }else{
        configurarEne(localStorage.getItem('diff')+'Set');
    }
    
    localStorage.setItem('diff', 'facil');
    window.location.href='index.html';
}
function rnd(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
//VOLVER A JUGAR
const diffReward = {
    'facil':100,
    'normal':200,
    'dificil':300,
    'extremo':400
}
function PlayAgain(){
    if(localStorage.getItem('raiding')!=="true"&&localStorage.getItem('ProbandoArma')!=="true"){
        if(game==='win'){
            PartidaGanada++;
            saveStats();
        }
        localStorage.setItem('mobOnLevels', 'false');
        configurarEne(localStorage.getItem('diff')+'Set');
        localStorage.setItem('reward', diffReward[localStorage.getItem('diff')]);
        location.reload(true);
    }
    
}
function opEne() {
    let enemigo = {
        entity:'herobrine',
        casco: 'netherite',
        pechera: 'netherite',
        pantalon: 'netherite',
        botas: 'netherite',
        espada: 'netherite'
    };
    localStorage.setItem('enemy', JSON.stringify(enemigo));
    cargarTodoEnemigo();
    ActVida();
}
function revenge(){
    saveStats();
    location.reload(true);
}
function skipEne(){
    if(localStorage.getItem('ProbandoArma')==="false"&& localStorage.getItem('mobOnLevels')!=="true"&&localStorage.getItem('raiding')!=="true"){
        localStorage.setItem('mobOnLevels', 'false');
        configurarEne(localStorage.getItem('diff')+'Set');
        window.location.href = 'match.html';
    }
    
}
function skipLvl() {
    let lvl = localStorage.getItem('playingLevel'); // Obtiene el nivel actual del localStorage
    let parts = lvl.split('_'); // Divide el string "seccion1_nivel1" en ["seccion1", "nivel1"]
    
    let seccionName = parts[0]; // Extrae el nombre de la sección (en este caso, "seccion1")
    let nivelName = parts[1]; // Extrae el nombre del nivel (en este caso, "nivel1")
    
    // Encuentra el número del nivel actual, por ejemplo, "nivel1" -> 1
    let nivelNum = parseInt(nivelName.replace('nivel', ''));

    // Incrementa el número del nivel
    let nextNivelNum = nivelNum + 1;
    
    // Crea el nombre del próximo nivel, por ejemplo "nivel2"
    let nextNivelName = `nivel${nextNivelNum}`;

    if(game==='win'){
        PartidaGanada++;
        saveStats();
    }
    let seccion = eval(seccionName);
    let level = seccion[nextNivelName];
    localStorage.setItem('enemy', JSON.stringify(level.mob));
    localStorage.setItem('reward', JSON.stringify(100));
    localStorage.setItem('mobOnLevels', 'true');
    localStorage.setItem('playingLevel', `${seccionName}_${nextNivelName}`);
    window.location.href = 'Match.html';
}
