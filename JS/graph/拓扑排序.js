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
		graphNodes[value].next = edges.reduce((res, toNode) => {
			let tempRes = res;
			while (tempRes.next) tempRes = tempRes.next;
			tempRes.next = { value: toNode - 0, next: null };
			return res;
		}, {}).next;
	});

	return graphNodes;
};

// console.log();
const graph = generateGraph(graphNodes, graphEdges);

const getDegree = (graph) => {
	const degree = Array(nodeCount).fill(0);
	for (let i = 0; i < graph.length; i++) {
		let node = graph[i].next;
		while (node) {
			degree[node.value]++;
			node = node.next;
		}
	}

	return degree;
};

// console.log(getDegree(graph));

const topoLogicSort = (graph) => {
	const sortArray = [];
	const stack = [];
	const degree = getDegree(graph);
	for (let i = 0; i < degree.length; i++) {
		if (degree[i] == 0) stack.push(i);
	}

	while (stack.length !== 0) {
		const currentNode = stack.pop();
		sortArray.push(currentNode);
		for (let node = graph[currentNode].next; node; node = node.next) {
			if (--degree[node.value] == 0) stack.push(node.value);
		}
	}

	if (sortArray.length < nodeCount) {
		console.log("there is a loop");
		return;
	}

	return sortArray;
};

// const sortArray = topoLogicSort(graph);

// console.log(sortArray);
// [ 2, 0, 1, 3, 4 ]

// 逆拓扑排序
const sortArray2 = [];
const isVisited = Array(nodeCount).fill(false);
const isVisitedNow = Array(nodeCount).fill(false);

const topoLogicSort2 = (graph) => {
	try {
		for (let i = 2; i < nodeCount; i++) {
			if (isVisited[i] == false) {
				dsf(graph, i);
			}
		}
	} catch (error) {
		console.log(error);
	}
};

const dsf = (graph, currentNode) => {
	isVisited[currentNode] = true;
	isVisitedNow[currentNode] = true;
	for (let node = graph[currentNode].next; node; node = node.next) {
		if (isVisitedNow[node.value] == true) {
			throw "there is a loop";
		}
		if (isVisited[node.value] == false) {
			dsf(graph, node.value);
		}
	}
	sortArray2.push(currentNode);
	isVisitedNow[currentNode] = false;
};

topoLogicSort2(graph);
console.log(sortArray2);
