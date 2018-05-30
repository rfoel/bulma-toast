(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('bulmaToast', ['exports'], factory) :
	(factory((global.bulmaToast = {})));
}(this, (function (exports) { 'use strict';

const defaults = {
  message: 'Your message here',
  duration: 2000,
  position: 'is-right'
};

function toast(params) {
  let options = Object.assign({}, defaults, params);
  let noticesTop = document.querySelector('.notices.is-top');
  let noticesBottom = document.querySelector('.notices.is-bottom');

  if (!noticesTop || !noticesBottom) {
    noticesTop = document.createElement('div');
    noticesBottom = document.createElement('div');
    noticesTop.className = 'notices is-top';
    noticesBottom.className = 'notices is-bottom';
    document.body.appendChild(noticesTop);
    document.body.appendChild(noticesBottom);
  }

  let toast = document.createElement('div');
  let classes = ['notification'];
  if (options.type) classes.push(options.type);
  if (options.position) classes.push(options.position);
  toast.classList = classes.join(' ');
  if (options.dismissible) {
    let dismissButton = document.createElement('button');
    dismissButton.className = 'delete';
    dismissButton.addEventListener('click', () => {
      toast.remove();
    });
    toast.insertAdjacentElement('afterbegin', dismissButton);
  }
  toast.insertAdjacentText('beforeend', options.message);

  if (options.position.includes('is-bottom')) noticesBottom.appendChild(toast);
  else noticesTop.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, options.duration);
}

exports.toast = toast;

Object.defineProperty(exports, '__esModule', { value: true });

})));
