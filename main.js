'use strict';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(function (error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
}

//Initialize application data
var dummyParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui vivamus arcu felis bibendum ut tristique et egestas. Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Et odio pellentesque diam volutpat commodo. Ante metus dictum at tempor commodo ullamcorper a lacus. Pharetra diam sit amet nisl suscipit adipiscing. Cursus risus at ultrices mi tempus imperdiet nulla. Adipiscing elit pellentesque habitant morbi tristique senectus et netus et. Rhoncus dolor purus non enim praesent. Scelerisque viverra mauris in aliquam. Aliquam vestibulum morbi blandit cursus. In pellentesque massa placerat duis ultricies lacus sed. Mollis nunc sed id semper. Metus aliquam eleifend mi in. Aliquet nec ullamcorper sit amet risus nullam. Morbi non arcu risus quis varius quam quisque id. Morbi tempus iaculis urna id volutpat. Convallistellus id interdum velit laoreet id donec ultrices tincidunt.";

const noneHideMode = "hidden-none";
const minHideMode = "hidden-min";
const maxHideMode = "hidden-max";
var currentHideMode = noneHideMode;
var totalScore = 0;
var initializationForm = document.getElementById('myModal');
debugger;
var editedContentData = localStorage.getItem('editedContentData') != null ? JSON.parse(localStorage.getItem('editedContentData')) : [];

function setEditedContentData() {
  editedContentData.forEach(function (item) {
    document.getElementById(item.id).innerHTML = item.value;
  });
}

setEditedContentData();

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
  document.getElementById("editable-paragraph").innerHTML =?? dummyParagraph;
  document.getElementById("editable-paragraph-mobile").innerHTML = document.getElementById("editable-paragraph").innerHTML.slice(0,150)+ '...';
}

setDefaultTexts();

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function fillHtmlElementsWithUserInfoData() {
  for (const [key, value] of Object.entries(userInfo)) {
    let elementId = key + "-info";
    let element = document.getElementById(elementId);
    if (element.tagName === 'IMG') {
      element.src = value;
    } else {
      element.innerHTML = value;
    }
  }

  document.getElementById('main-name').innerHTML = userInfo.fullname;
}


var worldPlayerStatistics = [
  {
    id: 1,
    firstname: "Novak",
    lastname: "Djokovic",
    points: "55",
  },
  {
    id: 2,
    firstname: "Jacob",
    lastname: "Thornton",
    points: "33",
  },
  {
    id: 3,
    firstname: "Larry",
    lastname: "Johnson",
    points: "99",
  },
  {
    id: 4,
    firstname: "Nick",
    lastname: "Andreson",
    points: "28",
  }
];

var userInfo = null;
var myWorldStatistics = null;

function requestDataInitialize() {
  $('#' + initializationForm.id).modal({
    'backdrop': 'static',
  }).modal('show');
}

/**
 * 
 * @returns Boolean
 */
function requiredDataExist() {
  return userInfo && myWorldStatistics;
}

function initDataFromStorageOnFailRequestInitialize() {
  debugger;
  let userInfoJSON = localStorage.getItem('userInfo');
  userInfo = userInfoJSON
    ? JSON.parse(userInfoJSON)
    : userInfo;
  let myWorldStatisticsFromLocalStorage = localStorage.getItem('myWorldStatistics');
  myWorldStatistics = myWorldStatisticsFromLocalStorage ? JSON.parse(myWorldStatisticsFromLocalStorage) : myWorldStatistics;
  if (!requiredDataExist()) {
    requestDataInitialize();
    return;
  }

  fillHtmlElementsWithUserInfoData();
  worldPlayerStatistics.push(myWorldStatistics);
}

function saveMyWorldStatisticsInLocalStorage() {
  localStorage.setItem('myWorldStatistics', JSON.stringify(myWorldStatistics));
}

