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

eval("\r\n\r\nconst apiKey = \"client_id=5UGynejyAW\";\r\nvar topgames = [];\r\n\r\nwindow.onload = async function(){\r\n    topgames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=8&ascending=false&${apiKey}`);\r\n    // populargames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=8&ascending=false&${apiKey}`); Already for popular\r\n    console.log(topgames.games);\r\n    buildList();\r\n}\r\n\r\nasync function fetchData(someUrl){\r\n  return await fetch(someUrl)\r\n      .then(response => response.json());\r\n}\r\n\r\nfunction buildList(){\r\n  // Order the list, now its ordered on the user rating\r\n  // games.sort(function(a,b) {\r\n  //     return b.average_user_rating - a.average_user_rating;\r\n  // });\r\n\r\n  //Change the innerHTML of the page\r\n  let html = '';\r\n  //Make a for loop to pass all the games who are needed to be displayed\r\n  for(let game of topgames.games){\r\n      var newString = deString(game.handle, \"-\");\r\n      html += `\r\n      <div class=\"game\">\r\n        <div class=\"name\"><p>${newString}</p></div>\r\n        <div class=\"data\">\r\n          <p class=\"rating\">${game.rank}</p>\r\n          <div class=\"buttons\">\r\n            <button class=\"wishlist\"><i class=\"fas fa-heart fa-2x\"></i></button>\r\n            <button class=\"shelf\"><i class=\"fas fa-bookmark fa-2x\"></i></button>\r\n          </div>\r\n          <img src=\"${game.image_url}\" alt=\"Scythe\">\r\n          <div class=\"bottomBar\">\r\n            <p class=\"players\">${game.min_players}-${game.max_players} <i class=\"fas fa-users\"></i></p>\r\n            <p class=\"duration\">${game.min_playtime}-${game.max_playtime} <i class=\"fas fa-clock\"></i></p>\r\n            <p class=\"age\">${game.min_age}+</p>\r\n          </div>\r\n        </div>\r\n      </div>`;\r\n\r\n    // The calculation to round to the right numbers\r\n    // ${Math.round(game.average_learning_complexity * 100) / 100}\r\n\r\n  }\r\n  document.getElementById('games').innerHTML = html;\r\n  document.getElementById('games2').innerHTML = html;\r\n}\r\n\r\nfunction deString(string, separator){\r\n  //we split the string and make it free of separator\r\n  const separatedArray = string.split(separator);\r\n  //we join the separatedArray with empty string\r\n  const separatedString = separatedArray.join(\" \");\r\n  return separatedString;\r\n}\n\n//# sourceURL=webpack://web2-frontend-ehbsacha/./src/index.js?");

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