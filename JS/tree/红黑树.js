class Node {
	constructor(key, color, parent, left, right) {
		this.key = key;
		this.color = color;
		this.parent = parent || null;
		this.left = left || null;
		this.right = right || null;
	}
}
const black = "black";
const red = "red";

class RedBlackTree {
	constructor() {
		this.root = null;
	}
	getColor(node) {
		if (!node) return black;
		return node.color;
	}

	insert(key) {
		const newNode = new Node(key, red);
		if (this.root == null) {
			this.root = newNode;
			this.root.color = black;
		} else {
			this._insert(this.root, newNode);
			this.checkColor(newNode);
		}
	}
	_insert(node, newNode) {
		if (newNode.key < node.key) {
			if (node.left) {
				this._insert(node.left, key);
			} else {
				node.left = newNode;
				newNode.parent = node;
			}
		} else if (key >= node.key) {
			if (node.right) this._insert(node.right, newNode);
			else {
				node.right = newNode;
				newNode.parent = node;
			}
		}
	}

	checkColor(node) {
		const parent = node.parent;

		while (parent && parent.color == red && node.color == red) {
			if (node == parent.left) {
				const uncleNode = parent.right;
				// uncle is red
				if (uncleNode.color == red) {
					this.switchColor(node, parent, uncle);
				} else {
					// uncle is black
					if (node.right == red) {
						this.leftRotate(node);
						node = parent;
						parent = node.parent;
					}
					this.rightRotate(node);
					const color = node.color;
					node.color = node.parent.color;
					node.parent.color = color;
				}

				if (node.left.color == red) {
				}
			}
		}
	}
	switchColor(node, parent, uncle) {}
	rightRotate() {}
	leftRotate() {}
}
