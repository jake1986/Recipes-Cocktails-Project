
        $(document).ready(function(){

            var recipeBtn = $("#buttons1");
            var drinkBtn = $("#buttons2");
    
            recipeBtn.on("click", function(){
                window.location = "recipes.html";
            })
    
            drinkBtn.on("click", function(){
                window.location = "cocktail.html";
            })  
            recipeBtn.hover(function(){
                var text = $(this).text();
                $(this).text("hello");
            }, function(){
                $(this).text(text);
            });
    
           function blink(){
        
                
                 if($("#sign").css("border-color") === "rgb(255, 255, 255)"){
    
                     $("#sign").css("border-color", "yellow");
                 }
                else {         
    
                    $("#sign").css("border-color", "rgb(255, 255, 255)");
                 }
                            
            }
           setInterval(blink, 500);
        });