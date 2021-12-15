/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("\r\n\r\n// variables\r\nconst apiKey = \"client_id=5UGynejyAW\"; //apiKey\r\nvar topGames = []; // Array for topGames\r\nvar popularGames = []; // Array for popular games\r\n\r\nwindow.onload = async function(){\r\n  if(!localStorage.getItem(\"userId\")){ // If userId doesn't exist\r\n    localStorage.setItem(\"userId\", \"\"); // initialise the userId in localstorage\r\n  }\r\n  console.log(localStorage.getItem(\"userId\"));\r\n\r\n  // Setup navbar (loggedin or not)\r\n  if(localStorage.getItem(\"userId\") != \"\"){\r\n    document.getElementById(\"login\").style.display = \"none\";\r\n    document.getElementById(\"loggedin\").style.display = \"flex\";\r\n  }\r\n\r\n  // fetch top games\r\n  topGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=12&ascending=false&${apiKey}`); // Fetch the top 8 games\r\n  buildList(topGames.games, 'topGames', \"top\"); // Place the games on the page\r\n\r\n  // fetch popular games\r\n  popularGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=7&adescending=false&${apiKey}`); // Fetch the top 8 reddit mentioned games\r\n  buildList(popularGames.games, 'popularGames', \"popular\"); // Place the games on the page\r\n\r\n  // Set correct images as background\r\n  selectBackground(topGames.games[1], \"bannerTopGames\"); // Topgames background\r\n  selectBackground(popularGames.games[2], \"bannerPopularGames\"); // Populargames backgound\r\n\r\n  // After initialising open eventlistners\r\n  checkElements(); // activate eventListners\r\n};\r\n\r\n// A reusable fetch function\r\nasync function fetchData(someUrl, method){\r\n  return await fetch(someUrl, method) // Return the value after fetch is done\r\n      .then(response => response.json()); // Make the returned readable\r\n}\r\n\r\n// Build the list of games to put in the html and make them visible\r\nfunction buildList(games, htmlId, partOfSite){\r\n  //Change the innerHTML of the page\r\n  let html = ''; // Start clean\r\n  //Make a for loop to pass all the games who are needed to be displayed\r\n  for(let game of games){ // Iterate over the sended array\r\n      var newString = deString(game.handle, \"-\"); // Do deString function. At funtion itself more information\r\n      html += `\r\n      <div class=\"game\" value=\"${game.id}\">\r\n        <div class=\"name\"><p>${newString}</p></div>\r\n        <div class=\"data\">\r\n          <p class=\"rating\">${game.rank}</p>\r\n          <div class=\"buttons\">\r\n            <button class=\"wishlist\"><i class=\"fas fa-heart fa-2x\" id=\"${partOfSite}-like-${game.id}\"></i></button>\r\n            <button class=\"shelf\"><i class=\"fas fa-bookmark fa-2x\" id=\"${partOfSite}-shelf-${game.id}\"></i></button>\r\n          </div>\r\n          <img src=\"${game.image_url}\" alt=\"Scythe\">\r\n          <div class=\"bottomBar\">\r\n            <p class=\"players\">${game.min_players}-${game.max_players} <i class=\"fas fa-users\"></i></p>\r\n            <p class=\"duration\">${game.min_playtime}-${game.max_playtime} <i class=\"fas fa-clock\"></i></p>\r\n            <p class=\"age\">${game.min_age}+</p>\r\n          </div>\r\n        </div>\r\n      </div>`;\r\n      // The html for each game\r\n  }\r\n  document.getElementById(htmlId).innerHTML = html; // Put the builded games list into the right place in html with the corensponding id\r\n}\r\n\r\n// Change background img to the first boardgame of this place on the site\r\nfunction selectBackground(game,id) {\r\n  document.getElementById(id).style.backgroundImage = `url('${game.image_url}')`;\r\n}\r\n\r\n// After initialising open eventlistners\r\nasync function checkElements() {\r\n  // Login and signup\r\n  // If you click on login button in the navigation, show or hide the forms\r\n  document.getElementById(\"login\").addEventListener(\"click\", function (event) {\r\n    event.preventDefault();\r\n    if(document.getElementById(\"filter\").style.display == \"flex\"){\r\n      clearScreen(); // If the login sceen is open close it\r\n    }else{\r\n      showLogin(); // If the login screen in closed open it\r\n    }\r\n  });\r\n\r\n  // if you click on the white background the login and signup forms close\r\n  document.getElementById(\"filter\").addEventListener(\"click\", function (event) {\r\n    event.preventDefault();\r\n    clearScreen();\r\n  });\r\n\r\n  // If you click on the loginsubmit do login action\r\n  document.getElementById(\"loginSubmit\").addEventListener(\"click\", function (event) {\r\n    event.preventDefault();\r\n    login();\r\n  });\r\n\r\n  // Check for clicks in the chosen field, in this case for likes and shelf clicks\r\n  document.getElementById('topGames').addEventListener('click', (event)=> {\r\n    //Keep searching for the parent node to register the correct click\r\n    const likeId = event.target.className.indexOf('game');\r\n    // console.log(likeId);\r\n    // console.log(event.target.id);\r\n  \r\n    if(likeId){\r\n      // If the something which is clicked is has the word heart in the classname get the id and like or unlike the game\r\n      if(event.target.className.indexOf('heart') !== -1){\r\n        var newid = selectId(event.target.id, \"-\"); // Get the id by removing the prefixes\r\n        console.log('like', newid);\r\n      }\r\n      \r\n      // If the something which is clicked is has the word bookmark in the classname get the id and shelf or unshelf the game\r\n      if(event.target.className.indexOf('bookmark') !== -1){\r\n        var newid = selectId(event.target.id, \"-\"); // Get the id by removing the prefixes\r\n        console.log('bookmark', newid);\r\n      }\r\n    }\r\n  });\r\n}\r\n\r\n// A function to remove the seperator and afterwards \r\nfunction deString(string, separator){\r\n  const separatedArray = string.split(separator);// We split the string and make it free of separator\r\n  const separatedString = separatedArray.join(\" \"); // We join the separatedArray with one space string\r\n  return separatedString; // Return the value\r\n}\r\n\r\n// the difference with the one above is that thisone selects the last part instead of joining them together\r\nfunction selectId(string, separator) {\r\n  const separatedArray = string.split(separator); // We split the string and make it free of separator\r\n  const finalId = separatedArray[separatedArray.length - 1]; // Select the last part or the seperated array\r\n  return finalId; // Return the value\r\n}\r\n\r\n// If loginbutton in the navbar gets clicked opens the login screen\r\nfunction showLogin() { // make parts of the site visibe\r\n  document.getElementById(\"filter\").style.display = \"flex\";\r\n  document.getElementById(\"loginScreen\").style.display = \"flex\";\r\n}\r\n\r\nfunction clearScreen(){ // Hides everything unnecessary\r\n  document.getElementById(\"filter\").style.display = \"none\";\r\n  document.getElementById(\"loginScreen\").style.display = \"none\";\r\n}\r\n\r\n// Login function gets called when clicking login and does a fetchcall to verify. If succes login else a error message\r\nasync function login() {\r\n  try{ // Try to fetch\r\n    // I have skipped the varables for privacy reasons\r\n    var url = `https://web2-gameheaven-ehbsacha.herokuapp.com/user?name=${document.getElementById(\"loginName\").value}&password=${document.getElementById(\"loginPassword\").value}`;\r\n    const loggedIn = await fetchData(url,{method: 'GET'}); // Do the fetch and store return in loggedIn\r\n    console.log(loggedIn[0]);\r\n    saveId(loggedIn); // If already gotten to here login is succesfull and your id gets saved local\r\n  }catch(err){ \r\n    document.getElementById(\"loginError\").style.display = \"flex\"; // If you typed something wrong throw error\r\n  }\r\n}\r\n\r\nfunction saveId(userData){\r\n  localStorage.setItem(\"userId\", userData[0]._id); // Save the userId so it counts as loggedIn\r\n  window.location.reload(true);\r\n}\n\n//# sourceURL=webpack://web2-frontend-ehbsacha/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;