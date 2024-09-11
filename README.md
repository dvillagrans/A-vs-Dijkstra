# ⚔️ A* vs Dijkstra

Este repositorio contiene un proyecto de comparación entre los algoritmos de búsqueda A* y Dijkstra, implementados en JavaScript. La página permite visualizar el funcionamiento de ambos algoritmos en diferentes escenarios y comparar su eficiencia en la búsqueda de caminos óptimos. Este proyecto está diseñado para practicar habilidades de programación y algoritmos de búsqueda.


## 📊 Descripción

Los algoritmos de búsqueda A* y Dijkstra son utilizados para encontrar el camino más corto en un grafo. A* utiliza una heurística para mejorar el tiempo de búsqueda, mientras que Dijkstra garantiza encontrar el camino más corto, pero puede ser menos eficiente en ciertos casos.

Este proyecto compara los dos algoritmos a través de una interfaz interactiva donde se pueden definir los puntos de inicio y fin, y visualizar el proceso de búsqueda en un tablero de celdas.

## ✅ Requisitos

- Implementar ambos algoritmos en JavaScript.
- Visualizar los caminos encontrados por cada algoritmo.
- Mostrar la eficiencia en términos de nodos visitados y tiempo de ejecución.

## 🔩 Funcionamiento

### 🌟 A* (A-Star)

El algoritmo A* utiliza una función de costo que combina el costo real desde el inicio hasta un nodo y una estimación heurística del costo desde ese nodo hasta el destino.

- Encuentra el camino más corto utilizando la heurística de distancia Manhattan o Euclidiana.
- Tiende a ser más rápido que Dijkstra debido a su uso de la heurística.

### 🔍 Dijkstra

El algoritmo de Dijkstra expande todos los nodos de forma uniforme, encontrando siempre el camino más corto, sin usar ninguna heurística.

- Ideal para grafos donde todos los caminos tienen el mismo costo.
- Puede ser menos eficiente que A* cuando se utilizan heurísticas.

## 💻 Ejecución del proyecto

1. Clona este repositorio:
    ```sh
    git clone https://github.com/dvillagrans/A-vs-Dijkstra.git
    ```
2. Abre el archivo `index.html` en tu navegador.
3. Interactúa con el tablero para definir el punto de inicio y el destino, y selecciona qué algoritmo deseas ejecutar.

## 🧠 Comparación

| Algoritmo | Heurística | Tiempo de ejecución | Nodos visitados |
| --------- | ---------- | ------------------- | --------------- |
| A*        | Sí         | Más rápido en algunos casos | Menos nodos   |
| Dijkstra  | No         | Más lento sin heurística   | Más nodos     |

## 🚀 Tecnologías utilizadas

- HTML
- CSS
- JavaScript

## 🥸 Autor

Created with ❤ by Diego Villagran

<a href="https://linkedin.com/in/dvillagrans" target="_blank">
<img src="https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin" style="margin-bottom: 5px;" />
</a>
<a href="https://github.com/dvillagrans" target="_blank">
<img src="https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white" alt="github" style="margin-bottom: 5px;" />
</a>

