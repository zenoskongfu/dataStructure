class BTreeNode {
	constructor(isLeaf = true) {
		this.isLeaf = isLeaf;
		this.keys = [];
		this.children = [];
	}
}

class BTree {
	constructor(level) {
		this.root = new BTreeNode();
		this.level = level;
		this.minCount = Math.ceil(level / 2) - 1;
	}

	insert(value) {
		this._insert(null, this.root, value);
	}

	_insert(parent, node, value) {
		if (node.children.length == 0) {
			this.addKeys(node, value);
		} else {
			let flag = -1;
			for (let i = 0; i < node.keys.length; i++) {
				if (value <= node.keys) {
					this._insert(node, node.children[i], value);
					flag = i;
					break;
				}
			}
			if (flag == -1) {
				this._insert(node, node.children.slice(-1)[0], value);
			}
		}
		this.judgeOver(parent, node);
	}

	judgeOver(parent, node) {
		if (node.keys.length >= this.level) {
			this.splitNode(parent, node);
		}
	}
	/**
	 *
	 * @param {BTreeNode} parent
	 * @param {BTreeNode} node
	 * @returns
	 */
	splitNode(parent, node) {
		if (parent == null) {
			parent = new BTreeNode();
			this.root = parent;
		}
		const mid = Math.ceil(node.keys.length / 2) - 1;
		this.addKeys(parent, node.keys[mid]);

		const rightKeys = node.keys.slice(mid + 1);
		const rightChildren = node.children.slice(mid + 1);
		const newLeaf = new BTreeNode();
		newLeaf.keys = rightKeys;
		newLeaf.children = rightChildren;

		if (parent.children.length == 0) {
			parent.children.push(node, newLeaf);
		} else {
			parent.children.push(newLeaf);
		}
		node.keys = node.keys.slice(0, mid);
		node.children = node.children.slice(0, mid + 1);
	}

	addKeys(node, value) {
		for (let i = 0; i < node.keys.length; i++) {
			if (value <= node.keys[i]) {
				node.keys.splice(i, 0, value);
				return;
			}
		}
		node.keys.push(value);
	}

	delete(value) {
		this._delete(null, this.root, value, null);
	}
	/**
	 *
	 * @param {BTreeNode} parent
	 * @param {BTreeNode} node
	 * @param {number} value
	 * @param {number} index
	 */
	_delete(parent, node, value, index) {
		if (node.children.length == 0) {
			node.keys = node.keys.filter((item) => item !== value);
		} else {
			let flag = false;
			for (let i = 0; i < node.keys.length; i++) {
				if (value == node.keys[i]) {
					flag = true;
					const minNode = this.getMinNode(node.children[i + 1]);
					node.keys.splice(i, 1, minNode);
					this._delete(node, node.children[i + 1], minNode, i + 1);
					break;
				} else if (value < node.keys[i]) {
					this._delete(node, node.children[i], value, i);
					flag = true;
					break;
				}
			}
			if (flag == false) {
				this._delete(node, node.children.slice(-1)[0], value, node.children.length - 1);
			}
		}
		this.judgeLess(parent, node, index);
	}

	/**
	 *
	 * @param {BTreeNode} node
	 */
	getMinNode(node) {
		while (node.children.length !== 0) {
			node = node.children[0];
		}
		return node.keys[0];
	}

