import { sort } from "./mergeSort.js";

class Node {
  #left;
  #right;
  #value;

  constructor(value) {
    this.#value = value;
    this.#left = null;
    this.#right = null;
  }

  set left(node) {
    this.#left = node;
  }

  set right(node) {
    this.#right = node;
  }

  set value(value) {
    this.#value = value;
  }

  get left() {
    return this.#left;
  }

  get right() {
    return this.#right;
  }

  get value() {
    return this.#value;
  }
}

class Tree {
  #input;
  #root;

  constructor(dataArray) {
    this.#input = dataArray;
  }

  //Takes sorted array, builds BST, returns root node
  buildTree(input = this.input, start = 0, end = this.input.length - 1) {
    if (start > end) return null;
    let mid = Math.round((start + end) / 2);
    let root = new Node();
    root.value = input[mid];
    root.left = this.buildTree(input, start, mid - 1);
    root.right = this.buildTree(input, mid + 1, end);
    this.root = root;
    return root;
  }

  get input() {
    return this.#input;
  }

  get root() {
    return this.#root;
  }

  set root(node) {
    this.#root = node;
  }

  insert(value, root = this.root) {
    if (root == null) {
      root = new Node(value);
      return root;
    }

    if (value < root.value) {
      root.left = this.insert(value, root.left);
    } else if (value > root.value) {
      root.right = this.insert(value, root.right);
    }
    return root;
  }

  delete(value, root = this.root) {
    //Base case
    if (root == null) return root;

    if (value < root.value) {
      root.left = this.delete(value, root.left);
    } else if (value > root.value) {
      root.right = this.delete(value, root.right);
    }
    //The key matches the current root. Now need to work out how re-order the tree
    else {
      //Node with one or no children
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }

      //The current node has 2 children, so need to get the in order successor
      root.value = this.minValue(root.right);
      //Now delete the inorder successor
      root.right = this.delete(root.value, root.right);
    }
    return root;
  }

  minValue(root) {
    let minVal = root.value;
    while (root.left != null) {
      minVal = root.left.value;
      root = root.left;
    }
    return minVal;
  }

  //Locates and returns node with the supplied value
  find(value, root = this.root) {
    // Base Cases: root is null
    // or key is present at root
    if (root == null || root.value == value) return root;

    // Value is greater than root's value
    if (root.value < value) return this.find(value, root.right);

    // Value is smaller than root's value
    return this.find(value, root.left);
  }

  //Iterative level-order traversal
  levelOrderIter(node = this.root, func = null, retArr = []) {
    //Initially enqueue root node
    let queue = [node];
    while (queue.length > 0) {
      //Take first item from queue
      //Print node
      let currNode = queue.shift();
      retArr.push(currNode.value);
      if (func !== null) func(currNode);
      //Enqueue child nodes
      if (currNode.left !== null) queue.push(currNode.left);
      if (currNode.right !== null) queue.push(currNode.right);
    }
    if (func == null) return retArr;
  }

  //Recursive level-order traversal
  levelOrderRec(queue = [this.root], func = null, retArr = []) {
    if (queue.length < 1) return;

    let childList = [];
    for (let currNode of queue) {
      retArr.push(currNode.value);
      if (func !== null) func(currNode);
      if (currNode.left !== null) childList.push(currNode.left);
      if (currNode.right !== null) childList.push(currNode.right);
    }
    this.levelOrderRec(childList, func, retArr);
    if (func == null) return retArr;
  }

  //Traverse tree in respective order, pass each node to the function argument, or return values array
  inorder(node = this.root, func = null, retArr = []) {
    if (node == null) return;
    this.inorder(node.left, func, retArr);
    retArr.push(node.value);
    if (func != null) func(node);
    this.inorder(node.right, func, retArr);
    if (func == null) return retArr;
  }
  preorder(node = this.root, func = null, retArr = []) {
    if (node == null) return;
    retArr.push(node.value);
    if (func != null) func(node);
    this.preorder(node.left, func, retArr);
    this.preorder(node.right, func, retArr);
    if (func == null) return retArr;
  }
  postorder(node = this.root, func = null, retArr = []) {
    if (node == null) return;
    this.postorder(node.left, func, retArr);
    this.postorder(node.right, func, retArr);
    retArr.push(node.value);
    if (func != null) func(node);
    if (func == null) return retArr;
  }

  //Searches tree, returns height of node passed in (distance to most furthest leaf)
  height(node, start = node.value) {
    if (node == null) return 0;
    let leftHeight = this.height(node.left, start);
    let rightHeight = this.height(node.right, start);
    let maxVal = Math.max(leftHeight, rightHeight);
    return node.value == start ? maxVal : maxVal + 1;
  }

  //Searches tree, returns depth of node passed in (distance from root)
  depth(node) {}

  //Checks that left and right sides are balanced (height no more than 1 difference)
  isbalanced() {}

  //Rebalances an unbalanced tree
  rebalance(tree) {}
}

//Prints the BST
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

//console.log(sort([100, 10, 1, 22, 3]));

let tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
tree.buildTree();
prettyPrint(tree.root);
//console.log(tree.levelOrderRec());
//console.log(tree.levelOrderIter());
//console.log(tree.inorder());
//console.log(tree.preorder());
//console.log(tree.postorder());

console.log(tree.height(tree.root));
//prettyPrint(tree.find(8));
//tree.insert(10);
//tree.insert(11);
//tree.insert(12);
//prettyPrint(tree.root);
//console.log(tree.height(tree.root));
//tree.delete(8);
//prettyPrint(tree.root);
