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

eval("\r\n\r\n// --------------------- //\r\n// The express api I use //\r\n// --------------------- //\r\nconst heroku = \"https://web2-gameheaven-ehbsacha.herokuapp.com/\";\r\nconst localhost = \"http://localhost:3000/\";\r\nvar link = heroku;\r\n\r\n// --------- //\r\n// Variables //\r\n// --------- //\r\nconst apiKey = \"client_id=5UGynejyAW\"; //apiKey\r\nvar topGames = []; // Array for topGames\r\nvar randomGames = []; // Array for random games\r\nvar likedGames = []; // Array for liked games\r\nvar shelvedGames = []; // Array for shelved games\r\nvar search = []; // Array for search data\r\n\r\nvar likes = []; // Array for the liked game Ids\r\nvar shelved = []; // Array for the shelved game Ids\r\n\r\nvar pageOfOnlyShow = 0; // The page you are on if you are vititing a specific place\r\nvar onlyshow = false;\r\n\r\n// ------------ //\r\n// On page load //\r\n// ------------ //\r\nwindow.onload = async function(){ // On page load starts with all these items\r\n\r\n  // ------------------------ //\r\n  // logged in related navbar //\r\n  // ------------------------ //\r\n  if(localStorage.getItem(\"userId\")){ // Setup navbar (loggedin or not)\r\n    document.getElementById(\"login\").style.display = \"none\";\r\n    document.getElementById(\"loggedin\").style.display = \"flex\";\r\n    await fetchAllLikes();\r\n    await fetchAllShelves();\r\n    await fillLikedGames(8);\r\n    await fillShelvedGames(8);\r\n  }\r\n\r\n  // ----------------- //\r\n  // Setup games fetch //\r\n  // ----------------- //\r\n  // fetch top games\r\n  topGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=8&${apiKey}`); // Fetch the top 8 games\r\n  // fetch 8 random games\r\n  randomGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&skip=${Math.floor(Math.random()*1000)}&limit=8&${apiKey}`); // Fetch 8 random games\r\n\r\n  // ----------------- //\r\n  // Load the gamedata //\r\n  // ----------------- //\r\n  await changeContent();\r\n  await loadPageData();\r\n\r\n  // ----------------------- //\r\n  // After the setup is done //\r\n  // ----------------------- //\r\n  checkElements(); // activate eventListners\r\n};\r\n\r\n// ----------------------- //\r\n// Reusable fetch function //\r\n// ----------------------- //\r\nasync function fetchData(someUrl, method){ // Fetch the required data\r\n  return await fetch(someUrl, method) // Return the value after fetch is done\r\n      .then(response => response.json()); // Make the returned readable\r\n}\r\n\r\n// ------------------------- //\r\n// Page load/reload function //\r\n// ------------------------- //\r\nasync function loadPageData(){\r\n  await buildList(topGames.games, 'topGames', \"top\"); // Place the games on the page\r\n  await buildList(randomGames.games, 'randomGames', \"random\"); // Place the games on the page\r\n  // Set correct images as background\r\n  await selectBackground(topGames.games[Math.floor(Math.random() * 8)], \"bannerTopGames\"); // Topgames background\r\n  if(localStorage.getItem(\"userId\")){\r\n    //set correct games\r\n    if(likedGames != ''){\r\n      await selectBackground(randomGames[Math.floor(Math.random() * 8)], \"bannerRandomGames\"); // Randomgames backgound\r\n      await buildList(likedGames.games, 'likedGames', \"liked\"); // Place the games on the page\r\n      document.getElementById(\"showLiked\").style.display = 'flex';\r\n    }else{\r\n      document.getElementById(\"showLiked\").style.display = 'none';\r\n    }\r\n    if(shelvedGames != ''){\r\n      await buildList(shelvedGames.games, 'shelvedGames', \"shelved\"); // Place the games on the page\r\n      await selectBackground(likedGames.games[Math.floor(Math.random() * 8)], \"bannerLikedGames\"); // Topgames background\r\n      document.getElementById(\"showShelved\").style.display = 'flex';\r\n    }else{\r\n      document.getElementById(\"showShelved\").style.display = 'none';\r\n    }\r\n  }\r\n  if(search != ''){\r\n    await buildList(search.games, 'searchedGames', \"searched\"); // Place the games on the page\r\n    await selectBackground(search.games[Math.floor(Math.random() * 8)], \"bannerSearchedGames\"); // Topgames background\r\n    document.getElementById(\"showSearched\").style.display = 'flex';\r\n  }else{\r\n    document.getElementById(\"showSearched\").style.display = 'none';\r\n  }\r\n  document.getElementById(\"loading\").style.display = \"none\";\r\n}\r\n\r\nasync function changeContent(){\r\n  //Change the innerHTML of the page\r\n  let html = ''; // Start clean\r\n  if(!localStorage.getItem(\"userId\")){\r\n    html += `\r\n    <Div id=\"likeShelfField\">\r\n      <div class=\"showSearched\" id=\"showSearched\">\r\n        <p class=\"title\">Searched games</p>\r\n        <div id=\"searchedGames\"></div>\r\n        <div class=\"banner\" id=\"bannerSearchedGames\"></div>\r\n      </div>\r\n      <p class=\"title\">Top games</p>\r\n      <div id=\"topGames\"></div>\r\n      <div class=\"moreButton\"><a href=\"#\" id=\"moreTopGames\">more topgames</a></div>\r\n      <div class=\"banner\" id=\"bannerTopGames\"></div>\r\n      <p class=\"title\">Random games</p>\r\n      <div id=\"randomGames\"></div>\r\n      <div class=\"banner\" id=\"bannerRandomGames\"></div>\r\n    </Div>`;\r\n  }else{\r\n    html += `\r\n    <Div id=\"likeShelfField\">\r\n      <div class=\"showSearched\" id=\"showSearched\">\r\n        <p class=\"title\">Searched games</p>\r\n        <div id=\"searchedGames\"></div>\r\n        <div class=\"banner\" id=\"bannerSearchedGames\"></div>\r\n      </div>\r\n      <p class=\"title\">Top games</p>\r\n      <div id=\"topGames\"></div>\r\n      <div class=\"moreButton\"><a href=\"#\" id=\"moreTopGames\">more topgames</a></div>\r\n      <div class=\"banner\" id=\"bannerTopGames\"></div>\r\n      <p class=\"title\">Random games</p>\r\n      <div id=\"randomGames\"></div>\r\n      <div class=\"showLiked\" id=\"showLiked\">\r\n        <div class=\"banner\" id=\"bannerRandomGames\"></div>\r\n        <p class=\"title\">Liked games</p>\r\n        <div id=\"likedGames\"></div>\r\n        <div class=\"moreButton\"><a href=\"#\" id=\"moreLikedGames\">more likedgames</a></div>\r\n      </div>\r\n      <div class=\"showShelved\" id=\"showShelved\">\r\n        <div class=\"banner\" id=\"bannerLikedGames\"></div>\r\n        <p class=\"title\">Shelved games</p>\r\n        <div id=\"shelvedGames\"></div>\r\n        <div class=\"moreButton\"><a href=\"#\" id=\"moreShelvedGames\">more shelvedgames</a></div>\r\n      </div>\r\n    </Div>`;\r\n  }\r\n  document.getElementById(\"content\").innerHTML = html; // Put the builded games list into the right place in html with the corensponding id\r\n}\r\n// More random games button: <div class=\"moreButton\"><a href=\"#\" id=\"moreRandomGames\">more randomgames</a></div>\r\n\r\n// ----------------------------- //\r\n// Reusable site build functions //\r\n// ----------------------------- //\r\nfunction buildList(games, htmlId, partOfSite){ // Build the list of games to put in the html and make them visible\r\n  //Change the innerHTML of the page\r\n  let html = ''; // Start clean\r\n  //Make a for loop to pass all the games who are needed to be displayed\r\n  for(let game of games){ // Iterate over the sended array\r\n    var likeClass = '';\r\n    var shelfClass = '';\r\n    likes.forEach((like) => {\r\n      if(like.gameId == game.id){\r\n        likeClass = \"liked\";\r\n      }\r\n    });\r\n    shelved.forEach((shelf) => {\r\n      if(shelf.gameId == game.id){\r\n        shelfClass = \"shelved\";\r\n      }\r\n    });\r\n    var newString = deString(game.handle, \"-\"); // Do deString function. At funtion itself more information\r\n    html += `\r\n    <div class=\"game\" value=\"${game.id}\">\r\n      <div class=\"name\"><p>${newString}</p></div>\r\n      <div class=\"data\">\r\n        <p class=\"rating\">${game.rank}</p>\r\n        <div class=\"buttons\">\r\n          <button class=\"wishlist\"><i class=\"fas fa-heart fa-2x like_${game.id} ${likeClass}\" id=\"${partOfSite}_like_${game.id}\"></i></button>\r\n          <button class=\"shelf\"><i class=\"fas fa-bookmark fa-2x shelf_${game.id} ${shelfClass}\" id=\"${partOfSite}_shelf_${game.id}\"></i></button>\r\n        </div>\r\n        <img src=\"${game.image_url}\" alt=\"Scythe\">\r\n        <div class=\"bottomBar\">\r\n          <p class=\"players\">${game.min_players}-${game.max_players} <i class=\"fas fa-users\"></i></p>\r\n          <p class=\"duration\">${game.min_playtime}-${game.max_playtime} <i class=\"fas fa-clock\"></i></p>\r\n          <p class=\"age\">${game.min_age}+</p>\r\n        </div>\r\n      </div>\r\n    </div>`;\r\n    // The html for each game\r\n  }\r\n  document.getElementById(htmlId).innerHTML = html; // Put the builded games list into the right place in html with the corensponding id\r\n}\r\n\r\nfunction selectBackground(game,id) { // Change background img to the first boardgame of this place on the site\r\n  try{\r\n    document.getElementById(id).style.backgroundImage = `url('${game.image_url}')`;\r\n  }catch(err){\r\n    console.log(err);\r\n    // Fallback background, if there is an error use this background\r\n    document.getElementById(id).style.backgroundImage = `url('${topGames.games[1].image_url}')`;\r\n  }finally{\r\n    return;\r\n  }\r\n}\r\n\r\n// ------------------- //\r\n// seperator functions //\r\n// ------------------- //\r\nfunction deString(string, separator){ // A function to remove the seperator and afterwards \r\n  const separatedArray = string.split(separator);// We split the string and make it free of separator\r\n  const separatedString = separatedArray.join(\" \"); // We join the separatedArray with one space string\r\n  return separatedString; // Return the value\r\n}\r\n\r\nfunction selectId(string, separator) { // the difference with the one above is that thisone selects the last part instead of joining them together\r\n  const separatedArray = string.split(separator); // We split the string and make it free of separator\r\n  const finalId = separatedArray[separatedArray.length - 1]; // Select the last part or the seperated array\r\n  return finalId; // Return the value\r\n}\r\n\r\n// ------------------- //\r\n// Show and hide items //\r\n// ------------------- //\r\nfunction showLogin() { // If loginbutton in the navbar gets clicked opens the login screen\r\n  document.getElementById(\"filter\").style.display = \"flex\";\r\n  document.getElementById(\"loginScreen\").style.display = \"flex\";\r\n}\r\n\r\nfunction showLoggedIn() { // If account in the navbar gets clicked opens the change user data screen\r\n  document.getElementById(\"filter\").style.display = \"flex\";\r\n  document.getElementById(\"loggedinScreen\").style.display = \"flex\";\r\n}\r\n\r\nfunction showDelete() { // If account in the navbar gets clicked opens the change user data screen\r\n  document.getElementById(\"deleteScreen\").style.display = \"flex\";\r\n  document.getElementById(\"loggedinScreen\").style.display = \"none\";\r\n}\r\n\r\nfunction clearScreen(){ // Hides everything unnecessary\r\n  document.getElementById(\"filter\").style.display = \"none\";\r\n  document.getElementById(\"loginScreen\").style.display = \"none\";\r\n  document.getElementById(\"loggedinScreen\").style.display = \"none\";\r\n  document.getElementById(\"deleteScreen\").style.display = \"none\";\r\n}\r\n\r\nfunction delay(n){\r\n  return new Promise(function(resolve){\r\n      console.log(\"timeout\");\r\n      setTimeout(resolve,n*1000);\r\n  });\r\n}\r\n\r\n// -------------------------- //\r\n// Login and signup functions //\r\n// -------------------------- //\r\nasync function login() { // Login function gets called when clicking login and does a fetchcall to verify. If succes login else a error message\r\n  try{ // Try to fetch\r\n    // I have skipped the varables for privacy reasons\r\n    var url = `${link}user?name=${document.getElementById(\"loginName\").value}&password=${document.getElementById(\"loginPassword\").value}`;\r\n    const loggedIn = await fetchData(url,{method: 'GET'}); // Do the fetch and store return in loggedIn\r\n    console.log(loggedIn[0]);\r\n    saveId(loggedIn); // If already gotten to here login is succesfull and your id gets saved local\r\n  }catch(err){ \r\n    document.getElementById(\"loginError\").style.display = \"flex\"; // If you typed something wrong throw error\r\n  }\r\n}\r\n\r\nasync function signup() { // Signup happens If name is not taken, then use same data to login\r\n  try{ // Try to fetch\r\n    var signupUrl = `${link}user`;\r\n    const prepared = {\r\n      method: 'POST',\r\n      headers: { 'Content-Type': 'application/json' },\r\n      body: JSON.stringify({\r\n        name: `${document.getElementById(\"signupName\").value}`,\r\n        password: `${document.getElementById(\"signupPassword\").value}`,\r\n        email: `${document.getElementById(\"signupEmail\").value}`\r\n      })};\r\n    const created = await fetchData(signupUrl, prepared);\r\n    console.log(created);\r\n    saveId(created);\r\n  }catch(err){\r\n    document.getElementById(\"signupError\").style.display = \"flex\"; // If you typed something wrong throw error\r\n  }\r\n}\r\n\r\nasync function newName() {\r\n  try{ // Try to fetch\r\n    var signupUrl = `${link}user/name`;\r\n    const prepared = {\r\n      method: 'PUT',\r\n      headers: { 'Content-Type': 'application/json' },\r\n      body: JSON.stringify({\r\n        name: `${document.getElementById(\"changeNameName\").value}`,\r\n        password: `${document.getElementById(\"changeNamePassword\").value}`,\r\n        newName: `${document.getElementById(\"newName\").value}`,\r\n        _id: localStorage.getItem(\"userId\")\r\n      })};\r\n    await fetchData(signupUrl, prepared)\r\n      .then(console.log(\"succes\"))\r\n      .then(await delay(2))\r\n      .then(window.location.reload(true));\r\n  }catch(err){\r\n    console.log(err);\r\n    document.getElementById(\"newNameError\").style.display = \"flex\"; // If you typed something wrong throw error\r\n  }\r\n}\r\n\r\nasync function newPassword() {\r\n  try{ // Try to fetch\r\n    var signupUrl = `${link}user/password`;\r\n    const prepared = {\r\n      method: 'PUT',\r\n      headers: { 'Content-Type': 'application/json' },\r\n      body: JSON.stringify({\r\n        name: `${document.getElementById(\"changePasswordName\").value}`,\r\n        password: `${document.getElementById(\"changePasswordPassword\").value}`,\r\n        newPassword: `${document.getElementById(\"newPassword\").value}`,\r\n        _id: localStorage.getItem(\"userId\")\r\n      })};\r\n    await fetchData(signupUrl, prepared)\r\n      .then(console.log(\"succes\"))\r\n      .then(await delay(2))\r\n      .then(window.location.reload(true));\r\n  }catch(err){\r\n    console.log(err);\r\n    document.getElementById(\"newPasswordError\").style.display = \"flex\"; // If you typed something wrong throw error\r\n  }\r\n}\r\n\r\nasync function logout() { // Logout\r\n  await localStorage.clear();\r\n  window.location.reload(true);\r\n}\r\n\r\nasync function deleteUser() { // Delete user\r\n  try{ // Try to fetch\r\n    var signupUrl = `${link}user`;\r\n    const prepared = {\r\n      method: 'DELETE',\r\n      headers: { 'Content-Type': 'application/json' },\r\n      body: JSON.stringify({\r\n        name: `${document.getElementById(\"deleteName\").value}`,\r\n        password: `${document.getElementById(\"deletePassword\").value}`,\r\n        _id: localStorage.getItem(\"userId\")\r\n      })};\r\n    await fetchData(signupUrl, prepared);\r\n  }catch(err){\r\n    await localStorage.clear();\r\n    window.location.reload(true);\r\n  }\r\n}\r\n\r\nfunction saveId(userData){ // If login or signup is succes save id in local token\r\n  localStorage.setItem(\"userId\", userData[0]._id); // Save the userId so it counts as loggedIn\r\n  window.location.reload(true);\r\n}\r\n\r\n// -------------------- //\r\n// Like and shelf Items //\r\n// -------------------- //\r\nasync function likeFunction(gameId){\r\n  try{ // Try to fetch\r\n    var checkUrl = `${link}game?userId=${localStorage.getItem(\"userId\")}&gameId=${gameId}`;\r\n    const exists = await fetchData(checkUrl,{method: 'GET'});\r\n    if(exists.length == 0){\r\n      try{ // Try to fetch\r\n        var postUrl = `${link}like?userId=${localStorage.getItem(\"userId\")}&gameId=${gameId}`;\r\n        const created = await fetchData(postUrl,{method: 'POST'});\r\n      }finally{\r\n        return;\r\n      }\r\n    }else{\r\n      try{ // Try to fetch\r\n        var postUrl = `${link}like?userId=${localStorage.getItem(\"userId\")}&gameId=${gameId}`;\r\n        const updated = await fetchData(postUrl,{method: 'PUT'});\r\n      }finally{\r\n        return;\r\n      }\r\n    }\r\n  }catch(err){\r\n    console.log(err);\r\n  }\r\n}\r\n\r\nasync function shelfFunction(gameId){\r\n  try{ // Try to fetch\r\n    var checkUrl = `${link}game?userId=${localStorage.getItem(\"userId\")}&gameId=${gameId}`;\r\n    const exists = await fetchData(checkUrl,{method: 'GET'});\r\n    if(exists.length == 0){\r\n      try{ // Try to fetch\r\n        var postUrl = `${link}shelf?userId=${localStorage.getItem(\"userId\")}&gameId=${gameId}`;\r\n        const created = await fetchData(postUrl,{method: 'POST'});\r\n      }finally{\r\n        return;\r\n      }\r\n    }else{\r\n      try{ // Try to fetch\r\n        var postUrl = `${link}shelf?userId=${localStorage.getItem(\"userId\")}&gameId=${gameId}`;\r\n        const updated = await fetchData(postUrl,{method: 'PUT'});\r\n      }finally{\r\n        return;\r\n      }\r\n    }\r\n  }catch(err){\r\n    console.log(err);\r\n  }\r\n}\r\n\r\nasync function fetchAllLikes(){\r\n  try{ // Try to fetch\r\n    var checkUrl = `${link}likes?userId=${localStorage.getItem(\"userId\")}`;\r\n    likes = await fetchData(checkUrl,{method: 'GET'});\r\n    if(likes == ''){\r\n      console.log(\"empty\");\r\n    }\r\n  }catch(err){\r\n    console.log(err);\r\n  }\r\n}\r\n\r\nasync function fetchAllShelves(){\r\n  try{ // Try to fetch\r\n    var checkUrl = `${link}shelved?userId=${localStorage.getItem(\"userId\")}`;\r\n    shelved = await fetchData(checkUrl,{method: 'GET'});\r\n    if(shelved == ''){\r\n      console.log(\"empty\");\r\n    }\r\n  }catch(err){\r\n    console.log(err);\r\n  }\r\n}\r\n\r\n// -------------- //\r\n// Event listners //\r\n// -------------- //\r\nasync function checkElements() { // After initialising open eventlistners\r\n  \r\n  // if you click on the white background the login and signup forms close\r\n  document.getElementById(\"filter\").addEventListener(\"click\", function (event) {\r\n    event.preventDefault();\r\n    clearScreen();\r\n  });\r\n\r\n  // if you click on the searchbutton a fetch happens\r\n  document.getElementById(\"searchSubmit\").addEventListener(\"click\", function (event) {\r\n    event.preventDefault();\r\n    searchFunction();\r\n  });\r\n\r\n  // if you click on the moreTopGames fill page with specific data\r\n  document.getElementById(\"moreTopGames\").addEventListener(\"click\", function (event) {\r\n    event.preventDefault();\r\n    onlyShow(\"Top\",\"top\");\r\n  });\r\n\r\n  // --------------- //\r\n  // Account related //\r\n  // --------------- //\r\n\r\n  // Only listen to these buttons if no local token is saved\r\n  if(!localStorage.getItem(\"userId\")){ // Not logged in\r\n    // Login and signup\r\n    // If you click on login button in the navigation, show or hide the forms no login of signup\r\n    document.getElementById(\"login\").addEventListener(\"click\", function (event) {\r\n      event.preventDefault();\r\n      if(document.getElementById(\"filter\").style.display == \"flex\"){\r\n        clearScreen(); // If the login sceen is open close it\r\n      }else{\r\n        showLogin(); // If the login screen in closed open it\r\n      }\r\n    });\r\n\r\n    // If you click on the loginsubmit do login action\r\n    document.getElementById(\"loginSubmit\").addEventListener(\"click\", function (event) {\r\n      event.preventDefault();\r\n      login();\r\n    });\r\n    \r\n    // If you click on the signupsubmit do login action\r\n    document.getElementById(\"signupSubmit\").addEventListener(\"click\", function (event) {\r\n      event.preventDefault();\r\n      signup();\r\n    });\r\n  }\r\n  // Only listen to these buttons if local token is saved\r\n  if(localStorage.getItem(\"userId\")){ // Logged in\r\n    // If you click on account button in the navigation, show or hide the forms to change password or name\r\n    document.getElementById(\"loggedin\").addEventListener(\"click\", function (event) {\r\n      event.preventDefault();\r\n      if(document.getElementById(\"filter\").style.display == \"flex\"){\r\n        clearScreen(); // If the login sceen is open close it\r\n      }else{\r\n        showLoggedIn(); // If the login screen in closed open it\r\n      }\r\n    });\r\n\r\n    // If you click on the signupsubmit do login action\r\n    document.getElementById(\"newNameSubmit\").addEventListener(\"click\", function (event) {\r\n      event.preventDefault();\r\n      newName();\r\n    });\r\n\r\n    // If you click on the loginsubmit do login action\r\n    document.getElementById(\"newPasswordSubmit\").addEventListener(\"click\", function (event) {\r\n      event.preventDefault();\r\n      newPassword();\r\n    });\r\n\r\n    // If you click on the loginsubmit do login action\r\n    document.getElementById(\"deleteButton\").addEventListener(\"click\", function (event) {\r\n      event.preventDefault();\r\n      showDelete();\r\n    });\r\n\r\n    // If you click on the loginsubmit do login action\r\n    document.getElementById(\"logout\").addEventListener(\"click\", function (event) {\r\n      event.preventDefault();\r\n      logout();\r\n    });\r\n\r\n    // If you click on the dletesubmit do delete the profile\r\n    document.getElementById(\"deleteSubmit\").addEventListener(\"click\", function (event) {\r\n      event.preventDefault();\r\n      deleteUser();\r\n    });\r\n\r\n    // if you click on the moreLikedGames fill page with specific data\r\n    document.getElementById(\"moreLikedGames\").addEventListener(\"click\", function (event) {\r\n      event.preventDefault();\r\n      onlyShow(\"Liked\", \"liked\");\r\n    });\r\n\r\n    // if you click on the moreShelvedGames fill page with specific data\r\n    document.getElementById(\"moreShelvedGames\").addEventListener(\"click\", function (event) {\r\n      event.preventDefault();\r\n      onlyShow(\"Shelved\", \"shelved\");\r\n    });\r\n  }\r\n\r\n  // ---------------------- //\r\n  // Like and shelf related //\r\n  // ---------------------- //\r\n  likeClickCheck();\r\n}\r\n\r\nasync function likeClickCheck(){\r\n  // Check for clicks in the chosen field, in this case for likes and shelf clicks\r\n  document.getElementById('likeShelfField').addEventListener('click', (event)=> {\r\n    //Keep searching for the parent node to register the correct click\r\n    const likeShelfId = event.target.className.indexOf('game');\r\n    // console.log(likeId);\r\n    // console.log(event.target.id);\r\n\r\n    if(!localStorage.getItem(\"userId\")){\r\n      showLogin()\r\n      return;\r\n    }\r\n  \r\n    if(likeShelfId){\r\n      // If the something which is clicked is has the word heart in the classname get the id and like or unlike the game\r\n      if(event.target.className.indexOf('heart') !== -1){\r\n        // Quick limited solusion while like fetch happens and the page data reloads\r\n        if(document.getElementById(event.target.id).classList.length == 4){\r\n          document.getElementById(event.target.id).classList.add(\"liked\");\r\n        }else{\r\n          document.getElementById(event.target.id).classList.remove(\"liked\");\r\n        }\r\n    \r\n        var newId = selectId(event.target.id, \"_\"); // Get the id by removing the prefixes\r\n        like(newId);\r\n      }\r\n      \r\n      // If the something which is clicked is has the word bookmark in the classname get the id and shelf or unshelf the game\r\n      if(event.target.className.indexOf('bookmark') !== -1){\r\n        // Quick limited solusion while like fetch happens and the page data reloads\r\n        if(document.getElementById(event.target.id).classList.length == 4){\r\n          document.getElementById(event.target.id).classList.add(\"shelved\");\r\n        }else{\r\n          document.getElementById(event.target.id).classList.remove(\"shelved\");\r\n        }\r\n    \r\n        var newId = selectId(event.target.id, \"_\"); // Get the id by removing the prefixes\r\n        shelf(newId);\r\n      }\r\n    }\r\n  });\r\n}\r\n\r\n// Search Function\r\nasync function searchFunction() {\r\n  var searchValue = document.getElementById(\"searchField\").value;\r\n  search = await fetchData(`https://api.boardgameatlas.com/api/search?name=${searchValue}&limit=8&descending=true&${apiKey}`);\r\n  console.log(search.games);\r\n  // A small sort\r\n  search.games.sort((a, b) => {\r\n    return a.rank-b.rank;\r\n  });\r\n  console.log(search);\r\n  if(searchValue == ''){\r\n    search = '';\r\n  }\r\n  await loadPageData();\r\n}\r\n\r\n// ------------------------------- //\r\n// For the like and shelf and fill //\r\n// ------------------------------- //\r\nasync function like(id){\r\n  await likeFunction(id);\r\n  await fetchAllLikes();\r\n  await fillLikedGames(8);\r\n  if(!onlyshow){\r\n    await loadPageData();\r\n  }\r\n}\r\n\r\nasync function shelf(id){\r\n  await shelfFunction(id);\r\n  await fetchAllShelves();\r\n  await fillShelvedGames(8);\r\n  if(!onlyshow){\r\n    await loadPageData();\r\n  }\r\n}\r\n\r\nasync function fillLikedGames(limit){\r\n  var idList = ``;\r\n  for(let i = 0; i < limit && i < likes.length; i++) {\r\n    if(idList == ''){\r\n      idList += `${likes[i].gameId}`\r\n    } else {\r\n      idList += `,${likes[i].gameId}`\r\n    }\r\n  }\r\n  if(idList != ''){\r\n    likedGames = await fetchData(`https://api.boardgameatlas.com/api/search?ids=${idList}&descending=true&${apiKey}`); // Fetch the top 8 games\r\n    // A small sort\r\n    likedGames.games.sort((a, b) => {\r\n      return a.rank-b.rank;\r\n    });\r\n  }\r\n  if(idList == ''){\r\n    likedGames = '';\r\n  }\r\n}\r\n\r\nasync function fillShelvedGames(limit){\r\n  var idList = ``;\r\n  for(let i = 0; i < limit && i < shelved.length; i++) {\r\n    if(idList == ''){\r\n      idList += `${shelved[i].gameId}`\r\n    } else {\r\n      idList += `,${shelved[i].gameId}`\r\n    }\r\n  }\r\n  if(idList != ''){\r\n    shelvedGames = await fetchData(`https://api.boardgameatlas.com/api/search?ids=${idList}&limit=8&descending=true&${apiKey}`); // Fetch the top 8 games\r\n    // A small sort\r\n    shelvedGames.games.sort((a, b) => {\r\n      return a.rank-b.rank;\r\n    });\r\n  }\r\n  if(idList == ''){\r\n    shelvedGames = '';\r\n  }\r\n}\r\n\r\n// ---------------------- //\r\n// Only load part of site //\r\n// ---------------------- //\r\nasync function onlyShow(capital, name, skip) {\r\n  onlyshow = true;\r\n  let moreButton = '';\r\n  if(name == \"top\"){\r\n    moreButton = `\r\n    <div class=\"nextPrevious\">\r\n      <a href=\"#\" id=\"previous_Top\">previous topgames</a>\r\n      <a href=\"#\" id=\"next_Top\">next topgames</a>\r\n    </div>`\r\n  }\r\n  let html = ''; // Start clean\r\n  html += `\r\n  <Div id=\"likeShelfField\">\r\n    <p class=\"title\">${capital} games</p>\r\n    <div id=\"${name}Games\"></div>\r\n    ${moreButton}\r\n  </Div>`;\r\n  document.getElementById(\"content\").innerHTML = html;\r\n  if(name == \"top\"){\r\n    topGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=24&skip=${skip * 24}&${apiKey}`); // Fetch the top 8 games\r\n    buildList(topGames.games, `${name}Games`, name);\r\n    checkTop();\r\n  } else if(name == \"liked\"){\r\n    await fetchAllLikes();\r\n    fillLikedGames(likes.length);\r\n    buildList(likedGames.games, `${name}Games`, name);\r\n  }else if(name == \"shelved\"){\r\n    await fetchAllShelves();\r\n    fillLikedGames(shelved.length);\r\n    buildList(shelvedGames.games, `${name}Games`, name);\r\n  }\r\n  likeClickCheck();\r\n}\r\n\r\nfunction checkTop(params) {\r\n  document.getElementById(\"next_Top\").addEventListener(\"click\", function (event) {\r\n    event.preventDefault();\r\n    pageOfOnlyShow++;\r\n    console.log(pageOfOnlyShow)\r\n    onlyTop(pageOfOnlyShow);\r\n  });\r\n\r\n  document.getElementById(\"previous_Top\").addEventListener(\"click\", function (event) {\r\n    event.preventDefault();\r\n    if(pageOfOnlyShow >= 1){\r\n      pageOfOnlyShow--;\r\n    }\r\n    console.log(pageOfOnlyShow)\r\n    onlyTop(pageOfOnlyShow);\r\n  });\r\n}\r\n\r\nasync function onlyTop(skip) {\r\n  topGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=24&skip=${skip * 24}&${apiKey}`); // Fetch the top 8 games\r\n  await buildList(topGames.games, 'topGames', 'top');\r\n}\n\n//# sourceURL=webpack://web2-frontend-ehbsacha/./src/index.js?");

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