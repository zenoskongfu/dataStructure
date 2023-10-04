/**@typedef {(str: string)=>number[]} getNestArray*/

/**@type {getNestArray} */
const getNestArray = (str) => {
	const nestArray = [-1];
	const strArray = "0" + str;
	nestArray[1] = 0;
	nestArray[2] = 1;

	const getNestNum = (nestNum, s1) => {
		const s2 = strArray[nestNum];
		if (s1 === s2) {
			return nestNum + 1;
		} else if (nestNum === 1) {
			return 1;
		}
		return getNestNum(nestArray[nestNum], s1);
	};
	for (let i = 3; i < strArray.length; i++) {
		const s1 = strArray[i - 1];
		nestArray[i] = getNestNum(nestArray[i - 1], s1);
	}

	return nestArray;
};

// const str = "ababaa";
// console.log(getNestArray(str));
// const str1 = "aaaab";
// console.log(getNestArray(str1));

const getNestValArray = (str) => {
	const nestValArray = getNestArray(str);
	const strArray = "0" + str;
	for (let i = 2; i < nestValArray.length; i++) {
		const s1 = strArray[i];
		const nestNum = nestValArray[i];
		const s2 = strArray[nestNum];
		if (s1 === s2) {
			nestValArray[i] = nestValArray[nestNum];
		}
	}

	return nestValArray;
};

const str = "ababaa";
const str1 = "aaaab";
// console.log(getNestValArray(str));
// console.log(getNestValArray(str1));

/**@type {(str: string, matchStr: string, getNestArray: getNestArray)=>number} */
const KMP = (str, matchStr, getNestArray) => {
	const nestArray = getNestArray();
	const strArray = "0" + str;
	let i = 0,
		j = 1;
	while (i < matchStr.length && j < strArray.length) {
		if (j === 0 || strArray[j] === matchStr[i]) {
			i++;
			j++;
		} else {
			j = nestArray[j];
		}
	}
	if (j === strArray.length) return i - j + 1;
	return -1;
};
const matchStr1 = "qweaaababaaabab";
const matchStr2 = "bbabaabab";
// console.log(KMP(str, matchStr1, getNestArray));
// console.log(KMP(str, matchStr2, getNestArray));
console.log(KMP(str, matchStr1, getNestValArray));
console.log(KMP(str, matchStr2, getNestValArray));
