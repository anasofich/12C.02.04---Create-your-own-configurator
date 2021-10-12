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

  // delete class "selected" for previously selected option
  if (selectedStrap !== "") {
    previouslySelected = selectedStrap
    document.querySelector(`#option-${previouslySelected}`).classList.remove("selected")
  }
  // add class "selected" to currently selected item
  selectedStrap = feature
  document.querySelector(`#option-${feature}`).classList.add("selected")

  showStrapOrDialInSelectedElements(target, feature)
  changeToChosenStrapOrDial(feature, previouslySelected)
}

function toggleOptionDial(event) {
  // target is a container for an element
  const target = event.currentTarget
  const feature = target.dataset.feature
  let previouslySelected = ''

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
}

function changeToChosenStrapOrDial(feature, previous) {
  // console.log(feature)
  // console.log(previous)

  // when user choses for the first time
  if (previous !== "") {
    document.getElementById(previous).classList.add("hidden")
  }
  document.getElementById(feature).classList.remove("hidden")
}

function showStrapOrDialInSelectedElements(target, feature) {
  console.log(target)
  console.log(feature)
  // grab the cild element (img) od selected option
  const imgElement = target.childNodes[0]
  // create copy
  const copyImgElement = imgElement.cloneNode(true)
  // removes all the classes for an element
  copyImgElement.className = ""

  copyImgElement.className = "featureSymbol"
  

  // appending element to "Selected elements" container
  if (feature.includes(`strap`)) {
    let container = document.getElementById("selectedOption-strap")
    container.appendChild(copyImgElement)
  }
  if (feature.includes(`dial`)) {
    let container = document.getElementById("selectedOption-dial")
    container.appendChild(copyImgElement)
  }

  console.log(previousStrap)
  console.log(previousDial)


}

