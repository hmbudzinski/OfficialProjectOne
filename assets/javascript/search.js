/////
// global variable
/////

var urlStart = "https://api.edamam.com/search?q=";
var additionalKeys =
	"%20dessert&to=20&nutrients[SUGAR]=20%2B&enum[crustacean-free]&enum[fish-free]&enum[pork-free]&enum[red-meat-free]&enum[shellfish-free]";
var idAndKey = "&app_id=2790841b&app_key=f439766755de77a40d2e25c9776f23a1";
var vegan = "&health=vegan";
var peanutFree = "&health=peanut-free";
var treeNutFree = "&health=tree-nut-free";
// var fatFree ="&health=fat-free"
var userSearched;
var list = [];
var ischecked = false;
var value;



// checking the checkbox's checked or unchecked status
$("input:checkbox").change(function () {
	ischecked = $(this).is(":checked");
	value = $(this).val();
	console.log("checked", ischecked, value);
});

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
	if (checkboxVal[0] === "vegan") {
		console.log("checked is true", value);

		finalUrl = urlStart + searchThis + additionalKeys + vegan + idAndKey;
		checkboxVal = [];
	}

	if (checkboxVal[0] === "peanut-free") {
		console.log("checked is true", value);

		finalUrl = urlStart + searchThis + additionalKeys + peanutFree + idAndKey;
		checkboxVal = [];
	}

	if (checkboxVal[0] === "tree-nut-free") {
		console.log("checked is true", value);

		finalUrl = urlStart + searchThis + additionalKeys + treeNutFree + idAndKey;
		checkboxVal = [];
	}

	if (checkboxVal[0] === "vegan" && checkboxVal[1] === "peanut-free" /*|| checkboxVal[0] === "peanut-free" && checkboxVal[1] === "vegan"*/) {
		console.log("user checked vegan and peanut-free");
		finalUrl = urlStart + searchThis + additionalKeys + vegan + peanutFree + idAndKey;
		checkboxVal = [];
	}

	if (checkboxVal[0] === "vegan" && checkboxVal[1] === "tree-nut-free" /*|| checkboxVal[0] === "trea-nut-free" && checkboxVal[1] === "vegan"*/) {
		console.log("user checked vegan and tree-nut-free");
		finalUrl =
			urlStart + searchThis + additionalKeys + vegan + treeNutFree + idAndKey;
		checkboxVal = [];
	}

	if (checkboxVal[0] === "peanut-free" && checkboxVal[1] === "tree-nut-free" /*|| checkboxVal[0] === "tree-nut-free" && checkboxVal[1] === "peanut-free"*/) {
		console.log("user checked peanut-free and tree-nut-free");
		finalUrl = urlStart + searchThis + additionalKeys + peanutFree + treeNutFree + idAndKey;
		checkboxVal = [];
	}

	// if (checkboxVal[0] === "vegan" && checkboxVal[1] === "peanut-free" && checkboxVal[2] === "tree-nut-free" || checkboxVal[0] === "peanut-free" && checkboxVal[1] === "vegan" && checkboxVal[2] === "tree-nut-free" || checkboxVal[0] === "tree-nut-free" && checkboxVal[1] === "pea-nut-free" && checkboxVal[2] === "") {

	if (checkboxVal === "peanut-free" && checkboxVal === "vegan" && checkboxVal === "tree-nut-free") {
		console.log("user checked vegan, peanut-free, and tree-nut-free");
		finalUrl = urlStart + searchThis + additionalKeys + vegan + peanutFree + treeNutFree + idAndKey;
		checkboxVal = [];
	}

	console.log(finalUrl);

	//ajax call the url
	$.ajax({
		url: finalUrl,
		method: "GET"
	}).then(function (response) {		
		for (var i = 0; i < 3; i++) {
			var randomIndex = response.hits[Math.floor(Math.random() * 20)]
			console.log(response)
			console.log("randomIndex test ", i, randomIndex)
			// go through the json object and grab three of the recipes, images and titles
			// title
			var recipeTitle = $("<h5>");
			var title = randomIndex.recipe.label;
			recipeTitle.text(title);
			$("#recipe-info").append(recipeTitle);

			// image
			var img = $("<img>");
			var imgSrc = randomIndex.recipe.image;
			img.attr("src", imgSrc);
			img.addClass("recipeImg")
			$("#recipe-info").append(img);

			// url
			var urlButton = $("<button>");
			urlButton.addClass("urlButton");
			var buttonLink = $("<a>");
			buttonLink.appendTo(urlButton);
			var shareUrl = randomIndex.recipe.shareAs;
			buttonLink.attr("href", shareUrl);
			buttonLink.attr("target", "_blank");
			buttonLink.text("Click here for recipe");
			$("#recipe-info").append(urlButton);
		}

		if (response.hits.length === 0) {
			$("#search-term").attr("placeholder", "Search for a Real Word Dummy!");
			$("#recipe-info").hide();
			$("#recipe-box").hide();
			$("#stored").hide();
			$("#joke").hide();
		} else {
			$("#search-term").attr("placeholder", "Search for a Dessert!");

			var containsTerm = false;

			if (list != null) {
				$(list).each(function (x) {
					if (list[x] === searchTerm) {
						containsTerm = true;
					}
				});
			}

			//push search term to the list array

			if (containsTerm === false) {
				list.push(searchTerm);
			}
		}
		sideButtons();
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
		// console.log("is it a button: " + userSearched);
		userSearched.text(list[i]);
		// console.log(userSearched);
		//adding class to new buttons
		userSearched.addClass("prevSearch");
		//string replace function, to replace all spaces with dashes
		userSearched.attr("data-id", list[i]);
		$("#stored").append(userSearched);
	}

	$(".prevSearch").on("click", function (event) {
		event.preventDefault();
		// console.log("click");
		var searchTerm = $(this).data("id");
		console.log("localStorage" + searchTerm);
		searchRecipe(searchTerm);
	});

	var clearButton = $("<button>");
	clearButton.attr("id", "clearButton");
	clearButton.append($('<i class="fa fa-times"></i>'));
	$("#stored").append(clearButton);
	
	var searchedTitle = $("<h5>");
	searchedTitle.text("Your Delicious Searches");
	searchedTitle.attr("id", "sTitle")
	$("#stored").prepend(searchedTitle);

	$("#clearButton").on("click", function(event) {
		console.log("click");
		clearSearch();
	});
}

function clearSearch() {
	$(".prevSearch").remove();
	list = [];
}

//array for autocomplete... feel free to add additional search terms
// updated some search terms 12/9 jdr
$(function () {
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
		"vanilla bean",
		"baklava",
		"mousse",
		"gulab jamun",
		"waffle",
		"scone"
	];
	$("#search-term").autocomplete({
		source: dessertSuggestions
	});
});

/////
//events
/////

$("#search-button").on("click", function (event) {
	event.preventDefault();

	// moved searchTerm from global to inside of event 12/5 jdr
	var searchTerm = $("#search-term")
		.val()
		.trim();

	var containsTerm = false;

	if (list != null) {
		$(list).each(function (x) {
			if (list[x] === searchTerm) {
				containsTerm = true;
			}
		});
	}

	//push search term to the list array
	if (containsTerm === false) {
		list.push(searchTerm);
	}

	searchRecipe(searchTerm);
	// console.log(searchRecipe(searchTerm));

	localStorage.setItem("key word", JSON.stringify(searchTerm));
	//clearing the search bar

	$("#search-term").val("");
});

//passed search term to function 12/5 826am - jdr
