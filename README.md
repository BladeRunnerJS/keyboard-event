# keyboard-event

Why this library exists:

* DOM Level 2 [omitted keyboard events](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-eventgroupings-keyevents) from the specification, so every browser did keyboard event creation differently.
* The DOM Level 2/3 way of creating synthetic events (e.g. `document.createEvent()` followed by `event.initKeyboardEvent()`) is awkward since all arguments are mandatory, and since two method invocations are required instead of one.
* DOM Level 4 deprecates the old way of creating events, preferring [event constructors](http://html5labs.interoperabilitybridges.com/dom4events/#constructors) instead, and it just so happens that most modern browsers have implemented this in a consistent way.
* That leaves the IE8 and IE9+ browsers as being the only ones yet to join the party!

The _keyboard-event_ library polyfills the `KeyboardEvent` constructor for IE8 and IE9+, and, because Chrome continues to use `keyIdentifier` instead of `key`, we polyfill that too. This polyfill differs from [termi's polyfill](https://github.com/termi/DOM-Keyboard-Event-Level-3-polyfill) in that it's much lighter, having only has the IEs to worry about, and in that it adheres to the current standards.
