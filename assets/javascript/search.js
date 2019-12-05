/////
// global variable
/////

var urlStart = "https://api.edamam.com/search?q=";
var additionalKeys =
	"%20dessert&to=3&nutrients[SUGAR]=20%2B&enum[crustacean-free]&enum[fish-free]&enum[pork-free]&enum[red-meat-free]&enum[shellfish-free]";
var idAndKey = "&app_id=2790841b&app_key=f439766755de77a40d2e25c9776f23a1";
var userSearched;
var list = [];

// grab the first three objects with the info we need
// recipe title, recipe image, and recipe url

/////
// reusable functions
/////

function searchRecipe(searchTerm) {
	//show  the animated gif that is currently hidden

	// empty the div that results print to, using .empty();
	$("#recipe-info").empty();

	//create search url and console out
	var finalUrl = urlStart + searchTerm + additionalKeys + idAndKey;
	console.log(finalUrl);

	//ajax call the url
	$.ajax({
		url: finalUrl,
		method: "GET"
	}).then(function(response) {
		// hide the animated gif

		// commented out creating any elements, as the entire section for the
		// title image and url will be dynamically created and added
		// to #recipe-info 12/5 - jdr
		for (var i = 0; i < response.hits.length; i++) {
			// go through the json object and grab three of the recipes, images and titles
			// title
			var title = response.hits[i].recipe.label;
			console.log("title " + i + " " + title);
			// image
			// var img = $("<img>");
			var imgSrc = response.hits[i].recipe.image;
			console.log("Image source " + i + " " + imgSrc);
			// img.attr("src", imgSrc);
			// url
			var shareUrl = response.hits[i].recipe.shareAs;
			console.log("Share URL " + i + " " + shareUrl);

			// //append to recipe div
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

//modified on click to show as event 12/5 8:27am - jdr
$("#search-button").on("click", function(event) {
	event.preventDefault();
	$("#recipe-info").empty();
	// moved searchTerm from global to inside of event 12/5 jdr
	var searchTerm = $("#search-term").val();
	//appending buttons to new unordered list
	list.push(searchTerm);
	
	for(var i = 0; i <list.length; i++){
		$("#localStorage").append($("<br>"));
		//creating a button and setting the user input value to button
		//replaces all dashes with spaces
		userSearched = $("<button>").text(list[i]);
		console.log(userSearched);
		
		//adding class to new buttons
		userSearched.addClass("ul");
		//string replace function, to replace all spaces with dashes
		userSearched.attr("id", list[i]);
		$("#localStorage").append(userSearched);
	}

	//need to use what Jody grabs from the recipe to store to local storage
	//put three recipies in an array when they are grabbed, and then store that array with the search term
	// localStorage.setItem(searchTerm, //returned array of recipies);
	//need to loop through what API has returned and create array of returns to store in local storage
	//clearing the search bar
	$("#search-term").val("");

	//passed search term to function 12/5 826am - jdr
	searchRecipe(searchTerm);
});
