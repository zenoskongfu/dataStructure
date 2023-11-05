const nodeCount = 5;

/**@type {number[]} */
let graphNodes = Array(nodeCount)
	.fill(0)
	.map((item, index) => index);

/**@type {number[][]} */
const graphEdges = {
	0: [1],
	1: [3],
	2: [3, 4],
	3: [4],
};

/** 逆拓扑排序 */
// 邻接矩阵
const generateGraph = (graphNodes, graphEdges) => {
	graphNodes = graphNodes.map((item, index) => Array(nodeCount).fill(-1));
	Object.entries(graphEdges).map(([node, edges]) => {
		edges.map((edge) => {
			graphNodes[node][edge] = 1;
		});
	});

	return graphNodes;
};

const graph = generateGraph(graphNodes, graphEdges);
const getDegree = (graph) => {
	const degree = Array(nodeCount).fill(0);
	for (let from = 0; from < nodeCount; from++) {
		for (let to = 0; to < nodeCount; to++) {
			if (graph[from][to] != -1) degree[from]++;
		}
	}
	return degree;
};

const topoLogicSort = (graph) => {
	const stack = [];
	const sortArray = [];
	// find the node outDegree is 0
	const degree = getDegree(graph);
	for (let i = 0; i < degree.length; i++) {
		if (degree[i] == 0) stack.push(i);
	}

	while (stack.length) {
		const currentNode = stack.pop();
		sortArray.push(currentNode);
		for (let from = 0; from < nodeCount; from++) {
			if (graph[from][currentNode] != -1) {
				if (--degree[from] == 0) stack.push(from);
			}
		}
	}

	return sortArray;
};

const sortArray = topoLogicSort(graph);

console.log(sortArray);
