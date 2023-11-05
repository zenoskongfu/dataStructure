const nodeCount = 5;

/**@type {number[]} */
let graphNodes = Array(nodeCount)
	.fill(0)
	.map((item, index) => index);

/**@type {number[][]} */
const graphEdges = {
	0: [
		[1, 10],
		[4, 5],
	],
	1: [
		[2, 1],
		[4, 2],
	],
	2: [[3, 4]],
	3: [
		[0, 7],
		[2, 6],
	],
	4: [
		[1, 3],
		[2, 9],
		[3, 2],
	],
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

	Object.entries(graphEdges).map(([value, edges]) => {
		graphNodes[value].next = edges.reduce((res, [toNode, power]) => {
			let tempRes = res;
			while (tempRes.next) tempRes = tempRes.next;
			tempRes.next = { value: toNode, power, next: null };
			return res;
		}, {}).next;
	});

	return graphNodes;
};

const graph = generateGraph(graphNodes, graphEdges);

// console.log(graph);

const isVisited = Array(nodeCount).fill(false);
const lowCast = Array(nodeCount).fill(-1);
const path = Array(nodeCount).fill(-1);

const startNode = 0;
isVisited[startNode] = true;
lowCast[startNode] = 0;
path[startNode] = -1;

const dijkstra = (graph, currentNode) => {
	//update path
	for (let node = graph[currentNode].next; node !== null; node = node.next) {
		if (!isVisited[node.value]) {
			if (lowCast[node.value] == -1 || lowCast[node.value] > node.power + lowCast[currentNode]) {
				lowCast[node.value] = node.power + lowCast[currentNode];
				path[node.value] = currentNode;
			}
		}
	}

	//find min
	let minPower = Infinity;
	let minIndex = -1;
	for (let i = 0; i < isVisited.length; i++) {
		if (isVisited[i] == false && lowCast[i] < minPower && lowCast[i] !== -1) {
			minPower = lowCast[i];
			minIndex = i;
		}
	}
	if (minIndex == -1) return;

	// update new node
	isVisited[minIndex] = -1;
	dijkstra(graph, minIndex);
};

dijkstra(graph, startNode);

console.log(lowCast, path);
//[ 0, 8, 9, 7, 5 ] [ -1, 4, 1, 4, 0 ]

const findPath = (node) => {
	const castValue = lowCast[node];
	const castPath = [];
	while (node !== -1) {
		castPath.unshift(node);
		node = path[node];
	}
	console.log("the path cast is: ", castValue);
	console.log("the path is : ", castPath);
};

findPath(2);
findPath(3);
findPath(4);
