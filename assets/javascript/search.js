/////
// global variable
/////

var urlStart = "https://api.edamam.com/search?q=";
var additionalKeys = "%20dessert&to=3&nutrients[SUGAR]=20%2B&enum[crustacean-free]&enum[fish-free]&enum[pork-free]&enum[red-meat-free]&enum[shellfish-free]";
var idAndKey = "&app_id=2790841b&app_key=f439766755de77a40d2e25c9776f23a1";

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

    // go through the json object and grab three of the recipes, images and titles
    // title
    // response.hits[i].recipe.label
    // image
    // response.hits[i].recipe.image
    // url
    // response.hits[i].recipe.shareAs

    console.log(response.hits[0].recipe.label);
    console.log(response.hits[1].recipe.label);
    console.log(response.hits[2].recipe.label);

    //create objects for each of the three hits? 
    //append these objects to the three recipe boxes?

    //grab the health labels for 
     
  });



/////
// function calls
/////


/////
//events
/////