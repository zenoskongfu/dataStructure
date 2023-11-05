const treeData = [5, 7, 6, 3, 8, 7, 4, 1, 2];
const T1 = [40, 25, 60, -1, 30, -1, 80, -1, -1, 27];
const T2 = [40, 50, 60, -1, 30, -1, -1, -1, -1, -1, 35];
const generateTree = (data) => {
	const root = {};
	root.value = data[0];
	for (let i = 1; i < data.length; i++) {
		let tree = root;
		while (tree) {
			if (data[i] <= tree.value) {
				if (tree.left) tree = tree.left;
				else {
					tree.left = { value: data[i] };
					break;
				}
			} else {
				if (tree.right) tree = tree.right;
				else {
					tree.right = { value: data[i] };
					break;
				}
			}
		}
	}
	return root;
};

const insertNode = (tree, node) => {
	if (node.value <= tree.value) {
		if (tree.left) insertNode(tree.left, node);
		else tree.left = node;
	} else {
		if (tree.right) insertNode(tree.right, node);
		else tree.right = node;
	}
};

const generateTree2 = (data) => {
	const root = {};
	root.value = data[0];
	for (let i = 1; i < data.length; i++) {
		insertNode(root, { value: data[i], left: null, right: null });
	}
	return root;
};

// console.log(generateTree2(treeData));
const printNode = (tree) => {
	if (!tree) return null;
	printNode(tree.left);
	console.log(tree.value);
	printNode(tree.right);
};

// printNode(generateTree(treeData));
const tree = generateTree2(treeData);

const deleteNode2 = (parent, root, node) => {
	if (!root) return;
	const tree = root;
	if (tree.value == node) {
		if (tree.left && tree.right) deleteWay1(parent, tree);
		else if (tree.left || tree.right) deleteWay2(parent, tree);
		else deleteWay3(parent, tree);
	}
	if (node < tree.value) {
		deleteNode(tree, tree.left, node);
	} else {
		deleteNode(tree, tree.right, node);
	}
};

const deleteWay1 = (tree, deleteNode) => {
	const root = tree;
	tree = tree.right;

	let currentNode = null;

	while (tree.left.left) tree = tree.left;
	currentNode = tree.left;

	// if(currentNode)
	tree.left = null;
	// currentNode.right = tree.right;
	// currentNode.left = tree.left;

	return currentNode;
};

const deleteWay2 = (tree, deleteNode) => {
	const root = tree;
	const key = tree.left == deleteNode ? "left" : "right";

	tree = root[key];
	if (tree.right) root[key] = tree.right;
	else root[key] = tree.left;
	return root;
};

const deleteWay3 = (tree, deleteNode) => {
	const key = tree.left == deleteNode ? "left" : "right";
	tree[key] = null;
	return tree;
};

function deleteNode(root, key) {
	if (root === null) return null;

	if (key < root.value) {
		root.left = deleteNode(root.left, key);
	} else if (key > root.value) {
		root.right = deleteNode(root.right, key);
	} else {
		// 当前节点是要删除的节点
		// 如果左子树为空，返回右子树
		if (root.left === null) return root.right;
		// 如果右子树为空，返回左子树
		if (root.right === null) return root.left;

		// 找到右子树中最小的节点
		let minNode = root.right;
		while (minNode.left) {
			minNode = minNode.left;
		}

		// 删除右子树中最小的节点
		root.right = deleteNode(root.right, minNode.value);

		// 用右子树中最小的节点替换当前节点
		minNode.left = root.left;
		minNode.right = root.right;
		root = minNode;
	}

	return root;
}

function deleteNode3(root, key) {
	if (root === null) return null;
	if (ket < root.value) root.left = deleteNode3(root.left, key);
	else if (key > root.value) root.right = deleteNode3(root.right, key);
	else {
		if (root.left === null) return root.right;
		if (root.right === null) return root.left;
		const minNode = root.right;
		while (minNode.left) minNode = minNode.left;
		root.right = deleteNode(root.right, minNode.value);

		minNode.left = root.left;
		minNode.right = root.right;
		root = minNode;
	}
	return root;
}

const newTree = deleteNode(tree, 5);
// console.log(newTree);
printNode(newTree);

// {
//   value: 5,
//   right: {
//     value: 7,
//     left: {
//       value: 6,
//       right: {
//         value: 7,
//       },
//     },
//     right: {
//       value: 8,
//     },
//   },
//   left: {
//     value: 3,
//     right: {
//       value: 4,
//     },
//     left: {
//       value: 1,
//       right: {
//         value: 2,
//       },
//     },
//   },
// }
