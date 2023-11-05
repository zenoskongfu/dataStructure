class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
		this.height = 1;
	}
}

class AVLTree {
	constructor() {
		this.root = null;
	}

	getHeight(node) {
		if (!node) return 0;
		return node.height;
	}

	updateHeight(node) {
		node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
	}

	getBalance(node) {
		return this.getHeight(node.left) - this.getHeight(node.right);
	}

	leftRotate(node) {
		let newRoot = node.right;
		node.right = newRoot.left;
		newRoot.left = node;

		this.updateHeight(node);
		this.updateHeight(newRoot);

		return newRoot;
	}

	rightRotate(node) {
		let newRoot = node.left;
		node.left = newRoot.right;
		newRoot.right = node;

		this.updateHeight(node);
		this.updateHeight(newRoot);

		return newRoot;
	}

	balance(node) {
		if (this.getBalance(node) > 1) {
			if (this.getBalance(node.left) < 0) {
				node.left = this.leftRotate(node.left);
			}
			return this.rightRotate(node);
		} else if (this.getBalance(node) < -1) {
			if (this.getBalance(node.right) > 0) {
				node.right = this.rightRotate(node.right);
			}
			return this.leftRotate(node);
		}
		return node;
	}

	insert(value) {
		this.root = this._insert(this.root, value);
	}

	_insert(node, value) {
		if (!node) return new Node(value);

		if (value < node.value) {
			node.left = this._insert(node.left, value);
		} else if (value > node.value) {
			node.right = this._insert(node.right, value);
		} else {
			return node;
		}

		this.updateHeight(node);
		return this.balance(node);
	}

	delete(value) {
		this.root = this._delete(this.root, value);
	}

	_delete(node, value) {
		if (!node) return null;
		if (value < node.value) {
			node.left = this._delete(node.left, value);
		} else if (value > node.value) {
			node.right = this._delete(node.right, value);
		} else {
			if (!node.left) return node.right;
			if (!node.right) return node.left;

			let minNode = node.right;
			while (minNode.left) minNode = minNode.left;

			node.right = this._delete(node.right, minNode.value);

			minNode.left = node.left;
			minNode.right = node.right;

			node = minNode;
		}
		this.updateHeight(node);
		return this.balance(node);
	}
}

let tree = new AVLTree();
let arr = [4, 2, 7, 1, 3, 6, 9];

arr.forEach((value) => tree.insert(value));
const root = tree;

const printNode = (tree) => {
	if (!tree) return null;
	printNode(tree.left);
	console.log(tree.value, root.getBalance(tree));
	printNode(tree.right);
};

// printNode(tree.root);

tree.delete(7);
// printNode(tree.root);

tree.delete(4);
printNode(tree.root);
