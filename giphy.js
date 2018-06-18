
    //Array of topics
    let topics = [
      'cats',
      'dogs',
      'birds',
      'dice'];

$(document).ready(function(){

      for (var i = 0; i < topics.length; i++) {
        var buttons = $("<button>" + topics[i] + "</button>");
        buttons.appendTo("#topics");
        buttons.attr('id', topics[i]);
      }

      $("#input").on("click", function(event){
        event.preventDefault();
        
        let input = $("#search").val();
        topics.push(input);
        console.log(topics);

        let newButton = $("<button>" + topics[topics.length - 1] + "</button>");
        newButton.appendTo("#topics");
        newButton.attr('id', topics[topics.length - 1]);

      });

    // Event listener for our topic-buttons
    $("button").click(function() { 
      console.log($(this).attr("id"));  

      // Storing our giphy API URL for a random cat image
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("id") + "&api_key=s3fyAuzwI6ayhreBgJCwuPg9LtypOkPe&limit=10"; 
      
      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .done(function(response) {

        
        // Creating a paragraph tag with the result item's rating
        var results = response.data;
        //console.log(response);
        //loop
        for (var i = 0; i < results.length; i++) {
          
        

        var p = $("<p>").text("Rating: " + results[i].rating);
        // Saving the image_original_url property still and gif
        var imageUrl = response.data[i].images.original.url;
        //console.log(imageUrl);
        var imageStill = response.data[i].images.original_still.url;
        //console.log(response.data["0"].images.original_still.url);

        // Creating and storing an image tag
        var topicImage = $("<img>");

        // Setting the topicImage src attribute to imagestill
        topicImage.attr("src", imageStill);
        topicImage.attr("class", "gif");
        topicImage.attr("data-state", "still");
        topicImage.attr("data-animate", imageUrl);
        topicImage.attr("data-still", imageStill);

        // Prepending the topicImage and rating to the images div
        $("#images").prepend(p);
        $("#images").prepend(topicImage);
        //$("#images").clearQueue();
        }

      });
    });
    //Listeners for the gif pausing
    $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      console.log(this);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

});