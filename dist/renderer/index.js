"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common/common");
function init() {
    document.write(`<h1>I render '${common_1.stringFromCode}'</h1>`);
}
document.addEventListener("DOMContentLoaded", () => {
    console.log("Page is loaded and ready!");
    init();
});
