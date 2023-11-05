// 设计一个算法，求解二叉树的层次
const getLayer = (root, node, layer = 0) => {
	if (!root) return -1;
	if (root.value == node) return layer + 1;
	if (node < root.value) return getLayer(root.left, node, layer + 1);
	return getLayer(root.right, node, layer + 1);
};

const treeData = [6, 5, 2, 3, 7, 12, 9, 4, 8];
const generateTree = (data, index) => {
	if (!data[index]) return null;
	const node = { value: data[index] };
	node.left = generateTree(data, index * 2);
	node.right = generateTree(data, index * 2 + 1);
	return node;
};
class Tree {
	constructor() {
		this.root = null;
	}
	insert(value) {
		this.root = this._insert(this.root, value);
	}
	_insert(node, value) {
		if (!node) return { value, left: null, right: null };
		if (value < node.value) node.left = this._insert(node.left, value);
		else node.right = this._insert(node.right, value);
		return node;
	}

	getLayer(value) {
		return this._getLayer2(this.root, value, 0);
	}

	_getLayer(node, value, layer) {
		if (!node) return -1;
		if (node.value == value) return layer + 1;
		if (value < node.value) return this._getLayer(node.left, value, layer + 1);
		return this._getLayer(node.right, value, layer + 1);
	}

	_getLayer2(node, value) {
		let layer = 1;
		if (node.value == value) return layer;
		while (node) {
			if (value < node.value) {
				node = node.left;
				layer++;
			} else if (value > node.value) {
				node = node.right;
				layer++;
			} else {
				return layer;
			}
		}
		return -1;
	}
}
const tree = new Tree();
treeData.forEach((item) => {
	tree.insert(item);
});
console.log(tree);

console.log(tree.getLayer(4));
