describe("keyboard-event", function() {
  var inputContainer, input;

  var inputKey = null;
  var defaultPrevented = null;
  var inputListener = function(evt) {
    inputKey = evt.key;
    defaultPrevented = evt.defaultPrevented || (evt.returnValue === false);
  };

  var containerKey = null;
  var containerListener = function(evt) {
    containerKey = evt.key;
  };

  var defaultPreventer = function(evt) {
    evt.preventDefault();
  }

  beforeEach(function() {
    inputContainer = document.createElement('div');
    inputContainer.id = 'input-container';
    inputContainer.innerHTML = '<input type="text">';
    document.body.appendChild(inputContainer);
    input = document.body.querySelector('#input-container input');
  });

  afterEach(function() {
    document.body.removeChild(inputContainer);
  });

  it('should create non bubbling events by default', function() {
    // IE8 doesn't allow bubbling to be disabled
    if(KeyboardEvent.type == 'IE8') return;

    // given
    input.addEventListener('keydown', inputListener, false);
    inputContainer.addEventListener('keydown', containerListener, false);

    // when
    input.dispatchEvent(new KeyboardEvent('keydown', {key:'X'}));

    // then
    expect(inputKey).toEqual('X');
    expect(containerKey).toBeNull();
  });

  it('should allow bubbling events to be created if requested', function() {
    // given
    input.addEventListener('keydown', inputListener, false);
    inputContainer.addEventListener('keydown', containerListener, false);

    // when
    input.dispatchEvent(new KeyboardEvent('keydown', {key:'X', bubbles:true}));

    // then
    expect(inputKey).toEqual('X');
    expect(containerKey).toEqual('X');
  });

  it('should create non cancelable events by default', function() {
    // given
    input.addEventListener('keydown', defaultPreventer, false);
    input.addEventListener('keydown', inputListener, false);
    inputContainer.addEventListener('keydown', containerListener, false);

    // when
    input.dispatchEvent(new KeyboardEvent('keydown'));

    // then
    expect(defaultPrevented).toBeFalsy();
  });

  it('should allow cancelable events to be created if requested', function() {
    // given
    input.addEventListener('keydown', defaultPreventer, false);
    input.addEventListener('keydown', inputListener, false);
    // Note: register listener an extra time since IE invokes the listeners in reverse order
    input.addEventListener('keydown', defaultPreventer, false);
    inputContainer.addEventListener('keydown', containerListener, false);

    // when
    input.dispatchEvent(new KeyboardEvent('keydown', {cancelable:true}));

    // then
    expect(defaultPrevented).toBeTruthy();
  });

  it('cancelling events from a parent element has no affect even when bubbling is enabled', function() {
    // given
    inputContainer.addEventListener('keydown', defaultPreventer, false);
    input.addEventListener('keydown', inputListener, false);
    inputContainer.addEventListener('keydown', containerListener, false);

    // when
    input.dispatchEvent(new KeyboardEvent('keydown', {bubbles:true, cancelable:true}));

    // then
    expect(defaultPrevented).toBeFalsy();
  });

  // TODO: add some tests for the key modifiers
});
