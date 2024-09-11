export class Tablero {
    constructor(columnas, filas, anchoF, altoF) {
        this.columnas = columnas;
        this.filas = filas;
        this.anchoF = anchoF;
        this.altoF = altoF;
        this.escenario = [];
    }

    inicializar() {
        for (let i = 0; i < this.columnas; i++) {
            this.escenario[i] = [];
            for (let j = 0; j < this.filas; j++) {
                this.escenario[i][j] = new Casilla(i, j);
            }
        }
        this.addVecinos();

        // Asegurarse de que el inicio y el fin no sean muros
        this.escenario[0][0].tipo = 0;
        this.escenario[this.columnas - 1][this.filas - 1].tipo = 0;
    }

    addVecinos() {
        for (let i = 0; i < this.columnas; i++) {
            for (let j = 0; j < this.filas; j++) {
                this.escenario[i][j].addVecinos(this.escenario, this.columnas, this.filas);
            }
        }
    }

    dibujaEscenario(ctx) {
        for (let i = 0; i < this.columnas; i++) {
            for (let j = 0; j < this.filas; j++) {
                this.escenario[i][j].dibuja(ctx, this.anchoF, this.altoF);
            }
        }
    }
}


export class Casilla {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tipo = Math.random() < 0.20 ? 1 : 0;  // 20% de probabilidad de ser un muro
        this.vecinos = [];
        this.enOpenSet = false;
        this.enCloseSet = false;
        this.esParteDelCamino = false;
    }

    addVecinos(escenario, columnas, filas) {
        const dx = [-1, 0, 1, 0];
        const dy = [0, 1, 0, -1];

        for (let i = 0; i < 4; i++) {
            const nx = this.x + dx[i];
            const ny = this.y + dy[i];

            if (nx >= 0 && nx < columnas && ny >= 0 && ny < filas) {
                this.vecinos.push(escenario[nx][ny]);
            }
        }
    }

    dibuja(ctx, anchoF, altoF) {
        if (this.esParteDelCamino) {
            ctx.fillStyle = '#FFFF00'; // Color amarillo para el camino final
        } else if (this.enCloseSet) {
            ctx.fillStyle = '#800000'; // Rojo oscuro para los visitados
        } else if (this.enOpenSet) {
            ctx.fillStyle = '#008000'; // Verde para los que están en openSet
        } else if (this.tipo === 1) {
            ctx.fillStyle = '#000'; // Negro para los muros
        } else {
            ctx.fillStyle = '#fff'; // Blanco para los no visitados
        }

        ctx.fillRect(this.x * anchoF, this.y * altoF, anchoF, altoF);
        ctx.strokeStyle = '#ccc';
        ctx.strokeRect(this.x * anchoF, this.y * altoF, anchoF, altoF);
    }
}
