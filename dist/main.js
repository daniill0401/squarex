"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });
document.body.appendChild(app.view);
// create a new Sprite from an image path
var brace = PIXI.Sprite.fromImage('img/brace_classic.png');
brace.anchor.set(0.5);
// move the sprite to the center of the screen
brace.x = app.screen.width / 2;
brace.y = app.screen.height / 2;
app.stage.addChild(brace);
// Listen for animate update
app.ticker.add(function (delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    brace.rotation += 0.1 * delta;
});