	judgeLess(parent, node, index) {
		if (parent == null) return node; //this is root

		let haveRightSibling = false,
			haveLeftSibling = false;
		if (node.keys.length < this.minCount) {
			if (index != parent.children.length - 1) {
				haveRightSibling = true;
				//have right sibling
				const siblingNodeRight = parent.children[index + 1];
				if (siblingNodeRight.keys.length > this.minCount) {
					//blow from right sibling
					this.blowFromRight(parent, node, index);
					return;
				}
			} else if (index != 0) {
				haveLeftSibling = true;
				//have left sibling
				const siblingNodeLeft = parent.children[index - 1];
				if (siblingNodeLeft.keys.length > this.minCount) {
					// blow from left sibling
					this.blowFromLeft(parent, node, index);
					return;
				}
			}
			if (haveRightSibling) {
				// combine right sibling
				this.combineRightSibling(parent, node, index);
			} else {
				// combine left sibling
				this.combineLeftSibling(parent, node, index);
			}
		}
	}
	/**
	 *
	 * @param {BTreeNode} parent
	 * @param {BTreeNode} node
	 * @param {number} value
	 */
	blowFromRight(parent, node, index) {
		const rightSibling = parent.children[index + 1];
		const rightFirstKey = rightSibling.keys.shift();
		const rightFirstChildren = rightSibling.children.shift();
		node.keys.push(parent.keys[index]);
		rightFirstChildren && node.children.push(rightFirstChildren);

		parent.keys.splice(index, 1, rightFirstKey);
	}
	/**
	 *
	 * @param {BTreeNode} parent
	 * @param {BTreeNode} node
	 * @param {number} value
	 */
	blowFromLeft(parent, node, index) {
		const leftSibling = parent.children[index - 1];
		const leftLastKey = leftSibling.keys.pop();
		const leftLastChildren = leftSibling.children.pop();
		node.keys.unshift(parent.keys[index - 1]);
		leftLastChildren && node.children.unshift(leftLastChildren);
		parent.keys.splice(index - 1, 1, leftLastKey);
	}

	/**
	 *
	 * @param {BTreeNode} parent
	 * @param {BTreeNode} node
	 * @param {number} value
	 */
	combineRightSibling(parent, node, index) {
		const rightSibling = parent.children[index + 1];
		node.keys.push(parent.keys[index], ...rightSibling.keys);
		node.children.push(...rightSibling.children);
		if (parent.keys.length == 1) {
			this.root = node;
		}
		parent.children.splice(index + 1, 1);
		parent.keys.splice(index, 1);
	}
	/**
	 *
	 * @param {BTreeNode} parent
	 * @param {BTreeNode} node
	 * @param {number} value
	 */
	combineLeftSibling(parent, node, index) {
		const leftSibling = parent.children[index - 1];
		node.keys.unshift(...leftSibling.keys, parent.keys[index - 1]);
		node.children.unshift(...leftSibling.children);
		if (parent.keys.length == 1) {
			this.root = node;
		}
		parent.children.splice(index - 1, 1);
		parent.keys.splice(index - 1, 1);
	}
}

const data = Array(16)
	.fill(1)
	.map((item, index) => index);

const btree = new BTree(5);
data.forEach((item) => btree.insert(item));

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
	const content = data.keys.join(", ");
	res = res + space + content + "\n";

	if (!data) return res;
	data.children.forEach((item, index) => {
		printTree(item, [...deeps, index == data.children.length - 1 ? 0 : 1]);
	});
	return res;
};

console.log(printTree(btree.root));

btree.delete(12);

res = "";
console.log(printTree(btree.root));

btree.delete(10);
res = "";
console.log(printTree(btree.root));

btree.delete(1);

res = "";
console.log(printTree(btree.root));

// btree.delete(0);
// btree.delete(0);

// res = "";
// console.log(printTree(btree.root));

// btree.delete(1);
// btree.delete(0);
// res = "";
// console.log(printTree(btree.root));

// btree.delete(4);
// res = "";
// console.log(printTree(btree.root));

// btree.delete(3);
// res = "";
// console.log(printTree(btree.root));

// btree.delete(0);
// res = "";
// console.log(printTree(btree.root));

/**
 * 删除非终端的节点
 *  获取直接前驱或者直接后继
 *  转换成对叶子的操作
 * 删除叶子
 *  找左右兄弟借，
 *  找右兄弟借钱，父节点变成自己节点的一部分；右兄弟最左边变成父节点的缺失的部分
 *  左右兄弟都不够借，合并一个右兄弟，合并的过程会合并一个父节点
 */
