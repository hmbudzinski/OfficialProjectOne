
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

    // animate stuff to make the page look good when you click
    $("#searchbox").animate({ height: "auto", margin: "0 0 20px 0", padding: "20px 0 10px 0" });
    $("#shrink-text").animate({ fontSize: "22pt" });
    $(".row").removeClass("extra-padding");
    $("#search-term").animate({ height: "20px" });
    $("#search-button").animate({ fontSize: "12pt" });
    $("#search-button").removeClass("searchCenter");

    // fade all the new divs in all pretty-like
    $("#recipe-box").fadeIn(1000, "swing");
    $("#recipe-info").fadeIn(1000, "swing");
    $("#stored").fadeIn(1000, "swing");
    $("#joke").fadeIn(1000, "swing");
    $("#edamam-div").fadeIn(1000, "swing");
    $("#edamam-badge").fadeIn(1000, "swing");

    // get Bri's joke
    getJoke();
});

$("#searchbox").keyup(function (event) {
    if (event.keyCode == 13) {
        $("#search-button").click();
    }
});


// joke function!
function getJoke() {


    var url = "https://api.spoonacular.com/food/jokes/random?&apiKey=349d5f926732476ab8ac52e9787cedc9";
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

