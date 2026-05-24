# ⚔️ mobSlayer

Juego de combate por turnos inspirado en Minecraft, jugable desde el navegador. Enfrentá mobs, equipate con armaduras y armas, y sobrevivir raids cada vez más difíciles.

**Versión actual: 1.4 — "Ataques especiales"**

[Link MobSlayer](https://hung-nicolas.github.io/mobSlayer/)
---

## 🎮 Cómo jugar

Abrí `index.html` en el navegador. No requiere instalación ni servidor.

### Controles por defecto

| Acción | Tecla |
|---|---|
| Ataque | `1` |
| Defensa | `2` |
| Super | `3` |
| Especial 1 | `4` |
| Especial 2 | `5` |
| Skip | `S` |
| Play again / Usar mismo botón | `Enter` / `Space` |

> Los controles son **completamente personalizables** desde Opciones → Teclados.

---

## ✨ Funcionalidades

- **Niveles** — 5 secciones de dificultad progresiva
- **Raids** — Pillagers, Marinos y Trial Chambers con confirmación previa
- **Bestiario** — Info de cada mob, drops y estadísticas
- **Equipamiento** — Armadura completa (casco, pechera, pantalón, botas) y armas (espada, arco, ballesta, tridente, mace, y más)
- **Inventario / Bag** — Pociones, cofres y mapas de raid
- **Tienda** — Compra de ítems con coins y gems
- **Códigos canjeables** — Sistema de códigos con recompensas
- **Estadísticas** — Partidas ganadas, perdidas, daño infligido y recibido
- **Música de fondo** — Activable/desactivable desde Opciones

---

## 📁 Estructura del proyecto

```
├── index.html              # Menú principal
├── Match.html              # Pantalla de combate
├── styles.css              # Estilos del menú
├── match.css               # Estilos del combate
├── images/                 # Sprites, íconos y assets visuales
├── SFX/                    # Música y efectos de sonido
├── menu_js/
│   ├── main.js
│   ├── first.js
│   ├── cargar.js           # Carga de estado guardado
│   ├── contenedores.js     # Navegación entre pantallas
│   ├── stats.js            # Estadísticas del jugador
│   ├── audios.js           # Control de música
│   ├── equipaje.js         # Sistema de equipamiento
│   ├── chest.js            # Cofres y drops
│   ├── difficulty.js       # Dificultades de combate
│   ├── teclados.js         # Keybindings personalizables
│   └── codes.js            # Códigos canjeables
├── menu&match_js/
│   ├── secciones.js        # Secciones y niveles
│   └── object.js           # Definición de mobs e ítems
└── match_js/               # Lógica de combate
```

---

## 🛠️ Tecnologías

- HTML5 + CSS3 + JavaScript vanilla
- `localStorage` para persistencia del progreso

---

## 🗺️ Historial de versiones

- **v1.4** — Ataques especiales
- **v1.3** y anteriores — Ver en Opciones → Actualización dentro del juego
