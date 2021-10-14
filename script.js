"use strict";

let selectedStrap = "";
let selectedDial = "";

let currentColor;

const colorFeatures = {
  clockCase: false,
  buckle: false,
  keeper: false,
};

let previousStrap = ""
let previousDial = ""

document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("white-watch2.svg");
  let mySvgData = await response.text();
  document.querySelector("section").innerHTML = mySvgData;
  registerButtons();
  colorsSelector();

  init()
}

function init() {
  const clockCase = document.querySelector("#case");
  clockCase.style.filter = "brightness(1.1)";

  setStrapAndDialListeners()
}


function registerButtons() {
  //reset button
  document.querySelector(".buttonsContainer .reset").addEventListener("click", resetSettings);

  //save button
  document.querySelector(".buttonsContainer .save").addEventListener("click", saveSettings);
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
    setSelectedCaseColor();
  });

  buckle.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
    setSelectedBuckleColor();
  });

  keeper.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
    setSelectedKeeperColor();
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

  function setSelectedCaseColor() {
    console.log("setSelectedCaseColor()");
    let selectedColorPosition = document.querySelector(".colorSelector.colorSelected");
    //console.log(selectedColorPosition);
    let selectedColor = document.querySelector(".colorSelector.colorSelected").style.backgroundColor;
    //console.log(selectedColor);

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
      //console.log(firstFrame);

      const lastFrame = selectedCaseColor.getBoundingClientRect();
      //console.log(lastFrame);

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
        { duration: 300, easing: "ease-in-out" }
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

  function setSelectedBuckleColor() {
    console.log("setSelectedBuckleColor()");
    let selectedColorPosition = document.querySelector(".colorSelector.colorSelected");
    //console.log(selectedColorPosition);
    let selectedColor = document.querySelector(".colorSelector.colorSelected").style.backgroundColor;
    //console.log(selectedColor);

    if (colorFeatures.buckle === false) {
      console.log("adding new color");

      //toggling to true
      colorFeatures.buckle = true;

      //creating element to move to selected list
      const selectedBuckleColor = document.createElement("div");
      selectedBuckleColor.classList.add("featureSymbol2");
      selectedBuckleColor.style.backgroundColor = selectedColor;

      document.querySelector(".selectedBuckle").append(selectedBuckleColor);

      //creating FLIP animation
      const firstFrame = selectedColorPosition.getBoundingClientRect();
      //console.log(firstFrame);

      const lastFrame = selectedBuckleColor.getBoundingClientRect();
      //console.log(lastFrame);

      const deltaX = firstFrame.left - lastFrame.left;
      const deltaY = firstFrame.top - lastFrame.top;
      const deltaWidth = firstFrame.width / lastFrame.width;
      const deltaHeight = firstFrame.height / lastFrame.height;

      selectedBuckleColor.animate(
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
      console.log("removing color");

      colorFeatures.buckle = false;

      const removingColor = document.querySelector(".selectedBuckle div");

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
        { duration: 300, easing: "ease-in-out" }
      );

      Promise.all(
        removingColor.getAnimations().map(function (animation) {
          return animation.finished;
        })
      ).then(function () {
        return removingColor.remove();
      });

      setSelectedBuckleColor();
    }
  }

  function setSelectedKeeperColor() {
    console.log("setSelectedBuckleColor()");
    let selectedColorPosition = document.querySelector(".colorSelector.colorSelected");
    //console.log(selectedColorPosition);
    let selectedColor = document.querySelector(".colorSelector.colorSelected").style.backgroundColor;
    //console.log(selectedColor);

    if (colorFeatures.keeper === false) {
      console.log("adding new color");

      //toggling to true
      colorFeatures.keeper = true;

      //creating element to move to selected list
      const selectedKeeperColor = document.createElement("div");
      selectedKeeperColor.classList.add("featureSymbol2");
      selectedKeeperColor.style.backgroundColor = selectedColor;

      document.querySelector(".selectedKeeper").append(selectedKeeperColor);

      //creating FLIP animation
      const firstFrame = selectedColorPosition.getBoundingClientRect();
      //console.log(firstFrame);

      const lastFrame = selectedKeeperColor.getBoundingClientRect();
      //console.log(lastFrame);

      const deltaX = firstFrame.left - lastFrame.left;
      const deltaY = firstFrame.top - lastFrame.top;
      const deltaWidth = firstFrame.width / lastFrame.width;
      const deltaHeight = firstFrame.height / lastFrame.height;

      selectedKeeperColor.animate(
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
      console.log("removing color");

      colorFeatures.keeper = false;

      const removingColor = document.querySelector(".selectedKeeper div");

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
        { duration: 300, easing: "ease-in-out" }
      );

      Promise.all(
        removingColor.getAnimations().map(function (animation) {
          return animation.finished;
        })
      ).then(function () {
        return removingColor.remove();
      });

      setSelectedKeeperColor();
    }
  }
}

