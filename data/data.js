/*
Fill in your own code where you see "your code here".
You can insert new lines at those locations, but you
will not need to edit the lines above and below them.
*/

//----------------------------------
// Queues — estimated time 5 minutes

function Queue() {
  // your code here
}

Queue.prototype.add = function(item) {
  // your code here
  return this; // chaining
};

Queue.prototype.remove = function() {
  // your code here
};

//----------------------------------
// Stacks — estimated time 3 minutes

function Stack() {
  // your code here
}

Stack.prototype.add = function(item) {
  // your code here
  return this; // chaining
};

Stack.prototype.remove = function() {
  // your code here
};

//-----------------------------------------
// Linked lists — estimated time 15 minutes

function LinkedList () {
  this.head = this.tail = null;
}

function ListNode (item, prev, next) {
  this.item = item;
  this.next = next || null;
  this.prev = prev || null;
}

LinkedList.prototype.addToTail = function(item) {
  // your code here
  return this; // chaining
};

LinkedList.prototype.removeFromTail = function() {
  // your code here
};

LinkedList.prototype.forEach = function(iterator) {
  // your code here
};

//----------------------------------------
// Hash tables — estimated time 20 minutes

function _hash (key) {
  var hashedKey = 0;
  for (var i = 0; i < key.length; i++) {
    hashedKey += key.charCodeAt(i);
  }
  return hashedKey % 20;
}

function HashNode (key, value) {
  this.key = key;
  this.value = value;
}

function Hash () {
  this.buckets = new Array(20);
  // your code here
}

Hash.prototype.set = function(key, value) {
  // your code here
  return this; // chaining
};

Hash.prototype.get = function(key) {
  // your code here
};
