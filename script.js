"use strict";

let selectedStrap = "";
let selectedDial = "";
let selectedCase = "";
let selectedBuckle = "";
let selectedKeeper = "";

document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("white-watch2.svg");
  let mySvgData = await response.text();
  document.querySelector("section").innerHTML = mySvgData;
  init();
}

function init() {
  console.log("init()");
  /* const clockCase = document.querySelector("#case");
  clockCase.style.filter = "brightness(1.1)"; */
}
