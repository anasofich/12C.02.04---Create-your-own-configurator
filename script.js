"use strict";

let selectedStrap = "";
let selectedDial = "";

let previousStrap = ""
let previousDial = ""

let currentColor;

const colorFeatures = {
  clockCase: false,
  buckle: false,
  keeper: false,
};

let colorMode = false

document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("white-watch2.svg");
  let mySvgData = await response.text();
  document.querySelector("section").innerHTML = mySvgData;
  registerButtons();
  colorsSelector();
  init();
}

function init() {
  const clockCase = document.querySelector("#case");
  clockCase.style.filter = "brightness(1.1)";

  setStrapAndDialListeners();
}


//functions for straps and dials

function setStrapAndDialListeners() {
  document.querySelectorAll(".strapOption").forEach(option => option.addEventListener("click", toggleOptionStrap))
  document.querySelectorAll(".dialOption").forEach(option => option.addEventListener("click", toggleOptionDial))
}

function toggleOptionStrap(event) {
  // target is a container for an element
  const target = event.currentTarget;
  const feature = target.dataset.feature;
  let previouslySelected = "";

  // toggle view on option buttons
  // delete class "selected" for previously selected option
  if (selectedStrap !== "") {
    previouslySelected = selectedStrap;
    document.querySelector(`#option-${previouslySelected}`).classList.remove("selected");
  }

  selectedStrap = feature;
  // add class "selected" to currently selected item
  document.querySelector(`#option-${feature}`).classList.add("selected");

  showStrapOrDialInSelectedElements(target, feature);
  changeToChosenStrapOrDial(feature, previouslySelected);

  previousStrap = selectedStrap;
}

function toggleOptionDial(event) {
  // target is a container for an element
  const target = event.currentTarget;
  const feature = target.dataset.feature;
  let previouslySelected = "";

  // toggle view on option buttons
  // delete class "selected" for previously selected option
  if (selectedDial !== "") {
    previouslySelected = selectedDial;
    document.querySelector(`#option-${previouslySelected}`).classList.remove("selected");
  }
  // add class "selected" to currently selected item
  selectedDial = feature;
  document.querySelector(`#option-${feature}`).classList.add("selected");

  showStrapOrDialInSelectedElements(target, feature);
  changeToChosenStrapOrDial(feature, previouslySelected);

  previousDial = selectedDial;
}

function changeToChosenStrapOrDial(feature, previous) {
  // when user choses for the first time
  if (previous !== "") {
    document.getElementById(previous).classList.add("hidden");
  }
  document.getElementById(feature).classList.remove("hidden");
}

function showStrapOrDialInSelectedElements(target, feature) {
  // grab the child element (img) od selected option
  const imgElement = target.childNodes[0];
  // create copy
  const copyImgElement = imgElement.cloneNode(true);
  // removes all the classes for an element
  copyImgElement.className = "";
  copyImgElement.className = "featureSymbol";

  let container;

  // deleting previously selected element

  if (feature.includes(`strap`)) {
    container = document.getElementById("selectedOption-strap");
    // remove previous selection
    if (previousStrap !== "") {
      let previousSelection = container.getElementsByTagName('img')

      animateElementOut(target, container, previousSelection[0])
    }
    // animation for new element and appending it to the selected elements container
    container = container.children[1];
    setTimeout(animateElementIn.bind(null, target, container, copyImgElement), 200);
  }

  if (feature.includes(`dial`)) {
    container = document.getElementById("selectedOption-dial");
    // remove previous selection
    if (previousDial !== "") {
      let previousSelection = container.getElementsByTagName('img')

      animateElementOut(target, container, previousSelection[0])
    }
    // animation for new element and appending it to the selected elements container
    container = container.children[1];
    setTimeout(animateElementIn.bind(null, target, container, copyImgElement), 200);
  }
}

function animateElementIn(start, end, element) {
  //Create new featureElement and add it to the selected elements container
  end.appendChild(element);

  //FLIP- "animate-feature-in"
  const startPosition = start.getBoundingClientRect();
  const endPosition = element.getBoundingClientRect();

  const diffx = startPosition.x - endPosition.x + "px";
  const diffy = startPosition.y - endPosition.y + "px";

  element.style.setProperty("--diffx", diffx);
  element.style.setProperty("--diffy", diffy);

  //Animation feature in
  element.classList.add("animate-feature-in");
}

