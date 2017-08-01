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

//// good.

//-----------------------------------------
// Queues

// EXTRA CREDIT: remove the `pending` line in the spec to attempt.

function Queue () {
  // your code here
  this.arr = []
}

Queue.prototype.add = function (item) {
  // your code here
  this.arr.unshift(item)
  return this; // for chaining, do not edit
};

Queue.prototype.remove = function () {
  // your code here
  return this.arr.pop()
};


//// yep.

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
	this.tail = new ListNode(item, oldTail, null)
	if (oldTail) oldTail.next = this.tail
	if (!this.head) this.head = this.tail
  // your code here
  return this; // for chaining, do not edit
};

//// good approach.

LinkedList.prototype.removeFromTail = function () {
  // your code here

	if (!this.tail) {
		return undefined
	} else {
		// this.tail points to this.tail.next
		var oldTail = this.tail
		this.tail = this.tail.prev
		if (this.tail) this.tail.next = null
		// and return this.tail.next
		if (!this.tail) this.head = null
		return oldTail.item
	}
};

//// javascript returns `undefined` by default, so writing `return` on line 84 will suffice.

LinkedList.prototype.forEach = function (iterator) {
  // your code here
  var ptr = this.head
  while (ptr) {
    iterator(ptr.item)
    ptr = ptr.next
  }
};

//// not sure what 'ptr' means. be sure to make your variables readable.

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
  this.head = new AlistNode(key, value, ptr)
  return this; // for chaining; do not edit
};

//// the above can be rewritten:

Alist.prototype.set = function (key, value) {
  this.head = new AlistNode(key, value, this.head)
  return this; // for chaining; do not edit
};

//// the assignment operator (=) 'reads' right-to-left, so it will evaluate the expression on the right before it re-assigns the value of `this.head`.


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

//// excellent.


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

//// no need for a temp variable:

function HashTable () {
  this.buckets = Array(20);
  // your code here
  for (var i = 0; i < this.buckets.length; i++){
    this.buckets[i] = new Alist
  }
}

//// this will accomplish the same thing.

HashTable.prototype.set = function (key, value) {
  // your code here. DO NOT simply set a prop. on an obj., that is cheating.
  this.buckets[hash(key)].set(key,value)
  return this; // for chaining, do not edit
};

HashTable.prototype.get = function (key) {
  // your code here. DO NOT simply get a prop. from an obj., that is cheating.
  return this.buckets[hash(key)].get(key)
};

//// good work using the prototypal methods of the a-list. dry, clean code!

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


//// the logic here gets a bit redundant. here's a possible rewrite:

BinarySearchTree.prototype.insert = function (val) {
  var direction = val < this.value ? 'left' : 'right';
  if (!this[direction]) this[direction] = new BinarySearchTree(val);
  else this[direction].insert(val);

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


//// lovely one-liners and  usage of ternaries.

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

//// a logic gate! good. knowing how those work will save you/your team a lot of trouble as you build out react components. again, the same 'direction' trick will save you a bit of time:

BinarySearchTree.prototype.contains = function (val) {
  if (this.value === val) return true;
  let direction = val < this.value ? 'left' : 'right';
  if (this[direction]) return this[direction].contains(val)
  return false
};

BinarySearchTree.prototype.traverse = function (fn) {
  // your code here
  if (this.left) this.left.traverse(fn);
  // visit the root
  fn(this.value)
  // Inorder right subtree
  if (this.right) this.right.traverse(fn);
};

//// alright, great work Shawn. you have an excellent grasp of these structures and of recursion. my only recommendation is making your code drier wherever it looks redundant. but this is strong stuff.
