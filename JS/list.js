/**
 * @typedef {object} List
 * @property {number} value
 * @property {List | null} next
 */

/**
 * @param {List} list
 */
function switchList(list) {
	let end = null;
	if (list.next.next !== null) end = switchList(list.next);
	const p = list.next;
	p.next = list;
	list.next = null;
	if (end === null) end = p;
	return end;
}

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

console.log(list);
console.log(JSON.stringify(switchList(list)));
