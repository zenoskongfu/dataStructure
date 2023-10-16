/**@typedef {{value: number, next: nodeType}} nodeType */

/**@type {nodeType[]} */
const graphNodes = Array(7)
	.fill(0)
	.map((item, index) => {
		const temp = {};
		temp.value = index;
		temp.next = null;
		return temp;
	});

const graphEdges = { 1: [2, 4], 2: [1, 5], 3: [5, 6], 4: [1], 5: [2, 3], 6: [3] };

const generateGraph = (graphNodes, graphEdges) => {
	Object.entries(graphEdges).map(([nodeKey, edges]) => {
		graphNodes[nodeKey].next = edges.reduce((res, nextEdge) => {
			const temp = { value: nextEdge, next: null };
			let tempRes = res;
			while (tempRes.next) tempRes = tempRes.next;
			tempRes.next = temp;
			return res;
		}, {}).next;
	});
	return graphNodes;
};

generateGraph(graphNodes, graphEdges);

const isVisited = Array(7).fill(false);
const NODESCOUNT = 6;

let nodesCount = 0;
let edgesCount = 0;

const judgeTreee = (graph) => {
	DFS(graph, 1);
	console.log(nodesCount, edgesCount);

	if (nodesCount == NODESCOUNT && edgesCount === 2 * (NODESCOUNT - 1)) {
		console.log("it is a tree");
	} else {
		console.log("it is not a tree");
	}
};

const DFS = (graph, startNode) => {
	nodesCount++;
	isVisited[startNode] = true;

	for (let node = graph[startNode].next; node !== null; node = node.next) {
		edgesCount++;
		if (isVisited[node.value] === false) {
			DFS(graph, node.value);
		}
	}
};

judgeTreee(graphNodes);
