//Creates mealType variable and stores in sessionStorage for use in search.js//
function getMealType(type) {
    var mealType = type;
    sessionStorage.setItem("mealType", mealType);
}