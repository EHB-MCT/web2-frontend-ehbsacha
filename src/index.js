'use strict';

// --------------------- //
// The express api I use //
// --------------------- //
const heroku = "https://web2-gameheaven-ehbsacha.herokuapp.com/";
const localhost = "http://localhost:3000/";
var link = heroku;

// --------- //
// Variables //
// --------- //
const apiKey = "client_id=5UGynejyAW"; //apiKey
var topGames = []; // Array for topGames
var randomGames = []; // Array for random games
var likedGames = []; // Array for liked games
var shelvedGames = []; // Array for shelved games
var search = []; // Array for search data

var likes = []; // Array for the liked game Ids
var shelved = []; // Array for the shelved game Ids

var pageOfOnlyShow = 0; // The page you are on if you are vititing a specific place
var onlyshow = false;

// ------------ //
// On page load //
// ------------ //
window.onload = async function(){ // On page load starts with all these items

  // ------------------------ //
  // logged in related navbar //
  // ------------------------ //
  if(localStorage.getItem("userId")){ // Setup navbar (loggedin or not)
    document.getElementById("login").style.display = "none";
    document.getElementById("loggedin").style.display = "flex";
    await fetchAllLikes();
    await fetchAllShelves();
    await fillLikedGames(8);
    await fillShelvedGames(8);
  }

  // ----------------- //
  // Setup games fetch //
  // ----------------- //
  // fetch top games
  topGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=8&${apiKey}`); // Fetch the top 8 games
  // fetch 8 random games
  randomGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&skip=${Math.floor(Math.random()*1000)}&limit=8&${apiKey}`); // Fetch 8 random games

  // ----------------- //
  // Load the gamedata //
  // ----------------- //
  await changeContent();
  await loadPageData();

  // ----------------------- //
  // After the setup is done //
  // ----------------------- //
  checkElements(); // activate eventListners
};

// ----------------------- //
// Reusable fetch function //
// ----------------------- //
async function fetchData(someUrl, method){ // Fetch the required data
  return await fetch(someUrl, method) // Return the value after fetch is done
      .then(response => response.json()); // Make the returned readable
}

// ------------------------- //
// Page load/reload function //
// ------------------------- //
async function loadPageData(){
  await buildList(topGames.games, 'topGames', "top"); // Place the games on the page
  await buildList(randomGames.games, 'randomGames', "random"); // Place the games on the page
  // Set correct images as background
  await selectBackground(topGames.games[Math.floor(Math.random() * 8)], "bannerTopGames"); // Topgames background
  if(localStorage.getItem("userId")){
    //set correct games
    if(likedGames != ''){
      await selectBackground(randomGames[Math.floor(Math.random() * 8)], "bannerRandomGames"); // Randomgames backgound
      await buildList(likedGames.games, 'likedGames', "liked"); // Place the games on the page
      document.getElementById("showLiked").style.display = 'flex';
    }else{
      document.getElementById("showLiked").style.display = 'none';
    }
    if(shelvedGames != ''){
      await buildList(shelvedGames.games, 'shelvedGames', "shelved"); // Place the games on the page
      await selectBackground(likedGames.games[Math.floor(Math.random() * 8)], "bannerLikedGames"); // Topgames background
      document.getElementById("showShelved").style.display = 'flex';
    }else{
      document.getElementById("showShelved").style.display = 'none';
    }
  }
  if(search != ''){
    await buildList(search.games, 'searchedGames', "searched"); // Place the games on the page
    await selectBackground(search.games[Math.floor(Math.random() * 8)], "bannerSearchedGames"); // Topgames background
    document.getElementById("showSearched").style.display = 'flex';
  }else{
    document.getElementById("showSearched").style.display = 'none';
  }
  document.getElementById("loading").style.display = "none";
}

