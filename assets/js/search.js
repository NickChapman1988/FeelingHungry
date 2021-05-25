var url = "https://api.spoonacular.com/recipes/findByIngredients"
var apiKey = "apiKey=4046887ae70f4afda1862925dff6697c"
var recipeSearch = new XMLHttpRequest();

function getRecipes() {
    var ingredients = $("#search-box").val();
    
    if (!ingredients) {
        $("#recipe-box").html(`<h2>We're sorry, we couldn't find any recipes with those ingredients</h2>`);
        return;
    }

    recipeSearch.open ("GET", url + "?ingredients=" + ingredients + "&" + apiKey, true);
    recipeSearch.send();

    recipeSearch.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
            var recipes = (this.responseText);
                
            for (let i = 0; i < recipes.length ; i++) {
            $("#recipe-box").html(`<h2>${recipes[i].title}</h2>`)
        }}
    };
}