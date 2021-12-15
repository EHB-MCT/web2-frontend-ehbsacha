'use strict';

const apiKey = "client_id=5UGynejyAW";
var topGames = [];
var popularGames = [];

window.onload = async function(){
    topGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=12&ascending=false&${apiKey}`); // Fetch the top 8 games
    buildList(topGames.games, 'topGames');
    console.log(topGames);
    popularGames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=7&ascending=false&${apiKey}`); // Fetch the top 8 reddit mentioned games
    buildList(popularGames.games, 'popularGames');

    selectBackground(topGames.games[0], "bannerTopGames");
    selectBackground(popularGames.games[0], "bannerPopularGames");
}

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
      <div class="game">
        <div class="name"><p>${newString}</p></div>
        <div class="data">
          <p class="rating">${game.rank}</p>
          <div class="buttons">
            <button class="wishlist"><i class="fas fa-heart fa-2x" id=fav_${game.id}></i></button>
            <button class="shelf"><i class="fas fa-bookmark fa-2x"></i></button>
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

function selectBackground(game,id) {
  console.log(game);
  document.getElementById(id).style.backgroundImage = "url"+(game.image_url);
}

function deString(string, separator){
  //we split the string and make it free of separator
  const separatedArray = string.split(separator);
  //we join the separatedArray with empty string
  const separatedString = separatedArray.join(" ");
  return separatedString;
}