class Node {
	constructor(value) {
		this.value = value;
		this.height = 1;
		this.left = null;
		this.right = null;
	}
}
class AVL {
	constructor() {
		this.root = null;
	}
	getHeight(node) {
		if (!node) return 0;
		return node.height;
	}
	updateHeight(node) {
		node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
	}

	rotateLeft(node) {
		const newRoot = node.right;
		node.right = newRoot.left;
		newRoot.left = node;

		this.updateHeight(node);
		this.updateHeight(newRoot);

		return newRoot;
	}

	rotateRight(node) {
		const newRoot = node.left;
		node.left = newRoot.right;
		newRoot.right = node;

		this.updateHeight(node);
		this.updateHeight(newRoot);

		return newRoot;
	}

	getBalance(node) {
		return this.getHeight(node.left) - this.getHeight(node.right);
	}

	balance(node) {
		if (this.getBalance(node) > 1) {
			if (this.getBalance(node.left) < 0) {
				node.left = this.rotateLeft(node.left);
			}
			return this.rotateRight(node);
		} else if (this.getBalance(node) < -1) {
			if (this.getBalance(node.right) > 0) {
				node.right = this.rotateRight(node.right);
			}
			return this.rotateLeft(node);
		}
		return node;
	}

	insert(value) {
		this.root = this._insert(this.root, value);
	}
	_insert(node, value) {
		if (!node) return new Node(value);
		if (value < node.value) node.left = this._insert(node.left, value);
		else if (value >= node.value) node.right = this._insert(node.right, value);

		this.updateHeight(node);
		return this.balance(node);
	}
}

const data = [3, 2, 1, 4, 5, 6, 7, 9, 8];
const avl = new AVL();
data.forEach((item) => {
	avl.insert(item);
});

// 判断是否为平衡二叉树
const judgeAVL = (tree) => {
	if (!tree) return 0;
	const leftHeight = judgeAVL(tree.left);
	const rightHeight = judgeAVL(tree.right);
	if (leftHeight == -1 || rightHeight == -1) return -1;
	if (Math.abs(leftHeight - rightHeight) > 1) return -1;
	return Math.max(leftHeight, rightHeight) + 1;
};
let res = "";
const printTree = (data, deeps = [1]) => {
	let space = deeps
		.slice(0, -1)
		.map((item) => {
			return item == 1 ? "|\t\t" : "\t\t";
		})
		.join("");

	space += "|__";
	res = res + space + (data?.value || "null") + "\n";

	if (!data) return res;
	printTree(data.left, [...deeps, 1]);
	printTree(data.right, [...deeps, 0]);
	return res;
};

console.log(judgeAVL(avl.root));

avl.root.right = null;
printTree(avl.root);
console.log(res);

console.log(judgeAVL(avl.root));
