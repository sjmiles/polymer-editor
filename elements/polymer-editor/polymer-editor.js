(function() {

  // TODO(sjmiles): Declare module names to manifest these symbols; the actual
  // references are supplied (injected?) asynchronously

  var PreOrderIter, DomUtils, DomPosition, Emitter, Input, Selection;

  Polymer('polymer-editor', {
    registerCallback: function() {

      // TODO(sjmiles): at registerCallback time, we are assured our
      // modules are available. Can we DRY this without storing
      // the modules on an object?

      PreOrderIter = marshal('utils-preorderiter');
      DomUtils = marshal('utils-dom');
      DomPosition = marshal('utils-domposition');
      Emitter = marshal('events-emitter');
      Input = marshal('mock-input');
      Selection = marshal('mock-selection');
    },

    ready: function() {
      this.emitter_ = new Emitter();
      this.input_ = new Input(this.emitter_);


      /**
       * Handle 'insertText' edit intent
       * Algorithm:
       *   1- if inside text node: split
       *   2- create new TEXT_NODE for new text
       *   3- if DomPosition.container supports insertNode(textNode):
       *      - container.insertNode(newTextNode)
       *      - (and move caret)
       *
       * @param {object} context contains contextual information:
       * @param {string} context.text the new text to insert
       */
      this.emitter_.on('insertText', function(context) {

        // add new text node to our context
        context.node = document.createTextNode(context.text);

        var dp = Selection.startDomPosition();
        if (dp) {
          if (dp.insideTextNode()) {

            // TODO(sjmiles): to use the DomUtils private symbol (et al) we
            // have to define it in the outer closure, otherwise it would have
            // to hang off an object, like `modules.DomUtils`, which has poor
            // ergonomics

            var tnOffset = DomUtils.splitText(dp.container, dp.offset);
            dp = new DomPosition(dp.container.parentNode, tnOffset);
            Selection.setStartDomPosition(dp);
          }

          if (dp.container) {

            // add the DomPosition to the context, so we can pass it to
            // the various Elements
            context.dp = dp;

            // TODO(jliebrand): wrap this supports stuff up in a
            // FuncUtils.guardCall or something...
            if (context.dp.container.supports &&
              context.dp.container.supports('insertNode', context)) {

              context.dp.container.insertNode(context);

              // hack to move the selection - this should be handled
              // differently so this core edit can remain oblivious
              // to selection movement!
              tnOffset++;
              var caret = new DomPosition(dp.container.childNodes[tnOffset], 0);
              Selection.setStartDomPosition(caret);
            }
            context.dp.container.normalize();
          }

        }

      });


      /**
       * Handle 'delete' edit intent
       * Algorithm:
       *   1- if inside text node:
       *      - split and delete
       *   2- else
       *      - get right/left leaf; and walk from one to the other
       *      - if merge required:
       *        - if (leftLeaf.supports('merge', rightLeaf))
       *          - merge
       *        - else ignore
       *      - else
       *        - if (leftLeaf.isTextNode)
       *          - split and delete
       *        - else
       *          if (leftLeaf.supports('deleteMe') &&
       *              leftParent.supports('deleteChild'))
       *            - leftParent.deleteChild(leftLeaf)
       *
       *
       * @param {object} context contains contextual information:
       * @param {string} context.direction which way to delete
       * @param {string} context.granularity indicates how far to delete, which
       *                                     is ONLY used when inside text node
       *                                     eg: 'char', 'word', 'boundary'
       * @param {string} context.boundaryRegEx optional item containing a
       *                                       regex to define what boundary
       *                                       to look for (eg '\w', or '[^$]')
       *                                       (think sublime use case!)
       */
      this.emitter_.on('delete', function(context) {
        // TODO(jliebrand): Break this mamoth function up in smaller bits!

        // TODO(jliebrand): need to support direction better; too much
        // harcoded 'left' stuff!

        // TODO(jliebrand): fix this to use context.boundaryRegEx
        var WORDLENGTH = 4;
        var length = context.direction === 'forward' ? 0 :
          context.granularity === 'word' ? WORDLENGTH : 1;

        var dp = Selection.startDomPosition();

        if (dp) {
          // normalize any stray text nodes if we got them...
          dp.container.normalize();

          // step 1 - if *inside* text node; then delete text
          if (dp.insideTextNode() && !dp.onNodeBoundary(context.direction)) {
            var parent = dp.container.parentNode;
            if (parent.supports && parent.supports('deleteNode')) {
              deleteTextInNode_(dp.container, dp.offset-length, length);
            }
          } else {
            // step 2 - get left/right leaf and determine if we need to merge
            var merge = false;
            var left = dp.leftLeaf();
            var right = dp.rightLeaf();
            var iter = new PreOrderIter(right);
            while (iter.prev() !== left) {
              if (iter.current().supports &&
                  iter.current().supports('mergeOnCrossingBoundary')) {
                if (iter.current().mergeOnCrossingBoundary()) {
                  merge = true;
                  break;
                }
              }
            }
            if (merge) {
              // been told to merge the nodes due to crossing boundary; merge
              // the nodes and then delete empty tree branches
              var dp = {};
              if (left.nodeType === Node.TEXT_NODE) {
                dp.offset = DomUtils.indexOf(left) + 1;
                left = left.parentNode;
                dp.container = left;
              }
              if (left.supports && left.supports('mergeNode', {node: right})) {
                var rightParent = right.parentNode;
                left.mergeNode({
                  node: right,
                  dp: dp
                });
                DomUtils.deleteEmptyTree(rightParent);
              }
            } else {
              if (left.nodeType === Node.TEXT_NODE) {
                // left leaf is text; delete text inside of it
                deleteTextInNode_(left, left.textContent.length-length, length);
              } else {
                // left leaf is element, delete it (if parent supports it)
                var leftParent = left.parentNode;
                var offset = DomUtils.indexOf(left)
                if (left.supports && leftParent.supports &&
                    left.supports('deleteMe') &&
                    leftParent.supports('deleteNode', offset)) {
                  leftParent.deleteNode(offset);
                }
              }
            }
          }
        }

      });

    }

  });

  function deleteTextInNode_(tn, offset, length) {
    var parent = tn.parentNode;
    if (tn.nodeType === Node.TEXT_NODE) {
      var tnOffset = DomUtils.splitText(tn, offset, length);
      var context = {
        dp: {
          container: parent,
          offset: tnOffset
        }
      };

      Selection.setStartDomPosition(context.dp);
    }
    if (parent.supports &&
        parent.supports('deleteNode', context)) {
      parent.deleteNode(context);
    }
    parent.normalize();
  }
})();

