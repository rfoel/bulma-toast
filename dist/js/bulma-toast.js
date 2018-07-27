(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bulmaToast"] = factory();
	else
		root["bulmaToast"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__defaultOptions__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var BulmaToast = function () {
  function BulmaToast() {
    _classCallCheck(this, BulmaToast);

    this.container = {};
    this.init();
  }

  _createClass(BulmaToast, [{
    key: 'init',
    value: function init() {
      var noticesTop = document.querySelector('.notices.is-top');
      var noticesBottom = document.querySelector('.notices.is-bottom');

      if (!noticesTop || !noticesBottom) {
        noticesTop = document.createElement('div');
        noticesBottom = document.createElement('div');
        noticesTop.className = 'notices is-top';
        noticesBottom.className = 'notices is-bottom';
        this.container = {
          noticesTop: noticesTop,
          noticesBottom: noticesBottom
        };
        document.body.appendChild(noticesTop);
        document.body.appendChild(noticesBottom);
      }
    }
  }, {
    key: 'toast',
    value: function toast(options) {
      options = _extends({}, __WEBPACK_IMPORTED_MODULE_0__defaultOptions__["a" /* default */], options);

      var toast = document.createElement('div');
      var classes = ['notification'];
      if (options.type) classes.push(options.type);
      if (options.position) classes.push(options.position);
      toast.classList = classes.join(' ');
      if (options.dismissible) {
        var dismissButton = document.createElement('button');
        dismissButton.className = 'delete';
        dismissButton.addEventListener('click', function () {
          toast.remove();
        });
        toast.insertAdjacentElement('afterbegin', dismissButton);
      }
      toast.insertAdjacentText('beforeend', options.message);

      if (options.position.includes('is-bottom')) this.container.noticesBottom.appendChild(toast);else this.container.noticesTop.appendChild(toast);

      setTimeout(function () {
        toast.remove();
      }, options.duration);
    }
  }]);

  return BulmaToast;
}();

var bulmaToast = new BulmaToast();

/* harmony default export */ __webpack_exports__["default"] = (bulmaToast);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var defaultOptions = {
  message: 'Your message here',
  duration: 2000,
  position: 'is-right'
};

/* harmony default export */ __webpack_exports__["a"] = (defaultOptions);

/***/ })
/******/ ])["default"];
});