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
var popularGames = []; // Array for popular games

// ------------ //
// On page load //
// ------------ //
window.onload = async function(){ // On page load starts with all these items

  // ------------------------ //
  // logged in related navbar //
  // ------------------------ //

  console.log(localStorage.getItem("userId"));
  // Setup navbar (loggedin or not)
  if(localStorage.getItem("userId")){
    document.getElementById("login").style.display = "none";
    document.getElementById("loggedin").style.display = "flex";
  }

  // --------------------------- //
  // Setup games fetch and place //
  // --------------------------- //
  
  // fetch top games
  topGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=12&ascending=false&${apiKey}`); // Fetch the top 8 games
  buildList(topGames.games, 'topGames', "top"); // Place the games on the page

  // fetch popular games
  popularGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=7&adescending=false&${apiKey}`); // Fetch the top 8 reddit mentioned games
  buildList(popularGames.games, 'popularGames', "popular"); // Place the games on the page

  // Set correct images as background
  selectBackground(topGames.games[1], "bannerTopGames"); // Topgames background
  selectBackground(popularGames.games[2], "bannerPopularGames"); // Populargames backgound


  // ----------------------- //
  // After the setup is done //
  // ----------------------- //

  // After initialising open eventlistners
  checkElements(); // activate eventListners
};

// ----------------------- //
// Reusable fetch function //
// ----------------------- //
async function fetchData(someUrl, method){ // Fetch the required data
  return await fetch(someUrl, method) // Return the value after fetch is done
      .then(response => response.json()); // Make the returned readable
}

// ----------------------------- //
// Reusable site build functions //
// ----------------------------- //
function buildList(games, htmlId, partOfSite){ // Build the list of games to put in the html and make them visible
  //Change the innerHTML of the page
  let html = ''; // Start clean
  //Make a for loop to pass all the games who are needed to be displayed
  for(let game of games){ // Iterate over the sended array
      var newString = deString(game.handle, "-"); // Do deString function. At funtion itself more information
      html += `
      <div class="game" value="${game.id}">
        <div class="name"><p>${newString}</p></div>
        <div class="data">
          <p class="rating">${game.rank}</p>
          <div class="buttons">
            <button class="wishlist"><i class="fas fa-heart fa-2x" id="${partOfSite}-like-${game.id}"></i></button>
            <button class="shelf"><i class="fas fa-bookmark fa-2x" id="${partOfSite}-shelf-${game.id}"></i></button>
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
  document.getElementById(id).style.backgroundImage = `url('${game.image_url}')`;
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

// -------------- //
// Event listners //
// -------------- //
async function checkElements() { // After initialising open eventlistners
  
  // if you click on the white background the login and signup forms close
  document.getElementById("filter").addEventListener("click", function (event) {
    event.preventDefault();
    clearScreen();
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
  }

  // ---------------------- //
  // Like and shelf related //
  // ---------------------- //

  // Check for clicks in the chosen field, in this case for likes and shelf clicks
  document.getElementById('topGames').addEventListener('click', (event)=> {
    //Keep searching for the parent node to register the correct click
    const likeId = event.target.className.indexOf('game');
    // console.log(likeId);
    // console.log(event.target.id);
  
    if(likeId){
      // If the something which is clicked is has the word heart in the classname get the id and like or unlike the game
      if(event.target.className.indexOf('heart') !== -1){
        var newid = selectId(event.target.id, "-"); // Get the id by removing the prefixes
        console.log('like', newid);
      }
      
      // If the something which is clicked is has the word bookmark in the classname get the id and shelf or unshelf the game
      if(event.target.className.indexOf('bookmark') !== -1){
        var newid = selectId(event.target.id, "-"); // Get the id by removing the prefixes
        console.log('bookmark', newid);
      }
    }
  });
}