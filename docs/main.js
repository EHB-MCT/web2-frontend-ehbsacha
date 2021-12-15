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

eval("\r\n\r\nconst apiKey = \"client_id=5UGynejyAW\";\r\nvar topGames = [];\r\nvar popularGames = [];\r\n\r\nwindow.onload = async function(){\r\n  // fetch top games\r\n  topGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=12&ascending=false&${apiKey}`); // Fetch the top 8 games\r\n  buildList(topGames.games, 'topGames'); // Place the games on the page\r\n\r\n  // fetch popular games\r\n  popularGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=7&adescending=false&${apiKey}`); // Fetch the top 8 reddit mentioned games\r\n  buildList(popularGames.games, 'popularGames'); // Place the games on the page\r\n\r\n  // Set correct images as background\r\n  selectBackground(topGames.games[1], \"bannerTopGames\"); // Topgames background\r\n  selectBackground(popularGames.games[2], \"bannerPopularGames\"); // Populargames backgound\r\n\r\n  // After initialising open eventlistners\r\n  checkElements();\r\n};\r\n\r\nasync function fetchData(someUrl){\r\n  return await fetch(someUrl)\r\n      .then(response => response.json());\r\n}\r\n\r\nfunction buildList(games, htmlId){\r\n  // Order the list, now its ordered on the user rating\r\n  // games.sort(function(a,b) {\r\n  //     return b.average_user_rating - a.average_user_rating;\r\n  // });\r\n\r\n  //Change the innerHTML of the page\r\n  let html = '';\r\n  //Make a for loop to pass all the games who are needed to be displayed\r\n  for(let game of games){\r\n      var newString = deString(game.handle, \"-\");\r\n      html += `\r\n      <div class=\"game\" value=\"${game.id}\">\r\n        <div class=\"name\"><p>${newString}</p></div>\r\n        <div class=\"data\">\r\n          <p class=\"rating\">${game.rank}</p>\r\n          <div class=\"buttons\">\r\n            <button class=\"wishlist\"><i class=\"fas fa-heart fa-2x\" id=\"top_like_${game.id}\"></i></button>\r\n            <button class=\"shelf\"><i class=\"fas fa-bookmark fa-2x\" id=\"top_shelf_${game.id}\"></i></button>\r\n          </div>\r\n          <img src=\"${game.image_url}\" alt=\"Scythe\">\r\n          <div class=\"bottomBar\">\r\n            <p class=\"players\">${game.min_players}-${game.max_players} <i class=\"fas fa-users\"></i></p>\r\n            <p class=\"duration\">${game.min_playtime}-${game.max_playtime} <i class=\"fas fa-clock\"></i></p>\r\n            <p class=\"age\">${game.min_age}+</p>\r\n          </div>\r\n        </div>\r\n      </div>`;\r\n\r\n    // The calculation to round to the right numbers\r\n    // ${Math.round(game.average_learning_complexity * 100) / 100}\r\n\r\n  }\r\n  document.getElementById(htmlId).innerHTML = html;\r\n}\r\n\r\n// Change background img to the first boardgame of this place on the site\r\nfunction selectBackground(game,id) {\r\n  console.log(game.image_url);\r\n  document.getElementById(id).style.backgroundImage = `url('${game.image_url}')`;\r\n}\r\n\r\nfunction checkElements() {\r\n  // If you click on login button in the navigation show or hide the forms\r\n  document.getElementById(\"login\").addEventListener(\"click\", function (event) {\r\n    event.preventDefault();\r\n    if(document.getElementById(\"filter\").style.display == \"flex\"){\r\n      document.getElementById(\"filter\").style.display = \"none\";\r\n    }else{\r\n      document.getElementById(\"filter\").style.display = \"flex\";\r\n    }\r\n  });\r\n\r\n  // document.getElementById(\"filter\").addEventListener(\"click\", function (event) {\r\n  //   event.preventDefault();\r\n  //   document.getElementById(\"filter\").style.display = \"none\";\r\n  //   document.getElementById(\"loginpopup\").style.display = \"none\";\r\n  //   document.getElementById(\"signuppopup\").style.display = \"none\";\r\n  // });\r\n\r\n  document.getElementById('topGames').addEventListener('click', (event)=> {\r\n    //Keep searching for the parent node to register the correct click\r\n    const likeId = event.target.className.indexOf('game');\r\n    // console.log(likeId);\r\n    // console.log(event.target.id);\r\n  \r\n    if(likeId){\r\n      if(event.target.className.indexOf('heart') !== -1){\r\n        var newid = selectId(event.target.id, \"_\");\r\n        console.log('like', newid);\r\n\r\n      }\r\n      \r\n      if(event.target.className.indexOf('bookmark') !== -1){\r\n        var newid = selectId(event.target.id, \"_\");\r\n        console.log('bookmark', newid);\r\n\r\n      }\r\n\r\n    }\r\n  });\r\n}\r\n\r\nfunction deString(string, separator){\r\n  //we split the string and make it free of separator\r\n  const separatedArray = string.split(separator);\r\n  //we join the separatedArray with empty string\r\n  const separatedString = separatedArray.join(\" \");\r\n  return separatedString;\r\n}\r\n\r\nfunction selectId(string, separator) {\r\n  //we split the string and make it free of separator\r\n  const separatedArray = string.split(separator);\r\n  //we join the separatedArray with empty string\r\n  const finalId = separatedArray[separatedArray.length - 1];\r\n  return finalId;\r\n}\n\n//# sourceURL=webpack://web2-frontend-ehbsacha/./src/index.js?");

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