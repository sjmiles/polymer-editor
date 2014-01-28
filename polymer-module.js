(function() {

  function marshal(name) {
    return document.createElement(name).api;
  }

  function withDependencies(task, depends) {
    return task.apply(this, depends && depends.map(marshal) || []);
  }

  function module(name, depends, moduleFactory) {
    // fake a declaration
    var pe = document.createElement('polymer-element');
    pe.setAttribute('name', name);
    pe.init();
    // late bind api to modules
    Polymer(name, {
      registerCallback: function() {
        this.api = withDependencies(moduleFactory, depends);
      }
    });
  };

  function using(depends, task) {
    addEventListener('polymer-ready', function() {
      withDependencies(task, depends);
    });
  };

  function PolymerUsing(name, depends, factory) {
    var thunk = {
      registerCallback: function() {
        Platform.mixin(thunk, withDependencies(factory, depends));
      }
    };
    Polymer(name, thunk);
  };

  // arbitrarily placing this patch here temporarily
  // ShadowDOM needs a custom implementation for Node.normalize

  if (window.ShadowDOMPolyfill) {
    Node.prototype.normalize = function() {
      var n = this.firstChild;
      while (n) {
        
        while (true) {
          while (n && n.nodeType !== Node.TEXT_NODE) {
            n = n.nextSibling;
          }
          if (!n || n.textContent.length) {
            break;
          }
          var empty = n;
          n = n.nextSibling;
          empty.remove();
        }
        
        if (n) {
          var content = n.textContent;
          var nn = n.nextSibling;
          while (nn && nn.nodeType === Node.TEXT_NODE) {
            content += nn.textContent
            var old = nn;
            nn = nn.nextSibling;
            old.parentNode.removeChild(old);
          }
          n.textContent = content;
          n = nn;
        }

      }
    }
  }

  // exports

  window.marshal = marshal;
  window.module = module;
  window.using = using;
  window.PolymerUsing = PolymerUsing;

})();