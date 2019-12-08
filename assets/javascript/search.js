/////
// global variable
/////

var urlStart = "https://api.edamam.com/search?q=";
var additionalKeys =
	"%20dessert&to=3&nutrients[SUGAR]=20%2B&enum[crustacean-free]&enum[fish-free]&enum[pork-free]&enum[red-meat-free]&enum[shellfish-free]";
var idAndKey = "&app_id=2790841b&app_key=f439766755de77a40d2e25c9776f23a1";
var vegan = "&health=vegan"
var peanutFree = "&health=peanut-free"
var treeNutFree = "&health=tree-nut-free"
// var fatFree ="&health=fat-free"
var userSearched;
var list = [];
var ischecked = false;
var value;


// checking the checkbox's checked or unchecked status
$("input:checkbox").change(function () {
	ischecked = $(this).is(":checked")
	value = $(this).val();
	console.log("checked", ischecked, value)
})

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

	// if statements to detect which boxes are checked to alter the queryURL
	if (ischecked === true && value === "vegan") {
		console.log("checked is true", value)

		finalUrl = urlStart + searchThis + additionalKeys + vegan + idAndKey
	}

	if (ischecked === true && value === "peanut-free") {
		console.log("checked is true", value)

		finalUrl = urlStart + searchThis + additionalKeys + peanutFree + idAndKey
	}

	if (ischecked === true && value === "tree-nut-free") {
		console.log("checked is true", value)

		finalUrl = urlStart + searchThis + additionalKeys + treeNutFree + idAndKey
	}

	// if (ischecked === true && value === "vegan" && value === "peanut-free") {
	// 	finalUrl = urlStart + searchThis + additionalKeys + vegan + + idAndKey
	// }


	console.log(finalUrl);

	//ajax call the url
	$.ajax({
		url: finalUrl,
		method: "GET"
	}).then(function (response) {
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
	$(".prevSearch").on("click", function (event) {
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

/////
//events
/////

$("#search-button").on("click", function (event) {
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
