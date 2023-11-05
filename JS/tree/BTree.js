class BTreeNode {
	constructor(isLeaf = true) {
		this.isLeaf = isLeaf;
		this.keys = [];
		this.children = [];
	}
}

class BTree {
	constructor(t) {
		this.root = new BTreeNode(true);
		this.t = t; // B树的阶数
	}

	insert(key) {
		let root = this.root;

		if (root.keys.length === this.t) {
			// 如果根节点已满，需要分裂根节点
			const newRoot = new BTreeNode(false);
			newRoot.children.push(this.root);
			this.root = newRoot;
			this.splitChild(newRoot, 0);
		}

		this.insertNonFull(this.root, key);
	}

	insertNonFull(node, key) {
		let i = node.keys.length - 1;

		if (node.isLeaf) {
			// 如果是叶节点，直接插入
			node.keys.push(key);
			this.sortKeys(node);
		} else {
			// 找到合适的子节点插入
			while (i >= 0 && key < node.keys[i]) {
				i--;
			}
			i++;

			// 检查子节点是否满了
			if (node.children[i].keys.length === this.t) {
				// 如果子节点满了，先分裂子节点
				this.splitChild(node, i);
				if (key > node.keys[i]) {
					i++;
				}
			}

			this.insertNonFull(node.children[i], key);
		}
	}

	splitChild(parent, childIndex) {
		const child = parent.children[childIndex];
		const newChild = new BTreeNode(child.isLeaf);
		parent.keys.splice(childIndex, 0, child.keys[this.t - 1]);
		parent.children.splice(childIndex + 1, 0, newChild);

		newChild.keys = child.keys.splice(this.t);
		newChild.children = child.isLeaf ? [] : child.children.splice(this.t);
	}

	sortKeys(node) {
		node.keys.sort((a, b) => a - b);
	}
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const Btree = new BTree(5);
data.forEach((item) => Btree.insert(item));

// console.log(Btree);

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
	data.children.forEach((item) => {
		printTree(item, [...deeps, 1]);
	});
	return res;
};

console.log(printTree(Btree.root));
