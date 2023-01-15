"use strict";
const LandingScreen = document.querySelector(".LandingScreen");
const GetStarted = document.querySelector(".GetStarted");
const Screen1 = document.querySelector(".Weather-UI");

GetStarted.addEventListener("click", function () {
  LandingScreen.style.display = "none";
  Screen1.style.display = "flex";
});
