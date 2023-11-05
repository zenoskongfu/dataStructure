const Node = function (value) {
	this.value = value;
	this.left = null;
	this.right = null;
};

const array2treeRecursively = (array, index = 0) => {
	if (array.length <= 0 || !array || index >= array.length || array[index] === null) return null;
	const currentNode = new Node(array[index]);
	currentNode.left = array2treeRecursively(array, index * 2 + 1);
	currentNode.right = array2treeRecursively(array, index * 2 + 2);
	return currentNode;
};

console.log(array2treeRecursively([1, null, 4, null, null, 5, 6]));
