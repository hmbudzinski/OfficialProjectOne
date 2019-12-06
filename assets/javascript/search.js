/////
// global variable
/////

var urlStart = "https://api.edamam.com/search?q=";
var additionalKeys =
	"%20dessert&to=3&nutrients[SUGAR]=20%2B&enum[crustacean-free]&enum[fish-free]&enum[pork-free]&enum[red-meat-free]&enum[shellfish-free]";
var idAndKey = "&app_id=2790841b&app_key=f439766755de77a40d2e25c9776f23a1";
var userSearched;

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
			console.log(response)
			// go through the json object and grab three of the recipes, images and titles
			// title
			var recipeTitle = $("<h5>");
			var title = response.hits[i].recipe.label;
			recipeTitle.text(title);
			$("#recipe-info").append(recipeTitle)
			
			//image
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
<<<<<<< Updated upstream
			console.log("Share URL " + i + " " + shareUrl);

			// //append to recipe div
			// $("#recipe-info").append(title + img + shareUrl + "<br>");
=======
			buttonLink.attr("href", shareUrl)
			buttonLink.attr('target','_blank');
			buttonLink.text("Click here for recipe")
			$("#recipe-info").append(urlButton)
			
>>>>>>> Stashed changes
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
$("#searchButton").on("click", function(event) {
	event.preventDefault();
<<<<<<< Updated upstream

=======
	
>>>>>>> Stashed changes
	// moved searchTerm from global to inside of event 12/5 jdr
	var searchTerm = $("#search-term").val();
	console.log(searchTerm);

	//creating a button and setting the user input value to button
	userSearched = $("<button>").text($("#search-term").val());
	console.log(userSearched);

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

	//calling search recipe function
	//passed search term to function 12/5 826am - jdr
	searchRecipe(searchTerm);
});
