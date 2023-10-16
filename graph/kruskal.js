/**@typedef {{value: number, next: nodeType}} nodeType */

/**@type {number[]} */
let graphNodes = Array(6)
	.fill(0)
	.map((item, index) => index);

/**@type {number[][]} */
const graphEdges = {
	0: [
		[1, 6],
		[3, 1],
		[2, 5],
	],
	3: [
		[1, 5],
		[0, 1],
		[2, 4],
	],
	4: [
		[1, 3],
		[3, 6],
		[5, 6],
	],
	5: [
		[2, 2],
		[3, 4],
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

	const addNode = (graph, fromNode, toNode, power) => {
		// add edges, fromNode to toNode
		let currentNode = graph[fromNode];
		while (currentNode.next) {
			// there was also edges between
			if (currentNode.next.value == toNode) return;
			currentNode = currentNode.next;
		}
		currentNode.next = { value: toNode, next: null, power };

		// add edges, toNode to fromNode
		currentNode = graph[toNode];
		while (currentNode.next) {
			currentNode = currentNode.next;
		}
		currentNode.next = { value: fromNode, next: null, power };
	};

	Object.entries(graphEdges).map(([value, edges]) => {
		edges.map(([toNode, power]) => {
			addNode(graphNodes, value, toNode, power);
		});
	});

	return graphNodes;
};

const unionArray = Array(8)
	.fill(-1)
	.map((item, index) => index);

const findRoot = (unionArray, node) => {
	while (unionArray[node] !== node) node = unionArray[node];

	return node;
};

const checkSameUnion = (unionArray, node1, node2) => {
	return findRoot(unionArray, node1) == findRoot(unionArray, node2);
};

const combineUnion = (unionArray, node1, node2) => {
	const union1 = findRoot(unionArray, node1);
	const union2 = findRoot(unionArray, node2);
	if (union1 == union2) return;

	unionArray[union2] = union1;
};

const minTreeEdges = [];
const minTreeNodes = new Set();
const addNodeToMinTree = (newNode, otherNode, power) => {
	minTreeEdges[newNode] = minTreeEdges[newNode] || [];
	minTreeEdges[newNode].push([otherNode, power]);
	minTreeNodes.add(newNode);
	minTreeNodes.add(otherNode);
};

const kruskal = (graphEdges) => {
	/** @typedef {number} nodeValue */
	/** @typedef {number} power */

	/** @type {[nodeValue, nodeValue, power ]} */
	let array = Object.entries(graphEdges)
		.reduce((res, [node, edges]) => {
			res.push(...edges.map((edge) => [node, ...edge]));
			return res;
		}, [])
		.sort((pre, next) => pre[2] - next[2]);

	array.map(([node1, node2, power]) => {
		node1 = Number(node1);
		node2 = Number(node2);
		if (!checkSameUnion(unionArray, node1, node2)) {
			combineUnion(unionArray, node1, node2);
			addNodeToMinTree(node1, node2, power);
		}
	});
};

kruskal(graphEdges);
console.log(minTreeNodes);
console.log(minTreeEdges);

const minTree = generateGraph([...minTreeNodes], minTreeEdges);

console.log("");
