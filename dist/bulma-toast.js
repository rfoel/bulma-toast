(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('bulmaToast', factory) :
	(global.bulmaToast = factory());
}(this, (function () { 'use strict';

function toast({ message, type, duration, position, dismissible }) {
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
  if (type) classes.push(type);
  if (position) classes.push(position);
  toast.classList = classes.join(' ');
  if (dismissible) {
    let dismissButton = document.createElement('button');
    dismissButton.className = 'delete';
    dismissButton.addEventListener('click', () => {
      toast.remove();
    });
    toast.insertAdjacentElement('afterbegin', dismissButton);
  }
  toast.insertAdjacentText('beforeend', message);

  if (position.includes('is-bottom')) noticesBottom.appendChild(toast);
  else noticesTop.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
}

return toast;

})));
