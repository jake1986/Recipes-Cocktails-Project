var cocktailSearch = $("#cocktailSearch");
var recipes = $(".recipes");
var drinkHits = $(".drink-hits");
recipes.hide();
function drinkSearch(cocktailName) {
    var cocktailInput = $("#cocktailInput");
    cocktailName = cocktailInput.val();
    console.log(cocktailName);
    var drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktailName;
    $(".drink-hits").empty();
    $(".images").empty();
    $.ajax({
        url: drinkQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var arrLength = Math.min(response.drinks.length, 5);
        var recipes = $(".recipes");
        recipes.show();
        for (var i = 0; i < arrLength; i++) {
            var drinkHits = $(".drink-hits");
            var drink = $("<div>");
            drink.addClass("drink-container-style")
            var drinkListItem = $("<p>");
            drinkListItem.text(cocktail);
            var cocktail = response.drinks[i].strDrink;
            var instructions = response.drinks[i].strInstructions;
            var drinkKeys = Object.keys(response.drinks[i]);
            drink.text(cocktail + ": " + instructions);
            drinkHits.append(drink);
            var ingredientList = $("<ul>");
            var drinkIngredients = "Ingredients are: ";
            ingredientList.append(drinkIngredients);
            for (var j = 0; j < drinkKeys.length; j++) {
                var drinkProperty = response.drinks[i][drinkKeys[j]];
                if (drinkProperty && drinkKeys[j].indexOf("strIngredient") !== -1) {
                    var ingredientNumber = drinkKeys[j].split("strIngredient")[1];
                    var ingredientItem = $("<li>");
                    ingredientItem.addClass("ingredient-list");
                    ingredientItem.append(ingredientNumber + ". " + drinkProperty + "&nbsp;");
                    ingredientList.append(ingredientItem);
                    drinkHits.append(ingredientList);
                }
            }
            var card = $(".images");
            var image = $("<img>");
            var choice = response.drinks[i].strDrinkThumb;
            image.attr("src", choice);
            image.addClass("cocktail-image");
            var carouselItem = $(".carousel-item");
            card.append(image);
        }
    });
    var cocktailBtn = $("<button>");
    cocktailBtn.addClass("btn btn-primary")
    cocktailBtn.on("click", function () {
        var drinkHits = $(".drink-hits");
        var drink = $("<div>");
        drink.addClass("drink-container-style")
        var drinkListItem = $("<p>");
        drinkListItem.text(cocktail);
        var cocktail = response.drinks[i].strDrink;
        var instructions = response.drinks[i].strInstructions;
        drink.text(cocktail + ": " + instructions);
        drinkHits.append(drink);
        var card = $(".images");
        var image = $("<img>");
        var choice = response.drinks[i].strDrinkThumb;
        image.attr("src", choice);
        image.addClass("cocktail-image");
        var carouselItem = $(".carousel-item");
        card.append(image);
    });
};

cocktailSearch.on("click", function () {
    drinkSearch();
});

function favBtn(cocktailName){
    var drinkHistory = $(".drink-history");
    var li = $("<li>");
    var cocktailBtn = $("<button>");
    cocktailBtn.addClass("fav-btn btn btn-primary");
    cocktailBtn.attr("value", cocktailName);
    cocktailBtn.text(cocktailName);
    li.append(cocktailBtn);
    li.addClass("history-list");
    drinkHistory.append(li);
}
//assign value to var favHistory
//this variable starts out as an empty
//later on, the var favHistory will have the value of the current items in local storage from favCocktails
//That's why we use the operator || to say the value of this variable is either an empty array or value of favCocktails
var favHistory = JSON.parse(localStorage.getItem("favCocktails")) || [];
var favClick = $("#add-fav-click");
favClick.on("click", function () {
    var cocktailInput = $("#cocktailInput");
    var cocktailName = cocktailInput.val();
    //call the favBtn function to create new button for each fav cocktail
    favBtn(cocktailName);
    //everytime the add to favorites button is clicked
    //the new cocktai input will be pushed to the favHistory array
    favHistory.push(cocktailName)
    console.log(favHistory)
    //we save the favHistory array into local storage under favCocktails key name
    //Now the favHistory started as an empty array, will become an array of all the fav drinks user added
    localStorage.setItem("favCocktails", JSON.stringify(favHistory));
});
//Loop through the favHistory array, and display all fav cocktails buttons
for (var x = 0; x < favHistory.length; x++){
    console.log(favHistory[x]);
    var cocktailName = favHistory[x];
    favBtn(cocktailName);
}
$(document).on("click", ".fav-btn", function () {
    var cocktailValue = $(this).attr("value");
    console.log(cocktailValue);
    var drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktailValue;
    $(".drink-hits").empty();
    $(".images").empty();
    $.ajax({
        url: drinkQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var arrLength = Math.min(response.drinks.length, 5);
        var recipes = $(".recipes");
        recipes.show();
        for (var i = 0; i < arrLength; i++) {
            var drinkHits = $(".drink-hits");
            var drink = $("<div>");
            drink.addClass("drink-container-style")
            var drinkListItem = $("<p>");
            drinkListItem.text(cocktail);
            var cocktail = response.drinks[i].strDrink;
            var instructions = response.drinks[i].strInstructions;
            var drinkKeys = Object.keys(response.drinks[i]);
            drink.text(cocktail + ": " + instructions);
            drinkHits.append(drink);
            var ingredientList = $("<ul>");
            var drinkIngredients = "Ingredients are: ";
            ingredientList.append(drinkIngredients);
            for (var j = 0; j < drinkKeys.length; j++) {
                var drinkProperty = response.drinks[i][drinkKeys[j]];
                if (drinkProperty && drinkKeys[j].indexOf("strIngredient") !== -1) {
                    
                    var ingredientNumber = drinkKeys[j].split("strIngredient")[1];
                    var ingredientItem = $("<li>");
                    ingredientItem.addClass("ingredient-list");
                    ingredientItem.append(ingredientNumber + ". " + drinkProperty + "&nbsp;");
                    ingredientList.append(ingredientItem);
                    drinkHits.append(ingredientList);
                }
            }
            var card = $(".images");
            var image = $("<img>");
            var choice = response.drinks[i].strDrinkThumb;
            image.attr("src", choice);
            image.addClass("cocktail-image");
            var carouselItem = $(".carousel-item");
            card.append(image);
        }
    });
    var cocktailBtn = $("<button>");
    cocktailBtn.addClass("btn btn-primary")
    cocktailBtn.on("click", function () {
        var drinkHits = $(".drink-hits");
        var drink = $("<div>");
        drink.addClass("drink-container-style")
        var drinkListItem = $("<p>");
        drinkListItem.text(cocktail);
        var cocktail = response.drinks[i].strDrink;
        var instructions = response.drinks[i].strInstructions;
        drink.text(cocktail + ": " + instructions);
        drinkHits.append(drink);
        var card = $(".images");
        var image = $("<img>");
        var choice = response.drinks[i].strDrinkThumb;
        image.attr("src", choice);
        image.addClass("cocktail-image");
        var carouselItem = $(".carousel-item");
        card.append(image);
    });
});
var cocktailInput = $("#cocktailInput");
var cocktailName = cocktailInput.val();
var drinkHistory = $(".drink-history");
var li = $("<li>");
var cocktailBtn = $("<button>");
cocktailBtn.addClass("btn btn-primary");
cocktailBtn.on("click", function () {
    console.log("clicked");
});