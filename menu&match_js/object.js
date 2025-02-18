const espada = {
    "espada_nada": {
        dañomax: 100,
        atq_esp: [],
        src: 'images/barrier.png',
        name: 'Puños',
        descr: 'Dar palizas con puño limpio.',
        calidad: 'basica',
        showing:'start'
    },
    "espada_madera": {
        dañomax: 200,
        atq_esp: [],
        src: 'images/espada_madera.jpeg',
        name: 'Espada de Madera',
        descr: 'Una espada hecha de madera, nada más...',
        calidad: 'basica',
        showing:'start'
    },
    "espada_piedra": {
        dañomax: 300,
        atq_esp: [],
        src: 'images/espada_piedra.jpeg',
        name: 'Espada de Piedra',
        descr: 'Más fuerte que la de madera, pero aún básica.',
        calidad: 'especial',
        showing:'start'
    },
    "espada_oro": {
        dañomax: 400,
        atq_esp: [],
        src: 'images/espada_oro.jpeg',
        name: 'Espada de Oro',
        descr: 'Brillante y lujosa, pero no muy fuerte.',
        calidad: 'superespecial',
        showing:'start'
    },
    "espada_hierro": {
        dañomax: 500,
        atq_esp: [],
        src: 'images/espada_hierro.jpeg',
        name: 'Espada de Hierro',
        descr: 'Un arma confiable y fuerte para la batalla.',
        calidad:'epica',
        showing:'start'
    },
    "espada_diamante": {
        dañomax: 600,
        atq_esp: [],
        src: 'images/espada_diamante.jpeg',
        name: 'Espada de Diamante',
        descr: 'Extremadamente afilada y fuerte.',
        calidad: 'legendaria',
        showing:'start'
    },
    "espada_netherite": {
        dañomax: 700,
        atq_esp: [],
        src: 'images/espada_netherite.jpeg',
        name: 'Espada de Netherite',
        descr: 'La mejor espada, indestructible y poderosa.',
        calidad: 'mitica',
        showing:'start'
    },
    "espada_arco": {
        dañomax: 100,
        atq_esp: ['shoot'],
        src: 'images/espada_arco.png',
        name: 'Arco',
        descr: 'Dispara flechas a distancia con precisión.\nHabilidad: disparar(Cuanto mas recargue, mas fuerte será)',
        calidad: 'especial',
        showing:'start'
    },
    "espada_ballesta":{
        dañomax: 200,
        atq_esp: ['directShoot'],
        src: 'images/espada_ballesta.png',
        name: 'Ballesta',
        descr: 'Dispara flechas cargadas.\nHabilidad: disparar directamente(Cuanto mas recargue, mas fuerte será, el disparo no afectara al turno)',
        calidad: 'epica',
        showing:'afterBoss1'
    },
    "espada_tridente":{
        dañomax: 400,
        atq_esp: ['lealtad'],
        src: 'images/espada_tridente.png',
        name: 'Tridente',
        descr: 'Capaz de perforar con presición.\nHabilidad: lealtad(tira el tridente y vuelve en turnos)',
        calidad: 'legendaria',
        showing:'afterBoss1'
    },
    "espada_mace":{
        dañomax: 500,
        atq_esp: ['stun'],
        src: 'images/espada_mace.png',
        name: 'Mace',
        descr: 'Un arma pesada y devastadora, diseñada para debilitar enemigos',
        calidad: 'mitica',
        showing:'afterBoss1'
    },
    "espada_superespada": {
        dañomax: 400,
        atq_esp: ['explosion'],
        src: 'images/espada_superespada.png',
        name: 'Super Espada',
        descr: 'Una espada con poder explosivo devastador.\nHabilidad: explosion(Desata un poderoso golpe que combina la fuerza del ataque con la resistencia del escudo)',
        calidad: 'exclusiva',
        showing:'start'
    },
    "espada_amatista-staff": {
        dañomax: 400,
        atq_esp: ['absorcion'],
        src: 'images/espada_amatista-staff.png',
        name: 'Bastón de Amatista',
        descr: 'Absorbe la energía de los enemigos para fortalecerte.\nHabilidad especial: absorcion (Al golpear al enemigo, parte del daño infligido se convierte en vida para el usuario)',
        calidad: 'exclusiva',
        showing:'start'
    },
    "espada_fuego": {
        dañomax: 400,
        atq_esp: ['fuego'],
        src: 'images/espada_fuego.png',
        name: 'Espada de Fuego',
        descr: 'Envuelta en llamas, quema todo lo que toca.\nHabilidad especial: fuego (Ataca con llamas, causando daño inmediato y quemaduras que infligen daño por turnos)',
        calidad: 'exclusiva',
        showing:'start'
    }
};


