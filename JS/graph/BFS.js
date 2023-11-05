const { graph, generateGraph } = require("./graphData");

const isVisited = Array(8).fill(false);

const BFS = (graph, startNode) => {
	const queue = [];
	queue.push(startNode);
	console.log(startNode);
	isVisited[startNode] = true;
	while (queue.length !== 0) {
		const currentNode = queue.shift();

		for (let node = graph[currentNode].next; node !== null; node = node.next) {
			if (isVisited[node.value] == false) {
				queue.push(node.value);
				isVisited[node.value] = true;
				console.log(node.value);
			}
		}
	}
};

const traversBFS = (graph) => {
	for (let i = 1; i < isVisited.length; i++) {
		if (isVisited[i] == false) BFS(graph, i);
	}
};

/**@type {nodeType[]} */
const graphNodes = Array(8)
	.fill(0)
	.map((item, index) => {
		const temp = {};
		temp.value = index;
		temp.next = null;
		return temp;
	});

const graphEdges = { 1: [2, 4], 2: [5], 3: [5, 6], 4: [2] };

traversBFS(generateGraph(graphNodes, graphEdges));
