const nodeCount = 5;

/**@type {number[]} */
let graphNodes = Array(nodeCount)
	.fill(0)
	.map((item, index) => index);

/**@type {number[][]} */
const graphEdges = {
	0: [
		[2, 1],
		[4, 10],
	],
	1: [
		[3, 1],
		[4, 5],
	],
	2: [
		[1, 1],
		[4, 7],
	],
	3: [[4, 1]],
};

/**
 *
 * @param {number[]} graphNodes
 * @param {number[][]} graphEdges
 * @returns {nodeType[]}
 */
const generateGraph = (graphNodes, graphEdges) => {
	/** @type {number[][]} */
	const graph = Array(nodeCount)
		.fill(0)
		.map((item, index) =>
			Array(nodeCount)
				.fill(999)
				.map((item, indexInner) => {
					if (indexInner === index) return 0;
					return item;
				})
		);

	Object.entries(graphEdges).map(([value, edges]) => {
		edges.map(([edge, power]) => {
			graph[value][edge] = power;
		});
	});

	return graph;
};

const graph = generateGraph(graphNodes, graphEdges);

const path = Array(nodeCount)
	.fill(0)
	.map((item) => Array(nodeCount).fill(-1));

const floyd = (graph) => {
	for (let midNode = 0; midNode < nodeCount; midNode++) {
		for (let from = 0; from < nodeCount; from++) {
			for (let to = 0; to < nodeCount; to++) {
				if (graph[from][to] > graph[from][midNode] + graph[midNode][to]) {
					graph[from][to] = graph[from][midNode] + graph[midNode][to];
					path[from][to] = midNode;
				}
			}
		}
	}
};

floyd(graph);

console.log(graph, path);
// [
//   [ 0, 2, 1, 3, 4 ],
//   [ 999, 0, 999, 1, 2 ],
//   [ 999, 1, 0, 2, 3 ],
//   [ 999, 999, 999, 0, 1 ],
//   [ 999, 999, 999, 999, 0 ]
// ]

// [
//   [ -1, 2, -1, 2, 3 ],
//   [ -1, -1, -1, -1, 3 ],
//   [ -1, -1, -1, 1, 3 ],
//   [ -1, -1, -1, -1, -1 ],
//   [ -1, -1, -1, -1, -1 ]
// ]

const getPath = (from, to) => {
	// there are no path
	if (graph[from][to] === 999) return [];

	if (path[from][to] !== -1) {
		return [...getPath(from, path[from][to]), ...getPath(path[from][to], to).slice(1)];
	}

	return [from, to];
};

console.log(getPath(0, 4));
console.log(getPath(3, 0));
