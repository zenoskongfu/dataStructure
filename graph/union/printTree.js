//quick find
const unionArray2TreeData2 = (unionArray) => {
	const tree = {};
	unionArray.forEach((item, index) => {
		if (index == 0) return;
		if (item == index) {
			tree[item] = { value: index, next: [] };
		}
	});

	unionArray.forEach((item, index) => {
		if (index == 0) return;
		if (item !== index) {
			const temp = { value: index, next: null };
			tree[item].next = tree[item].next || [];
			tree[item].next.push(temp);
		}
	});

	return tree;
};

// quick find and quick union
const unionArray2TreeData = (unionArray) => {
	const tree = {};

	unionArray.forEach((item, index) => {
		if (index == 0) return;
		tree[index] = { value: index, next: [] };
	});

	unionArray.forEach((item, index) => {
		if (index == 0) return;
		if (item !== index) {
			tree[item].next.push(tree[index]);
		}
	});

	unionArray.forEach((item, index) => {
		if (index == 0) return;
		if (index !== item) delete tree[index];
	});

	return tree;
};

let res = "";

const printTree = (data, deeps = [1]) => {
	if (!data) return res;

	let space = deeps
		.slice(0, -1)
		.map((item) => {
			return item == 1 ? "|\t\t" : "\t\t";
		})
		.join("");

	space += "|__";

	res = res + space + data.value + "\n";
	if (Array.isArray(data.next)) {
		for (let i = 0; i < data.next.length; i++) {
			printTree(data.next[i], [...deeps, i == data.next.length - 1 ? 0 : 1]);
		}
	} else {
		printTree(data.next, [...deeps, 0]);
	}

	return res;
};

const printMultiTree = (treeData) => {
	Object.values(treeData).forEach((item, index, array) => {
		printTree(item);
	});
	console.log(res);
	res = "";
};

module.exports = { unionArray2TreeData, printMultiTree };
