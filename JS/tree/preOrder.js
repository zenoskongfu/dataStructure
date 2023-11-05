/**
 * 二叉树的前序遍历
 */

const data = [0, 1, 2, 3, 4, 5, 6, null];

const generateTree = (data, i) => {
	if (!data[i]) return null;
	const root = { value: data[i] };
	root.left = generateTree(data, 2 * i);
	root.right = generateTree(data, 2 * i + 1);

	return root;
};

const tree = generateTree(data, 1);

const preOrder = (root) => {
	if (!root) return;
	console.log(root.value);
	preOrder(root.left);
	preOrder(root.right);
};

const InOrder = (root) => {
	if (!root) return;
	InOrder(root.left);
	console.log(root.value);
	InOrder(root.right);
};

// preOrder(tree);

const preOrder2 = (root) => {
	const stack = [];
	// stack.push(root);
	let node = root;
	while (stack.length !== 0 || node !== null) {
		while (node !== null) {
			console.log(node.value);
			stack.push(node);
			node = node.left;
		}
		const currentNode = stack.pop();
		node = currentNode.right;
	}
};

const InOrder2 = (root) => {
	const stack = [];
	// stack.push(root);
	let node = root;
	while (stack.length !== 0 || node !== null) {
		while (node !== null) {
			stack.push(node);
			node = node.left;
		}
		const currentNode = stack.pop();
		console.log(currentNode.value);
		node = currentNode.right;
	}
};

InOrder(tree);
