"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**@typedef {{value: number, next: nodeType}} nodeType */

/**@type {nodeType[]} */
var graphNodes = Array(7).fill(0).map(function (item, index) {
  var temp = {};
  temp.value = index;
  temp.next = null;
  return temp;
});
var graphEdges = {
  1: [2, 4],
  2: [5],
  3: [5, 6],
  4: [2]
};

var generateGraph = function generateGraph(graphNodes, graphEdges) {
  Object.entries(graphEdges).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        nodeKey = _ref2[0],
        edges = _ref2[1];

    graphNodes[nodeKey].next = edges.reduce(function (res, nextEdge) {
      var temp = {
        value: nextEdge,
        next: null
      };
      var tempRes = res;

      while (tempRes.next) {
        tempRes = tempRes.next;
      }

      tempRes.next = temp;
      return res;
    }, {}).next;
  });
  return graphNodes;
};

var isVisited = Array(7).fill(false);
generateGraph(graphNodes, graphEdges);
var lowestPower = Array(6).fill(-1).map(function (item) {
  return {
    power: -1,
    nodeFrom: null
  };
});
var minTreeEdges = [];
var minTreeNodes = [];

var addNodeToMinTree = function addNodeToMinTree(newNode, otherNode) {
  minTreeEdges.push([newNode, otherNode]);
  minTreeNodes.push(newNode);
};

var getMinTree = function getMinTree(graph, currentNode) {
  //update power
  for (var node = graph[currentNode].next; node !== null; node = node.next) {
    if (isVisited[node.value] == false) {
      var newPower = node.power;

      if (lowestPower[node.power] == -1 || lowestPower[node.value].power > newPower) {
        lowestPower[node.value].power = newPower;
        lowestPower[node.value].nodeFrom = currentNode;
      }
    }
  } // find minIndex


  var minPower = Infinity;
  var minIndex = -1;

  for (var i = 0; i < graph.length; i++) {
    if (isVisited[i] == false && lowestPower[i].power !== -1 && lowestPower[i].power < minPower) {
      minPower = lowestPower[i].power;
      minIndex = i;
    }
  }

  if (minIndex == -1) return; // there was not left node, then return
  //add new node in graph

  isVisited[minIndex] = true;
  addNodeToMinTree(lowestPower[minIndex].nodeFrom, minIndex);
  getMinTree(graph, minIndex);
};

isVisited[1] = true;
lowestPower[1].power = 1;
lowestPower[1].nodeFrom = 1;
minTreeNodes.push(1);
getMinTree(graphNodes, 1);
console.log(lowestPower);
console.log(minTreeNodes, minTreeEdges);