async function changeContent(){
  //Change the innerHTML of the page
  let html = ''; // Start clean
  if(!localStorage.getItem("userId")){
    html += `
    <Div id="likeShelfField">
      <div class="showSearched" id="showSearched">
        <p class="title">Searched games</p>
        <div id="searchedGames"></div>
        <div class="banner" id="bannerSearchedGames"></div>
      </div>
      <p class="title">Top games</p>
      <div id="topGames"></div>
      <div class="moreButton"><a href="#" id="moreTopGames">more topgames</a></div>
      <div class="banner" id="bannerTopGames"></div>
      <p class="title">Random games</p>
      <div id="randomGames"></div>
      <div class="banner" id="bannerRandomGames"></div>
    </Div>`;
  }else{
    html += `
    <Div id="likeShelfField">
      <div class="showSearched" id="showSearched">
        <p class="title">Searched games</p>
        <div id="searchedGames"></div>
        <div class="banner" id="bannerSearchedGames"></div>
      </div>
      <p class="title">Top games</p>
      <div id="topGames"></div>
      <div class="moreButton"><a href="#" id="moreTopGames">more topgames</a></div>
      <div class="banner" id="bannerTopGames"></div>
      <p class="title">Random games</p>
      <div id="randomGames"></div>
      <div class="showLiked" id="showLiked">
        <div class="banner" id="bannerRandomGames"></div>
        <p class="title">Liked games</p>
        <div id="likedGames"></div>
        <div class="moreButton"><a href="#" id="moreLikedGames">more likedgames</a></div>
      </div>
      <div class="showShelved" id="showShelved">
        <div class="banner" id="bannerLikedGames"></div>
        <p class="title">Shelved games</p>
        <div id="shelvedGames"></div>
        <div class="moreButton"><a href="#" id="moreShelvedGames">more shelvedgames</a></div>
      </div>
    </Div>`;
  }
  document.getElementById("content").innerHTML = html; // Put the builded games list into the right place in html with the corensponding id
}
// More random games button: <div class="moreButton"><a href="#" id="moreRandomGames">more randomgames</a></div>

// ----------------------------- //
// Reusable site build functions //
// ----------------------------- //
function buildList(games, htmlId, partOfSite){ // Build the list of games to put in the html and make them visible
  //Change the innerHTML of the page
  let html = ''; // Start clean
  //Make a for loop to pass all the games who are needed to be displayed
  for(let game of games){ // Iterate over the sended array
    var likeClass = '';
    var shelfClass = '';
    likes.forEach((like) => {
      if(like.gameId == game.id){
        likeClass = "liked";
      }
    });
    shelved.forEach((shelf) => {
      if(shelf.gameId == game.id){
        shelfClass = "shelved";
      }
    });
    var newString = deString(game.handle, "-"); // Do deString function. At funtion itself more information
    html += `
    <div class="game" value="${game.id}">
      <div class="name"><p>${newString}</p></div>
      <div class="data">
        <p class="rating">${game.rank}</p>
        <div class="buttons">
          <button class="wishlist"><i class="fas fa-heart fa-2x like_${game.id} ${likeClass}" id="${partOfSite}_like_${game.id}"></i></button>
          <button class="shelf"><i class="fas fa-bookmark fa-2x shelf_${game.id} ${shelfClass}" id="${partOfSite}_shelf_${game.id}"></i></button>
        </div>
        <img src="${game.image_url}" alt="Scythe">
        <div class="bottomBar">
          <p class="players">${game.min_players}-${game.max_players} <i class="fas fa-users"></i></p>
          <p class="duration">${game.min_playtime}-${game.max_playtime} <i class="fas fa-clock"></i></p>
          <p class="age">${game.min_age}+</p>
        </div>
      </div>
    </div>`;
    // The html for each game
  }
  document.getElementById(htmlId).innerHTML = html; // Put the builded games list into the right place in html with the corensponding id
}

function selectBackground(game,id) { // Change background img to the first boardgame of this place on the site
  try{
    document.getElementById(id).style.backgroundImage = `url('${game.image_url}')`;
  }catch(err){
    console.log(err);
    // Fallback background, if there is an error use this background
    document.getElementById(id).style.backgroundImage = `url('${topGames.games[1].image_url}')`;
  }finally{
    return;
  }
}

