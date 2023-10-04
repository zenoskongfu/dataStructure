/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
	// 计算二叉树的层数
	const tierLevel = Math.log2(root.length + 1);

	// 遍历每一层
	for (let i = 1; i <= tierLevel; i++) {
		let count = 0;
		// 计算当前层的左侧索引
		let leftIndex = Math.pow(2, i) + count;
		// 计算当前层的右侧索引
		let rightIndex = Math.pow(2, i + 1) - (count + 1);

		// 当左侧索引小于右侧索引时，继续比较
		while (leftIndex < rightIndex) {
			// 如果对应位置的节点值不相等，返回 false
			if (root[leftIndex - 1] !== root[rightIndex - 1]) {
				return false;
			}

			// 更新计数器和索引值，继续比较下一对节点
			count++;
			leftIndex = Math.pow(2, i) + count;
			rightIndex = Math.pow(2, i + 1) - (count + 1);
		}
	}

	// 如果所有对应位置的节点都相等，返回 true
	return true;
};

const root = [1, 2, 2, 4, 3, 3, 4];

console.log(isSymmetric(root));

function TreeNode(val, left, right) {
	this.val = val === undefined ? 0 : val;
	this.left = left === undefined ? null : left;
	this.right = right === undefined ? null : right;
}

const generateArray = (array) => {
	if (!array || array.length === 0) return;
	const node = new TreeNode(array[0]);
	const queue = [node];
	let index = 1;

	while (index < array.length) {
		const currentNode = queue.shift();
		if (array[index] !== null) {
			currentNode.left = new TreeNode(array[index]);
			queue.push(currentNode.left);
		}
		index++;
		if (index < array.length && array[index] !== null) {
			currentNode.right = new TreeNode(array[index]);
			queue.push(currentNode.right);
		}
		index++;
	}
	return node;
};

function TreeNode(val, left, right) {
	this.val = val === undefined ? 0 : val;
	this.left = left === undefined ? null : left;
	this.right = right === undefined ? null : right;
}
// 将数组转换为二叉树结构的函数，传入数组和起始索引（默认为0）
const arrayToTree = (array, index = 0) => {
	// 如果数组为空或索引超出范围，返回 null
	if (!array || array.length === 0 || index >= array.length) return null;

	// 创建当前节点并设置其值
	const currentNode = new TreeNode(array[index]);
	// 设置当前节点的左子节点
	currentNode.left = arrayToTree(array, 2 * index + 1);
	// 设置当前节点的右子节点
	currentNode.right = arrayToTree(array, 2 * index + 2);

	// 返回当前节点
	return currentNode;
};

// 检查二叉树是否对称的函数，传入一个表示二叉树的数组
const isSymmetric2 = (array) => {
	// 如果数组为空，返回 false
	if (!array || array.length === 0) return false;

	// 将数组转换为二叉树结构
	const tree = arrayToTree(array);

	// 定义递归函数来检查左右子树是否对称
	const isEqual = (left, right) => {
		// 如果左右子树都为 null，返回 true
		if (left === null && right === null) return true;
		// 如果左右子树有一个为 null，返回 false
		if (left === null || right === null) return false;

		// 检查左右子树的值是否相等，以及递归检查左右子树的子树是否对称
		return (
			left.val === right.val &&
			isEqual(left.left, right.right) &&
			isEqual(left.right, right.left)
		);
	};

	// 检查根节点的左右子树是否对称
	return isEqual(tree.left, tree.right);
};

console.log(isSymmetric2(root));
