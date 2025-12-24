"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function App() {
    return (React.createElement("div", null,
        React.createElement("div", null, "h1"),
        React.createElement("div", null, "h2"),
        React.createElement("div", null, "h3"),
        React.createElement("div", null, "h4")));
}
var vDom = (React.createElement("div", null,
    React.createElement("div", null, "h1"),
    React.createElement("div", null, "h2"),
    React.createElement("div", null, "h3"),
    React.createElement("div", null, "h4")));
console.log({ vDom: vDom });
var rDom = document.createElement('div');
rDom.innerHTML = "Simon";
console.log({ rDom: rDom });
exports.default = App;
