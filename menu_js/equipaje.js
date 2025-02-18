const sets = ['casco', 'pechera', 'pantalon', 'botas', 'espada'];

//SELECCIONAR EQUIPAMIENTO
/////////////////////////////
function select(arm){//MOSTRAR INTERFAZ PARA SELECCIONAR
    desopacar(arm);
    for(let key in items){
        actBtnTxt('items_'+key);
    }
}
function equip(arm){//EQUIPAR ARMADURA SELECCIONADA
    if(localStorage.getItem(arm)==='true'){
        const [part, material] = arm.split('_'); 
        let armadur = document.getElementById(part);//botones
        pers[part] = arm; 
        localStorage.setItem('pers', JSON.stringify(pers));
        if(material=='nada'){
            armadur.style.backgroundColor='#fff';
            armadur.style.backgroundImage='';
        }
        else if(material!='nada'){
            armadur.style.backgroundImage=`url(${eval(part)[arm].src})`;
        }
        if(localStorage.getItem('first')==="true"){
            select(part);
        }
        actStats();  
    }
    
}
//AGREGAR VIDAS Y DAÑO
//////////////////////////////////////////////////////////////
let pers = {};
let daño_max;
let vida_total;

let vida = document.getElementById('vida_p');
let daño = document.getElementById('daño_p');
function zero() {//BLOQUEA TODAS LAS OPCIONES Y DESBLOQUEA LAS DESBLOQUEADAS
    let botones = document.querySelectorAll('.opc');

    botones.forEach(function(boton) {
        // Obtener la clave correspondiente en localStorage
        let desbloqueado = localStorage.getItem(boton.id);

        if(desbloqueado==='true'){
    
        }else{
            boton.style.opacity = 0.5;
        }
    });
}
function Unlock(arm) {//DESBLOQUEAR EQUIP
    let boton = document.getElementById(arm);
    if(boton){
        boton.classList.remove('boton-deshabilitado');
        boton.disabled = false;
        boton.style.opacity = 1.0;
    }
    // Guardar en localStorage el estado de desbloqueo como true
    localStorage.setItem(arm, true);
}
function lock(arm) {//BLOQUEAR EQIP

    let boton = document.getElementById(arm);
    boton.classList.add('boton-deshabilitado');
    boton.disabled = true;

    // Guardar en localStorage el estado de desbloqueo como true
    localStorage.setItem(arm, false);
}