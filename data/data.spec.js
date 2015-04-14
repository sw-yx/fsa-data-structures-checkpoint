// Data Structures Review Week Mini-Assessment

describe('A queue', function(){

  var queue, uniqueObj = { id: 123 };
  beforeEach(function(){
    queue = new Queue();
  });

  it('adds and removes an item', function(){
    queue.add(uniqueObj);
    expect(queue.remove()).toBe(uniqueObj);
  });

  // FIFO: First In, First Out
  it('adds and removes three items in a FIFO way', function(){
    queue.add(5);
    queue.add(uniqueObj);
    queue.add('fullstack');
    expect(queue.remove()).toBe(5);
    expect(queue.remove()).toBe(uniqueObj);
    expect(queue.remove()).toBe('fullstack');
  });

  it('can handle interspersed add and remove', function(){
    queue.add(1);
    expect(queue.remove()).toBe(1);
    queue.add(2);
    queue.add(3);
    expect(queue.remove()).toBe(2);
    queue.add(4);
    expect(queue.remove()).toBe(3);
    expect(queue.remove()).toBe(4);
  });

  // extra credit; change `xit` to `it` to test
  xit('does not use shift', function(){
    // replacing `shift` with a spy
    var shift = jasmine.createSpy('shift');
    var oldShift = Array.prototype.shift;
    Array.prototype.shift = shift;
    // using the queue
    queue.add(9001);
    queue.remove();
    // checking if you used `.shift` in your implementation
    expect(shift).not.toHaveBeenCalled();
    // putting the original (non-spy) `shift` back
    Array.prototype.shift = oldShift;
  });

});

describe('A stack', function(){

  var stack, uniqueObj = { id: 456 };
  beforeEach(function(){
    stack = new Stack();
  });

  it('adds and removes an item', function(){
    stack.add(uniqueObj);
    expect(stack.remove()).toBe(uniqueObj);
  });

  // LIFO: Last In, First Out
  it('adds and removes three items in a LIFO way', function(){
    stack.add(5);
    stack.add(uniqueObj);
    stack.add('fullstack');
    expect(stack.remove()).toBe('fullstack');
    expect(stack.remove()).toBe(uniqueObj);
    expect(stack.remove()).toBe(5);
  });

  it('can handle interspersed add and remove', function(){
    stack.add(1);
    expect(stack.remove()).toBe(1);
    stack.add(2);
    stack.add(3);
    expect(stack.remove()).toBe(3);
    stack.add(4);
    expect(stack.remove()).toBe(4);
    expect(stack.remove()).toBe(2);
  });

});

describe('A doubly-linked list', function(){

  var list, uniqueObj = { id: 789 };
  beforeEach(function(){
    list = new LinkedList();
  });

  it('can add to the tail', function(){
    list.addToTail(uniqueObj);
    expect(list.head).toBe(list.tail);
    expect(list.tail).toEqual(jasmine.objectContaining({
      item: uniqueObj,
      next: null,
      prev: null
    }));
  });

  it('can add two items', function(){
    list.addToTail('first');
    list.addToTail('second');
    expect(list.head).toEqual(jasmine.objectContaining({
      item: 'first',
      next: list.tail,
      prev: null
    }));
    expect(list.tail).toEqual(jasmine.objectContaining({
      item: 'second',
      next: null,
      prev: list.head
    }));
  });

  it('can add many items', function(){
    list.addToTail(1);
    list.addToTail(2);
    list.addToTail(3);
    list.addToTail(4);
    expect(list.head.prev).toBe(null);
    expect(list.tail.next).toBe(null);
    expect(list.head.item).toBe(1);
    expect(list.head.next.item).toBe(2);
    expect(list.head.next.next.item).toBe(3);
    expect(list.head.next.next.next.item).toBe(4);
    expect(list.tail).toBe(list.head.next.next.next);
    expect(list.tail.prev).toBe(list.head.next.next);
    expect(list.tail.prev.prev).toBe(list.head.next);
    expect(list.tail.prev.prev.prev).toBe(list.head);
  });

  it('can remove items cleanly', function(done){
    list.addToTail(500);
    list.addToTail(404);
    expect(list.removeFromTail()).toBe(404);
    expect(list.tail.next).toBe(null);
    expect(list.removeFromTail()).toBe(500);
    expect(list.head).toBe(null);
    expect(list.removeFromTail()).toBe(undefined);
  });

  it('can call a function on each node item', function(){
    list.addToTail('Gandalf');
    list.addToTail('Dumbledore');
    list.addToTail('Merlin');
    var initials = [];
    list.forEach(function(item){
      initials.push(item[0]);
    });
    expect(initials).toEqual(['G','D','M']);
  });

});

describe('A hash table', function(){

  var hash;
  beforeEach(function(){
    hash = new Hash();
  });

  it('has linked lists in each bucket', function(){
    for (var i = 0; i < hash.buckets.length; i++) {
      expect(hash.buckets[i] instanceof LinkedList).toBe(true);
    }
  });

  it('uses a hashing function to add hash nodes to the correct linked list', function(){
    hash.set('name', 'Harry Potter');
    // `_hash('name')` returns 17
    // use the linked list `addToTail`
    // you'll need to put a hash node inside a linked list node
    expect(hash.buckets[17].head.item).toEqual(jasmine.objectContaining({
      key: 'name',
      value: 'Harry Potter'
    }));
  });

  it('can add multiple items', function(){
    hash.set('house', 'Gryffindor');
    hash.set('glasses', true);
    expect(hash.buckets[ 8].head.item.value).toBe('Gryffindor');
    expect(hash.buckets[14].head.item.value).toBe(true);
  });

  it('handles collision by adding to the list', function(){
    hash.set('node', 'Pearl St.');
    hash.set('done', 'Hanover Sq.');
    var head = hash.buckets[2].head;
    expect(head.item.value).toBe('Pearl St.');
    expect(head.next.item.value).toBe('Hanover Sq.');
  });

  it('returns an item based on the key', function(){
    hash.set('status', 200);
    // use the linked list `forEach` method
    expect(hash.get('status')).toBe(200);
  });

  it('returns the most recent value for the key', function(){
    hash.set('year', 'MMXV');
    hash.set('year', 2015);
    expect(hash.get('year')).toBe(2015);
  });

});
