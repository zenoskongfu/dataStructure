class Node {
	constructor(key, color, parent, left, right) {
		this.key = key;
		this.color = color;
		this.parent = parent || null;
		this.left = left || null;
		this.right = right || null;
	}
}

class RedBlackTree {
	constructor() {
		this.NIL_LEAF = new Node(null, "black");
		this.root = this.NIL_LEAF;
	}

	// 插入操作
	insert(key) {
		const newNode = new Node(key, "red", this.NIL_LEAF, this.NIL_LEAF, this.NIL_LEAF);
		if (this.root === this.NIL_LEAF) {
			this.root = newNode;
			this.root.color = "black";
		} else {
			this._insertNode(this.root, newNode);
			this._fixInsert(newNode);
		}
	}

	_insertNode(node, newNode) {
		if (newNode.key < node.key) {
			if (node.left === this.NIL_LEAF) {
				node.left = newNode;
				newNode.parent = node;
			} else {
				this._insertNode(node.left, newNode);
			}
		} else if (newNode.key >= node.key) {
			if (node.right === this.NIL_LEAF) {
				node.right = newNode;
				newNode.parent = node;
			} else {
				this._insertNode(node.right, newNode);
			}
		}
	}

	_fixInsert(node) {
		while (node.color === "red" && node.parent.color === "red") {
			let parent = node.parent;
			let grandparent = parent.parent;
			if (parent === grandparent.left) {
				const uncle = grandparent.right;
				if (uncle.color === "red") {
					parent.color = "black";
					uncle.color = "black";
					grandparent.color = "red";
					node = grandparent;
				} else {
					// uncle is black
					if (node === parent.right) {
						this._rotateLeft(parent);
						node = parent;
						parent = node.parent;
					}
					this._rotateRight(grandparent);
					parent.color = "black";
					grandparent.color = "red";
					node = parent;
				}
			} else {
				const uncle = grandparent.left;
				if (uncle.color === "red") {
					parent.color = "black";
					uncle.color = "black";
					grandparent.color = "red";
					node = grandp;
				} else {
					if (node === parent.left) {
						this._rotateRight(parent);
						node = parent;
						parent = node.parent;
					}
					this._rotateLeft(grandparent);
					parent.color = "black";
					grandparent.color = "red";
					node = parent;
				}
			}
			// 停止遍历
			if (node === this.root) {
				break;
			}
		}
		this.root.color = "black";
	}

	_rotateLeft(node) {
		const rightChild = node.right;
		node.right = rightChild.left;
		if (rightChild.left !== this.NIL_LEAF) {
			rightChild.left.parent = node;
		}
		rightChild.parent = node.parent;
		if (node.parent === this.NIL_LEAF) {
			this.root = rightChild;
		} else if (node === node.parent.left) {
			node.parent.left = rightChild;
		} else {
			node.parent.right = rightChild;
		}
		rightChild.left = node;
		node.parent = rightChild;
	}

	_rotateRight(node) {
		const leftChild = node.left;
		node.left = leftChild.right;
		if (leftChild.right !== this.NIL_LEAF) {
			leftChild.right.parent = node;
		}
		leftChild.parent = node.parent;

		if (node.parent === this.NIL_LEAF) {
			this.root = leftChild;
		} else if (node === node.parent.right) {
			node.parent.right = leftChild;
		} else {
			node.parent.left = leftChild;
		}

		leftChild.right = node;
		node.parent = leftChild;
	}
}

// 示例用法
const rbt = new RedBlackTree();
rbt.insert(20);
rbt.insert(10);
rbt.insert(5);
rbt.insert(30);
rbt.insert(40);
rbt.insert(57);
rbt.insert(3);
rbt.insert(2);
rbt.insert(4);
rbt.insert(35);
rbt.insert(35);
rbt.insert(18);
rbt.insert(22);
rbt.insert(23);
rbt.insert(24);
rbt.insert(19);
rbt.insert(18);

// console.log(rbt);

let res = "";
const printTree = (data, deeps = [1]) => {
	if (!data) return res;

	let space = deeps
		.slice(0, -1)
		.map((item) => {
			return item == 1 ? "|\t\t" : "\t\t";
		})
		.join("");

	space += "|__";
	const content = data.key ? data.key + data.color : null;
	res = res + space + content + "\n";
	if (data.left) {
		printTree(data.left, [...deeps, 1]);
	}

	if (data.right) {
		printTree(data.right, [...deeps, 0]);
	}

	return res;
};

printTree(rbt.root);
console.log(res);
