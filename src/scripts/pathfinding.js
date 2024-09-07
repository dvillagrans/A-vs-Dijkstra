var canvasA, canvasB;
var ctxA, ctxB;

// Tablero del juego
var columnas;
var filas;
var escenario; // Matriz de columnas x filas

// Tamaño de cada celda
const cellSize = 10; // Puedes ajustar este valor según tus necesidades

// Objetos
const muro = "#17202a";
const tierra = "#ecf0f1";

function inicializa() {
    canvasA = document.getElementById('canvasA');
    canvasB = document.getElementById('canvasB');
    ctxA = canvasA.getContext('2d');
    ctxB = canvasB.getContext('2d');

    // Ajustar el tamaño de los canvas al contenedor
    resizeCanvases();

    // Calcular columnas y filas basadas en el tamaño del canvas y el tamaño de celda
    columnas = Math.floor(canvasA.width / cellSize);
    filas = Math.floor(canvasA.height / cellSize);

    // Creamos el escenario
    crearEscenario();

    // Iniciar el bucle de renderizado
    requestAnimationFrame(principal);
}

function resizeCanvases() {
    const containerA = canvasA.parentElement;
    const containerB = canvasB.parentElement;
    const size = Math.min(containerA.clientWidth, containerA.clientHeight,
        containerB.clientWidth, containerB.clientHeight);
    canvasA.width = canvasA.height = size;
    canvasB.width = canvasB.height = size;
}

function crearEscenario() {
    escenario = Array(columnas).fill().map(() => Array(filas).fill(null));

    for (let i = 0; i < columnas; i++) {
        for (let j = 0; j < filas; j++) {
            escenario[i][j] = new Casilla(i, j);
        }
    }

    // Añadir vecinos
    for (let i = 0; i < columnas; i++) {
        for (let j = 0; j < filas; j++) {
            escenario[i][j].addVecinos();
        }
    }
}

class Casilla {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tipo = Math.random() < 0.2 ? 1 : 0; // 20% de probabilidad de ser muro
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.vecinos = [];
        this.padre = null;
    }

    addVecinos() {
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (let [dx, dy] of dirs) {
            const newX = this.x + dx;
            const newY = this.y + dy;
            if (newX >= 0 && newX < columnas && newY >= 0 && newY < filas) {
                this.vecinos.push(escenario[newX][newY]);
            }
        }
    }

    dibuja(ctx) {
        ctx.fillStyle = this.tipo === 0 ? tierra : muro;
        ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
    }
}

function dibujaEscenario() {
    for (let i = 0; i < columnas; i++) {
        for (let j = 0; j < filas; j++) {
            escenario[i][j].dibuja(ctxA);
            escenario[i][j].dibuja(ctxB);
        }
    }
}

function principal() {
    dibujaEscenario();
    requestAnimationFrame(principal);
}

// Ejecutar la inicialización cuando la ventana haya cargado
window.onload = inicializa;

// Redimensionar los canvas cuando se cambie el tamaño de la ventana
window.onresize = function () {
    resizeCanvases();
    crearEscenario(); // Reinicializar el escenario con el nuevo tamaño
};