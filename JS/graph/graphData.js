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

const graphEdges = { 1: [2, 4], 2: [5], 3: [5, 6], 4: [2] };

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

const isVisited = Array(7).fill(false);

module.exports = {
	graph: generateGraph(graphNodes, graphEdges),
	generateGraph,
	isVisited,
};
