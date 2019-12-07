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
	//URI encode to change spaces into %20
	searchThis = encodeURIComponent(searchTerm);
	console.log("Search this: " + searchThis);
	//create search url and console out
	var finalUrl = urlStart + searchThis + additionalKeys + idAndKey;
	// console.log(finalUrl);
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
			var recipeTitle = $("<h5>");
			var title = response.hits[i].recipe.label;
			recipeTitle.text(title);
			$("#recipe-info").append(recipeTitle)
			
			// image
			var img = $("<img>");
			var imgSrc = response.hits[i].recipe.image;
			img.attr("src", imgSrc);
			$("#recipe-info").append(img)
			
			// url
			var urlButton = $("<button>")
			urlButton.addClass("urlButton")
			var buttonLink = $("<a>")
			buttonLink.appendTo(urlButton)
			var shareUrl = response.hits[i].recipe.shareAs;
			buttonLink.attr("href", shareUrl)
			buttonLink.attr('target','_blank');
			buttonLink.text("Click Here for Recipe")
			$("#recipe-info").append(urlButton)
		}
		//grab the health labels for
	});
}

function sideButtons(searchTerm){
	//appending buttons to new unordered list
	list.push(searchTerm);
	
	for (var i = 0; i < list.length; i++) {
		$("#stored").append($("<br>"));
		//creating a button and setting the user input value to button
		//replaces all dashes with spaces
		userSearched = $("<button>").text(list[i]);
		
		$("#stored").append(userSearched);
		//string replace function, to replace all spaces with dashes
		userSearched.attr("id", list[i]);
	}
	$("#search-term").val("");
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
	
	var searchTerm = $("#search-term")
	.val()
	.trim();
	
	//passed search term to function 12/5 826am - jdr
	searchRecipe(searchTerm);
	sideButtons(searchTerm);
	
});

$(userSearched).on("click", function(event){

	var searchTerm = $("#search-term")
	.val()
	.trim();

	console.log("click");
	searchRecipe(searchTerm);
	// sideButtons(searchTerm);
});
