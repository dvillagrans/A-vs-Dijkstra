import { Tablero } from './tablero.js';
import { AStar } from './astar.js';
import { toast } from 'sonner'; // Importar toast desde Sonner

let tablero;
let astar;
let ctxA;
let inicio, fin;  // Definir inicio y fin como variables globales

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
    inicio = tablero.escenario[0][0];  // Guardamos las referencias globales
    fin = tablero.escenario[columnas - 1][filas - 1];

    // Inicializar A* con el tablero, inicio y fin
    astar = new AStar(tablero, inicio, fin);

    // Iniciar animación
    requestAnimationFrame(animar);
}

function animar() {
    let pasosPorFrame = 2; // Acelera la animación haciendo 5 pasos por frame
    for (let i = 0; i < pasosPorFrame; i++) {
        if (!astar.terminado) {
            astar.buscarUnPaso();
        }
    }
    dibujarTablero(); // Redibuja el tablero con los cambios

    if (!astar.terminado) {
        requestAnimationFrame(animar); // Continuar animación
    } else if (astar.camino.length > 0) {
        // Camino encontrado, mostrar notificación
        toast.success('Camino encontrado');
        console.log('Animación finalizada');
    } else {
        // No se encontró el camino, mostrar error
        toast.error('No se encontró un camino');
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

export function reiniciarTablero() {
    tablero.inicializar();  // Reiniciar el escenario

    // Redefinir inicio y fin
    inicio = tablero.escenario[0][0];
    fin = tablero.escenario[tablero.columnas - 1][tablero.filas - 1];

    // Reiniciar el algoritmo A*
    astar = new AStar(tablero, inicio, fin);

    // Mostrar mensaje usando Sonner
    toast.info('Tablero reiniciado. Iniciando nueva búsqueda...');

    // Iniciar nueva animación
    requestAnimationFrame(animar);
}

// Usar DOMContentLoaded para asegurarse de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    if (!tablero) {
        inicializa();
    }

    // Asignar la función de reiniciarTablero al botón de reinicio
    document.getElementById('reset-btn').addEventListener('click', reiniciarTablero);
});
