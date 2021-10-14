"use strict";

let selectedStrap = "";
let selectedDial = "";
let selectedCase = "";
let selectedBuckle = "";
let selectedKeeper = "";

let previousStrap = ""
let previousDial = ""

document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("white-watch2.svg");
  let mySvgData = await response.text();
  document.querySelector("section").innerHTML = mySvgData;
  init();
}

function init() {
  const clockCase = document.querySelector("#case");
  clockCase.style.filter = "brightness(1.1)";

  setStrapAndDialListeners()
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