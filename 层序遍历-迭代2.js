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

const levelOrderTraversal = (root) => {
	if (!root) return [];

	const result = [];
	const queue = [root];

	while (queue.length > 0) {
		const levelSize = queue.length;
		const currentLevel = [];

		for (let i = 0; i < levelSize; i++) {
			const currentNode = queue.shift();
			currentLevel.push(currentNode.val);

			if (currentNode.left) queue.push(currentNode.left);
			if (currentNode.right) queue.push(currentNode.right);
		}

		result.push(currentLevel);
	}

	return result;
};

const input = [3, 9, 20, null, null, 15, 7];
const root = arrayToTree(input);
const output = levelOrderTraversal(root);
console.log(output); // 输出：[[3], [9, 20], [15, 7]]

const levelOrderTraversal2 = (root) => {
	// 遍历第n层
	// 遍历第n+1层
	// 遍历结束
	// 返回结果
	let result = [];
	let levelResult = [];
	let levelNods = [root];
	let nextLevelNodes = [];
	do {
		while (levelNods.length > 0) {
			const currentNode = levelNods.shift();
			levelResult.push(currentNode.val);
			// if(currentNode.left)
			currentNode.left && nextLevelNodes.push(currentNode.left);
			currentNode.right && nextLevelNodes.push(currentNode.right);
		}

		// currentLevels++;
		result.push(levelResult);
		levelNods = nextLevelNodes;
		nextLevelNodes = [];
		levelResult = [];
	} while (levelNods.length !== 0);

	return result;
};

const levelOrderTraversal3 = (root) => {
	const result = [];
	let levelResult = [];
	const queue = [root];
	while (queue.length !== 0) {
		const levelLength = queue.length;
		for (let i = 0; i < levelLength; i++) {
			const currentNode = queue.shift();
			levelResult.push(currentNode.val);
			currentNode.left && queue.push(currentNode.left);
			currentNode.right && queue.push(currentNode.right);
		}

		result.push(levelResult);
		levelResult = [];
	}
	return result;
};
const output2 = levelOrderTraversal2(root, 3);
console.log(output2); // 输出：[[3], [9, 20], [15, 7]]

const output3 = levelOrderTraversal3(root);
console.log(output3); // 输出：[[3], [9, 20], [15, 7]]


