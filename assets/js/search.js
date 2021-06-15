//Clear function for Search bar 

function clearSearch(){
    document.getElementById("search-box").value = "";
}

//Variable for search URL and Spoonacular API Key//
var url = "https://api.spoonacular.com/recipes/complexSearch";
var apiKey = "apiKey=4046887ae70f4afda1862925dff6697c";

//Populate Search page with grid of random recipes//
function fillRandomRecipes() {
    var randomRecipeSearch = new XMLHttpRequest();
    var urlRandom = "https://api.spoonacular.com/recipes/random?number=9&";

    randomRecipeSearch.open ("GET", urlRandom + apiKey, true);
    randomRecipeSearch.send();

    randomRecipeSearch.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText)); 
            var random = (JSON.parse(this.responseText));
            random = random.recipes;

            //Creates recipe card for random recipes//
            random.forEach(function(item){
            document.getElementById("recipe-box").innerHTML += `<div class="col-md-6 col-lg-4 recipe-card hvr-grow"><div class="card bg-light"><h4 class="card-title">${item.title}</h4>
            <img src=${item.image} class="img-fluid card-image-top"><a href="${item.spoonacularSourceUrl}" target="_blank" class="btn recipe-btn">View Recipe</a></div></div>`;              
            });
        }
    };
}

//Get Meal Type variable//

var mealType = sessionStorage.getItem("mealType");
console.log(mealType);

//Recipe Search function//
function getRecipes() {
    var ingredients = $("#search-box").val();
    var recipeSearch = new XMLHttpRequest();
    
    //Piece together search from basic URL, plus meal type and ingredient variables from user selection//
    recipeSearch.open ("GET", url + "?type=" + mealType + "&includeIngredients=" + ingredients + "&addRecipeInformation=true" + "&number=9&" 
    + apiKey, true);
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
                document.getElementById("recipe-box").innerHTML += `<div class="col-md-6 col-lg-4 recipe-card hvr-grow"><div class="card bg-light"><h4 class="card-title">${item.title}</h4>
                <img src=${item.image} class="img-fluid card-image-top"><a href="${item.spoonacularSourceUrl}" target="_blank" class="btn recipe-btn">View Recipe</a></div></div>`;              
            });
        };
    }
}