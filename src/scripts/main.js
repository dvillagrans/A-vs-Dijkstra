import { Tablero } from './tablero.js';
import { AStar } from './astar.js';

let tablero;
let astar;
let ctxA;

export function inicializa() {
    const canvasA = document.getElementById('canvasA');

    if (!canvasA) {
        console.error('Canvas not found');
        return;
    }

    ctxA = canvasA.getContext('2d');
    const size = Math.min(canvasA.parentElement.clientWidth, canvasA.parentElement.clientHeight);
    canvasA.width = canvasA.height = size;

    const columnas = 50;
    const filas = 50;
    const anchoF = Math.floor(canvasA.width / columnas);
    const altoF = Math.floor(canvasA.height / filas);

    // Crear tablero y inicializarlo
    tablero = new Tablero(columnas, filas, anchoF, altoF);
    tablero.inicializar();

    // Definir puntos de inicio y fin
    let inicio = tablero.escenario[0][0];
    let fin = tablero.escenario[columnas - 1][filas - 1];

    // Inicializar A* con el tablero, inicio y fin
    astar = new AStar(tablero, inicio, fin);

    // Iniciar animación
    requestAnimationFrame(animar);
}

function animar() {
    let pasosPorFrame = 5; // Acelera la animación haciendo 5 pasos por frame
    for (let i = 0; i < pasosPorFrame; i++) {
        if (!astar.terminado) {
            astar.buscarUnPaso();
        }
    }
    dibujarTablero(); // Redibuja el tablero con los cambios

    if (!astar.terminado) {
        requestAnimationFrame(animar); // Continuar animación
    } else {
        console.log('Animación finalizada');
    }
}


function dibujarTablero() {
    const canvasA = document.getElementById('canvasA');
    if (!canvasA || !ctxA) {
        console.error('Canvas o contexto no encontrados.');
        return;
    }

    if (canvasA.width === 0 || canvasA.height === 0) {
        console.error('El tamaño del canvas es incorrecto.');
        return;
    }

    ctxA.clearRect(0, 0, canvasA.width, canvasA.height); // Limpiar el canvas
    tablero.dibujaEscenario(ctxA); // Dibuja el escenario actualizado
}

// Añadir eventos necesarios para iniciar o reiniciar la simulación

window.onload = function () {
    if (!tablero) {
        inicializa();
    }
};