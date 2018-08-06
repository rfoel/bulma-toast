(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.bulmaToast = {})));
}(this, (function (exports) { 'use strict';

  var defaults = {
    message: 'Your message here',
    duration: 2000,
    position: 'top-right'
  };
  var initialized = false;
  var containers = {};
  var positions = {};

  function init() {
    containers = {
      noticesTopLeft: document.createElement('div'),
      noticesTopRight: document.createElement('div'),
      noticesBottomLeft: document.createElement('div'),
      noticesBottomRight: document.createElement('div'),
      noticesTopCenter: document.createElement('div'),
      noticesBottomCenter: document.createElement('div'),
      noticesCenter: document.createElement('div')
    };
    var style = 'width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;';
    containers.noticesTopLeft.setAttribute('style', style + 'left:0;top:0;text-align:left;align-items:flex-start;');
    containers.noticesTopRight.setAttribute('style', style + 'right:0;top:0;text-align:right;align-items:flex-end;');
    containers.noticesBottomLeft.setAttribute('style', style + 'left:0;bottom:0;text-align:left;align-items:flex-start;');
    containers.noticesBottomRight.setAttribute('style', style + 'right:0;bottom:0;text-align:right;align-items:flex-end;');
    containers.noticesTopCenter.setAttribute('style', style + 'top:0;left:0;right:0;text-align:center;align-items:center;');
    containers.noticesBottomCenter.setAttribute('style', style + 'bottom:0;left:0;right:0;text-align:center;align-items:center;');
    containers.noticesCenter.setAttribute('style', style + 'top:0;left:0;right:0;bottom:0;flex-flow:column;justify-content:center;align-items:center;');
    Object.keys(containers).forEach(function (key) {
      return document.body.appendChild(containers[key]);
    });
    positions = {
      'top-left': containers.noticesTopLeft,
      'top-right': containers.noticesTopRight,
      'top-center': containers.noticesTopCenter,
      'bottom-left': containers.noticesBottomLeft,
      'bottom-right': containers.noticesBottomRight,
      'bottom-center': containers.noticesBottomCenter,
      center: containers.noticesCenter
    };
    initialized = true;
  }

  function toast(params) {
    if (!initialized) init();
    var options = Object.assign({}, defaults, params);
    var toast = createToast(options);
    var container = positions[options.position] || positions[defaults.position];
    container.appendChild(toast);
    setTimeout(function () {
      toast.remove();
    }, options.duration);
  }

  function createToast(options) {
    var toast = document.createElement('div');
    var style = "width:auto;opacity:0.8;pointer-events:auto;display:inline-flex;";
    var classes = ['notification'];
    if (options.type) classes.push(options.type);
    toast.classList = classes.join(' ');

    if (options.dismissible) {
      var dismissButton = document.createElement('button');
      dismissButton.className = 'delete';
      dismissButton.addEventListener('click', function () {
        toast.remove();
      });
      toast.insertAdjacentElement('afterbegin', dismissButton);
    } else {
      style += 'padding: 1.25rem 1.5rem';
    }

    toast.setAttribute('style', style);
    toast.insertAdjacentText('beforeend', options.message);
    return toast;
  }

  exports.toast = toast;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
