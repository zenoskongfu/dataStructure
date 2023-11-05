// 判断是否为二叉排序树
/**
 * 这篇文章来分享2022年考研数据结构中的一道考题：
 *
 *
 */
const data = [40, 25, 50, -1, 30, -1, 80, -1, -1, 27];

let num = -1;
const judgeBiSearchTree = (data, index = 0) => {
	if (data[index] == -1 || index >= data.length) return true;
	if (judgeBiSearchTree(data, index * 2 + 1) == false) return false;
	if (num < data[index]) num = data[index];
	else return false;
	if (judgeBiSearchTree(data, index * 2 + 2) == false) return false;
	return true;
};

const printBiTree = (data, index = 0) => {
	if (data[index] == -1 || index >= data.length) return;
	printBiTree(data, index * 2 + 1);
	console.log(data[index]);
	printBiTree(data, index * 2 + 2);
};

const judgeBiSearchTree2 = (data) => {
	const min = [...data];
	const max = [...data];
	for (let i = data.length - 1; i > 0; i--) {
		if (data[i] == -1) continue;
		const parentIndex = Math.floor((i - 1) / 2);
		if (i % 2 == 1 && data[parentIndex] > max[i]) min[parentIndex] = min[i];
		else if (i % 2 == 0 && data[parentIndex] < min[i]) max[parentIndex] = max[i];
		else return false;
	}
	return true;
};

const T1 = [40, 25, 60, -1, 30, -1, 80, -1, -1, 27];
const T1_2 = [40, 25, 60, -1, 30, -1, 80, -1, -1, 99];
// console.log(judgeBiSearchTree(data));
printBiTree(T1);
console.log(judgeBiSearchTree2(T1));

printBiTree(T1_2);
console.log(judgeBiSearchTree2(T1_2));
