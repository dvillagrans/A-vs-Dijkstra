// main.js
import { Tablero } from './tablero.js';
import { AStar } from './astar.js';

let tablero;
let astar;
let principio;
let fin;
let ctxA, ctxB;
const columnas = 50;
const filas = 50;
const FPS = 50;

export function inicializa() {
    const canvasA = document.getElementById('canvasA');
    const canvasB = document.getElementById('canvasB');

    if (!canvasA || !canvasB) {
        console.error('Canvas not found');
        return;
    }

    ctxA = canvasA.getContext('2d');
    ctxB = canvasB.getContext('2d');

    const size = Math.min(
        canvasA.parentElement.clientWidth,
        canvasA.parentElement.clientHeight,
        canvasB.parentElement.clientWidth,
        canvasB.parentElement.clientHeight
    );
    canvasA.width = canvasA.height = canvasB.width = canvasB.height = size;

    // Inicializar escenario
    const anchoF = Math.floor(canvasA.width / columnas);
    const altoF = Math.floor(canvasA.height / filas);

    // Crear tablero
    tablero = new Tablero(columnas, filas, anchoF, altoF);
    tablero.inicializar();

    // Definir puntos de inicio y fin
    principio = tablero.escenario[0][0];
    fin = tablero.escenario[columnas - 1][filas - 1];

    // Inicializar A*
    astar = new AStar(tablero, principio, fin);

    // Dibujar el tablero inicial
    dibujarTablero();

    // Iniciar bucle principal
    setInterval(principal, 1000 / FPS);
}

function dibujarTablero() {
    tablero.dibujaEscenario(ctxA);
    tablero.dibujaEscenario(ctxB);
}

function principal() {
    dibujarTablero();
    const resultado = astar.buscar();
    if (resultado) {
        dibujarCamino(resultado);
    }
}

function dibujarCamino(camino) {
    ctxA.strokeStyle = 'red';
    ctxA.lineWidth = 2;
    ctxA.beginPath();
    camino.forEach((casilla, index) => {
        if (index === 0) {
            ctxA.moveTo(casilla.x * tablero.anchoF + tablero.anchoF / 2, casilla.y * tablero.altoF + tablero.altoF / 2);
        } else {
            ctxA.lineTo(casilla.x * tablero.anchoF + tablero.anchoF / 2, casilla.y * tablero.altoF + tablero.altoF / 2);
        }
    });
    ctxA.stroke();
}