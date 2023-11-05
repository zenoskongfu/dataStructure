const createTree = (array, index = 1) => {
	if (!array[index]) return null;
	const root = {};
	root.data = array[index];
	root.left = createTree(array, index * 2);
	root.right = createTree(array, index * 2 + 1);
	return root;
};

const dataArray = ["", "*", "+", "*", "a", "b", "c", "-", ...Array(7).fill(null), "d"];

const root = createTree(dataArray);
console.log(root);

const createExpression = (tree) => {
	let expression = "";
	const stack = [];
	let p = tree,
		r;
	// stack.push(tree);
	// if(tree.left.left || tree.left.right) expression += '(';
	while (p || stack.length !== 0) {
		while (p) {
			stack.push(p);
			if (p.left?.left || p.left?.right) expression += "(";
			p = p.left;
		}
		const topValue = stack.slice(-1)[0];
		if (topValue.left == null && topValue.right == null) {
			console.log(topValue.data);
			if (topValue.data !== null) expression += topValue.data;
		}

		if (topValue.right !== null && topValue.right != r) {
			console.log(topValue.data);
			if (topValue.data !== null) expression += topValue.data;
			p = topValue.right;
			if (topValue.right?.left || topValue.right?.right) expression += "(";
		} else {
			stack.pop();

			if (topValue.right == r && r) {
				expression += ")";
			}
			r = topValue;
			// p = null;
		}
		// if(topValue.right == r && r)
		// p = topValue.right;
		// r = topValue;
	}
	return expression;
};

const expression = createExpression(root);
console.log(expression);
