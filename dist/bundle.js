(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function sayHello(name) {
    return "Hello from " + name;
}
exports.sayHello = sayHello;

},{}],2:[function(require,module,exports){
"use strict";
// import * as PIXI from 'pixi.js'

Object.defineProperty(exports, "__esModule", { value: true });
// let app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
// document.body.appendChild(app.view);
// // create a new Sprite from an image path
// let brace = PIXI.Sprite.fromImage('img/brace_classic.png')
// brace.anchor.set(0.5);
// // move the sprite to the center of the screen
// brace.x = app.screen.width / 2;
// brace.y = app.screen.height / 2;
// app.stage.addChild(brace);
// // Listen for animate update
// app.ticker.add(function(delta) {
// 	// just for fun, let's rotate mr rabbit a little
// 	// delta is 1 if running at 100% performance
// 	// creates frame-independent transformation
// 	brace.rotation += 0.1 * delta;
// });
var greet_1 = require("./greet");
function showHello(divName, name) {
    var elt = document.getElementById(divName);
    // elt.innerText = sayHello(name);
    elt.innerText = greet_1.sayHello(name);
}
showHello("greeting", "TypeScript");

},{"./greet":1}]},{},[2])

//# sourceMappingURL=bundle.js.map
