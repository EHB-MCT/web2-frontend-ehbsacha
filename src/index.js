'use strict';

const apiKey = "client_id=5UGynejyAW";
var topgames = [];

window.onload = async function(){
    topgames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=8&ascending=false&${apiKey}`);
    // populargames = await fetchData(`https://api.boardgameatlas.com/api/search?order_by=rank&limit=8&ascending=false&${apiKey}`); Already for popular
    console.log(topgames.games);
    buildList();
}

async function fetchData(someUrl){
  return await fetch(someUrl)
      .then(response => response.json());
}

function buildList(){
  // Order the list, now its ordered on the user rating
  // games.sort(function(a,b) {
  //     return b.average_user_rating - a.average_user_rating;
  // });

  //Change the innerHTML of the page
  let html = '';
  //Make a for loop to pass all the games who are needed to be displayed
  for(let game of topgames.games){
      var newString = deString(game.handle, "-");
      html += `
      <div class="game">
        <div class="name"><p>${newString}</p></div>
        <div class="data">
          <p class="rating">${game.rank}</p>
          <div class="buttons">
            <button class="wishlist"><i class="fas fa-heart fa-2x"></i></button>
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
  document.getElementById('games').innerHTML = html;
  document.getElementById('games2').innerHTML = html;
}

function deString(string, separator){
  //we split the string and make it free of separator
  const separatedArray = string.split(separator);
  //we join the separatedArray with empty string
  const separatedString = separatedArray.join(" ");
  return separatedString;
}