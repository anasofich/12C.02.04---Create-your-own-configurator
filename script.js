document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("SVG/white-watch.svg");
  let mySvgData = await response.text();
  document.querySelector("section").innerHTML = mySvgData;
  init();
}
function init() {
  console.log("init");
}