//functions for buttons
function resetSettings() {
  console.log("resetSettings()");

  //reset current colors
  const clockCase = document.querySelector("#case .caseColor");
  const buckle = document.querySelector("#buckle .buckleColor");
  const keeper = document.querySelector("#keeper .keeperColor");

  clockCase.style.fill = "#ffffff";
  buckle.style.fill = "#ffffff";
  keeper.style.fill = "#ffffff";

  //reset selected section
  document.querySelectorAll(".featureSymbol2").forEach((element) => element.remove());

  //setting color selection to false
  colorFeatures.clockCase = false;
  colorFeatures.buckle = false;
  colorFeatures.keeper = false;

  //removing selected class
  document.querySelectorAll(".colorSelector").forEach((element) => element.classList.remove("colorSelected"));
}

function saveSettings() {
  console.log("saveSettings()");
  //console.log(document.querySelector("#case .caseColor").style.fill);
  localStorage.setItem("clockCase", document.querySelector("#case .caseColor").style.fill);
}








function setStrapAndDialListeners () {
  document.querySelectorAll(".strapOption").forEach(option => option.addEventListener("click", toggleOptionStrap))
  document.querySelectorAll(".dialOption").forEach(option => option.addEventListener("click", toggleOptionDial))
}

function toggleOptionStrap(event) {
  // target is a container for an element
  const target = event.currentTarget
  const feature = target.dataset.feature
  let previouslySelected = ''

  // toggle view on option buttons
  // delete class "selected" for previously selected option
  if (selectedStrap !== "") {
    previouslySelected = selectedStrap
    document.querySelector(`#option-${previouslySelected}`).classList.remove("selected")
  }
  
  selectedStrap = feature
  // add class "selected" to currently selected item
  document.querySelector(`#option-${feature}`).classList.add("selected")

  showStrapOrDialInSelectedElements(target, feature)
  changeToChosenStrapOrDial(feature, previouslySelected)

  previousStrap = selectedStrap
}

function toggleOptionDial(event) {
  // target is a container for an element
  const target = event.currentTarget
  const feature = target.dataset.feature
  let previouslySelected = ''

  // toggle view on option buttons
  // delete class "selected" for previously selected option
  if (selectedDial !== "") {
    previouslySelected = selectedDial
    document.querySelector(`#option-${previouslySelected}`).classList.remove("selected")
  }
  // add class "selected" to currently selected item
  selectedDial = feature
  document.querySelector(`#option-${feature}`).classList.add("selected")

  showStrapOrDialInSelectedElements(target, feature)
  changeToChosenStrapOrDial(feature, previouslySelected)

  previousDial = selectedDial
}

function changeToChosenStrapOrDial(feature, previous) {
  // when user choses for the first time
  if (previous !== "") {
    document.getElementById(previous).classList.add("hidden")
  }
  document.getElementById(feature).classList.remove("hidden")
}

function showStrapOrDialInSelectedElements(target, feature) {
  // grab the child element (img) od selected option
  const imgElement = target.childNodes[0]
  // create copy
  const copyImgElement = imgElement.cloneNode(true)
  // removes all the classes for an element
  copyImgElement.className = ""
  copyImgElement.className = "featureSymbol"

  let container
  
  // deleting previously selected element

  if (feature.includes(`strap`)) {
    container = document.getElementById("selectedOption-strap")
    // remove previous selection
    if (previousStrap !== "") {
      let previousSelection = container.getElementsByTagName('img')
      previousSelection[0].classList.add("opacityToZero")

      // when animation is complete, remove element from DOM
      previousSelection[0].addEventListener("animationend", function() {
        previousSelection[0].remove()
    })
     
    }
     // animation for new element and appending it to the selected elements container
     container = container.children[1]
     setTimeout(animateElementIn.bind(null, target, container, copyImgElement), 200)
  }

  if (feature.includes(`dial`)) {
    container = document.getElementById("selectedOption-dial")
    // remove previous selection
    if (previousDial !== "") {
      let previousSelection = container.getElementsByTagName('img')
      previousSelection[0].classList.add("opacityToZero")
      
      //when animation is complete, remove element from DOM
      previousSelection[0].addEventListener("animationend", function() {
        previousSelection[0].remove()
    })
      
    }
    // animation for new element and appending it to the selected elements container
    container = container.children[1]
    setTimeout(animateElementIn.bind(null, target, container, copyImgElement), 200)
  }

}


 function animateElementIn(start, end, element) {

  //Create new featureElement and add it to the selected elements container
  end.appendChild(element)
  
  //FLIP- "animate-feature-in"
  const startPosition = start.getBoundingClientRect()
  const endPosition = element.getBoundingClientRect()

  const diffx = startPosition.x - endPosition.x + "px"
  const diffy = startPosition.y - endPosition.y + "px"

  element.style.setProperty("--diffx", diffx)
  element.style.setProperty("--diffy", diffy)


  //Animation feature in
  element.classList.add("animate-feature-in") 

}