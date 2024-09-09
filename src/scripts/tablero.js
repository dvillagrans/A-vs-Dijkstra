// tablero.js
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

class Casilla {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tipo = Math.random() < 0.15 ? 1 : 0;  // 15% de probabilidad de ser un muro
        this.vecinos = [];
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
        ctx.fillStyle = this.tipo === 0 ? '#fff' : '#000';
        ctx.fillRect(this.x * anchoF, this.y * altoF, anchoF, altoF);
        ctx.strokeStyle = '#ccc';
        ctx.strokeRect(this.x * anchoF, this.y * altoF, anchoF, altoF);
    }
}