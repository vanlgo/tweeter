/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const renderTweets = (tweets) => {
  // fixing duplication bug
  $("#tweets-container").empty();
  for (const tweet of tweets) {
    const thisTweet = createTweetElement(tweet);
    // changed to post prior to all other data
    $("#tweets-container").prepend(thisTweet);
  }
};

// creating a function that stops scripting attacks
const textEscape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (data) => {
  // creating timestamp
  const createdAt = timeago.format(data["created_at"]);

  // creating template for tweet
  let $tweet = `
  <article class="tweet">
  <header>
    <div>
      <img src="${textEscape(data["user"].avatars)}"> 
      <h4>${textEscape(data["user"].name)}</h4>
    </div>
    <p>${textEscape(data["user"].handle)}</p>
  </header>
  <p>${textEscape(data["content"].text)}</p>
  <footer>
    <sub>${createdAt}</sub>
    <div class="tweeticons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;

  return $tweet;
};

const loadTweets = function() {
  $.ajax("/tweets", {
    method: "GET",
    success: function(data) {
      renderTweets(data);
    }
  });
};



$(document).ready(function() {
  console.log("ready this doc");
  
  loadTweets();

  $("#tweet-form").submit(function(event) {
    event.preventDefault();

    if (!$("#tweet-text").val()) { // checking for empty value
      $(".error-message").before('<i class="fas fa-exclamation-triangle"></i>').text("Error, empty tweets cannot be posted").after('<i class="fas fa-exclamation-triangle"></i>');
    } else if ($("#tweet-text").val().length > 140) { // checking for character limit overage
      $(".error-message").before('<i class="fas fa-exclamation-triangle"></i>').text("Tweet not allowed to exceed 140 characters").after('<i class="fas fa-exclamation-triangle"></i>');
    } else {
      $.ajax("/tweets", {
        method: "POST",
        data: $(this).serialize(),
        success: function(data) {
          console.log(data);
          loadTweets();
          $("#tweet-text").val("")
        },
        error: function(error) {
          console.log(error);
        }
      })
    }
  })
});