/**@type {number[]} */
let graphNodes = Array(9)
	.fill(0)
	.map((item, index) => index);

/**@type {number[][]} */
const graphEdges = {
	1: [2, 5],
	2: [6],
	6: [3, 7],
	3: [7, 4],
	7: [4, 8],
	4: [8],
};

/**
 *
 * @param {number[]} graphNodes
 * @param {number[][]} graphEdges
 * @returns {nodeType[]}
 */
const generateGraph = (graphNodes, graphEdges) => {
	graphNodes = graphNodes.map((item, index) => {
		const tempNode = { value: index, next: null };
		return tempNode;
	});

	const addNode = (graph, fromNode, toNode) => {
		// add edges, fromNode to toNode
		let currentNode = graph[fromNode];
		while (currentNode.next) {
			// there was also edges between
			if (currentNode.next.value == toNode) return;
			currentNode = currentNode.next;
		}
		currentNode.next = { value: toNode, next: null };

		// add edges, toNode to fromNode
		currentNode = graph[toNode];
		while (currentNode.next) {
			currentNode = currentNode.next;
		}
		currentNode.next = { value: fromNode, next: null };
	};

	Object.entries(graphEdges).map(([value, edges]) => {
		edges.map((toNode) => {
			addNode(graphNodes, value, toNode);
		});
	});

	return graphNodes;
};

const graph = generateGraph(graphNodes, graphEdges);

const findPathBFS = (graph, startNode) => {
	const pathPower = Array(9).fill(-1);
	const beforeNode = Array(9).fill(-1);
	const isVisited = Array(9).fill(false);
	const queue = [];

	queue.push(startNode);
	isVisited[startNode] = true;
	pathPower[startNode] = 0;

	while (queue.length !== 0) {
		const currentNode = queue.pop();

		for (let node = graph[currentNode].next; node !== null; node = node.next) {
			if (isVisited[node.value] === false) {
				pathPower[node.value] = pathPower[currentNode] + 1;
				beforeNode[node.value] = currentNode;
				isVisited[node.value] = true;
				queue.push(node.value);
			}
		}
	}

	return { pathPower, beforeNode };
};

const pathRes = findPathBFS(graph, 2);
console.log(pathRes);
// {
//   pathPower: [ -1, 1, 0, 2, 3, 2, 1, 2, 3 ],
//   beforeNode: [ -1,  2, -1, 6, 7, 1, 2, 6, 7 ]
// }

const pathRes2 = findPathBFS(graph, 3);
console.log(pathRes2);
// {
//   pathPower: [ -1, 3, 2, 0, 1, 4, 1, 1, 2],
//   beforeNode:  [ -1, 2, 6, -1, 3, 1, 3, 3, 4 ]
// }

const getShortestPath = (pathPower, beforeNode, node) => {
	const path = [];
	const shortestLen = pathPower[node];
	while (beforeNode[node] !== -1) {
		path.unshift(node);
		node = beforeNode[node];
	}
	path.unshift(node);

	console.log("the shortest length is :", shortestLen);
	console.log("the shortest path is :", path);
};

getShortestPath(pathRes.pathPower, pathRes.beforeNode, 7);
getShortestPath(pathRes.pathPower, pathRes.beforeNode, 8);
