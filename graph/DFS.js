/**@typedef {{value: number, next: nodeType}} nodeType */
const { graph: graphNodes, isVisited } = require("./graphData");

const getFirstNode = (graph, baseNode) => {
	if (graph[baseNode].next === null) return null;
	return graph[baseNode].next.value;
};

const getNextNode = (graph, baseNode, currentNode) => {
	let node = graph[baseNode].next;
	while (node.value !== currentNode) node = node.next;
	if (node.next === null) return null;
	return node.next.value;
};

const DFS = (graph, startNode) => {
	console.log(startNode);
	isVisited[startNode] = true;

	for (let node = getFirstNode(graph, startNode); node !== null; node = getNextNode(graph, startNode, node)) {
		if (isVisited[node] == false) {
			DFS(graph, node);
		}
	}
};

// DFS(graphNodes, 3);

const TraverseDFS = (graph) => {
	for (let i = 1; i < isVisited.length; i++) {
		if (isVisited[i] == false) DFS(graph, i);
	}
};

TraverseDFS(graphNodes);

const DFS2 = (graph, startNode) => {
	const stack = [];
	console.log(startNode);
	isVisited[startNode] = true;
	stack.push(startNode);

	while (stack.length !== 0) {
		const baseNode = stack.pop();
		let node = graph[baseNode].next;

		for (; node !== null; node = node.next) {
			if (isVisited[node.value] !== true) {
				isVisited[node.value] = true;
				console.log(node.value);
				stack.push(node.value);
			}
		}
	}
};

// DFSTraverse(graphNodes, 3);
