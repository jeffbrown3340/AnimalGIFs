var gifAjxObjs;

function animalGifDivConstructor(imgSrc, rating, id) {
  var animalGifDiv = $("<div>");
  $(animalGifDiv).attr("class", "animalGifDiv");
  $(animalGifDiv).attr("id", "aGD" + id);
  var p = $("<p>").text("Rating: " + rating);
  var animalImage = $("<img>");
  // "http://media0.giphy.com/media/l2SpLKjTKEBhYqbbq/200.gif"
  animalImage.attr("src", imgSrc);
  animalGifDiv.append(p);
  animalGifDiv.append(animalImage);
  $("#animalButtons").prepend(animalGifDiv);
}

function loadAjxObjs(query) {
  $.ajax({
  	url: "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+query+"&limit=9&rating=r",
  	method: "GET"
  	}).done(function(response) { 
      gifs = response.data;
      console.log("gifs.length=", gifs.length);
      for (i=0; i<gifs.length; i++) {
	      animalGifDivConstructor(gifs[i].images.fixed_height.url, gifs[i].rating, i);
	  }
  });
}

$(document).on("click", "#b0", function() {
  $("#animalButtons").empty();
	var animalQuery = $("#i0").val();
	if (animalQuery !== "") {loadAjxObjs(animalQuery)};
});