function animateElementOut(start, end, element) {

  element.classList.remove("animate-feature-in") 
  
  //FLIP- "animate-feature-out"
  const endPosition = element.getBoundingClientRect()
  const startPosition = start.getBoundingClientRect()

  const diffx = startPosition.x - endPosition.x + "px"
  const diffy = startPosition.y - endPosition.y + "px"

  element.style.setProperty("--diffx", diffx)
  element.style.setProperty("--diffy", diffy)

  element.offsetHeight

  //Animation feature out
  element.classList.add("animate-feature-out") 

  //when animation is complete, remove element from DOM
  element.addEventListener("animationend", function() {
    element.remove()
  }) 
}


//color selector functions
function colorsSelector() {

  //making variables for svg paths that will change color: case, buckle, keeper
  const clockCase = document.querySelector("#case .caseColor");
  const buckle = document.querySelector("#buckle .buckleColor");
  const keeper = document.querySelector("#keeper .keeperColor");

  //variables for colors in selected section
  let selectedCase = document.querySelector(".selectedFeatures .selectedCase");
  let selectedBuckle = document.querySelector(".selectedFeatures .selectedBuckle");
  let selectedKeeper = document.querySelector(".selectedFeatures .selectedKeeper");

  //clockCase.style.filter = "brightness(1.1)";

  //setting initial color to white
  setColor(clockCase, "white");
  setColor(buckle, "white");
  setColor(keeper, "white");

  //Add event listeners to clock
  setupHoverListeners();
  setupClockClickListeners();

  //adding event listeners to selected paths to change color
  clockCase.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
    setSelectedCaseColor();

    hideInstructionAndSelection()
  });

  buckle.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
    setSelectedBuckleColor();

    hideInstructionAndSelection()
  });

  keeper.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
    setSelectedKeeperColor();

    hideInstructionAndSelection()
  });

  //reading current color from selected color
  document.querySelectorAll(".colorSelector").forEach((element) => {
    element.addEventListener("click", (event) => {
      currentColor = event.target.style.backgroundColor;
    });
  });

  //setting the selected color to the selected path
  function setColor(element, colorString) {
    element.style.fill = colorString;
  }

  //removing selected class from colors
  function removeSelectedClass() {
    document.querySelectorAll(".colorSelector").forEach((element) => element.classList.remove("colorSelected"));
  }

  function setSelectedCaseColor() {
    let selectedColorPosition = document.querySelector(".colorSelector.colorSelected");
    let selectedColor = document.querySelector(".colorSelector.colorSelected").style.backgroundColor;

    if (colorFeatures.clockCase === false) {

      //toggling to true
      colorFeatures.clockCase = true;

      //creating element to move to selected list
      const selectedCaseColor = document.createElement("div");
      selectedCaseColor.classList.add("featureSymbol2");
      selectedCaseColor.style.backgroundColor = selectedColor;

      document.querySelector(".selectedCase").append(selectedCaseColor);

      //creating FLIP animation
      const firstFrame = selectedColorPosition.getBoundingClientRect();

      const lastFrame = selectedCaseColor.getBoundingClientRect();

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
        return removingColor.remove();
      });

      setSelectedCaseColor(); //new color will get to position before the other has been removed so it moves
    }
  }

  function setSelectedBuckleColor() {
    let selectedColorPosition = document.querySelector(".colorSelector.colorSelected");
    let selectedColor = document.querySelector(".colorSelector.colorSelected").style.backgroundColor;

    if (colorFeatures.buckle === false) {

      //toggling to true
      colorFeatures.buckle = true;

      //creating element to move to selected list
      const selectedBuckleColor = document.createElement("div");
      selectedBuckleColor.classList.add("featureSymbol2");
      selectedBuckleColor.style.backgroundColor = selectedColor;

      document.querySelector(".selectedBuckle").append(selectedBuckleColor);

      //creating FLIP animation
      const firstFrame = selectedColorPosition.getBoundingClientRect();

      const lastFrame = selectedBuckleColor.getBoundingClientRect();

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
    let selectedColorPosition = document.querySelector(".colorSelector.colorSelected");
    let selectedColor = document.querySelector(".colorSelector.colorSelected").style.backgroundColor;

    if (colorFeatures.keeper === false) {

      //toggling to true
      colorFeatures.keeper = true;

      //creating element to move to selected list
      const selectedKeeperColor = document.createElement("div");
      selectedKeeperColor.classList.add("featureSymbol2");
      selectedKeeperColor.style.backgroundColor = selectedColor;

      document.querySelector(".selectedKeeper").append(selectedKeeperColor);

      //creating FLIP animation
      const firstFrame = selectedColorPosition.getBoundingClientRect();

      const lastFrame = selectedKeeperColor.getBoundingClientRect();

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
    } 
    
    else {
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

  function setupClockClickListeners() {
    document.querySelectorAll(".colorSelector").forEach((element) =>
      element.addEventListener("click", () => {
        colorMode = true
        removeSelectedClass();
        element.classList.add("colorSelected");

        const clockCase = document.querySelector("#case");
        const buckle = document.querySelector("#buckle");
        const keeper = document.querySelector("#keeper");

        clockCase.classList.add("showElementWhichCanBeClicked")
        buckle.classList.add("showElementWhichCanBeClicked")
        keeper.classList.add("showElementWhichCanBeClicked")

        document.querySelector("#instructionImage").classList.remove("hidden")
      })
    );
  }

  function setupHoverListeners() {
    const clockCase = document.querySelector("#case");
    const buckle = document.querySelector("#buckle");
    const keeper = document.querySelector("#keeper");

    // listeners on hovering case/buckle/keeper
    clockCase.addEventListener("mouseover", function() {
      clockCase.classList.remove("showElementWhichCanBeClicked")
    })
    buckle.addEventListener("mouseover", function() {
      buckle.classList.remove("showElementWhichCanBeClicked")
    })
    keeper.addEventListener("mouseover", function() {
      keeper.classList.remove("showElementWhichCanBeClicked")
    })

    // listeners on mouse out case/buckle/keeper
    clockCase.addEventListener("mouseout", function() {
      if(colorMode) {
        clockCase.classList.add("showElementWhichCanBeClicked")
      }
    })
    buckle.addEventListener("mouseover", function() {
      if(colorMode) {
        buckle.classList.add("showElementWhichCanBeClicked")
      }
    })
    keeper.addEventListener("mouseover", function() {
      if(colorMode) {
        keeper.classList.add("showElementWhichCanBeClicked")
      }
    })
  }
}

  function hideInstructionAndSelection() {
  document.querySelector("#instructionImage").classList.add("hidden")

  const clockCase = document.querySelector("#case");
  const buckle = document.querySelector("#buckle");
  const keeper = document.querySelector("#keeper");

  clockCase.classList.remove("showElementWhichCanBeClicked")
  buckle.classList.remove("showElementWhichCanBeClicked")
  keeper.classList.remove("showElementWhichCanBeClicked")

  colorMode = false
}


//functions for "Reset" and "Save" buttons

function registerButtons() {
  //reset button
  document.querySelector(".buttonsContainer .reset").addEventListener("click", resetSettings);

  //save button
  document.querySelector(".buttonsContainer .save").addEventListener("click", saveSettings);
}

function resetSettings() {

  //reset current strap and dial
  document.querySelectorAll(".strap").forEach((element) => element.classList.add("hidden"));
  document.querySelectorAll(".dial").forEach((element) => element.classList.add("hidden"));

  //reset current colors
  const clockCase = document.querySelector("#case .caseColor");
  const buckle = document.querySelector("#buckle .buckleColor");
  const keeper = document.querySelector("#keeper .keeperColor");

  clockCase.classList.remove("showElementWhichCanBeClicked")
  buckle.classList.remove("showElementWhichCanBeClicked")
  keeper.classList.remove("showElementWhichCanBeClicked")

  clockCase.style.fill = "#ffffff";
  buckle.style.fill = "#ffffff";
  keeper.style.fill = "#ffffff";

  //reset selected section
  document.querySelectorAll(".featureSymbol").forEach((element) => element.remove());
  document.querySelectorAll(".featureSymbol2").forEach((element) => element.remove());

  //setting color selection to false
  colorFeatures.clockCase = false;
  colorFeatures.buckle = false;
  colorFeatures.keeper = false;

  //removing selected class
  document.querySelectorAll(".colorSelector").forEach((element) => element.classList.remove("colorSelected"));
  document.querySelectorAll(".strapOption.selected").forEach((element) => element.classList.remove("selected"));

  // resetting global variables
  selectedStrap = "";
  selectedDial = "";

  previousStrap = ""
  previousDial = ""
}

function saveSettings() {
  localStorage.setItem("clockCase", document.querySelector("#case .caseColor").style.fill);
}
