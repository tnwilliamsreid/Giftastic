$(document).ready(function() {

var topics = [];

 	function display_topics() {

	var x = $(this).data("search");
	console.log(x);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=y2Wo2WbcUFwSA41dIZr9FqG0EgPhGWB6&limit=10";

	console.log(queryURL);

	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
        	console.log(results);
        	for (var i = 0; i < results.length; i++) {

        	var topicsDiv = $("<div class='col-md-4'>");

        	var rating = results[i].rating;
        	var defaultAnimatedSrc = results[i].images.fixed_height.url;
        	var staticSrc = results[i].images.fixed_height_still.url;
        	var topicsImage = $("<img>");
        	var p = $("<p>").text("Rating: " + rating);

        	topicsImage.attr("src", staticSrc);
        	topicsImage.addClass("_Giphy");
        	topicsImage.attr("data-state", "still");
        	topicsImage.attr("data-still", staticSrc);
        	topicsImage.attr("data-animate", defaultAnimatedSrc);
        	topicsDiv.append(p);
        	topicsDiv.append(topicsImage);
        	$("#gifArea").prepend(topicsDiv);

        }
	});
}

	$("#addtopics").on("click", function(event) {
        event.preventDefault();
        var newtopics = $("#topicInput").val().trim();
        topics.push(newtopics);
        console.log(topics);
        $("#topicInput").val('');
        displayButtons();
      });

	function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "topics");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $("#myButtons").append(a);
    }
  }


  displayButtons();

  $(document).on("click", "#topics", display_topics);

  $(document).on("click", "._Giphy", pausePlayGifs);

  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

});
