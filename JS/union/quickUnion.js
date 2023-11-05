const { unionArray2TreeData2, printMultiTree } = require("./printTree");

const unionArray = Array(8)
	.fill(-1)
	.map((item, index) => index);

const unionRank = Array(8).fill(1);

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

// 合并两个节点所在的集合（带秩优化的版本）
const combineUnionBaseRank = (unionArray, node1, node2) => {
	const root1 = findRoot(unionArray, node1); // 查找node1所属集合的根节点
	const root2 = findRoot(unionArray, node2); // 查找node2所属集合的根节点

	if (root1 == root2) return; // 如果已经属于同一个集合，无需合并

	// 使用秩优化，将秩较小的树合并到秩较大的树下
	if (unionRank[root1] < unionRank[root2]) {
		unionArray[root1] = root2;
	} else if (unionRank[root1] > unionRank[root2]) {
		unionArray[root2] = root1;
	} else {
		// 如果秩相等，随便选择一个作为根，但需要增加秩
		unionArray[root1] = root2;
		unionRank[root2]++;
	}
};

/**
 * 1,2
 * 2,3
 * 4,5
 * 6,7
  5
 /
4
 / / \ \
4 5   6 7
 */
combineUnion(unionArray, 1, 2);
combineUnion(unionArray, 2, 3);
combineUnion(unionArray, 4, 5);
combineUnion(unionArray, 6, 7);
combineUnion(unionArray, 5, 6);

console.log(unionArray);
console.log(checkSameUnion(unionArray, 3, 6));
printMultiTree(unionArray2TreeData2(unionArray));
combineUnion(unionArray, 6, 3);

console.log(unionArray);
console.log(checkSameUnion(unionArray, 3, 6));
printMultiTree(unionArray2TreeData2(unionArray));
