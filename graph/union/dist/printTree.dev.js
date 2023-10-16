"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// const findRoot = (unionArray, node) => {
// 	return unionArray[node];
// };
// function buildTreeFromUnionArray(unionArray) {
// 	const tree = {};
// 	for (let i = 0; i < unionArray.length; i++) {
// 		const root = findRoot(unionArray, i);
// 		if (!tree[root]) {
// 			tree[root] = [];
// 		}
// 		tree[root].push(i);
// 	}
// 	return tree;
// }
// function printTree(tree, node, depth = 0) {
// 	const spaces = " ".repeat(depth * 4);
// 	console.log(spaces + node);
// 	if (tree[node]) {
// 		for (const child of tree[node]) {
// 			printTree(tree, child, depth + 1);
// 		}
// 	}
// }
// // 示例使用
// const unionArray = [0, 1, 1, 3, 4, 5, 6, 7];
// const tree = buildTreeFromUnionArray(unionArray);
console.log("树形结构表示："); // printTree(tree, 1); // 从根节点1开始打印

var data = {
  value: 1,
  next: [{
    value: 2,
    next: {
      value: 4,
      next: null
    }
  }, {
    value: 3,
    next: [{
      value: 5,
      next: {
        value: 6,
        next: null
      }
    }, {
      value: 5,
      next: {
        value: 6,
        next: null
      }
    }]
  }]
};
var res = "";

var printTree = function printTree(data) {
  var deeps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0];
  if (!data) return res;
  var space = deeps.slice(0, -2).map(function (item) {
    return item == 1 ? "|\t\t" : "\t\t";
  }).join(""); // space += "|__";

  res = res + space + data.value + "\n";

  if (Array.isArray(data.next)) {
    for (var i = 0; i < data.next.length; i++) {
      printTree(data.next[i], [].concat(_toConsumableArray(deeps), [i == data.next.length - 1 ? 0 : 1]));
    }
  } else {
    // deeps.push(0);
    printTree(data.next, [].concat(_toConsumableArray(deeps), [0]));
  }

  return res;
};

printTree(data); // printTree(data);

console.log(res);