const resultsNav = document.getElementById('resultsNav');
const imagesContainer = document.getElementById('images-container');
const favoritesNav = document.getElementById('favoritesNav');
const saveConfirmed = document.getElementById('saveConfirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'hHt592uvYa5AKdj9zIGFy4UoOLvHCVQsJh2xmRdL';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

// Initialize two empty arrays
let resultsArray = [];
let favoritesArray = [];

// Scroll To Top, Remove Loader, Show Content
function hideLoader(page) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  loader.classList.add('hidden');
  imagesContainer.hidden = false;
  if (page === 'results') {
    resultsNav.classList.remove('hidden');
  } else {
    favoritesNav.classList.remove('hidden');
  }
}

function createDOMNodes(page) {
  // Load ResultsArray or FavoritesArray
  const currentArray = page === 'results' ? resultsArray : favoritesArray;
  console.log('Current Array:', page, currentArray);
  currentArray.forEach((result) => {
    // Card Container
    const card = document.createElement('div');
    card.classList.add('card');
    // Link
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '_blank';
    // Image
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = 'NASA Picture of the Day';
    image.loading = 'lazy';
    image.classList.add('card-img-top');
    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Card Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    // Save Text
    const saveText = document.createElement('p');
    saveText.classList.add('save-text');
    if (page === 'results') {
      saveText.textContent = 'Add To Favorites';
      saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
    } else {
      saveText.textContent = 'Remove Favorite';
      saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
    }
    // Card Text
    const cardText = document.createElement('p');
    cardText.textContent = result.explanation;
    // Footer Container
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    // Date
    const date = document.createElement('strong');
    date.textContent = result.date;
    // Copyright
    const copyrightResult = result.copyright === undefined ? '' : result.copyright;
    const copyright = document.createElement('span');
    copyright.textContent = ` ${copyrightResult}`;
    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

function updateDOM(page) {
  // Get Favorites Array from localStorage
  if (localStorage.getItem('nasaFavorites')) {
    favoritesArray = JSON.parse(localStorage.getItem('nasaFavorites'));
  }
  // Reset DOM, Create DOM Nodes, Hide Loader
  imagesContainer.textContent = '';
  createDOMNodes(page);
  hideLoader(page);
}

// Get 10 images from NASA API
async function getNasaPictures() {
  // Show Loader
  loader.classList.remove('hidden');
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDOM('results');
  } catch (error) {
    // Catch Error Here
  }
}

// Add result to Favorites Array
function saveFavorite(item) {
  // Loop through Results Array to select Favorite
  resultsArray.forEach((result) => {
    if (result.url.includes(item)) {
      const itemMatch = result;
      favoritesArray.push(itemMatch);
    }
  });
  // Show Save Confirmation for 2 seconds
  saveConfirmed.hidden = false;
  setTimeout(() => {
    saveConfirmed.hidden = true;
  }, 2000);
  // Set Favorites Array in localStorage
  localStorage.setItem('nasaFavorites', JSON.stringify(favoritesArray));
}

// Remove item from Favorites Array
function removeFavorite(item) {
  favoritesArray.forEach((favorite, i) => {
    if (favorite.url.includes(item)) {
      favoritesArray.splice(i, 1);
      // Set Favorites Array in localStorage
      localStorage.setItem('nasaFavorites', JSON.stringify(favoritesArray));
      updateDOM('favorites');
    }
  });
}

// Show Favorites, Hide Results
function showFavorites() {
  loader.classList.remove('hidden');
  favoritesNav.classList.remove('hidden');
  resultsNav.classList.add('hidden');
  updateDOM('favorites');
}

// Show Results, Hide Favorites
function showResults() {
  loader.classList.remove('hidden');
  favoritesNav.classList.add('hidden');
  resultsNav.classList.remove('hidden');
  getNasaPictures();
}

// On Load
getNasaPictures();
