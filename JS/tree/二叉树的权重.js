const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Node {
	constructor(value, weight = value) {
		this.value = value;
		this.weight = weight;
		this.left = null;
		this.right = null;
	}
}

const generateWeightTree = (data, index) => {
	if (!data[index]) return null;
	const temp = new Node(data[index]);
	temp.left = generateWeightTree(data, index * 2);
	temp.right = generateWeightTree(data, index * 2 + 1);
	return temp;
};

const tree = generateWeightTree(data, 1);
// console.log(tree);
const getWeight = (tree, deep = 0) => {
	if (!tree) return 0;

	if (!tree.left && !tree.right) return deep * tree.weight;
	const lwpl = getWeight(tree.left, deep + 1);
	const rwpl = getWeight(tree.right, deep + 1);
	return lwpl + rwpl;
};

console.log(getWeight(tree));

// const data2 = [0, 1, 2, 3];
// const tree2 = generateWeightTree(data2, 1);
// console.log(getWeight(tree2));
