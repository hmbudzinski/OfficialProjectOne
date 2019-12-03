// call json object and display info in console log

//format must be queryURL + search info + apiID + apiKEY
var queryURL = "https://api.edamam.com/search?q=";
var apiID = "&app_id=2790841b";
var apiKEY = "&app_key=f439766755de77a40d2e25c9776f23a1";

//variable for user input 
var userSearch = $("#food-input").val();

$(document).ready(function () {
  var finalURL = queryURL + userSearch + apiID + apiKEY;
  console.log("searchTest website: " + finalURL);

  $.ajax({
    url: finalURL,
    method: "GET"
  }).then(function (response) {
    // console.log("ajax response" + (JSON.stringify(response)));
    console.log(response.hits[0].recipe.shareAs);

  });
});


// below works as a search
// pushing up to the group repo to show off

// function searchFood(foodSearch) {
//   var finalURL = queryURL + foodSearch + apiID + apiKEY;
//   console.log(finalURL);

//   $.ajax({
//     url: finalURL,
//     method: "GET"
//   }).then(function (response) {
//     // console.log((JSON.stringify(response)));

//     //grabs the sharable link for the recipie
//     console.log(response.hits[0].recipe.shareAs);
//   });
// }

// $("#search").on("click", function (event) {
//   event.preventDefault();
//   var foodSearch = $("food-input").val();

//   searchFood(foodSearch);
// });