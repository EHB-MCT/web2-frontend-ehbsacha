'use strict';

const apiKey = "client_id=5UGynejyAW";
var topGames = [];
var popularGames = [];

window.onload = async function(){
  // fetch top games
  topGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=12&ascending=false&${apiKey}`); // Fetch the top 8 games
  buildList(topGames.games, 'topGames'); // Place the games on the page

  // fetch popular games
  popularGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=7&adescending=false&${apiKey}`); // Fetch the top 8 reddit mentioned games
  buildList(popularGames.games, 'popularGames'); // Place the games on the page

  // Set correct images as background
  selectBackground(topGames.games[1], "bannerTopGames"); // Topgames background
  selectBackground(popularGames.games[2], "bannerPopularGames"); // Populargames backgound

  // After initialising open eventlistners
  checkElements();
};

async function fetchData(someUrl){
  return await fetch(someUrl)
      .then(response => response.json());
}

function buildList(games, htmlId){
  // Order the list, now its ordered on the user rating
  // games.sort(function(a,b) {
  //     return b.average_user_rating - a.average_user_rating;
  // });

  //Change the innerHTML of the page
  let html = '';
  //Make a for loop to pass all the games who are needed to be displayed
  for(let game of games){
      var newString = deString(game.handle, "-");
      html += `
      <div class="game" value="${game.id}">
        <div class="name"><p>${newString}</p></div>
        <div class="data">
          <p class="rating">${game.rank}</p>
          <div class="buttons">
            <button class="wishlist"><i class="fas fa-heart fa-2x" id="top_like_${game.id}"></i></button>
            <button class="shelf"><i class="fas fa-bookmark fa-2x" id="top_shelf_${game.id}"></i></button>
          </div>
          <img src="${game.image_url}" alt="Scythe">
          <div class="bottomBar">
            <p class="players">${game.min_players}-${game.max_players} <i class="fas fa-users"></i></p>
            <p class="duration">${game.min_playtime}-${game.max_playtime} <i class="fas fa-clock"></i></p>
            <p class="age">${game.min_age}+</p>
          </div>
        </div>
      </div>`;

    // The calculation to round to the right numbers
    // ${Math.round(game.average_learning_complexity * 100) / 100}

  }
  document.getElementById(htmlId).innerHTML = html;
}

// Change background img to the first boardgame of this place on the site
function selectBackground(game,id) {
  console.log(game.image_url);
  document.getElementById(id).style.backgroundImage = `url('${game.image_url}')`;
}

function checkElements() {
  // If you click on login button in the navigation show or hide the forms
  document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault();
    if(document.getElementById("filter").style.display == "flex"){
      clearScreen();
    }else{
      showLogin();
    }
  });

  document.getElementById("filter").addEventListener("click", function (event) {
    event.preventDefault();
    clearScreen();
  });

  document.getElementById('topGames').addEventListener('click', (event)=> {
    //Keep searching for the parent node to register the correct click
    const likeId = event.target.className.indexOf('game');
    // console.log(likeId);
    // console.log(event.target.id);
  
    if(likeId){
      if(event.target.className.indexOf('heart') !== -1){
        var newid = selectId(event.target.id, "_");
        console.log('like', newid);

      }
      
      if(event.target.className.indexOf('bookmark') !== -1){
        var newid = selectId(event.target.id, "_");
        console.log('bookmark', newid);

      }

    }
  });
}

function deString(string, separator){
  //we split the string and make it free of separator
  const separatedArray = string.split(separator);
  //we join the separatedArray with empty string
  const separatedString = separatedArray.join(" ");
  return separatedString;
}

function selectId(string, separator) {
  //we split the string and make it free of separator
  const separatedArray = string.split(separator);
  //we join the separatedArray with empty string
  const finalId = separatedArray[separatedArray.length - 1];
  return finalId;
}

function showLogin() {
  document.getElementById("filter").style.display = "flex";
  document.getElementById("loginScreen").style.display = "flex";
}

function clearScreen(){
  document.getElementById("filter").style.display = "none";
  document.getElementById("loginScreen").style.display = "none";
}