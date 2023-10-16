/**
 * 二叉树的前序遍历
 */

const data = [0, 1, 2, 3, 4, 5, 6, null, 8, 9, 10, 11];

const generateTree = (data, i) => {
	if (!data[i]) return null;
	const root = { value: data[i] };
	root.left = generateTree(data, 2 * i);
	root.right = generateTree(data, 2 * i + 1);

	return root;
};

const tree = generateTree(data, 1);

const postOrder = (tree) => {
	if (tree == null) return;

	postOrder(tree.left);
	postOrder(tree.right);
	console.log(tree.value);
};

const postOrder2 = (tree) => {
	if (!tree) return;

	const stack = [];
	let pre = null;
	let node = tree;
	while (stack.length !== 0 || node !== null) {
		while (node !== null) {
			stack.push(node);
			node = node.left;
		}

		const currentNode = stack.slice(-1)[0];
		if (currentNode.right !== null && pre !== currentNode.right) {
			node = currentNode.right;
		} else {
			console.log(currentNode.value);
			stack.pop();
			pre = currentNode;
		}
	}
};

const getParents = (tree, p) => {
	if (!tree) return;
	const stack = [];
	let node = tree;
	let pre = null;
	while (stack.length !== 0 || node !== null) {
		while (node) {
			stack.push(node);
			node = node.left;
		}
		node = stack.slice(-1)[0];
		if (node.right && pre !== node.right) {
			node = node.right;
		} else {
			if (node.value == p.value) return stack.map((item) => item.value).slice(0, -1);
			stack.pop();
			pre = node;
			node = null;
		}
	}
	return null;
};

// postOrder2(tree);
console.log("#");

// console.log(getParents(tree, { value: 6 }));
console.log("#");

// console.log(getParents(tree, { value: 2 }));

const findCommonParent = (tree, n1, n2) => {
	const path1 = getParents(tree, n1);
	const path2 = getParents(tree, n2);
	let lastParent = null;
	for (let i = 0; i < path1.length && i < path2.length; i++) {
		if (path1[i] == path2[i]) lastParent = path1[i];
		else return lastParent;
	}
	return lastParent;
};

const findCommonParent2 = (tree, n1, n2) => {
	const stack = [];
	let stack1 = null,
		stack2 = null;

	let node = tree;
	let pre = null;
	while (stack.length || node) {
		while (node) {
			stack.push(node);
			node = node.left;
		}
		[node] = stack.slice(-1);
		if (node.right && pre !== node.right) {
			node = node.right;
		} else {
			if (stack1 == null && node.value == n1.value) {
				stack1 = [...stack.slice(0, -1)];
			}
			if (stack2 == null && node.value == n2.value) {
				stack2 = [...stack.slice(0, -1)];
			}
			if (stack1 !== null && stack2 !== null) {
				return getLastParent(stack1, stack2);
			}
			stack.pop();
			pre = node;
			node = null;
		}
	}
};

const getLastParent = (path1, path2) => {
	let lastParent = null;
	for (let i = 0; i < path1.length && i < path2.length; i++) {
		if (path1[i].value == path2[i].value) lastParent = path1[i].value;
		else return lastParent;
	}
	return lastParent;
};

console.log(findCommonParent2(tree, { value: 2 }, { value: 1 }));
