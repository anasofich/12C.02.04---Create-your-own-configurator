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

  setStrapAndDialListeners ()
}

function setStrapAndDialListeners () {
  document.querySelectorAll(".strapOption").forEach(option => option.addEventListener("click", toggleOptionStrap))
  document.querySelectorAll(".dialOption").forEach(option => option.addEventListener("click", toggleOptionDial))
}

function toggleOptionStrap(event) {
  // target is a container for an element
  const target = event.currentTarget
  // console.log("TARGET ", target)
  const feature = target.dataset.feature
  // console.log("FEATURE ", feature)

  // delete class "selected" for previously selected option
  if (selectedStrap !== "") {
    const previouslySelected = selectedStrap
    document.querySelector(`#option-${previouslySelected}`).classList.remove("selected")
  }
  // add class "selected" to currently selected item
  selectedStrap = feature
  document.querySelector(`#option-${feature}`).classList.add("selected")
}

function toggleOptionDial(event) {
  // target is a container for an element
  const target = event.currentTarget
  // console.log("TARGET ", target)
  const feature = target.dataset.feature
  // console.log("FEATURE ", feature)

  // delete class "selected" for previously selected option
  if (selectedDial !== "") {
    const previouslySelected = selectedDial
    document.querySelector(`#option-${previouslySelected}`).classList.remove("selected")
  }
  // add class "selected" to currently selected item
  selectedDial = feature
  document.querySelector(`#option-${feature}`).classList.add("selected")
}