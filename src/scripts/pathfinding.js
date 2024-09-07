
var canvas;
var ctx;
var FPS = 50;

// Tablero del juego
var columnas = 50;
var filas = 50;
var escenario; // Matriz de columnas x filas

// Cuadricula

var anchoF;
var altoF;

// Objetos
const muro = "#17202a";
const tierra = "#ecf0f1";

function dibujaEscenario(f, c) {
    var obj = new Array(f);
    for (var i = 0; i < f; i++) {
        obj[i] = new Array(c);
    }
    return obj;
}



function casilla(x, y) {

    //Posicion en el escenario
    this.x = x;
    this.y = y;

    //Propiedades de la casilla (obstaculo, inicio, fin)
    this.tipo = 0;

    var aleatorio = Math.floor(Math.random() * 5);

    if (aleatorio == 1) this.tipo = 1;

    //Pesos
    this.f = 0;  // Coste total (g + h)
    this.g = 0;  // Pasos dados
    this.h = 0;  // Distancia al final o Heuristica

    // Vecinos
    this.vecinos = [];
    this.padre = null;

    // Calcula los vecinos de la casilla
    this.addVecinos = function () {
        if (this.x > 0) this.vecinos.push(escenario[this.x - 1][this.y]);
        if (this.x < columnas - 1) this.vecinos.push(escenario[this.x + 1][this.y]);
        if (this.y > 0) this.vecinos.push(escenario[this.x][this.y - 1]);
        if (this.y < filas - 1) this.vecinos.push(escenario[this.x][this.y + 1]);
    }

    this.dibuja = function () {
        var color;

        if (this.tipo == 0) color = tierra;
        if (this.tipo == 1) color = muro;

        ctx.fillStyle = color;
        ctx.fillRect(this.x * anchoF, this.y * altoF, anchoF, altoF);
    }
}

// Funcion inicializadora

window.inicializa = function () {
    var i = 0;
    var j = 0;

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Inicializar escenario
    anchoF = parseInt(canvas.width / columnas);
    altoF = parseInt(canvas.height / filas);

    // Creamos los nodos
    escenario = dibujaEscenario(filas, columnas);

    // Añadimos las casillas al escenario
    for (i = 0; i < columnas; i++) {
        for (j = 0; j < filas; j++) {
            escenario[i][j] = new casilla(i, j)
        }
    }

    // Bucle principal
    setInterval(function () { principal(); }, 1000 / FPS);

}


function creaEscenario() {
    var i = 0;
    var j = 0;

    for (i = 0; i < columnas; i++) {
        for (j = 0; j < filas; j++) {
            escenario[i][j].dibuja();
        }
    }
}


function principal() {
    creaEscenario();
}
