import { stringFromCode } from "../common/common";

function init(): void {
  document.write(`<h1>I render '${stringFromCode}'</h1>`);
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Page is loaded and ready!");
  init();
});
