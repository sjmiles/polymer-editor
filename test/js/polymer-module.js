window.module = function(name, depends, moduleFactory) {
  /*
  // TODO(sjmiles): this is too hard ... and doesn't work on polyfill :(
  var div = document.createElement('div');
  document.body.appendChild(div);
  div.innerHTML = '<polymer-element name="' + name + '"></polymer-element>';
  document.body.removeChild(div);
  */
  //
  var pe = document.createElement('polymer-element');
  pe.setAttribute('name', name);
  pe.init();
  //
  // late bind api to modules
  Polymer(name, {
    registerCallback: function() {
      var args = [];
      for (var i=0, d; depends && (d=depends[i]); i++) {
        args.push(document.createElement(d).api);
      }
      this.api = moduleFactory.apply(this, args);
    }
  });
};

window.marshal = function(name) {
  return document.createElement(name).api;
}


