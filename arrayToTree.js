const Node = function (value) {
	this.value = value;
	this.left = null;
	this.right = null;
};
//迭代
const ArrayToTreeCycle = (array) => {
	// if array is 0, or null

	//create root node
	const root = new Node(array[0]);
	const queue = [root];
	let index = 1;
	// loop array, and insert node
	while (index < array.length) {
		const currentNode = queue.shift();
		if (array[index] !== null) {
			currentNode.left = new Node(array[index]);
			queue.push(currentNode.left);
		}
		index++;

		if (index < array.length && array[index] !== null) {
			currentNode.right = new Node(array[index]);
			queue.push(currentNode.right);
		}
		index++;
	}

	return root;
};

console.log(ArrayToTreeCycle([1, 2, null, 3, 4, 5]));