// ------------------- //
// seperator functions //
// ------------------- //
function deString(string, separator){ // A function to remove the seperator and afterwards 
  const separatedArray = string.split(separator);// We split the string and make it free of separator
  const separatedString = separatedArray.join(" "); // We join the separatedArray with one space string
  return separatedString; // Return the value
}

function selectId(string, separator) { // the difference with the one above is that thisone selects the last part instead of joining them together
  const separatedArray = string.split(separator); // We split the string and make it free of separator
  const finalId = separatedArray[separatedArray.length - 1]; // Select the last part or the seperated array
  return finalId; // Return the value
}

// ------------------- //
// Show and hide items //
// ------------------- //
function showLogin() { // If loginbutton in the navbar gets clicked opens the login screen
  document.getElementById("filter").style.display = "flex";
  document.getElementById("loginScreen").style.display = "flex";
}

function showLoggedIn() { // If account in the navbar gets clicked opens the change user data screen
  document.getElementById("filter").style.display = "flex";
  document.getElementById("loggedinScreen").style.display = "flex";
}

function showDelete() { // If account in the navbar gets clicked opens the change user data screen
  document.getElementById("deleteScreen").style.display = "flex";
  document.getElementById("loggedinScreen").style.display = "none";
}

function clearScreen(){ // Hides everything unnecessary
  document.getElementById("filter").style.display = "none";
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("loggedinScreen").style.display = "none";
  document.getElementById("deleteScreen").style.display = "none";
}

function delay(n){
  return new Promise(function(resolve){
      console.log("timeout");
      setTimeout(resolve,n*1000);
  });
}

// -------------------------- //
// Login and signup functions //
// -------------------------- //
async function login() { // Login function gets called when clicking login and does a fetchcall to verify. If succes login else a error message
  try{ // Try to fetch
    // I have skipped the varables for privacy reasons
    var url = `${link}user?name=${document.getElementById("loginName").value}&password=${document.getElementById("loginPassword").value}`;
    const loggedIn = await fetchData(url,{method: 'GET'}); // Do the fetch and store return in loggedIn
    console.log(loggedIn[0]);
    saveId(loggedIn); // If already gotten to here login is succesfull and your id gets saved local
  }catch(err){ 
    document.getElementById("loginError").style.display = "flex"; // If you typed something wrong throw error
  }
}

async function signup() { // Signup happens If name is not taken, then use same data to login
  try{ // Try to fetch
    var signupUrl = `${link}user`;
    const prepared = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${document.getElementById("signupName").value}`,
        password: `${document.getElementById("signupPassword").value}`,
        email: `${document.getElementById("signupEmail").value}`
      })};
    const created = await fetchData(signupUrl, prepared);
    console.log(created);
    saveId(created);
  }catch(err){
    document.getElementById("signupError").style.display = "flex"; // If you typed something wrong throw error
  }
}

async function newName() {
  try{ // Try to fetch
    var signupUrl = `${link}user/name`;
    const prepared = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${document.getElementById("changeNameName").value}`,
        password: `${document.getElementById("changeNamePassword").value}`,
        newName: `${document.getElementById("newName").value}`,
        _id: localStorage.getItem("userId")
      })};
    await fetchData(signupUrl, prepared)
      .then(console.log("succes"))
      .then(await delay(2))
      .then(window.location.reload(true));
  }catch(err){
    console.log(err);
    document.getElementById("newNameError").style.display = "flex"; // If you typed something wrong throw error
  }
}

