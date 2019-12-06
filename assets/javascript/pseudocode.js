// So, what is it that we want to do?

/////
// index.html
/////

// User comes to the front page and is presented with a search bar inviting them to search for a sweet treat 
// On clicking search they are redirected to results.html?
////////// SEARCH KEY IS PASSED OVER TO THE ONCLICK TO GIVE TO THE SEARCH FUNCTION

////////// DO WE WANT IT TO SWITCH OVER TO A "RESULTS" PAGE OR DO WE WANT IT TO JUST CHANGE ON THE SAME PAGE
////////// LIKE CHANGING VISIBLE DISPLAYS?

/////
// results.html
/////

// displays the term the user searched at the (top? to the left?) of page
////////// DO WE WANT TO SAVE THESE IN LOCAL STORAGE TO BE CALLED ON AGAIN, SIMILARLY TO HOW WE DID WEATHER DASHBOARD -- NO, if yes only do like the last three-

// in the center the result options are displayed
// since we will not be displaying the actual recipe we can grab the results.hits[i].recipe.label for the recipe title
////////// GRAB ALL OF THE RESULTS FROM THE TEN AND PLUG IT INTO A NEW ARRAY
// that is then displayed as a (link? button?) that uses results.hits[i].recipe.shareAs as the link
////////// LOOP THROUGH THAT ARRAY TO CREATE EACH OF THE BUTTONS

// optional: results.hits[i].recipe.healthLabels[each array item on it's own "button"] to display allergins or lack thereof

/////
// additional items: where should they go?
/////

// Do we want to use dancing food gifs from Jody (it's okay if we don't) -- if yes, where would we place them
// Are we using giphy to display fun food gifs? -- again, where will we be placing them

// AJAX CALLS FOR OUR TWO APIS
// function recipeSearch()
// function recipeBtnRender ()
// function giphyRender ()
// optional: function dancingGifRender ()
// optional: function allerginBtnRender ()
// on click for search
// on click for redirecting to found recipe website


