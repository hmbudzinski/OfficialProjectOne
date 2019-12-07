/////
// global variable
/////

var urlStart = "https://api.edamam.com/search?q=";
var additionalKeys =
	"%20dessert&to=3&nutrients[SUGAR]=20%2B&enum[crustacean-free]&enum[fish-free]&enum[pork-free]&enum[red-meat-free]&enum[shellfish-free]";
var idAndKey = "&app_id=2790841b&app_key=f439766755de77a40d2e25c9776f23a1";
var userSearched;
var list = [];

/////
// reusable functions
/////

function searchRecipe(searchTerm) {
	//URI encode to change spaces into %20
	searchThis = encodeURIComponent(searchTerm);
	console.log("Search this: " + searchThis);
	$("#recipe-info").empty();
	//create search url and console out
	var finalUrl = urlStart + searchThis + additionalKeys + idAndKey;
	console.log(finalUrl);

	//ajax call the url
	$.ajax({
		url: finalUrl,
		method: "GET"
	}).then(function(response) {
		for (var i = 0; i < response.hits.length; i++) {
			// go through the json object and grab three of the recipes, images and titles
			// title
			var recipeTitle = $("<h5>");
			var title = response.hits[i].recipe.label;
			recipeTitle.text(title);
			$("#recipe-info").append(recipeTitle);

			// image
			var img = $("<img>");
			var imgSrc = response.hits[i].recipe.image;
			img.attr("src", imgSrc);
			$("#recipe-info").append(img);

			// url
			var urlButton = $("<button>");
			urlButton.addClass("urlButton");
			var buttonLink = $("<a>");
			buttonLink.appendTo(urlButton);
			var shareUrl = response.hits[i].recipe.shareAs;
			buttonLink.attr("href", shareUrl);
			buttonLink.attr("target", "_blank");
			buttonLink.text("Click here for recipe");
			$("#recipe-info").append(urlButton);
		}

	if(response.hits.length === 0){
		$("#search-term").attr("placeholder", "Search for a Real Word Dummy!")
		$("#recipe-info").hide();
		$("#stored").hide();
		$("#joke").hide();
		// $("<img>").attr("src", )

	} else{
		$("#search-term").attr("placeholder", "Search for a Dessert!");
		list.push(searchTerm);
	}
	sideButtons();

});

}

function sideButtons() {
	console.log("making buttons");
	//appending buttons to new unordered list
	$("#stored").empty();

	for (var i = 0; i < list.length; i++) {
		$("#stored").append($("<br>"));

		//creating a button and setting the user input value to button
		//replaces all dashes with spaces
		userSearched = $("<button>");
		console.log("is it a button: " + userSearched);
		userSearched.text(list[i]);
		console.log(userSearched);
		//adding class to new buttons
		userSearched.addClass("prevSearch");
		//string replace function, to replace all spaces with dashes
		userSearched.attr("data-id", list[i]);
		$("#stored").append(userSearched);
	}

	// $("#search-term").val("");
	$(".prevSearch").on("click", function(event) {
		event.preventDefault();
		console.log("click");
		var searchTerm = $(this).data("id");
		console.log("localStorage" + searchTerm);
		searchRecipe(searchTerm);
	})

	var searchedTitle = $("<h5>");
	searchedTitle.text("Your Delicious Searches");
	$("#stored").prepend(searchedTitle);

}

/////
// function calls
/////
// sideButtons();

/////
//events
/////

$("#search-button").on("click", function(event) {
	event.preventDefault();

	// moved searchTerm from global to inside of event 12/5 jdr
	var searchTerm = $("#search-term")
		.val()
		.trim();

	searchRecipe(searchTerm);
	// console.log(searchRecipe(searchTerm));
	//push search term to the list array
	// list.push(searchTerm);

	localStorage.setItem("key word", JSON.stringify(searchTerm));
	//clearing the search bar
	$("#search-term").val("");

	//passed search term to function 12/5 826am - jdr

});