const casco = {
    "casco_nada": {
        extrahp: 0,
        boost: [],
        src: "images/barrier.png",
        name: "Sin casco",
        descr: "Ninguna protección en la cabeza.",
        calidad: 'basica',
        showing:'start'
    },
    "casco_cuero": {
        extrahp: 300,
        boost: [],
        src: "images/casco_cuero.jpeg",
        name: "Casco de cuero",
        descr: "Un casco de cuero.",
        calidad: 'basica',
        showing:'start'
    },
    "casco_malla": {
        extrahp: 600,
        boost: [],
        src: "images/casco_malla.jpeg",
        name: "Casco de malla",
        descr: "Un casco de malla.",
        calidad: 'especial',
        showing:'start'
    },
    "casco_oro": {
        extrahp: 900,
        boost: [],
        src: "images/casco_oro.jpeg",
        name: "Casco de oro",
        descr: "Un casco de oro.",
        calidad: 'superespecial',
        showing:'start'
    },
    "casco_hierro": {
        extrahp: 1200,
        boost: [],
        src: "images/casco_hierro.jpeg",
        name: "Casco de hierro",
        descr: "Un casco de hierro.",
        calidad: 'epica',
        showing:'start'
    },
    "casco_diamante": {
        extrahp: 1500,
        boost: [],
        src: "images/casco_diamante.jpeg",
        name: "Casco de diamante",
        descr: "Un casco de diamante.",
        calidad: 'legendaria',
        showing:'start'
    },
    "casco_netherite": {
        extrahp: 1800,
        boost: [],
        src: "images/casco_netherite.jpeg",
        name: "Casco de netherite",
        descr: "Un casco de netherite.",
        calidad: 'mitica',
        showing:'start'
    }
};
const pechera = {
    "pechera_nada": {
        extrahp: 0,
        boost: [],
        src: "images/barrier.png",
        name: "Sin pechera",
        descr: "Ninguna protección en el torso.",
        calidad: 'basica',
        showing:'start'
    },
    "pechera_cuero": {
        extrahp: 550,
        boost: [],
        src: "images/pechera_cuero.jpeg",
        name: "Pechera de cuero",
        descr: "Una pechera de cuero.",
        calidad: 'basica',
        showing:'start'
    },
    "pechera_malla": {
        extrahp: 1100,
        boost: [],
        src: "images/pechera_malla.jpeg",
        name: "Pechera de malla",
        descr: "Una pechera de malla.",
        calidad: 'especial',
        showing:'start'
    },
    "pechera_oro": {
        extrahp: 1650,
        boost: [],
        src: "images/pechera_oro.jpeg",
        name: "Pechera de oro",
        descr: "Una pechera de oro.",
        calidad: 'superespecial',
        showing:'start'
    },
    "pechera_hierro": {
        extrahp: 2200,
        boost: [],
        src: "images/pechera_hierro.jpeg",
        name: "Pechera de hierro",
        descr: "Una pechera de hierro.",
        calidad: 'epica',
        showing:'start'
    },
    "pechera_diamante": {
        extrahp: 2750,
        boost: [],
        src: "images/pechera_diamante.jpeg",
        name: "Pechera de diamante",
        descr: "Una pechera de diamante.",
        calidad: 'legendaria',
        showing:'start'
    },
    "pechera_netherite": {
        extrahp: 3300,
        boost: [],
        src: "images/pechera_netherite.jpeg",
        name: "Pechera de netherite",
        descr: "Una pechera de netherite.",
        calidad: 'mitica',
        showing:'start'
    }
};
const pantalon = {
    "pantalon_nada": {
        extrahp: 0,
        boost: [],
        src: "images/barrier.png",
        name: "Sin pantalón",
        descr: "Ninguna protección en las piernas.",
        calidad: 'basica',
        showing:'start'
    },
    "pantalon_cuero": {
        extrahp: 450,
        boost: [],
        src: "images/pantalon_cuero.jpeg",
        name: "Pantalón de cuero",
        descr: "Un pantalón de cuero.",
        calidad: 'basica',
        showing:'start'
    },
    "pantalon_malla": {
        extrahp: 900,
        boost: [],
        src: "images/pantalon_malla.jpeg",
        name: "Pantalón de malla",
        descr: "Un pantalón de malla.",
        calidad: 'especial',
        showing:'start'
    },
    "pantalon_oro": {
        extrahp: 1350,
        boost: [],
        src: "images/pantalon_oro.jpeg",
        name: "Pantalón de oro",
        descr: "Un pantalón de oro.",
        calidad: 'superespecial',
        showing:'start'
    },
    "pantalon_hierro": {
        extrahp: 1800,
        boost: [],
        src: "images/pantalon_hierro.jpeg",
        name: "Pantalón de hierro",
        descr: "Un pantalón de hierro.",
        calidad: 'epica',
        showing:'start'
    },
    "pantalon_diamante": {
        extrahp: 2250,
        boost: [],
        src: "images/pantalon_diamante.jpeg",
        name: "Pantalón de diamante",
        descr: "Un pantalón de diamante.",
        calidad: 'legendaria',
        showing:'start'
    },
    "pantalon_netherite": {
        extrahp: 2700,
        boost: [],
        src: "images/pantalon_netherite.jpeg",
        name: "Pantalón de netherite",
        descr: "Un pantalón de netherite.",
        calidad: 'mitica',
        showing:'start'
    }
};

