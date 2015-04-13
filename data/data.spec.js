// Data Structures Review Week Mini-Assessment

describe('A queue', function(){

  var queue, uniqueObj = { id: 123 };
  beforeEach(function(){
    queue = new Queue();
  });

  it('can be constructed', function(){
    expect(queue).toEqual(jasmine.any(Object));
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

  it('can be constructed', function(){
    expect(stack).toEqual(jasmine.any(Object));
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
