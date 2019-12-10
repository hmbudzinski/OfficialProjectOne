// first we need to collect the user's search term as a dynamic variable

// then we need to input that search variable

// then we need to get the info from the ajax response as variables

// then manipulate the DOM to display the recipe and the corresponding gif

var checkboxVal = [];

$("#search-button").on("click touch", function (event) {
    event.preventDefault();
    $("#recipe-info").empty();
    $("#stored").empty();
    $("#joke").empty();

    // used for finding the value of multiple checkbox ticks for the search
    $("input:checkbox:checked").each(function () {
        val = $(this).val();
        console.log("checkbox value? ", $(this).val());
        checkboxVal.push(val);
        console.log("checkboxVal array ", checkboxVal);
    });

    $("#searchbox").animate({ height: "auto", margin: "0 0 20px 0", padding: "20px 0 10px 0" });
    $("#shrink-text").animate({ fontSize: "22pt" });
    $(".row").removeClass("extra-padding");
    $("#search-term").animate({ height: "20px" });
    $("#search-button").animate({ fontSize: "12pt" });
    $("#search-button").removeClass("searchCenter");

    $("#recipe-box").fadeIn(1000, "swing");
    $("#recipe-info").fadeIn(1000, "swing");
    $("#stored").fadeIn(1000, "swing");
    $("#joke").fadeIn(1000, "swing");
    $("#edamam-div").fadeIn(1000, "swing");
    $("#edamam-badge").fadeIn(1000, "swing");
    // var newContainer = $("<div class='container'>");

    // newContainer.attr("id", "results");
    // newContainer.attr("class", "container center");
    // newContainer.insertAfter(searchbox);
    // var newRow = $("<div class='row'>");
    // newContainer.append(newRow);

    // divIds = ["recipe-info", "stored", "joke"]
    // for (var i = 0; i < divIds.length; i++) {
    //     // var textArr = ["<span><h4>Recipe Title</h4></span><span>[img goes here]</span><span><h4>Recipe Title</h4></span><span>[img goes here]</span><span><h4>Recipe Title</h4></span><span>[img goes here]</span>", "<span><h4>Local Storage</h4></span><span></span>", "<span><h5>Don't Forget to Laugh!</h5></span>"]
    //     // var textArr = [];
    //     var newCol = $("<div class='trans-bg'>");
    //     newCol.attr("id", divIds[i])
    //     newRow.append(newCol);
    //     // newCol.html(textArr[i]);
    // }

    // $("#recipe-info").addClass("eight columns");
    // $("#stored").addClass("four columns")
    // $("#joke").addClass("four columns")

    getJoke();
});

$("#searchbox").keyup(function (event) {
    if (event.keyCode == 13) {
        $("#search-button").click();
    }
});

function getJoke() {
    // $("#joke").removeClass("six columns")
    // $("#joke").addClass("four columns offset-by-four top-margin20")

    var url =
        "https://api.spoonacular.com/food/jokes/random?&apiKey=349d5f926732476ab8ac52e9787cedc9";
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response.text);
        var jokeBox = $("<div>");
        jokeBox.addClass("jokes");
        jokeBox.text(response.text);
        $("#joke").append(jokeBox);
    });
}

// Jquery UI 
$("#joke").click(function () {
    $("#joke").effect("shake");
    $("#joke").empty();
    getJoke();
});

