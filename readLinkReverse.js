/**
 *
 * @param {List} list
 */
const readLinkReverse = (list) => {
	if (list === null) return;
	readLinkReverse(list.next);
	console.log(list.value);
};

const list = {
	value: 1,
	next: {
		value: 2,
		next: {
			value: 3,
			next: {
				value: 4,
				next: null,
			},
		},
	},
};
readLinkReverse(list);
