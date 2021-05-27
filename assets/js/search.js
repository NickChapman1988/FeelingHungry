var url = "https://api.spoonacular.com/recipes/findByIngredients"
var apiKey = "apiKey=4046887ae70f4afda1862925dff6697c"

function getRecipes(recipes) {
    var ingredients = $("#search-box").val();
    var recipeSearch = new XMLHttpRequest();
    
    recipeSearch.open ("GET", url + "?ingredients=" + ingredients + "&number=2&" + apiKey, true);
    recipeSearch.send();

    recipeSearch.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
            recipes = (JSON.parse(this.responseText)); 
                
            var el = document.getElementById("recipe-box");
            el.innerHTML = ""; 

            recipes.forEach(function(item) {
                newRecipe = new XMLHttpRequest();
                newRecipe.open ("GET", "https://api.spoonacular.com/recipes/" + item.id + "/information?includeNutrition=false&" + apiKey, true);
                newRecipe.send();
                    
                newRecipe.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log(JSON.parse(this.responseText));
                        var recipeInstructions = (JSON.parse(this.responseText)); 

                        el.innerHTML += `<div class="col col-md-6 col-lg-4"><h2> ${item.title}</h2> <img src=${item.image}> <p>${item.sourceUrl}</p></div>`
                    }
                }
            })
        }
    }
}
