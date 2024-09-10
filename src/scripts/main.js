import { Tablero } from './tablero.js';
import { AStar } from './astar.js';
import { Casilla } from './tablero.js';

let tablero;
let astar;
let ctxA, ctxB;
var principio;
var fin;
var openSet = [];
var closedSet = [];
var camino = [];
var terminado = false;

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


    // Iniciar bucle principal
    setInterval(function () { principal(); }, 1000 / FPS);



}


for (let i = 0; i < openSet.length; i++) {
    openSet[i].coloreaOS();
}


//DIBUJA CLOSEDSET
for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].coloreaCS();
}



function dibujarTablero() {
    tablero.dibujaEscenario(ctxA);
    tablero.dibujaEscenario(ctxB);
}

function borraCanvas() {
    tablero.width = tablero.width;
    tablero.height = tablero.height;
}


function principal() {
    borraCanvas();
    dibujarTablero();
}