$(document).ready(function () {
        

    var images = ["https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRInSQ1nPRiuGI8RM9KBKktKQiYWZDAo2h6337alkcUC2jl8ljB",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfVOpPNbaY--0EMzBjhVma5VzBjPaqjeWhHn1uo_YHr96gpsiX",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRRajM0BreC2G8SQP73NCLKpkJdH4MlJUwD5FRFkeWHh9wg9eIv",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzpZewtNMAncAPqX6ybw9WqQ9S9il2PGXio4bI8LmKnZJi2FTc",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQT302oOUQHfApUHnL_t6qFriZ0817JxikRzvY2KqT5f6ozid18",
    "https://www.sheknows.com/wp-content/uploads/2018/08/ti8wzfbbvdspxo8dg1ci.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRRLzcnZXcCOp06zZ8giV0FmIge2_T4iai_ySPlgGxnAQ6yjSdX", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPGlJvv0HhZgKbiB9G4T6f--Wkwkuk4Ncz9hXGt7d258K8PGc6",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0ATKuY6dSIeot4w3sjr1APgaLYsX_yNQwmogfIKLqa1IVFMC0"];

    var names = ["American", "Asian", "South American", "Japanese", "Vegetarian", "Chinese", "Indian", "Mediterranean", "British", "Italian"];
    var apiKey = "3ecacdc43749b0d1697331f53d557613";
    var appId = "b81fa997";
    var cuisine = $("#cuisineInput").val();    
    var favoritesLimit = 6;            
    var favoriteRecipeStorage = JSON.parse(localStorage.getItem("Favorite Recipes")) || [];
    
    var recipes = [];
   
    // Checking to see if there is anything in Local Storage and running getRecipes with 
    // last Item in the local storage array.

    if(favoriteRecipeStorage.length > 0){

        getRecipes(favoriteRecipeStorage[favoriteRecipeStorage.length - 1])
        }
                
    // Loops through the images and cuisine names to create cuisine links Navbar...

    for (var i = 0; i < images.length; i++){
    
    
        var links = $(`            
        <div class="col s1">
                <div class="row">
                    <a class="cuisine-links" data-name = "${names[i]}" href = "#"><img id ="navLinks${i}" src="${images[i]}" width="40px" height="40px"></a>
                </div>
                <div class="row">
                    <span class="cuisine-type">${names[i]}</span>
                </div>
            </div>            
        `);
        $("#cuisine-type").append(links);
    };


    // <---- Section for click events --->

    // Creating a click event on the links below the navigation bar that will be kind
    // of a shortcut for the user... they can pick a cuisine form the links.
   
    $(document).on("click", ".cuisine-links", function(){
    
        cuisine = $(this).attr("data-name");

        getRecipes(cuisine);          
    
    });

    // Creating a click event on the buttons generated, and pushing those values into local
    // storage. Also, setting a limit of 6.

    $(document).on("click", ".addFavorite", function(){                

        var favoriteValue = $(this).siblings("#recipeTitle").text();

            for (var i = 0; i < favoriteRecipeStorage.length; i++){
                if (favoriteRecipeStorage[i] === favoriteValue){
                    favoriteRecipeStorage.splice(i,1);
                }
            }   
            
                favoriteRecipeStorage.push(favoriteValue);
                
                    if(favoriteRecipeStorage.length > favoritesLimit){

                        favoriteRecipeStorage.shift();                
            }          

        localStorage.setItem("Favorite Recipes", JSON.stringify(favoriteRecipeStorage));
        renderFavorites(favoriteValue);
    

        
    })

    // Click event for the saved favorite recipes

    $(document).on("click", ".favoriteButtons", function(cuisine){

        var searchFavorites = $(this).text().trim();
        cuisine = searchFavorites;
        getRecipes(cuisine);
        $(".carousel").empty();

    })
    
     //Search recipe input, where on user hits enter will search for recipe
     
     $("#cuisineInput").on("keydown", function(event){
        
        var keypressed = event.keyCode || event.which;
        var cuisine = $("#cuisineInput").val();
            if (keypressed == 13) {   

                getRecipes(cuisine);                                          
            } 
        $(".carousel").empty();
               
    });
    
    // <--- Functions start here --->

    // Function to render favorite recipes buttons

    function renderFavorites(favoriteValue){

        $("#favoriteRecipes").empty();

            for (var i = 0; i < favoriteRecipeStorage.length; i++){

                var favoriteButton = $(`<a class="waves-effect waves-light btn indigo favoriteButtons"></a>`);
                    favoriteButton.attr("data-name", favoriteRecipeStorage[i]);
                    $("#favoriteRecipes").prepend(favoriteButton);
                    favoriteButton.text(favoriteRecipeStorage[i]);
                
            }
    }  
    

    // This function is looping through the results and creating content to be appended to carousel.

    function appendRecipes(recipes) {

        $(".carousel").empty();
        $("#cuisineInput").val("");
            for (var i = 0; i < recipes.length; i++){

                var calories = Math.floor(recipes[i].info.calories / recipes[i].info.yield);                 
            
                        var displayRecipes = $(`
                            <div class="carousel-item">
                                <h5 id="recipeTitle">${recipes[i].info.label}</h5>
                                <a href ='${recipes[i].info.url}'><img src =${recipes[i].info.image} width = "350px" height = "300px"></a> 
                                <p class="recipeInfo" style = "font-weight : bolder;">Calories per serving : ${calories}</p>
                                <p class="recipeInfo" style = "font-weight : bolder;">Servings : ${recipes[i].info.yield}</p>
                                <a class="waves-effect waves-light btn addFavorite "><strong>Add to Favorites +</strong></a>
                                </div>
                            `)
                        $('.carousel').append(displayRecipes); 
                        displayRecipes.attr("id", "carouselItem"+[i]);
                        $("#carouselItem"+[i]).css({width: "500px", height: "550px"});
                    

                        $('.carousel').carousel(); 
                                
                
            }

    }
    // This function does the ajax call to get the recipes.

    function getRecipes(cuisine) {

        var queryURL = `https://api.edamam.com/search?q=${cuisine}&app_id=${appId}&app_key=${apiKey}&from=0&to=30`;

            $.ajax({

                url: queryURL,
                method: "GET"

            }).then(function (response) {
            
                
                var result = [];
                for (var i = 0; i < response.hits.length; i++) {
                    var tempObj = { type: response.q, info: response.hits[i].recipe };
                    result.push(tempObj);
                }
                
                recipes = result;
                appendRecipes(result);                        
            });

        }
        
        renderFavorites();                    
});
