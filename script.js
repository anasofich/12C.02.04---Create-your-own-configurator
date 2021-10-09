document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("white-watch2.svg");
  let mySvgData = await response.text();
  document.querySelector("section").innerHTML = mySvgData;
  init();
}

function init() {
  console.log("init()");
  const clockCase = document.querySelector("#case");
  const buckle = document.querySelector("#buckle");
  const keeper = document.querySelector("#keeper");
  //console.log(clockCase, buckle, keeper);

  clockCase.style.filter = "brightness(1.1)"

  setColor(clockCase, "red");
  setColor(buckle, "red");
  setColor(keeper, "red");

  clockCase.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
  });

  buckle.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
  });

  keeper.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
  });

  document.querySelectorAll(".colorSelector").forEach((element) => {
    element.addEventListener("click", (event) => {
      currentColor = event.target.style.backgroundColor;
    });
  });
}

function setColor(element, colorString) {
  console.log(element, colorString);
  document.querySelectorAll(".colorSelector").forEach((element) => {});
  element.style.fill = colorString;
}
