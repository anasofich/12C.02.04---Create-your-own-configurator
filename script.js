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
    setSelectedCaseColor();
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

    //setSelectedColor();
  }

  //removing selected class from colors
  function removeSelectedClass() {
    //console.log("removeSelectedClass");
    document.querySelectorAll(".colorSelector").forEach((element) => element.classList.remove("colorSelected"));
  }

  function setSelectedCaseColor(event) {
    console.log("setSelectedCaseColor()");
    let selectedColorPosition = document.querySelector(".colorSelector.colorSelected");
    //console.log(selectedColorPosition);
    let selectedColor = document.querySelector(".colorSelector.colorSelected").style.backgroundColor;
    //console.log(selectedColor);

    //console.log(selectedCase);
    //console.log(document.querySelector(".colorSelector.colorSelected"));
    if (colorFeatures.clockCase === false) {
      console.log("Case color has been chosen");

      //toggling to true
      colorFeatures.clockCase = true;

      //creating element to move to selected list
      const selectedCaseColor = document.createElement("div");
      selectedCaseColor.classList.add("featureSymbol2");
      selectedCaseColor.style.backgroundColor = selectedColor;

      document.querySelector(".selectedCase").append(selectedCaseColor);

      //creating FLIP animation
      const firstFrame = selectedColorPosition.getBoundingClientRect();
      console.log(firstFrame);

      const lastFrame = selectedCaseColor.getBoundingClientRect();
      console.log(lastFrame);

      const deltaX = firstFrame.left - lastFrame.left;
      const deltaY = firstFrame.top - lastFrame.top;
      const deltaWidth = firstFrame.width / lastFrame.width;
      const deltaHeight = firstFrame.height / lastFrame.height;

      selectedCaseColor.animate(
        [
          {
            transformOrigin: "top left",
            transform: `translate(${deltaX}px, ${deltaY}px)
             scale(${deltaWidth}, ${deltaHeight})`,
          },
          { transformOrigin: "top left", transform: "none" },
        ],
        { duration: 500, easing: "ease-in-out" }
      );
    } else {
      console.log("Case color has been changed");

      colorFeatures.clockCase = false;

      const removingColor = document.querySelector(".selectedCase div");

      const firstFrame = removingColor.getBoundingClientRect();

      const lastFrame = selectedColorPosition.getBoundingClientRect();

      const deltaX = lastFrame.left - firstFrame.left;
      const deltaY = lastFrame.top - firstFrame.top;
      const deltaWidth = lastFrame.width / firstFrame.width;
      const deltaHeight = lastFrame.height / firstFrame.height;

      removingColor.animate(
        [
          { transformOrigin: "top left", transform: "none" },
          {
            transformOrigin: "top left",
            transform: `translate(${deltaX}px, ${deltaY}px)
          scale(${deltaWidth}, ${deltaHeight})`,
          },
        ],
        { duration: 500, easing: "ease-in-out" }
      );

      Promise.all(
        removingColor.getAnimations().map(function (animation) {
          return animation.finished;
        })
      ).then(function () {
        //setSelectedCaseColor(); uncomment if want to add after element has been removed so it doesn't move

        return removingColor.remove();
      });

      setSelectedCaseColor(); //new color will get to position before the other has been removed so it moves
    }
  }

  //setting selected color in "selected" section
  /* function setSelectedColor() {
    //console.log(clockCase.style.fill);
    //console.log(buckle.style.fill);
    //console.log(keeper.style.fill);

    let selectedCase = document.querySelector(".selectedFeatures .selectedCase");
    let selectedBuckle = document.querySelector(".selectedFeatures .selectedBuckle");
    let selectedKeeper = document.querySelector(".selectedFeatures .selectedKeeper");

    selectedCase.style.backgroundColor = clockCase.style.fill;
    selectedBuckle.style.backgroundColor = buckle.style.fill;
    selectedKeeper.style.backgroundColor = keeper.style.fill;
  } */
}
