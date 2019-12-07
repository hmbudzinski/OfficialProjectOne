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
	});
}

function sideButtons() {
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
	});
}

/////
// function calls
/////

//array for autocomplete... feel free to add additional search terms
$(function() {
	var dessertSuggestions = [
		"cupcake",
		"cake",
		"candy",
		"pastry",
		"sweet",
		"cookie",
		"ice cream",
		"pie",
		"pudding",
		"tart",
		"croissant",
		"sweet roll",
		"muffin",
		"lollipop",
		"caramels",
		"lemon drops",
		"toffee",
		"chocolate",
		"jujubes",
		"jelly",
		"jelly beans",
		"marshmallow",
		"marzipan",
		"halvah",
		"gummies",
		"gummi bears",
		"tootsie roll",
		"liquorice",
		"chupa chups",
		"bonbon",
		"dessert",
		"sugar plum",
		"drag\xe9e",
		"apple pie",
		"biscuit",
		"wafer",
		"chocolate bar",
		"candy canes",
		"gingerbread",
		"donut",
		"cheesecake",
		"oat cake",
		"carrot cake",
		"fruitcake",
		"souffl\xe9",
		"tiramisu",
		"chocolate cake",
		"brownie",
		"macaroon",
		"icing",
		"powder",
		"topping",
		"jelly-o",
		"cake",
		"sesame snaps",
		"danish",
		"bear claw",
		"cotton candy",
		"caramel corn",
		"apple",
		"pear",
		"kiwi",
		"banana",
		"blackberry",
		"strawberry",
		"blueberry",
		"lingonberry",
		"gooseberry",
		"boysenberry",
		"cranberry",
		"goji",
		"acai",
		"currant",
		"mulberry",
		"watermelon",
		"coconut",
		"lime",
		"mango",
		"orange",
		"basil",
		"tropical fruit",
		"key lime",
		"almond",
		"rhubarb",
		"pecan",
		"plum",
		"peach",
		"spiced",
		"granola",
		"basalmic",
		"nutella",
		"vanilla bean"
	];
	$("#search-term").autocomplete({
		source: dessertSuggestions
	});
});

/////
//events
/////

$("#search-button").on("click", function(event) {
	event.preventDefault();

	// moved searchTerm from global to inside of event 12/5 jdr
	var searchTerm = $("#search-term")
		.val()
		.trim();

	//push search term to the list array
	list.push(searchTerm);

	// //appending buttons to new unordered list
	// for (var i = 0; i < list.length; i++) {
	// 	$("#stored").append($("<br>"));
	// 	//creating a button and setting the user input value to button
	// 	//replaces all dashes with spaces
	// 	userSearched = $("<button>").text(list[i]);
	// 	console.log(userSearched);

	// 	//adding class to new buttons
	// 	// userSearched.addClass("ul");
	// 	//string replace function, to replace all spaces with dashes
	// 	userSearched.attr("id", list[i]);
	// 	$("#stored").append(userSearched);
	// }

	//need to use what Jody grabs from the recipe to store to local storage
	//put three recipies in an array when they are grabbed, and then store that array with the search term
	localStorage.setItem("key word", JSON.stringify(searchTerm));
	//need to loop through what API has returned and create array of returns to store in local storage
	//clearing the search bar
	$("#search-term").val("");

	sideButtons();
	//passed search term to function 12/5 826am - jdr
	searchRecipe(searchTerm);
});