const botas = {
    "botas_nada": {
        extrahp: 0,
        boost: [],
        src: "images/barrier.png",
        name: "Sin botas",
        descr: "Ninguna protección en los pies.",
        calidad: 'basica',
        showing:'start'
    },
    "botas_cuero": {
        extrahp: 250,
        boost: [],
        src: "images/botas_cuero.jpeg",
        name: "Botas de cuero",
        descr: "Unas botas de cuero.",
        calidad: 'basica',
        showing:'start'
    },
    "botas_malla": {
        extrahp: 500,
        boost: [],
        src: "images/botas_malla.jpeg",
        name: "Botas de malla",
        descr: "Unas botas de malla.",
        calidad: 'especial',
        showing:'start'
    },
    "botas_oro": {
        extrahp: 750,
        boost: [],
        src: "images/botas_oro.jpeg",
        name: "Botas de oro",
        descr: "Unas botas de oro.",
        calidad: 'superespecial',
        showing:'start'
    },
    "botas_hierro": {
        extrahp: 1000,
        boost: [],
        src: "images/botas_hierro.jpeg",
        name: "Botas de hierro",
        descr: "Unas botas de hierro.",
        calidad: 'epica',
        showing:'start'
    },
    "botas_diamante": {
        extrahp: 1250,
        boost: [],
        src: "images/botas_diamante.jpeg",
        name: "Botas de diamante",
        descr: "Unas botas de diamante.",
        calidad: 'legendaria',
        showing:'start'
    },
    "botas_netherite": {
        extrahp: 1500,
        boost: [],
        src: "images/botas_netherite.jpeg",
        name: "Botas de netherite",
        descr: "Unas botas de netherite.",
        calidad: 'mitica',
        showing:'start'
    }
};
const items = {
    "coins":{
        name: "Coins",
        descr:"Monedas de oro brillantes",
        calidad:'basica',
        src: "images/coin.png",
        showing:'start'
    },
    "gems":{
        name:"Gems",
        descr:"Gemas azules",
        calidad:'basica',
        src:"images/gem.png",
        showing:'start'
    },
    "ch":{
        name:"Chest",
        descr:"Cofre normal",
        calidad:'basica',
        src:"images/chest.jpeg",
        showing:'start'
    },
    "dch":{
        name:"Double chest",
        descr:"Cofre doble",
        calidad:'especial',
        src:"images/double_chest.png",
        showing:'start'
    },
    "gch":{
        name:"Golden chest",
        descr:"Cofre dorada brillante",
        calidad:'superespecial',
        src:"images/golden_chest.png",
        showing:'start'
    },
    "ech":{
        name:"Ender chest",
        descr:"Cofre de end",
        calidad:'epica',
        src:"images/ender_chest.jpeg",
        showing:'start'
    },
    "v":{
        name:"Vault",
        descr:"Un vault de la trial chambers",
        calidad:'legendaria',
        src:"images/vault.jpeg",
        showing:'start'
    },
    "ov":{
        name:"Ominous vault",
        descr:"Ominous vault de la trial chambers",
        calidad:'mitica',
        src:"images/ominous_vault.jpeg",
        showing:'start'
    },
    "s":{
        name:"Shulkerbox",
        descr:"Caja shulker",
        calidad:'superespecial',
        src:"images/shulker.png",
        showing:'start'
    },
    "pillagerMap":{
        name:"Mapa de raid de pillagers",
        descr:"Usalo para raidear",
        calidad:'epica',
        src:"images/pillagerMap.png",
        showing:'afterBoss1'
    },
    "marinoMap":{
        name:"Mapa de raid de mares",
        descr:"Usalo para raidear",
        calidad:'epica',
        src:"images/marinoMap.png",
        showing:'afterBoss1'
    },
    "trialchamberMap":{
        name:"Mapa de raid en trial chambers",
        descr:"Usalo para raidear",
        calidad:'epica',
        src:"images/trialchamberMap.png",
        showing:'afterBoss1'
    }
}
const entity = {
    "zombi": {
        hp: 1000,
        extradmg: 0,
        drops: {
            '100 coins': 100,
            '1 gems': 10,
            '1 ch': 30,
            '3 ch': 10,
            '1 dch':1,
            'espada_piedra': 5,
            '1 pillagerMap': 3,
            '1 marinoMap': 2,
            '1 trialchamberMap': 1
        },
        size: 'normal',
        showing: 'start',
        src: 'images/zombi.png',
        name:'Zombie',
        descr:'Un zombie'
    },
    "zombiePig": {
        hp: 3000,
        extradmg: 100,
        drops: {
            '100 coins': 100,
            '1 gems': 10,
            '1 ch': 35,
            '3 ch': 15,
            '1 dch':7,
            'espada_oro': 5,
            '1 pillagerMap': 3,
            '1 marinoMap': 2,
            '1 trialchamberMap': 1
        },
        size: 'normal',
        showing: 'start',
        src: 'images/zombiePig.png',
        name:'Hombre cerdo zombificado',
        descr:'Vino del nether'
    },
    "esqueleto": {
        hp: 2500,
        extradmg: 100,
        drops: {
            '100 coins': 100,
            '1 gems': 10,
            '1 ch': 30,
            '3 ch': 10,
            '1 dch':1,
            'espada_arco': 5,
            '1 pillagerMap': 3,
            '1 marinoMap': 2,
            '1 trialchamberMap': 1
        },
        size: 'normal',
        showing: 'start',
        src: 'images/esqueleto.png',
        name:'Esqueleto',
        descr:'Un esqueleto'
    },
    "herobrine": {
        hp: 9000,
        extradmg: 250,
        drops: {
            '100 coins': 100,
            '1 gems': 10,
            '1 dch': 5,
            '3 dch': 2,
            '1 gch':1,
            'espada_netherite': 0.01,
            '1 pillagerMap': 3,
            '1 marinoMap': 2,
            '1 trialchamberMap': 1
        },
        size: 'normal',
        showing: 'start',
        src: 'images/herobrine.png',
        name:'Herobrine',
        descr:'...'
    },
    "soporte": {
        hp: 100000,
        extradmg: 0,
        drops: {
            '100 coins': 100,
            '1 gems': 10,
            '1 s': 100,
            '1 pillagerMap': 3,
            '1 marinoMap': 2,
            '1 trialchamberMap': 1
        },
        size: 'normal',
        showing: 'start',
        src: 'images/soporte.png',
        name:'Soporte de armaduras',
        descr:'Sirve para probar items'
    },
    "pillager": {
        hp: 3000,
        extradmg: 50,
        drops: {
            '100 coins': 100,
            '1 gems': 10,
            '1 v': 10,
            '3 v': 3,
            'espada_ballesta':2
        },
        size: 'normal',
        showing: 'afterBoss1',
        src: 'images/pillager.png',
        name:'Pillager',
        descr:'Aldeano gris con ballesta'
    },
    "vindicator": {
        hp: 1500,
        extradmg: 300,
        drops: {
            '100 coins': 100,
            '1 gems': 10,
            '1 v': 10,
            '3 v': 3,
            'espada_ballesta':2
        },
        size: 'normal',
        showing: 'afterBoss1',
        src: 'images/vindicator.png',
        name:'Vindicador',
        descr:'Aldeano gris con hacha'
    },
    "evoker": {
        hp: 10000,
        extradmg: 400,
        drops: {
            '150 coins': 100,
            '1 gems': 100,
            '1 ov': 10,
            '3 v': 3,
            'espada_ballesta':10
        },
        size: 'normal',
        showing: 'afterBoss1',
        src: 'images/evoker.png',
        name:'Evocador',
        descr:'Aldeano gris mago'
    },
    "ahogado": {
        hp: 2500,
        extradmg: 150,
        drops: {
            '150 coins': 100,
            '1 gems': 10,
            '1 v': 15,
            '3 v': 5,
            'espada_piedra': 5,
            'espada_tridente': 1
        },
        size: 'normal',
        showing: 'afterBoss1',
        src: 'images/ahogado.png',
        name:'Ahogado',
        descr:'Un ahogado'
    },
    "guardian": {
        hp: 10000,
        extradmg: 50,
        drops: {
            '150 coins': 100,
            '1 gems': 10,
            '1 v': 15,
            '3 v': 5,
            'espada_tridente': 1
        },
        size: 'width',
        showing: 'afterBoss1',
        src: 'images/guardian.png',
        name:'Guardian',
        descr:'Un guardian del monumento'
    },
    "elderGuardian": {
        hp: 15000,
        extradmg: 125,
        drops: {
            '300 coins': 100,
            '1 gems': 100,
            '1 ov': 12,
            '3 ov':2,
            'espada_tridente': 5
        },
        size: 'width2',
        showing: 'afterBoss1',
        src: 'images/elderGuardian.png',
        name:'Guardian anciano',
        descr:'Guardian mayor'
    },
    
    "bogged": {
        hp: 4000,
        extradmg: 100,
        drops: {
            '300 coins': 100,
            '1 gems': 10,
            '1 v': 20,
            '3 v': 5,
            'espada_arco': 5,
            'espada_mace': 1
        },
        size: 'normal',
        showing: 'afterBoss1',
        src: 'images/bogged.png',
        name:'Bogged',
        descr:'Un bogged'
    },
    "husk": {
        hp: 1000,
        extradmg: 250,
        drops: {
            '300 coins': 100,
            '1 gems': 10,
            '1 v': 20,
            '3 v': 5,
            'espada_piedra': 5,
            'espada_mace': 1
        },
        size: 'normal',
        showing: 'afterBoss1',
        src: 'images/husk.png',
        name:'Husk',
        descr:'Un husk'
    },
    "breeze": {
        hp: 12000,
        extradmg: 350,
        drops: {
            '500 coins': 100,
            '1 gems': 100,
            '1 ov': 18,
            '3 ov': 3,
            'espada_arco': 5,
            'espada_mace': 5
        },
        size: 'big',
        showing: 'afterBoss1',
        src: 'images/breeze.png',
        name:'Breeze',
        descr:'Un breeze'
    }
    
};
