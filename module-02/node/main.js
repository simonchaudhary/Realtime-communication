"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("react-dom/client");
var App_1 = require("./App");
var root = (0, client_1.createRoot)(document.getElementById("root"));
console.log(<App_1.default />);
console.log(App_1.default);
root.render(<App_1.default />);