function saveUserInfoInLocalStorage() {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

function submitForm() {
  userInfo = {
    fullname: document.getElementById('firstname-init').value + ' ' + document.getElementById('lastname-init').value,
    email: document.getElementById('email-init').value,
    phone: document.getElementById('phone-init').value,
    mobile: document.getElementById('mobile-init').value,
    address: document.getElementById('address-init').value,
    profilePicture: document.getElementById('pic-init').value
  };

  myWorldStatistics = {
    id: Math.max.apply(Math, worldPlayerStatistics.map(item => item.id)) + 1,
    firstname: document.getElementById('firstname-init').value,
    lastname: document.getElementById('lastname-init').value,
    points: document.getElementById('total-score-init').value
  };

  saveMyWorldStatisticsInLocalStorage();
  saveUserInfoInLocalStorage();
  if (requiredDataExist) {
    initDataFromStorageOnFailRequestInitialize();
    $('#' + initializationForm.id).modal('hide');
  }
}

//Declare required event listeners
document.getElementById('init-website').addEventListener('click', function () {
  submitForm();
});

initDataFromStorageOnFailRequestInitialize();

function addRowsTableWorldPlayerStatistics(arrayOfObjects) {
  let tableRows = arrayOfObjects
    .map(
      (item, key) =>
        "<tr> <th scope='rxow'>" +
        parseInt(key + 1) +
        "</th> <td id='firstname-world-class-value' class='" +
        maxHideMode +
        "'>" +
        item.firstname +
        "</td> <td >" +
        item.lastname +
        "</td> <td ><input id ='points-" +
        key +
        "' class='input-statistics' type='integer' name='number' value='" +
        item.points +
        "'/></td> </tr>"
    )
    .join(" ");

  recalculateTotalScore();

  document.getElementById("worldPlayerStatsRows").innerHTML =
    tableRows +
    "<tr> <th scope='row'> " +
    parseInt(arrayOfObjects.length + 1) +
    " </th> <td> Σύνολο Πόντων </td> <td class='" +
    maxHideMode +
    "' id='empty-td'></td> <td id ='totalScore'>" +
    totalScore +
    "</td> </tr>";
}


var defaultSortDirection = 1;

function setDefaultSortingDirections() {
  let currentSortDirectionPerField = {};
  for (let key in worldPlayerStatistics[0]) {
    currentSortDirectionPerField.key = defaultSortDirection;
  }

  return currentSortDirectionPerField;
}

var currentSortDirectionPerField = setDefaultSortingDirections();
addRowsTableWorldPlayerStatistics(worldPlayerStatistics);

var propComparator = (propName) => (a, b) =>
  a[propName] == b[propName]
    ? 0
    : a[propName] < b[propName]
      ? -currentSortDirectionPerField.key
      : currentSortDirectionPerField.key;

function sortWorldClassStatisticsByKey(key) {
  currentSortDirectionPerField.key = -currentSortDirectionPerField.key;
  worldPlayerStatistics.sort(propComparator(key));
  addRowsTableWorldPlayerStatistics(worldPlayerStatistics);
}
/**
 * 
 * @param {string} email 
 * @returns 
 */
function validateEmail(email) {
  //regex for email validation
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function updateWorldObject(element) {
  let keyOfWorldClassAthlete = parseInt(element.id.split("-")[1]);
  worldPlayerStatistics[keyOfWorldClassAthlete].points = parseInt(
    element.value > 0 ? element.value : 0
  );
  if (worldPlayerStatistics[keyOfWorldClassAthlete].id === myWorldStatistics.id) {
    myWorldStatistics.points = worldPlayerStatistics[keyOfWorldClassAthlete].points;
    saveMyWorldStatisticsInLocalStorage();
  }
  recalculateTotalScore();
  refreshTotalScoreField();
}

function refreshTotalScoreField() {
  document.getElementById("totalScore").innerHTML = totalScore;
}

function recalculateTotalScore() {

  worldPlayerStatistics.forEach((element) => {
    totalScore += parseInt(element.points);
  });
}




document
  .querySelectorAll("input[id^=points]")
  .forEach((element) =>
    element.addEventListener("change", (e) => updateWorldObject(e.target))
  );

document.getElementById("firstname-world-class").onclick = function () {
  sortWorldClassStatisticsByKey("firstname");
};
document.getElementById("lastname-world-class").onclick = function () {
  sortWorldClassStatisticsByKey("lastname");
};
document.getElementById("points-world-class").onclick = function () {
  sortWorldClassStatisticsByKey("points");
};

document
  .getElementById("button-addon1")
  .addEventListener("click", function (e) {
    let email = document.getElementById("email-form").value;
    if (validateEmail(email)) {
      alert("You sucessfully subscribed to our newsletter");
      exit;
    }

    alert("Please use a valid email");
  });

function changeActiveHideModeChoice(element, newMode) {
  document
    .getElementsByClassName("active-dropdown")[0]
    .classList.remove("active-dropdown");
  element.classList.add("active-dropdown");

  [...document.getElementsByClassName(currentHideMode)].forEach(
    (item) => (item.style.display = null)
  );
  [...document.getElementsByClassName(newMode)].forEach(
    (item) => (item.style.display = "none")
  );
  currentHideMode = newMode;
}

document
  .getElementById("hide-max")
  .addEventListener("click", (e) =>
    changeActiveHideModeChoice(e.target, maxHideMode)
  );

document
  .getElementById("hide-min")
  .addEventListener("click", (e) =>
    changeActiveHideModeChoice(e.target, minHideMode)
  );

document
  .getElementById("hide-none")
  .addEventListener("click", (e) =>
    changeActiveHideModeChoice(e.target, noneHideMode)
  );

document.getElementById("copyrights").innerHTML = "© 2021 Copyrights here.";

function changeActiveMenuLink(e) {
  document
    .querySelectorAll("a[id^=link-]")
    .forEach((element) => element.classList.remove("active"));
  e.target.classList.add("active");
}

document.querySelectorAll("a[id^=link-]").forEach((element) =>
  element.addEventListener("click", function (e) {
    changeActiveMenuLink(e);
  })
);

document.getElementById('edit-mode-toggle').addEventListener('click', function (e) {
  e.target.classList.contains('active') ? e.target.classList.remove('active') : e.target.classList.add('active');
  e.target.innerHTML = e.target.classList.contains('active') ? 'Αποθήκευση Αλλαγών' : 'Λειτουργία Επεξεργασίας';

  document.querySelectorAll('*[id^="editable-"]').forEach((element) => element.contentEditable === 'true' ? element.contentEditable = 'false' : element.contentEditable = 'true');
  if (!e.target.classList.contains('active'))
    document.querySelectorAll('*[id^="editable-"]').forEach(function (item) {
      editedContentData.push({
        id: item.id,
        value: item.innerHTML
      })
    });
  localStorage.setItem('editedContentData', JSON.stringify(editedContentData));
});
