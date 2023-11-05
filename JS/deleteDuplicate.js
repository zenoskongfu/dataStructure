const deleteDupBySet = (array) => {
	return [...new Set(array)];
};

/**
 *
 * @param {number[]} array
 */
const deleteDuplicSorted = (array) => {
	let k = 0;
	for (let i = 1; i < array.length; ) {
		if (array[i - k - 1] == array[i]) {
			k++;
		} else {
			array[i - k] = array[i];
			i++;
		}
	}
	array.length = array.length - k;
	return array;
};

const data = [1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 6, 7, 8, 9, 9, 9];
// console.log(deleteDuplicSorted(data));

class HashList {
	constructor(number) {
		this.list = Array(number).fill(null);
		this.len = number;
	}

	isHas(value) {
		const hashValue = value % this.len;
		let linkList = this.list[hashValue];
		while (linkList) {
			if (linkList.value == value) return true;
			linkList = linkList.next;
		}

		this._insert(hashValue, value);
		return false;
	}
	_insert(index, value) {
		const linkList = this.list[index];
		const temp = { value, next: null };
		if (linkList == null) {
			this.list[index] = temp;
		} else {
			// 头插法
			temp.next = linkList.next;
			linkList.next = temp;
		}
	}
}
/**
 *
 * @param {number[]} array
 */
const deleteDupByHash = (array) => {
	const hashList = new HashList(array.length);
	let k = 0;
	for (let i = 0; i < array.length; i++) {
		if (hashList.isHas(array[i])) {
			k++;
		} else {
			array[i - k] = array[i];
		}
	}
	array.length = array.length - k;
	return array;
};

console.log(deleteDupByHash(data));
