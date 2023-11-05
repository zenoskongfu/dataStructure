const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const generateList = (data) => {
	const root = { next: null };
	let node = root;
	data.forEach((item) => {
		const temp = { value: item, next: null };
		node.next = temp;
		node = node.next;
	});
	return root.next;
};

const linkList = generateList(data);

const printLink = (data) => {
	let node = data;
	while (node) {
		console.log(node.value);
		node = node.next;
	}
};

printLink(linkList);

const reverseLink = (linkList) => {
	if (!linkList || !linkList.next) return linkList;
	const lastNode = reverseLink(linkList.next);
	linkList.next.next = linkList;
	linkList.next = null;
	return lastNode;
};

const reverseLink2 = (linkList) => {
	let node = linkList;
	let pre = null;
	while (node) {
		const next = node.next;
		node.next = pre;
		pre = node;
		node = next;
	}
	return pre;
};

printLink(reverseLink2(linkList));
