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

const levelOrderTraversalRecursive = (root) => {
	const result = [];

	const helper = (node, level) => {
		if (!node) return;

		// 如果结果数组长度小于等于层级，则添加一个空数组表示新的层级
		if (result.length <= level) {
			result.push([]);
		}

		// 将当前节点的值添加到对应层级的数组中
		result[level].push(node.val);

		// 递归处理左右子节点
		helper(node.left, level + 1);
		helper(node.right, level + 1);
	};

	helper(root, 0);
	return result;
};

const input = [3, 9, 20, null, null, 15, 7];
const root = arrayToTree(input);
const output = levelOrderTraversalRecursive(root);
console.log(output); // 输出：[[3], [9, 20], [15, 7]]
