/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blocks/modules/main-carousel/main-carousel.js":
/*!***********************************************************!*\
  !*** ./src/blocks/modules/main-carousel/main-carousel.js ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tiny_slider_src_tiny_slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-slider/src/tiny-slider.js */ "./node_modules/tiny-slider/src/tiny-slider.js");

var slider = Object(tiny_slider_src_tiny_slider_js__WEBPACK_IMPORTED_MODULE_0__["tns"])({
  container: '.main-carousel-slider',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  nav: true,
  navPosition: 'bottom'
});

/***/ }),

/***/ "./src/blocks/modules/object-slider-home/object-slider-home.js":
/*!*********************************************************************!*\
  !*** ./src/blocks/modules/object-slider-home/object-slider-home.js ***!
  \*********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tiny_slider_src_tiny_slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-slider/src/tiny-slider.js */ "./node_modules/tiny-slider/src/tiny-slider.js");

console.log('>>>>');
var slider = Object(tiny_slider_src_tiny_slider_js__WEBPACK_IMPORTED_MODULE_0__["tns"])({
  container: '.objects-home',
  items: 4,
  slideBy: 1,
  autoplay: false,
  nav: false,
  gutter: 30
});

/***/ }),

/***/ "./src/blocks/modules/object-slider-townhouse/object-slider-townhouse.js":
/*!*******************************************************************************!*\
  !*** ./src/blocks/modules/object-slider-townhouse/object-slider-townhouse.js ***!
  \*******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tiny_slider_src_tiny_slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-slider/src/tiny-slider.js */ "./node_modules/tiny-slider/src/tiny-slider.js");

var slider = Object(tiny_slider_src_tiny_slider_js__WEBPACK_IMPORTED_MODULE_0__["tns"])({
  container: '.objects-townhouse',
  items: 4,
  slideBy: 1,
  autoplay: false,
  nav: false,
  gutter: 30
});

/***/ }),

/***/ "./src/blocks/modules/object-tabs/object-tabs.js":
/*!*******************************************************!*\
  !*** ./src/blocks/modules/object-tabs/object-tabs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("load", function () {
  // store tabs variable
  var myTabs = document.querySelectorAll(".object-tabs ul.nav-tabs > li");

  function myTabClicks(tabClickEvent) {
    for (var _i = 0; _i < myTabs.length; _i++) {
      myTabs[_i].classList.remove("active");
    }

    var clickedTab = tabClickEvent.currentTarget;
    clickedTab.classList.add("active");
    tabClickEvent.preventDefault();
    var myContentPanes = document.querySelectorAll(".tab-pane");

    for (i = 0; i < myContentPanes.length; i++) {
      myContentPanes[i].classList.remove("active");
    }

    var anchorReference = tabClickEvent.target;
    var activePaneId = anchorReference.getAttribute("href");
    var activePane = document.querySelector(activePaneId);
    activePane.classList.add("active");
  }

  for (i = 0; i < myTabs.length; i++) {
    myTabs[i].addEventListener("click", myTabClicks);
  }
});

/***/ }),

/***/ "./src/js/import/modules.js":
/*!**********************************!*\
  !*** ./src/js/import/modules.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_main_carousel_main_carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! %modules%/main-carousel/main-carousel */ "./src/blocks/modules/main-carousel/main-carousel.js");
/* harmony import */ var _modules_object_tabs_object_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! %modules%/object-tabs/object-tabs */ "./src/blocks/modules/object-tabs/object-tabs.js");
/* harmony import */ var _modules_object_tabs_object_tabs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_object_tabs_object_tabs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_object_slider_home_object_slider_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! %modules%/object-slider-home/object-slider-home */ "./src/blocks/modules/object-slider-home/object-slider-home.js");
/* harmony import */ var _modules_object_slider_townhouse_object_slider_townhouse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! %modules%/object-slider-townhouse/object-slider-townhouse */ "./src/blocks/modules/object-slider-townhouse/object-slider-townhouse.js");
// import "%modules%/header/header";



 // import "%modules%/action-tabs/action-tabs"
// import "%modules%/footer/footer"

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import/modules */ "./src/js/import/modules.js");
 //
// let modal = {
//     root: document.querySelector('html'),
//     overlay: document.querySelector('.modal-wrapper'),
//     button: document.querySelector('.open-modal'),
//     buttonFooter: document.querySelector('.open-modal-footer'),
//     close: document.querySelector('.close-modal'),
//
//     initialize() {
//         this.button.addEventListener('click',
//             () => { this.toggle(); });
//         this.buttonFooter.addEventListener('click',
//             () => { this.toggle(); });
//
//         this.close.addEventListener('click',
//             () => {
//                 this.root.classList.toggle('clip');
//                 this.overlay.classList.remove('open');
//         });
//     },
//
//     toggle() {
//         this.root.classList.toggle('clip');
//         this.overlay.classList.toggle('open');
//     }
// };
//
// modal.initialize();

/***/ })

/******/ });
//# sourceMappingURL=main.js.map