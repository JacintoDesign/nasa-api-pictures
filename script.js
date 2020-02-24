const favoritesContainer = document.getElementById('favorites');
const resultsContainer = document.getElementById('results');
const favoritesNav = document.getElementById('favoritesNav');
const saveConfirm = document.getElementById('saveConfirm');

// Initialize two empty arrays
let resultsArray = [];
let favoritesArray = [];
// Hide Favorites Navigation
favoritesNav.classList.add('display-none');

// Get 10 images from NASA API
function getNasaPictures() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=hHt592uvYa5AKdj9zIGFy4UoOLvHCVQsJh2xmRdL&count=10')
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        resultsArray = data; 
        updateResultsDOM();
    });
}

// Get 3 additional images from NASA API
function getMorePictures() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=hHt592uvYa5AKdj9zIGFy4UoOLvHCVQsJh2xmRdL&count=3')
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        for (let j = 0; j < data.length; j++) {
            let additionalResult = data[j];
            // console.log(additionalResult);
            resultsArray.push(additionalResult);
        }
        updateResultsDOM();
    });
}

// Create individual result elements, adds elements when getting more pictures
function updateResultsDOM() {
    console.log("Results Array:", resultsArray);
    let i;
    for (i = 0; i < resultsArray.length; i++) {
        resultsArray[i].copyright
        if (resultsArray[i].copyright == undefined) {
            resultsArray[i].copyright = "";
            //console.log(resultsArray[i].copyright);
        }
    }
    resultsContainer.innerHTML += resultsArray.map(
        result => `
        <div class="card">
            <a href="${result.hdurl}" title="View Full Image" target="blank" rel="noopener noreferrer">
            <img class="card-img-top" src="${result.url}" alt="NASA Picture of the Day">
            </a>      
            <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
            <p class="save-text" onclick="saveFavorite('${result.url}')" id="favoriteLabel">Add To Favorites</p>
            <p class="card-text">${result.explanation}</p>
            <p class="card-text"><small class="text-muted">
                <strong>${result.date}</strong>
                <span>${result.copyright}</span>
            </small></p>
            </div>
        </div>
        `  
      ).join('');
}

// Creates elements for favorite items in array
function updateFavoritesDOM() {
    console.log("Favorites Array:", favoritesArray);
    let i;
    for (i = 0; i < favoritesArray.length; i++) {
        favoritesArray[i].copyright
        if (favoritesArray[i].copyright == undefined) {
            favoritesArray[i].copyright = "";
            //console.log(favoritesArray[i].copyright);
        }
    }

    favoritesContainer.innerHTML = favoritesArray.map(
        result => `
        <div class="card">
            <a href="${result.hdurl}" title="View Full Image" target="blank" rel="noopener noreferrer">
            <img class="card-img-top" src="${result.url}" alt="NASA Picture of the Day">
            </a>      
            <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
            <p class="save-text" onclick="removeFavorite('${result.url}')">Remove Favorite</p>
            <p class="card-text">${result.explanation}</p>
            <p class="card-text"><small class="text-muted">
                <strong>${result.date}</strong>
                <span>${result.copyright}</span>
            </small></p>
            </div>
        </div>
        `  
      ).join('');
}

// Add result to Favorites Array
function saveFavorite(result) {
    for (i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i].url.includes(result)) {
            let resultMatch = resultsArray[i];
            //console.log(resultMatch);
            favoritesArray.push(resultMatch);
            console.log("Favorites Array:", favoritesArray);
            // Show Save Confirmation for 2 seconds
            saveConfirm.classList.add('display-block');
            saveConfirm.classList.remove('display-none');
            setTimeout(() => {
                saveConfirm.classList.remove('display-block');
                saveConfirm.classList.add('display-none');
            }, 2000);
        }
    }
}

// Remove result from Favorites Array
function removeFavorite(result) {
    for (i = 0; i < favoritesArray.length; i++) {
        if (favoritesArray[i].url.includes(result)) {
            let favoriteMatch = favoritesArray[i];
            //console.log(favoriteMatch);
            favoritesArray.pop(favoriteMatch);
            console.log("Favorites Array:", favoritesArray);
        }
    }
    updateFavoritesDOM();
}

// Show Favorites DOM Elements / Hide Results DOM Elements
function showFavorites() {
    favoritesContainer.classList.add('display-block');
    favoritesContainer.classList.remove('display-none');
    resultsContainer.classList.add('display-none');
    resultsContainer.classList.remove('display-block');
    favoritesNav.classList.remove('display-none');
    favoritesNav.classList.add('display-block'); 
    updateFavoritesDOM();
}

// Hide Favorites DOM Elements / Show Results DOM Elements
function showResults() {
    favoritesContainer.classList.add('display-none');
    favoritesContainer.classList.remove('display-block');
    resultsContainer.classList.add('display-block');
    resultsContainer.classList.remove('display-none');
    favoritesNav.classList.add('display-none');
    favoritesNav.classList.remove('display-block'); 
    // Using this to quickly load what's already there
    getMorePictures();
}

// On Load
getNasaPictures();