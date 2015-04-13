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

  it('adds and removes its own items', function(){
    var q2 = new Queue();
    queue.add('fullstack');
    q2.add('JavaScript');
    expect(q2.remove()).toBe('JavaScript');
    expect(queue.remove()).toBe('fullstack');
  });

  it('returns undefined when empty', function(){
    expect(queue.remove()).toBe(undefined);
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

  it('adds and removes its own items', function(){
    var s2 = new Stack();
    stack.add('fullstack');
    s2.add('JavaScript');
    expect(stack.remove()).toBe('fullstack');
    expect(s2.remove()).toBe('JavaScript');
  });

  it('removes undefined when empty', function(){
    expect(stack.remove()).toBe(undefined);
  });

});

describe('A doubly-linked list', function(){

  var list, uniqueObj = { id: 789 };
  beforeEach(function(){
    list = new LinkedList();
  });

  it('has head and tail originally set to null', function(){
    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);
  });

  it('can add to the tail', function(){
    list.addToTail(uniqueObj);
    expect(list.head).toBe(list.tail);
    expect(list.tail).toEqual(jasmine.objectContaining({
      value: uniqueObj,
      next: null,
      prev: null
    }));
  });

  it('can add two items', function(){
    list.addToTail('first');
    list.addToTail('second');
    expect(list.head).toEqual(jasmine.objectContaining({
      value: 'first',
      next: list.tail,
      prev: null
    }));
    expect(list.tail).toEqual(jasmine.objectContaining({
      value: 'second',
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
    expect(list.head.value).toBe(1);
    expect(list.head.next.value).toBe(2);
    expect(list.head.next.next.value).toBe(3);
    expect(list.head.next.next.next.value).toBe(4);
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

  it('can traverse the list to confirm items', function(){
    list.addToTail('Gandalf');
    list.addToTail('Dumbledore');
    list.addToTail('Merlin');
    expect(list.contains('Dumbledore')).toBe(true);
    expect(list.contains('Oz')).toBe(false);
    list.removeFromTail();
    list.removeFromTail();
    expect(list.contains('Dumbledore')).toBe(false);
  });

});
