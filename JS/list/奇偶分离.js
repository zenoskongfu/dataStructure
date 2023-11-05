const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}
const generator = (array) => {
	let root = { next: null },
		node = root;
	array.forEach((item) => {
		const temp = new Node(item);
		node.next = temp;
		node = temp;
	});

	return root.next;
};

const linkList = generator(data);

const splitLinkList = (linkList) => {
	const listA = linkList,
		listB = linkList.next;
	let node = listB.next,
		ra = listA,
		rb = listB;
	let i = 2;

	while (node) {
		if (i % 2 == 0) {
			ra.next = node;
			ra = ra.next;
		} else if (i % 2 == 1) {
			rb.next = node;
			rb = rb.next;
		}
		node = node.next;
		i++;
	}
	ra.next = null;
	rb.next = null;
	return { listA, listB };
};

const { listA, listB } = splitLinkList(linkList);

const printLinkList = (linkList) => {
	while (linkList) {
		console.log(linkList.value);
		linkList = linkList.next;
	}
};

printLinkList(listA);
printLinkList(listB);