async function newPassword() {
  try{ // Try to fetch
    var signupUrl = `${link}user/password`;
    const prepared = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${document.getElementById("changePasswordName").value}`,
        password: `${document.getElementById("changePasswordPassword").value}`,
        newPassword: `${document.getElementById("newPassword").value}`,
        _id: localStorage.getItem("userId")
      })};
    await fetchData(signupUrl, prepared)
      .then(console.log("succes"))
      .then(await delay(2))
      .then(window.location.reload(true));
  }catch(err){
    console.log(err);
    document.getElementById("newPasswordError").style.display = "flex"; // If you typed something wrong throw error
  }
}

async function logout() { // Logout
  await localStorage.clear();
  window.location.reload(true);
}

async function deleteUser() { // Delete user
  try{ // Try to fetch
    var signupUrl = `${link}user`;
    const prepared = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${document.getElementById("deleteName").value}`,
        password: `${document.getElementById("deletePassword").value}`,
        _id: localStorage.getItem("userId")
      })};
    await fetchData(signupUrl, prepared);
  }catch(err){
    await localStorage.clear();
    window.location.reload(true);
  }
}

function saveId(userData){ // If login or signup is succes save id in local token
  localStorage.setItem("userId", userData[0]._id); // Save the userId so it counts as loggedIn
  window.location.reload(true);
}

// -------------------- //
// Like and shelf Items //
// -------------------- //
async function likeFunction(gameId){
  try{ // Try to fetch
    var checkUrl = `${link}game?userId=${localStorage.getItem("userId")}&gameId=${gameId}`;
    const exists = await fetchData(checkUrl,{method: 'GET'});
    if(exists.length == 0){
      try{ // Try to fetch
        var postUrl = `${link}like?userId=${localStorage.getItem("userId")}&gameId=${gameId}`;
        const created = await fetchData(postUrl,{method: 'POST'});
      }finally{
        return;
      }
    }else{
      try{ // Try to fetch
        var postUrl = `${link}like?userId=${localStorage.getItem("userId")}&gameId=${gameId}`;
        const updated = await fetchData(postUrl,{method: 'PUT'});
      }finally{
        return;
      }
    }
  }catch(err){
    console.log(err);
  }
}

async function shelfFunction(gameId){
  try{ // Try to fetch
    var checkUrl = `${link}game?userId=${localStorage.getItem("userId")}&gameId=${gameId}`;
    const exists = await fetchData(checkUrl,{method: 'GET'});
    if(exists.length == 0){
      try{ // Try to fetch
        var postUrl = `${link}shelf?userId=${localStorage.getItem("userId")}&gameId=${gameId}`;
        const created = await fetchData(postUrl,{method: 'POST'});
      }finally{
        return;
      }
    }else{
      try{ // Try to fetch
        var postUrl = `${link}shelf?userId=${localStorage.getItem("userId")}&gameId=${gameId}`;
        const updated = await fetchData(postUrl,{method: 'PUT'});
      }finally{
        return;
      }
    }
  }catch(err){
    console.log(err);
  }
}

async function fetchAllLikes(){
  try{ // Try to fetch
    var checkUrl = `${link}likes?userId=${localStorage.getItem("userId")}`;
    likes = await fetchData(checkUrl,{method: 'GET'});
    if(likes == ''){
      console.log("empty");
    }
  }catch(err){
    console.log(err);
  }
}

async function fetchAllShelves(){
  try{ // Try to fetch
    var checkUrl = `${link}shelved?userId=${localStorage.getItem("userId")}`;
    shelved = await fetchData(checkUrl,{method: 'GET'});
    if(shelved == ''){
      console.log("empty");
    }
  }catch(err){
    console.log(err);
  }
}

