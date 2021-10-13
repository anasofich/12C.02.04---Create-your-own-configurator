"use strict";

let selectedStrap = "";
let selectedDial = "";
/* let selectedCase = "";
let selectedBuckle = "";
let selectedKeeper = ""; */

let currentColor;

const colorFeatures = {
  clockCase: false,
  buckle: false,
  keeper: false,
};

document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("white-watch2.svg");
  let mySvgData = await response.text();
  document.querySelector("section").innerHTML = mySvgData;
  colorsSelector();
}

function colorsSelector() {
  console.log("colorsSelector()");

  //making variables for svg paths that will change color: case, buckle, keeper
  const clockCase = document.querySelector("#case .caseColor");
  const buckle = document.querySelector("#buckle .buckleColor");
  const keeper = document.querySelector("#keeper .keeperColor");
  //console.log("Case:", clockCase, "buckle:", buckle, "keeper:", keeper);

  //variables for colors in selected section
  let selectedCase = document.querySelector(".selectedFeatures .selectedCase");
  let selectedBuckle = document.querySelector(".selectedFeatures .selectedBuckle");
  let selectedKeeper = document.querySelector(".selectedFeatures .selectedKeeper");

  //clockCase.style.filter = "brightness(1.1)";

  //setting initial color to white
  setColor(clockCase, "white");
  setColor(buckle, "white");
  setColor(keeper, "white");

  //adding event listeners to selected paths to change color
  clockCase.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
    //console.log(selectedCase);
    //console.log(document.querySelector(".colorSelector.colorSelected"));
    //console.log(currentColor);
    //setSelectedCaseColor();
  });

  buckle.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
  });

  keeper.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
  });

  //reading current color from selected color
  document.querySelectorAll(".colorSelector").forEach((element) => {
    element.addEventListener("click", (event) => {
      currentColor = event.target.style.backgroundColor;
    });
  });

  //setting the selected color to the selected path
  function setColor(element, colorString) {
    //console.log(element, colorString);
    document.querySelectorAll(".colorSelector").forEach((element) => {});
    element.style.fill = colorString;
    //console.log(element);

    document.querySelectorAll(".colorSelector").forEach((element) =>
      element.addEventListener("click", () => {
        removeSelectedClass();
        element.classList.add("colorSelected");
      })
    );

    setSelectedColor();
  }

  //removing selected class from colors
  function removeSelectedClass() {
    //console.log("removeSelectedClass");
    document.querySelectorAll(".colorSelector").forEach((element) => element.classList.remove("colorSelected"));
  }

  /* function setSelectedCaseColor(event) {
    console.log("setSelectedCaseColor()");

    //console.log(selectedCase);
    //console.log(document.querySelector(".colorSelector.colorSelected"));
    if (colorFeatures.clockCase === false) {
      console.log("Case color has been changed");
    } else {
      console.log("something is wrong");
    }
  }
 */
  //setting selected color in "selected" section
  function setSelectedColor() {
    //console.log(clockCase.style.fill);
    //console.log(buckle.style.fill);
    //console.log(keeper.style.fill);

    let selectedCase = document.querySelector(".selectedFeatures .selectedCase");
    let selectedBuckle = document.querySelector(".selectedFeatures .selectedBuckle");
    let selectedKeeper = document.querySelector(".selectedFeatures .selectedKeeper");

    selectedCase.style.backgroundColor = clockCase.style.fill;
    selectedBuckle.style.backgroundColor = buckle.style.fill;
    selectedKeeper.style.backgroundColor = keeper.style.fill;
  }
}
