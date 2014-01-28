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

  // exports

  window.marshal = marshal;
  window.module = module;
  window.using = using;
  window.PolymerUsing = PolymerUsing;

})();