function animalGifDivConstructor(imgSrc, rating, id) {
  //construct a div for image object with rating and image source
  //parent div each object with class and id
  var animalGifDiv = $("<div>");
  $(animalGifDiv).attr("class", "animalGifDiv");
  $(animalGifDiv).attr("id", "aGD" + id);
  // p tag for rating display
  var p = $("<p>").text("Rating: " + rating);
  //image source duh
  var animalImage = $("<img>");
  animalImage.attr("src", imgSrc);
  //append the children to the parent
  animalGifDiv.append(p);
  animalGifDiv.append(animalImage);
  //prepend the collective object into the buttons div (this will later be the animals div)
  $("#animals").prepend(animalGifDiv);
}

function loadAjxObjs(query) {
  // AJAX query to pull down the GIF objects by animal name (query) and put them into the HTML
  $.ajax({
  	url: "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+query+"&limit=9&rating=r",
  	method: "GET"
  	}).done(function(response) { 
      gifs = response.data;
      console.log("gifs.length=", gifs.length);
      // self explanatory if nothing found
      if (gifs.length === 0) {
        $("#animals").empty();
        $("#animals").html("Oops, nothing found.");       
      } else {
        //run the div constructor for each image object
        for (i=0; i<gifs.length; i++) {animalGifDivConstructor(gifs[i].images.fixed_height.url, gifs[i].rating, i)}
      }
  });
}

$(document).on("click", "#b0", function() {
  // grab the input
	var animalQuery = $("#i0").val();
  //only do something if there's input present
	if (animalQuery !== "") {
    //clear out whatever was there before
    $("#animals").empty();
    //do my thang
    loadAjxObjs(animalQuery)
  }
});
