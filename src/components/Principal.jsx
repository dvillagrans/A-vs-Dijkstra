import React from 'react';

export default function Component() {
  return (
    <div className="w-full flex flex-col items-center">
      <section className="py-12 md:py-16 lg:py-20 text-center">
        <div className="container px-4 md:px-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Comparing Pathfinding Algorithms
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Explore the performance and characteristics of the A* and Dijkstra algorithms in a visual comparison.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full max-w-4xl grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
        <div className="relative h-[400px] overflow-hidden rounded-lg bg-muted/40">
          {/* a-star */}
          <canvas id="canvasA" className="h-full w-full" />
        </div>
        <div className="relative h-[400px] overflow-hidden rounded-lg bg-muted/40">
          {/* dijkstra*/}
          <canvas id="canvasB" className="h-full w-full" />
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20 w-full max-w-4xl">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-2xl font-bold">A* Algorithm</h2>
            <p className="mt-4 text-muted-foreground">
              A* is an informed search algorithm that uses a heuristic function to estimate the cost of reaching the
              goal from a given node. It is often considered the most efficient pathfinding algorithm, as it explores
              the most promising paths first and can find the shortest path between two points.
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <span className="font-medium">Heuristic-based:</span> Uses a heuristic function to estimate the cost to
                the goal.
              </li>
              <li>
                <span className="font-medium">Efficient:</span> Explores the most promising paths first, often finding
                the shortest path.
              </li>
              <li>
                <span className="font-medium">Optimal:</span> Guarantees the shortest path if the heuristic function is
                admissible.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Dijkstra Algorithm</h2>
            <p className="mt-4 text-muted-foreground">
              Dijkstra's algorithm is a classic pathfinding algorithm that finds the shortest path between two nodes in
              a graph. It explores all the neighboring nodes at the present depth before moving on to the nodes at the
              next depth level.
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <span className="font-medium">Breadth-first search:</span> Explores all neighboring nodes before moving
                to the next level.
              </li>
              <li>
                <span className="font-medium">Optimal:</span> Guarantees the shortest path in a weighted graph.
              </li>
              <li>
                <span className="font-medium">Slower:</span> Can be less efficient than A* for large graphs, especially
                when the heuristic function is well-informed.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}