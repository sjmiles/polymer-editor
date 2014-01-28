
module('type-writer', ['keycode-map'], function(KeyCodeMap) {

  'use strict';

  function placeCaret(node, offset) {
    var range = document.createRange();
    range.setStart(node, offset);
    range.setEnd(node, offset);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    console.log('caret: %d, created range: %d - %d, getSelection().rangeCount: %s', offset, range.startOffset, range.endOffset, getSelection().rangeCount);
  }

  function type(text) {
    for (var i=0, t; t=text[i]; i++) {
      typeChar(t);
    }
  }

  function typeChar(char) {
    var key = KeyCodeMap.getKeyObject(char);
    keyEvent('keydown', key);
    if (key.charCode) {
      keyEvent('keypress', key);
    }
    keyEvent('keyup', key);
  }

  function keyEvent(type, key) {
    var focus = wrap(document.activeElement);
    if (focus) {
      focus.dispatchEvent(makeKeyboardEvent(type, key));
    }
  }

  function makeKeyboardEvent(type, key, modifiers) {
    modifiers = modifiers || 0;

    var evt = document.createEvent('KeyboardEvent');
    evt.initKeyboardEvent(type, true, true, window, key.name, 0,
        !! modifiers.control,
        !! modifiers.alt,
        !! modifiers.shift,
        !! modifiers.meta,
        !! modifiers.altGraph);

    evt.origin = 'mockKeyboard';
    Object.defineProperty(evt, 'keyCode', {get: function() {return key.keyCode;}});
    Object.defineProperty(evt, 'charCode', {get: function() {return key.charCode;}});
    Object.defineProperty(evt, 'which', {get: function() {return key.which;}});
    Object.defineProperty(evt, 'keyIdentifier', {get: function() {return key.keyIdentifier;}});

    return evt;
  };

  return {
    type: type,
    placeCaret: placeCaret
  };

});
