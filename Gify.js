$(document).ready(function() {
  //Create array of reaction buttons
  var buttonArray = [
    "shocked",
    "angry",
    "happy",
    "sad",
    "bored",
    "miserable",
    "confused",
    "excited",
    "irritated",
    "annoyed",
    "intrigued",
    "elated",
    "bashful",
    "fatigued",
    "gloomy",
    "jealous",
    "lonely",
    "naughty",
    "panicked",
    "serene",
    "victorious",
    "violent",
    "zany"
  ];

  //For loop to create buttons from array items
  for (var i = 0; i < buttonArray.length; i++) {
    var buttons = $(
      "<button class=reactionBtn id=" +
        buttonArray[i] +
        ">" +
        buttonArray[i] +
        "</button>"
    );
    buttons.appendTo($("#buttonRow"));
  }
  //Create function which takes user input from form and adds text to buttonArray array
  $("#submitBtn").click(function() {
    var newButtonVal = $("#btnAdder")
      .val()
      .trim();
    buttonArray.push(newButtonVal);
    var newButton = $(
      "<button class=reactionBtn id=" +
        newButtonVal +
        ">" +
        newButtonVal +
        "</button>"
    );
    newButton.appendTo($("#buttonRow"));
  });
  //Create function which generates gifs when user clicks reactionBtns
  //Create url for giphy API on button click
  $("body").on("click", "button", function() {
    console.log("clicked");
    var buttonText = $(this).attr("id");
    var apikey = "vZnidhqhpNZPO651y0Y99NnMGh197Sz4";
    var queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      buttonText +
      "&api_key=" +
      apikey +
      "&limit=10";
    //Get array of objects from giphy API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      //Add gifs to page
      var results = response.data;

      for (var j = 0; j < results.length; j++) {
        //create row to append in two columns -- gif and rating & gif info
        //gif and rating
        var gifRow = $("<div class=row>");
        var reactionGifDiv = $("<div id=gifAndRating class=col-md-6>");
        var rated = $("<p>");
        rated.text("Rated: " + results[j].rating);
        var reactionGif = $(
          "<img class='gif' src=" + results[j].images.fixed_height.url + ">"
        );
        //gif info
        var reactionInfo = $("<div id=gifInfo class=col-md-6>");
        var gifSource = $("<a id=sourceLink target='_blank'>");
        gifSource.attr("href", results[j].url);
        gifSource.text("Source");
        var title = $("<p>");
        title.text(results[j].title);
        var download = $(
          "<a id=downloadBtn href='" +
            results[j].images.original.url +
            "' download=>"
        );
        download.text("Download");
        //append gif and rating to reactionGifDiv
        rated.appendTo(reactionGifDiv);
        reactionGif.appendTo(reactionGifDiv);
        //append gif info to reactionInfo
        gifSource.appendTo(reactionInfo);
        title.appendTo(reactionInfo);
        download.appendTo(reactionInfo);
        //append both to gifRow
        reactionGifDiv.appendTo(gifRow);
        reactionInfo.appendTo(gifRow);
        //prepend gifRow to gifDiv
        gifRow.prependTo($("#gifDiv"));
      }
      $(function() {
        $("img").each(function(e) {
          var src = $(e).attr("src");
          $(e).click(
            function() {
              $(this).attr("src", replace("_s.gif", ".gif"));
            },
            function() {
              $(this).attr("src", src);
            }
          );
        });
      });
    });
  });
  $("body").on("click", "img", function() {
    console.log("clicked");
    var imgSrc = $(this).attr("src");
    imgSrc.indexOf("_s.gif");
    $(this)
      .attr("src")
      .replace("_s.gif", ".gif");
  });

  //OFFICE HOURS: 1.) Download buttons not triggering download. does this need to be a function? Or are the hrefs wrong?
  //OFFICE HOURS: 2.) Touchstart doesn't work on mobile
  //OFFICE HOURS: 3.) Images don't play/pause on click. Tried the commented function and click event above.
});
