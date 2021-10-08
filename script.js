document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("white-watch2.svg");
  let mySvgData = await response.text();
  document.querySelector("section").innerHTML = mySvgData;
  init();
}

function init() {
  console.log("init");
  const clockCase = document.querySelector("#case");
  const buckle = document.querySelector("#buckle");
  const keeper = document.querySelector("#keeper");
  console.log(clockCase, buckle, keeper);

  setColor(clockCase, "red");
  setColor(buckle, "red");
  setColor(keeper, "blue");
}

function setColor(element, colorString) {
  console.log(element, colorString);
  //document.querySelectorAll(".colorSelector").forEach((element) => {});
  element.style.fill = colorString;
}
