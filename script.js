const favoritesContainer = document.getElementById('favorites');
const resultsContainer = document.getElementById('results');


let resultsArray = [];
function getNasaPictures() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=hHt592uvYa5AKdj9zIGFy4UoOLvHCVQsJh2xmRdL&count=10')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        resultsArray = data; 
        for (let i = 0; i < resultsArray.length; i++) {
            resultsArray[i].copyright
            if (resultsArray[i].copyright == undefined) {
                resultsArray[i].copyright = "";
                //console.log(resultsArray[i].copyright);
            }
        }
        resultsContainer.innerHTML = resultsArray.map(
          result => `
          <div class="card">
          <a href="${result.hdurl}" title="View Full Image" target="blank" rel="noopener noreferrer">
            <img class="card-img-top" src="${result.url}" alt="NASA Picture of the Day">
          </a>      
          <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
            <!--<p class="save-text" onclick="saveFavorite(result)">Add To Favorites</p>-->
            <p class="card-text">${result.explanation}</p>
            <p class="card-text"><small class="text-muted">
              <strong>${result.date}</strong>
              <span>${result.copyright}</span>
            </small></p>
          </div>
        </div>
          `  
        ).join('')
    });
}

function getMorePictures() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=hHt592uvYa5AKdj9zIGFy4UoOLvHCVQsJh2xmRdL&count=10')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        for (let j = 0; j < data.length; j++) {
            let additionalResult = data[j];
            console.log(additionalResult);
            resultsArray.push(additionalResult);
        }

        for (let i = 0; i < resultsArray.length; i++) {
            resultsArray[i].copyright
            if (resultsArray[i].copyright == undefined) {
                resultsArray[i].copyright = "";
                //console.log(resultsArray[i].copyright);
            }
        }
        resultsContainer.innerHTML = resultsArray.map(
          result => `
          <div class="card">
          <a href="${result.hdurl}" title="View Full Image" target="blank" rel="noopener noreferrer">
            <img class="card-img-top" src="${result.url}" alt="NASA Picture of the Day">
          </a>      
          <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
            <!--<p class="save-text" onclick="saveFavorite(result)">Add To Favorites</p>-->
            <p class="card-text">${result.explanation}</p>
            <p class="card-text"><small class="text-muted">
              <strong>${result.date}</strong>
              <span>${result.copyright}</span>
            </small></p>
          </div>
        </div>
          `  
        ).join('')
    });
}

getNasaPictures();