// quick find

const { printMultiTree, unionArray2TreeData } = require("./printTree");

const unionArray = Array(8)
	.fill(-1)
	.map((item, index) => index);

const findRoot = (unionArray, node) => {
	return unionArray[node];
};

const checkSameUnion = (unionArray, node1, node2) => {
	return findRoot(unionArray, node1) == findRoot(unionArray, node2);
};

const combineUnion = (unionArray, node1, node2) => {
	const union1 = findRoot(unionArray, node1);
	const union2 = findRoot(unionArray, node2);

	if (union1 == union2) return;

	unionArray[node2] = union1;

	for (let i = 1; i < unionArray.length; i++) {
		if (unionArray[i] == union2) {
			unionArray[i] = union1;
		}
	}
};

/**
 * 1,2
 * 2,3
 * 4,5
 * 6,7
 */
combineUnion(unionArray, 1, 2);
combineUnion(unionArray, 2, 3);
combineUnion(unionArray, 4, 5);
combineUnion(unionArray, 6, 7);

console.log(unionArray);
console.log(checkSameUnion(unionArray, 3, 6));
// printMultiTree(unionArray2TreeData(unionArray));

combineUnion(unionArray, 6, 3);

console.log(unionArray);
console.log(checkSameUnion(unionArray, 3, 6));
printMultiTree(unionArray2TreeData(unionArray));
