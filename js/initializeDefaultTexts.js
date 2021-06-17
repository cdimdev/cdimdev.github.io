'use strict';

//Initialize application data
var dummyParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui vivamus arcu felis bibendum ut tristique et egestas. Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Et odio pellentesque diam volutpat commodo. Ante metus dictum at tempor commodo ullamcorper a lacus. Pharetra diam sit amet nisl suscipit adipiscing. Cursus risus at ultrices mi tempus imperdiet nulla. Adipiscing elit pellentesque habitant morbi tristique senectus et netus et. Rhoncus dolor purus non enim praesent. Scelerisque viverra mauris in aliquam. Aliquam vestibulum morbi blandit cursus. In pellentesque massa placerat duis ultricies lacus sed. Mollis nunc sed id semper. Metus aliquam eleifend mi in. Aliquet nec ullamcorper sit amet risus nullam. Morbi non arcu risus quis varius quam quisque id. Morbi tempus iaculis urna id volutpat. Convallistellus id interdum velit laoreet id donec ultrices tincidunt.";

const noneHideMode = "hidden-none";
const minHideMode = "hidden-min";
const maxHideMode = "hidden-max";
var currentHideMode = noneHideMode;
var totalScore = 0;
var initializationForm = document.getElementById('myModal');
function setDefaultTexts() {
  setAttributes(document.getElementById("head-stat-1"), {
    style: "width: 80%",
    "aria-valuenow": "80",
  });
  setAttributes(document.getElementById("head-stat-2"), {
    style: "width: 50%",
    "aria-valuenow": "50",
  });
  setAttributes(document.getElementById("head-stat-3"), {
    style: "width: 70%",
    "aria-valuenow": "70",
  });
  setAttributes(document.getElementById("head-stat-4"), {
    style: "width: 40%",
    "aria-valuenow": "40",
  });
  setAttributes(document.getElementById("head-stat-5"), {
    style: "width: 30%",
    "aria-valuenow": "30",
  });
  document.getElementById("editable-paragraph").innerHTML = dummyParagraph;
  document.getElementById("editable-paragraph-mobile").innerHTML = document.getElementById("editable-paragraph").innerHTML.slice(0,150)+ '...';
}

setDefaultTexts();