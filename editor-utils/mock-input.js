/**
* Copyright 2013 Google Inc. All Rights Reserved.
*
* @fileoverview
*
* layman's Input to differentiate between insert/delete character
* and split/merge tree nodes (aka splitting a paragraph when hitting a
* carriage return)
*
* @author jelte@google.com (Jelte Liebrand)
*/

'use strict';

module('mock-input', 
  ['dom-selection', 'keycode-map'], 
  function(Selection, KeyCodeMap) {

    var Input = {
      intentFromKeyEvent: function(event) {
        var m = this[event.type];
        if (typeof m === 'function') {
          return m.call(this, event);
        }
      },

      keypress: function(event) {
        var letter = String.fromCharCode(event.charCode);
        return {node: event.target, intent: 'insert-text', context: {text: letter}};
      },

      keydown: function(event) {
        // ask the Element to convert the key to an edit intent
        return findShortCutIntent(event);
      }
    };

    function findShortCutIntent(event) {
      return Selection.walkUp(function(node) {
        if (node.shortCuts) {
          // TODO(jliebrand): should really match these keys
          // better but for now, just hardcoding this...
          var shortCuts = node.shortCuts['win'];
          var shortCut = findShortCut(event, shortCuts);
          if (shortCut) {
            // found a match, return the intent information
            return {node: node, intent: shortCut.editIntent, context: shortCut.context};
          }
        }
      });
    };

    function findShortCut(event, shortCuts) {
      for (var shortCut in shortCuts) {
        if (matchesShortCut(event, shortCut)) {
          return shortCuts[shortCut];
        }
      }
    }

    function matchesShortCut(event, shortCut) {
      var keys = parseShortCut(shortCut);
      return event.keyCode === keys.code &&
              event.metaKey === keys.meta &&
              event.shiftKey === keys.shift &&
              event.ctrlKey === keys.control;
    }

    function parseShortCut(shortCut) {
      var modifiers = {
        meta: false,
        shift: false,
        control: false
      };
      shortCut.split(' ').forEach(function(key) {
        parseKey(key, modifiers);
      });
      return modifiers;
    }

    function parseKey(key, modifiers) {
      var keyToPress =  KeyCodeMap.getKeyObject(key);
      modifiers[keyToPress.keyIdentifier.toLowerCase()] = true;
      if (keyToPress.keyCode !== undefined) {
        modifiers.code = keyToPress.keyCode;
      }
    }

    return Input;
  }
);