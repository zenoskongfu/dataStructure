class TreeNode {
	constructor(val, left, right) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

const arrayToTree = (array, index = 0) => {
	if (!array || array.length === 0 || index >= array.length || array[index] === null) return null;

	const currentNode = new TreeNode(array[index]);
	currentNode.left = arrayToTree(array, 2 * index + 1);
	currentNode.right = arrayToTree(array, 2 * index + 2);
	return currentNode;
};

const levelOrderTraversalIterative = (root) => {
	if (!root) return [];

	const result = [];
	const stack = [[root, 0]]; // 初始化栈，包含根节点及其对应的层级

	while (stack.length > 0) {
		const [currentNode, level] = stack.pop(); // 从栈中弹出当前节点及其层级

		// 如果结果数组长度小于等于层级，则添加一个空数组表示新的层级
		if (result.length <= level) {
			result.push([]);
		}

		// 将当前节点的值添加到对应层级的数组中
		result[level].push(currentNode.val);

		// 如果有右子节点，将右子节点及其层级入栈
		if (currentNode.right) {
			stack.push([currentNode.right, level + 1]);
		}

		// 如果有左子节点，将左子节点及其层级入栈
		if (currentNode.left) {
			stack.push([currentNode.left, level + 1]);
		}
	}

	return result;
};

const input = [3, 9, 20, null, null, 15, 7];
const root = arrayToTree(input);
const output = levelOrderTraversalIterative(root);
console.log(output); // 输出：[[3], [9, 20], [15, 7]]
