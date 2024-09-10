export class AStar {
    constructor(tablero, inicio, fin) {
        this.tablero = tablero;
        this.inicio = inicio;
        this.fin = fin;
        this.openSet = [inicio];
        this.closedSet = [];
        this.camino = [];
        this.terminado = false;

        // Inicializar el nodo inicial
        inicio.g = 0;
        inicio.h = this.heuristica(inicio, fin);
        inicio.f = inicio.g + inicio.h;
        inicio.enOpenSet = true;
    }

    heuristica(a, b) {
        // Heurística Manhattan
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    buscarUnPaso() {
        if (this.terminado !== true) {
            if (this.openSet.length > 0) {
                // Seleccionar el nodo con el f-score más bajo
                let ganador = 0;
                for (let i = 1; i < this.openSet.length; i++) {
                    if (this.openSet[i].f < this.openSet[ganador].f) {
                        ganador = i;
                    } else if (this.openSet[i].f === this.openSet[ganador].f) {
                        // Si los f-scores son iguales, prioriza el nodo con menor h-score (heurística)
                        if (this.openSet[i].h < this.openSet[ganador].h) {
                            ganador = i;
                        }
                    }
                }

                let actual = this.openSet[ganador];

                // Si llegamos al nodo final, construimos el camino
                if (actual === this.fin) {
                    let temporal = actual;
                    this.camino.push(temporal);

                    while (temporal.padre != null) {
                        temporal = temporal.padre;
                        this.camino.push(temporal);
                    }

                    console.log('Camino encontrado');
                    this.terminado = true;

                    // Marcar el camino final
                    this.camino.forEach(casilla => {
                        casilla.esParteDelCamino = true;
                    });
                    return;
                }

                // Continuar si no hemos llegado al final
                this.openSet.splice(ganador, 1); // Eliminar el nodo del openSet
                actual.enOpenSet = false;
                this.closedSet.push(actual);
                actual.enCloseSet = true;

                // Evaluar a los vecinos
                let vecinos = actual.vecinos;
                for (let i = 0; i < vecinos.length; i++) {
                    let vecino = vecinos[i];

                    // Solo considerar vecinos no explorados (que no estén en closedSet) y que no sean muros
                    if (!this.closedSet.includes(vecino) && vecino.tipo !== 1) {
                        let tempG = actual.g + 1; // Coste para llegar al vecino

                        let newPath = false;
                        if (this.openSet.includes(vecino)) {
                            if (tempG < vecino.g) {
                                vecino.g = tempG;
                                newPath = true;
                            }
                        } else {
                            vecino.g = tempG;
                            this.openSet.push(vecino);
                            vecino.enOpenSet = true;
                            newPath = true;
                        }

                        // Solo recalculamos si encontramos un nuevo camino más corto
                        if (newPath) {
                            vecino.h = this.heuristica(vecino, this.fin);
                            vecino.f = vecino.g + vecino.h;
                            vecino.padre = actual;
                        }
                    }
                }
            } else {
                console.log('No hay un camino posible');
                this.terminado = true;
            }
        }
    }
}
