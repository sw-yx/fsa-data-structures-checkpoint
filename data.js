'use strict';
/*
Fill in your own code where you see "your code here".
You can insert new lines at those locations, but you
will not need to edit the lines above and below them.
*/

//-----------------------------------------
// Stacks

function Stack () {
  // your code here
  this.arr = []
}

Stack.prototype.add = function (item) {
  // your code here
  this.arr.push(item)
  return this; // for chaining, do not edit
};

Stack.prototype.remove = function () {
  // your code here
  return this.arr.pop()
};

//-----------------------------------------
// Queues

// EXTRA CREDIT: remove the `pending` line in the spec to attempt.

function Queue () {
  // your code here
}

Queue.prototype.add = function (item) {
  // your code here
  return this; // for chaining, do not edit
};

Queue.prototype.remove = function () {
  // your code here
};

//-----------------------------------------
// Linked lists

// EXTRA CREDIT: remove the `pending` line in the spec to attempt.

function LinkedList () {
  this.head = this.tail = null;
}

function ListNode (item, prev, next) {
  this.item = item;
  this.next = next || null;
  this.prev = prev || null;
}

LinkedList.prototype.addToTail = function (item) {

	var oldTail = this.tail
	this.tail = new Node(x, null, oldTail)
	if (oldTail) oldTail.next = this.tail
	if (!this.head) this.head = this.tail
  // your code here
  return this; // for chaining, do not edit
};

LinkedList.prototype.removeFromTail = function () {
  // your code here

	if (!this.tail) {
		return null
	} else {
		// this.tail points to this.tail.next
		var oldTail = this.tail
		this.tail = this.tail.previous
		if (this.tail) this.tail.next = null
		// and return this.tail.next
		if (!this.tail) this.head = null
		return oldTail.value
	}
};

LinkedList.prototype.forEach = function (iterator) {
  // your code here
};

//-----------------------------------------
// Association lists

function Alist () {
  // your code here
  this.head = null
}

function AlistNode (key, value, next) {
  this.key = key;
  this.value = value;
  this.next = next;
}

Alist.prototype.set = function (key, value) {
  // your code here
  // console.log('this', this, 'key', key, 'value', value)
  var ptr = this.head
  // while (ptr) {
  //   console.log('ptr', ptr)
  //   if (ptr && ptr.key === key) {
  //     // set new value
  //     ptr.value = value
  //     return this
  //   } 
  //   ptr = ptr.next
  // }
  this.head = new AlistNode(key,value, ptr)
  return this; // for chaining; do not edit
};

Alist.prototype.get = function (key) {
  // your code here
  var ptr = this.head
  while (ptr) {
    if (ptr.key === key) {
      return ptr.value
    }
    ptr = ptr.next
  }
};


//-----------------------------------------
// Hash tables

function hash (key) {
  var hashedKey = 0;
  for (var i = 0; i < key.length; i++) {
    hashedKey += key.charCodeAt(i);
  }
  return hashedKey % 20;
}

function HashTable () {
  this.buckets = Array(20);
  // your code here
  var x = []
  for (var i = 0; i< 20; i++){
    x.push(new Alist())
  }
  this.buckets = x
}

HashTable.prototype.set = function (key, value) {
  // your code here. DO NOT simply set a prop. on an obj., that is cheating.
  this.buckets[hash(key)].set(key,value)
  return this; // for chaining, do not edit
};

HashTable.prototype.get = function (key) {
  // your code here. DO NOT simply get a prop. from an obj., that is cheating.
  return this.buckets[hash(key)].get(key)
};

//-----------------------------------------
// Binary search trees

function BinarySearchTree (val) {
  // your code here
	this.value = val
	this.left = null
	this.right = null
}

BinarySearchTree.prototype.insert = function (v) {
  // your code here
  if (this.value < v) {
      if (this.right) {
          this.right.insert(v) 
      } else {
          this.right = new BinarySearchTree(v)
      }
  } else {
      if (this.left) {
          this.left.insert(v) 
      } else {
          this.left = new BinarySearchTree(v)
      }
  }
  return this; // for chaining, do not edit
};

BinarySearchTree.prototype.min = function () {
  // your code here
  return this.left ? this.left.min() : this.value
};

BinarySearchTree.prototype.max = function () {
  // your code here
  return this.right ? this.right.max() : this.value
};

BinarySearchTree.prototype.contains = function (v) {
  // your code here
    if (this.value == v) {
        return true
    } else {
        if (this.right) {
            var rightside = this.right.contains(v) 
        } else {
            var rightside = false
        }
        if (this.left) {
            var leftside = this.left.contains(v) 
        } else {
            var leftside = false
        }
        return leftside || rightside
    }
};

BinarySearchTree.prototype.traverse = function (fn) {
  // your code here
  if (this.left) this.left.traverse(fn);
  // visit the root
  fn(this.value)
  // Inorder right subtree
  if (this.right) this.right.traverse(fn);
};
