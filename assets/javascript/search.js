/////
// global variable
/////

var urlStart = "https://api.edamam.com/search?q=";
var additionalKeys = "%20dessert&to=3&nutrients[SUGAR]=20%2B&enum[crustacean-free]&enum[fish-free]&enum[pork-free]&enum[red-meat-free]&enum[shellfish-free]";
var idAndKey = "&app_id=2790841b&app_key=f439766755de77a40d2e25c9776f23a1";
var userSearched;
var searchTerm = $("#search-term").val();

// grab the first three objects with the info we need
// recipe title, recipe image, and recipe url

/////
// reusable functions
/////

function searchRecipe (searchButton) {
  //show  the animated gif that is currently hidden

  //create search url and console out
  var finalUrl = urlStart + searchButton + additionalKeys + idAndKey; 
  console.log(finalUrl);

  //ajax call the url
  $.ajax({
    url: finalUrl,
    method: "GET"
  }).then(function (response) {
    // hide the animated gif

    // empty the div that results print to, using .empty();
    $("#recipe-info").empty();
    
    for (var i = 0; i < response.hits.length; i++) {
      // go through the json object and grab three of the recipes, images and titles
      // title
      var title = response.hits[i].recipe.label;
      console.log(title);
      // image
      var img = $("<img>");
      var imgSrc = response.hits[i].recipe.image;
      console.log("Image source" + imgSrc);
      img.attr("src", imgSrc);
      // url
      var shareUrl = response.hits[i].recipe.shareAs;
      console.log(shareUrl);

      //append to recipe div
      $("#recipe-info").append(title + img + shareUrl + "<br>");
     
    }

    //create objects for each of the three hits? 

    //grab the health labels for 
     
  });

}

/////
// function calls
/////


/////
//events
/////
$("#searchButton").on("click", function(){
  
  //calling search recipe function
  searchRecipe();

  //creating a button and setting the user input value to button
  userSearched = $("<button>").text($("#search-term").val());

  //adding class to new buttons
  userSearched.addClass("ul");
  userSearched.attr("id", $("#search-term").val());

  //creating an unordered list to hold the new buttons
  var list = $("<ul>");

  //appending buttons to new unordered list 
  list.append(userSearched);

  //appending unordered list to body of app
  $("body").append(list);

  // localStorage.setItem("label" + searchTerm, searchTerm);
  //clearing the search bar

  $("#search-term").val("");
});
