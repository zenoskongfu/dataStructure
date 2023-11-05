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

const isVisited = Array(6).fill(false);

const lowestPower = Array(6)
	.fill(-1)
	.map((item) => ({ power: -1, nodeFrom: null }));

graphNodes = generateGraph(graphNodes, graphEdges);

const minTreeEdges = [];
const minTreeNodes = new Set();
const addNodeToMinTree = (newNode, otherNode, power) => {
	minTreeEdges[newNode] = minTreeEdges[newNode] || [];
	minTreeEdges[newNode].push([otherNode, power]);
	minTreeNodes.add(newNode);
	minTreeNodes.add(otherNode);
};

/**
 * get min tree
 * @param {nodeType[]} graph
 * @param {number} currentNode
 * @returns void
 */
const getMinTree = (graph, currentNode) => {
	//update power
	for (let node = graph[currentNode].next; node !== null; node = node.next) {
		if (isVisited[node.value] == false) {
			const newPower = node.power;
			if (lowestPower[node.value].power == -1 || lowestPower[node.value].power > newPower) {
				lowestPower[node.value].power = newPower;
				lowestPower[node.value].nodeFrom = currentNode;
			}
		}
	}

	// find minIndex
	let minPower = Infinity;
	let minIndex = -1;
	for (let i = 0; i < graph.length; i++) {
		if (isVisited[i] == false && lowestPower[i].power !== -1 && lowestPower[i].power < minPower) {
			minPower = lowestPower[i].power;
			minIndex = i;
		}
	}
	if (minIndex == -1) return; // there was not left node, then return

	//add new node in graph
	isVisited[minIndex] = true;
	addNodeToMinTree(lowestPower[minIndex].nodeFrom, minIndex, lowestPower[minIndex].power);

	getMinTree(graph, minIndex);
};

const startNode = 0;
isVisited[startNode] = true;
lowestPower[startNode].power = 0;
lowestPower[startNode].nodeFrom = 0;
minTreeNodes.add(startNode);

getMinTree(graphNodes, startNode);
console.log(minTreeNodes, minTreeEdges);

/**
 * Set(6) { 0, 3, 2, 5, 1, 4 }
 * [ [ [ 3, 1 ] ], [ [ 4, 3 ] ], [ [ 5, 2 ] ], [ [ 2, 4 ], [ 1, 5 ] ] ]
 */
const minTree = generateGraph([...minTreeNodes], minTreeEdges);

// [
//   {
//     value: 0,
//     next: {
//       value: 3,
//       next: null,
//       power: 1,
//     },
//   },
//   {
//     value: 3,
//     next: {
//       value: 4,
//       next: {
//         value: "3",
//         next: null,
//         power: 5,
//       },
//       power: 3,
//     },
//   },
//   {
//     value: 2,
//     next: {
//       value: 5,
//       next: {
//         value: "3",
//         next: null,
//         power: 4,
//       },
//       power: 2,
//     },
//   },
//   {
//     value: 5,
//     next: {
//       value: "0",
//       next: {
//         value: 2,
//         next: {
//           value: 1,
//           next: null,
//           power: 5,
//         },
//         power: 4,
//       },
//       power: 1,
//     },
//   },
//   {
//     value: 1,
//     next: {
//       value: "1",
//       next: null,
//       power: 3,
//     },
//   },
//   {
//     value: 4,
//     next: {
//       value: "2",
//       next: null,
//       power: 2,
//     },
//   },
// ]
