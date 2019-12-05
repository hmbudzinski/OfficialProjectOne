var url = "https://api.spoonacular.com/food/jokes/random?&apiKey=349d5f926732476ab8ac52e9787cedc9"

$("#jokeButton").on("click", function(){
    $.ajax ({
        url: url,
        method: "GET"
    }).then(function(response){
        console.log(response.text)
        var jokeBox = $("<div>")
        jokeBox.addClass("jokes")
        jokeBox.text(response.text)
        $("#joke").append(jokeBox)        
    })
})