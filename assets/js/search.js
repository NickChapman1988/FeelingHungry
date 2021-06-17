//Variable for search URL and Spoonacular API Key//
var url = "https://api.spoonacular.com/recipes/complexSearch";
var apiKey = "apiKey=4046887ae70f4afda1862925dff6697c";

//Get Meal Type variable from Home page//

var mealType = sessionStorage.getItem("mealType");
console.log(mealType);

//Clear function for Search bar 

function clearSearch(){
    document.getElementById("search-box").value = "";

    var refreshRecipes = new XMLHttpRequest();
    var urlRefresh = "https://api.spoonacular.com/recipes/random?number=9&";

    //Clears recipe box div when user initiates new search//
    var el = document.getElementById("recipe-box");    
    el.innerHTML = "";

    //Refreshes random recipes when search box is cleared//
    refreshRecipes.open ("GET", urlRefresh + apiKey, true);
    refreshRecipes.send();

    refreshRecipes.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText)); 
            var refresh = (JSON.parse(this.responseText));
            refresh = refresh.recipes;

            refresh.forEach(function(item){
                if (item.image === undefined) {
                    el.innerHTML += `<div class="col-md-6 col-lg-4 recipe-card hvr-grow"><a href="${item.spoonacularSourceUrl}" target="_blank"><div class="card bg-light"><h4 class="card-title">${item.title}</h4>
                    <img src="assets/images/undefined-image.jpg" class="img-fluid card-image-top"><button class="btn recipe-btn">View Recipe</button></div></a></div>`;
                } else {
                    el.innerHTML += `<div class="col-md-6 col-lg-4 recipe-card hvr-grow"><a href="${item.spoonacularSourceUrl}" target="_blank"><div class="card bg-light"><h4 class="card-title">${item.title}</h4>
                    <img src=${item.image} class="img-fluid card-image-top"><button class="btn recipe-btn">View Recipe</button></div></a></div>`; 
                }             
            });
        }
    };
}

//Populate Search page with grid of random recipes for selected meal type//
function fillRandomRecipes() {
    var randomRecipeSearch = new XMLHttpRequest();
    var urlRandom = "https://api.spoonacular.com/recipes/random?number=9&";

//Generate random recipes without meal type if user navigates straight to Recipes page (without picking meal type)//    
    if (mealType === null) {
        randomRecipeSearch.open ("GET", urlRandom + apiKey, true);
        randomRecipeSearch.send();
    } else {
        randomRecipeSearch.open ("GET", urlRandom + "tags=" + mealType + "&" + apiKey, true);
        randomRecipeSearch.send();
    }

    //Clears recipe box div when user initiates new search//
    var el = document.getElementById("recipe-box");    
    el.innerHTML = "";

    randomRecipeSearch.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText)); 
            var random = (JSON.parse(this.responseText));
            random = random.recipes;

            //Creates recipe card for random recipes//
            random.forEach(function(item){
                if (item.image === undefined) {
                    el.innerHTML += `<div class="col-md-6 col-lg-4 recipe-card hvr-grow"><a href="${item.spoonacularSourceUrl}" target="_blank"><div class="card bg-light"><h4 class="card-title">${item.title}</h4>
                    <img src="assets/images/undefined-image.jpg" class="img-fluid card-image-top"><button class="btn recipe-btn">View Recipe</button></div></a></div>`;
                } else {
                    el.innerHTML += `<div class="col-md-6 col-lg-4 recipe-card hvr-grow"><a href="${item.spoonacularSourceUrl}" target="_blank"><div class="card bg-light"><h4 class="card-title">${item.title}</h4>
                    <img src=${item.image} class="img-fluid card-image-top"><button class="btn recipe-btn">View Recipe</button></div></a></div>`; 
                }             
            });
        }
    };
}

//Recipe Search function//
function getRecipes() {
    var ingredients = $("#search-box").val();
    var recipeSearch = new XMLHttpRequest();
    
    //Piece together search from basic URL, plus meal type and ingredient variables from user selection//
    recipeSearch.open ("GET", url + "?type=" + mealType + "&includeIngredients=" + ingredients + "&addRecipeInformation=true" + "&number=9&" + apiKey, true);
    recipeSearch.send();
    
    recipeSearch.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
            var recipes = (JSON.parse(this.responseText)); 
            recipes = recipes.results;
            
            //Clears recipe box div when user initiates new search//
            var el = document.getElementById("recipe-box");    
            el.innerHTML = ""; 
                
                //No results message to display to user//
                if (recipes.length === 0){
                    console.log("No results found");
                    el.innerHTML += `<div class="no-results-message col-6 offset-3 center-block"><h4 class="card-title">Sorry, it doesn't look like we've found any recipes 
                    for that ingredient. Why not try searching for something different, like butter, milk, or tomatoes?</h4></div>`;
                }   

            //Creates recipes cards for search results//
            recipes.forEach(function(item){              
                if (item.image === undefined) {
                    el.innerHTML += `<div class="col-md-6 col-lg-4 recipe-card hvr-grow"><a href="${item.spoonacularSourceUrl}" target="_blank"><div class="card bg-light"><h4 class="card-title">${item.title}</h4>
                    <img src="assets/images/undefined-image.jpg" class="img-fluid card-image-top"><button class="btn recipe-btn">View Recipe</button></div></a></div>`;
                } else {
                    el.innerHTML += `<div class="col-md-6 col-lg-4 recipe-card hvr-grow"><a href="${item.spoonacularSourceUrl}" target="_blank"><div class="card bg-light"><h4 class="card-title">${item.title}</h4>
                    <img src=${item.image} class="img-fluid card-image-top"><button class="btn recipe-btn">View Recipe</button></div></a></div>`; 
                }
            });
        }
    };
}