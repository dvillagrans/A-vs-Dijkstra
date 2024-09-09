export class AStar {
    constructor(tablero, principio, fin) {
        this.tablero = tablero;
        this.openSet = [principio];
        this.closeSet = [];
        this.principio = principio;
        this.fin = fin;
    }

    heuristica(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    buscar() {
        while (this.openSet.length > 0) {
            let actual = this.openSet.reduce((min, casilla) =>
                casilla.f < min.f ? casilla : min
            );

            if (actual === this.fin) {
                console.log("¡Ruta encontrada!");
                return this.reconstruirCamino(actual);
            }

            this.openSet = this.openSet.filter(casilla => casilla !== actual);
            this.closeSet.push(actual);

            for (let vecino of actual.vecinos) {
                if (!this.closeSet.includes(vecino) && vecino.tipo !== 1) {
                    let tempG = actual.g + 1;

                    if (!this.openSet.includes(vecino)) {
                        this.openSet.push(vecino);
                    } else if (tempG >= vecino.g) {
                        continue;
                    }

                    vecino.g = tempG;
                    vecino.h = this.heuristica(vecino, this.fin);
                    vecino.f = vecino.g + vecino.h;
                    vecino.padre = actual;
                }
            }
        }

        console.log("No hay solución");
        return null;
    }

    reconstruirCamino(actual) {
        let camino = [];
        while (actual) {
            camino.unshift(actual);
            actual = actual.padre;
        }
        return camino;
    }
}