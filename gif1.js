$(document).ready(function() {
  //Create array of reaction buttons
  var buttonArray = [
          "Tiger Woods",
          "Lewis Hamilton",
          "Steph Curry",
          "John Daly",
          "Giannis Antetokounmpo",
          "Wayne Simmons",
          "James Harden",
          "Ben Hogan",
          "Allen Iverson"
        ];





      for (var i = 0; i < buttonArray.length; i++) {
    var buttons = $(
      "<button class=reactionBtn id=" +
        buttonArray[i] +
        ">" +
        buttonArray[i] +
        "</button>"
    );
    buttons.appendTo($("#buttonRow"));



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




  $("body").on("click", "button", function() {
    console.log("clicked");
    var buttonText = $(this).attr("id");
    var apikey = "w6louPuZQ3IE5T5h9AcEP91gPGYNd2by";
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
