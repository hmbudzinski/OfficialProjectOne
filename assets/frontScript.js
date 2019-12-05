// first we need to collect the user's search term as a dynamic variable

// then we need to input that search variable 

// then we need to get the info from the ajax response as variables

// then manipulate the DOM to display the recipe and the corresponding gif


console.log(searchbox)

$("#search-button").on("click touch", function (event) {
    var searchbox = $("#searchbox");

    searchbox.animate({ height: "100px", margin: "0 0 20px 0", position: "absolute", top: "20px", padding: "0px" })
    $("#shrink").animate({ fontSize: "22pt" });
    $(".row").removeClass("extra-padding");
    $("#search-term").animate({ height: "20px" });
    $("#search-button").animate({ fontSize: "12pt" });
    var newContainer = $("<div class='container'>");

    newContainer.attr("id", "results");
    newContainer.attr("class", "container center");
    newContainer.insertAfter(searchbox);
    var newRow = $("<div class='row'>");
    newContainer.append(newRow);

    divIds = ["recipe-info", "stored", "joke"]
    for (var i = 0; i < divIds.length; i++) {
        var textArr = ["<span><h4>Recipe Title</h4></span><span>[img goes here]</span><span><h4>Recipe Title</h4></span><span>[img goes here]</span><span><h4>Recipe Title</h4></span><span>[img goes here]</span>", "<span><h4>Local Storage</h4></span><span>[button]</span><br><span>[button]</span><br><span>[button]</span>", "<span><h5>Don't Forget to Laugh!</h5></span>"]
        var newCol = $("<div class='six columns trans-bg'>");
        newCol.attr("id", divIds[i])
        newRow.append(newCol);
        newCol.html(textArr[i]);
    }


    $("#joke").removeClass("six columns")
    $("#joke").addClass("four columns offset-by-four top-margin20")

    var url = "https://api.spoonacular.com/food/jokes/random?&apiKey=349d5f926732476ab8ac52e9787cedc9"
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response.text)
        var jokeBox = $("<div>")
        jokeBox.addClass("jokes")
        jokeBox.text(response.text)
        $("#joke").append(jokeBox)
    })

})