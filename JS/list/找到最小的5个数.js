const data1 = Array(30)
	.fill(1)
	.map((item) => Math.floor(Math.random() * 100));

const data = [
	25, 74, 92, 2, 53, 41, 30, 58, 78, 91, 5, 92, 52, 85, 50, 6, 31, 41, 67, 29, 24, 58, 43, 57, 39, 78, 90, 45, 69, 94,
];

/**
 *
 * @param {number[]} array
 * @param {number} value
 */
const insertSort = (array, value) => {
	for (let i = 0; i < array.length; i++) {
		if (value > array[i]) continue;
		array.splice(i, 0, value);
		array.length--;
		return;
	}
};
const findMin = (data) => {
	const minArray = Array(5).fill(Infinity);
	for (let i = 0; i < data.length; i++) {
		if (data[i] < minArray[4]) {
			insertSort(minArray, data[i]);
		}
		console.log(minArray);
	}
	return minArray;
};
// insertSort(data, 88);
// console.log(data);

findMin(data);