// -------------- //
// Event listners //
// -------------- //
async function checkElements() { // After initialising open eventlistners
  
  // if you click on the white background the login and signup forms close
  document.getElementById("filter").addEventListener("click", function (event) {
    event.preventDefault();
    clearScreen();
  });

  // if you click on the searchbutton a fetch happens
  document.getElementById("searchSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    searchFunction();
  });

  // if you click on the moreTopGames fill page with specific data
  document.getElementById("moreTopGames").addEventListener("click", function (event) {
    event.preventDefault();
    onlyShow("Top","top");
  });

  // --------------- //
  // Account related //
  // --------------- //

  // Only listen to these buttons if no local token is saved
  if(!localStorage.getItem("userId")){ // Not logged in
    // Login and signup
    // If you click on login button in the navigation, show or hide the forms no login of signup
    document.getElementById("login").addEventListener("click", function (event) {
      event.preventDefault();
      if(document.getElementById("filter").style.display == "flex"){
        clearScreen(); // If the login sceen is open close it
      }else{
        showLogin(); // If the login screen in closed open it
      }
    });

    // If you click on the loginsubmit do login action
    document.getElementById("loginSubmit").addEventListener("click", function (event) {
      event.preventDefault();
      login();
    });
    
    // If you click on the signupsubmit do login action
    document.getElementById("signupSubmit").addEventListener("click", function (event) {
      event.preventDefault();
      signup();
    });
  }
  // Only listen to these buttons if local token is saved
  if(localStorage.getItem("userId")){ // Logged in
    // If you click on account button in the navigation, show or hide the forms to change password or name
    document.getElementById("loggedin").addEventListener("click", function (event) {
      event.preventDefault();
      if(document.getElementById("filter").style.display == "flex"){
        clearScreen(); // If the login sceen is open close it
      }else{
        showLoggedIn(); // If the login screen in closed open it
      }
    });

    // If you click on the signupsubmit do login action
    document.getElementById("newNameSubmit").addEventListener("click", function (event) {
      event.preventDefault();
      newName();
    });

    // If you click on the loginsubmit do login action
    document.getElementById("newPasswordSubmit").addEventListener("click", function (event) {
      event.preventDefault();
      newPassword();
    });

    // If you click on the loginsubmit do login action
    document.getElementById("deleteButton").addEventListener("click", function (event) {
      event.preventDefault();
      showDelete();
    });

    // If you click on the loginsubmit do login action
    document.getElementById("logout").addEventListener("click", function (event) {
      event.preventDefault();
      logout();
    });

    // If you click on the dletesubmit do delete the profile
    document.getElementById("deleteSubmit").addEventListener("click", function (event) {
      event.preventDefault();
      deleteUser();
    });

    // if you click on the moreLikedGames fill page with specific data
    document.getElementById("moreLikedGames").addEventListener("click", function (event) {
      event.preventDefault();
      onlyShow("Liked", "liked");
    });

    // if you click on the moreShelvedGames fill page with specific data
    document.getElementById("moreShelvedGames").addEventListener("click", function (event) {
      event.preventDefault();
      onlyShow("Shelved", "shelved");
    });
  }

  // ---------------------- //
  // Like and shelf related //
  // ---------------------- //
  likeClickCheck();
}

async function likeClickCheck(){
  // Check for clicks in the chosen field, in this case for likes and shelf clicks
  document.getElementById('likeShelfField').addEventListener('click', (event)=> {
    //Keep searching for the parent node to register the correct click
    const likeShelfId = event.target.className.indexOf('game');
    // console.log(likeId);
    // console.log(event.target.id);

    if(!localStorage.getItem("userId")){
      showLogin()
      return;
    }
  
    if(likeShelfId){
      // If the something which is clicked is has the word heart in the classname get the id and like or unlike the game
      if(event.target.className.indexOf('heart') !== -1){
        // Quick limited solusion while like fetch happens and the page data reloads
        if(document.getElementById(event.target.id).classList.length == 4){
          document.getElementById(event.target.id).classList.add("liked");
        }else{
          document.getElementById(event.target.id).classList.remove("liked");
        }
    
        var newId = selectId(event.target.id, "_"); // Get the id by removing the prefixes
        like(newId);
      }
      
      // If the something which is clicked is has the word bookmark in the classname get the id and shelf or unshelf the game
      if(event.target.className.indexOf('bookmark') !== -1){
        // Quick limited solusion while like fetch happens and the page data reloads
        if(document.getElementById(event.target.id).classList.length == 4){
          document.getElementById(event.target.id).classList.add("shelved");
        }else{
          document.getElementById(event.target.id).classList.remove("shelved");
        }
    
        var newId = selectId(event.target.id, "_"); // Get the id by removing the prefixes
        shelf(newId);
      }
    }
  });
}

