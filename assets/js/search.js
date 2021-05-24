var request = new XMLHttpRequest();

request.open ("GET", "https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=4&apiKey=4046887ae70f4afda1862925dff6697c");
request.send();

request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(this.responseText))
    }
};