// Search Function
async function searchFunction() {
  var searchValue = document.getElementById("searchField").value;
  search = await fetchData(`https://api.boardgameatlas.com/api/search?name=${searchValue}&limit=8&descending=true&${apiKey}`);
  console.log(search.games);
  // A small sort
  search.games.sort((a, b) => {
    return a.rank-b.rank;
  });
  console.log(search);
  if(searchValue == ''){
    search = '';
  }
  await loadPageData();
}

// ------------------------------- //
// For the like and shelf and fill //
// ------------------------------- //
async function like(id){
  await likeFunction(id);
  await fetchAllLikes();
  await fillLikedGames(8);
  if(!onlyshow){
    await loadPageData();
  }
}

async function shelf(id){
  await shelfFunction(id);
  await fetchAllShelves();
  await fillShelvedGames(8);
  if(!onlyshow){
    await loadPageData();
  }
}

async function fillLikedGames(limit){
  var idList = ``;
  for(let i = 0; i < limit && i < likes.length; i++) {
    if(idList == ''){
      idList += `${likes[i].gameId}`
    } else {
      idList += `,${likes[i].gameId}`
    }
  }
  if(idList != ''){
    likedGames = await fetchData(`https://api.boardgameatlas.com/api/search?ids=${idList}&descending=true&${apiKey}`); // Fetch the top 8 games
    // A small sort
    likedGames.games.sort((a, b) => {
      return a.rank-b.rank;
    });
  }
  if(idList == ''){
    likedGames = '';
  }
}

async function fillShelvedGames(limit){
  var idList = ``;
  for(let i = 0; i < limit && i < shelved.length; i++) {
    if(idList == ''){
      idList += `${shelved[i].gameId}`
    } else {
      idList += `,${shelved[i].gameId}`
    }
  }
  if(idList != ''){
    shelvedGames = await fetchData(`https://api.boardgameatlas.com/api/search?ids=${idList}&limit=8&descending=true&${apiKey}`); // Fetch the top 8 games
    // A small sort
    shelvedGames.games.sort((a, b) => {
      return a.rank-b.rank;
    });
  }
  if(idList == ''){
    shelvedGames = '';
  }
}

// ---------------------- //
// Only load part of site //
// ---------------------- //
async function onlyShow(capital, name, skip) {
  onlyshow = true;
  let moreButton = '';
  if(name == "top"){
    moreButton = `
    <div class="nextPrevious">
      <a href="#" id="previous_Top">previous topgames</a>
      <a href="#" id="next_Top">next topgames</a>
    </div>`
  }
  let html = ''; // Start clean
  html += `
  <Div id="likeShelfField">
    <p class="title">${capital} games</p>
    <div id="${name}Games"></div>
    ${moreButton}
  </Div>`;
  document.getElementById("content").innerHTML = html;
  if(name == "top"){
    topGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=24&skip=${skip * 24}&${apiKey}`); // Fetch the top 8 games
    buildList(topGames.games, `${name}Games`, name);
    checkTop();
  } else if(name == "liked"){
    await fetchAllLikes();
    fillLikedGames(likes.length);
    buildList(likedGames.games, `${name}Games`, name);
  }else if(name == "shelved"){
    await fetchAllShelves();
    fillLikedGames(shelved.length);
    buildList(shelvedGames.games, `${name}Games`, name);
  }
  likeClickCheck();
}

function checkTop(params) {
  document.getElementById("next_Top").addEventListener("click", function (event) {
    event.preventDefault();
    pageOfOnlyShow++;
    console.log(pageOfOnlyShow)
    onlyTop(pageOfOnlyShow);
  });

  document.getElementById("previous_Top").addEventListener("click", function (event) {
    event.preventDefault();
    if(pageOfOnlyShow >= 1){
      pageOfOnlyShow--;
    }
    console.log(pageOfOnlyShow)
    onlyTop(pageOfOnlyShow);
  });
}

async function onlyTop(skip) {
  topGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=24&skip=${skip * 24}&${apiKey}`); // Fetch the top 8 games
  await buildList(topGames.games, 'topGames', 'top');
}