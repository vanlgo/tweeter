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

const createTweetElement = (data) => {
  // creating timestamp
  const createdAt = timeago.format(data["created_at"]);

  // creating template for tweet
  let $tweet = `
  <article class="tweet">
  <header>
    <div>
      <img src="${data["user"].avatars}"> 
      <h4>${data["user"].name}</h4>
    </div>
    <p>${data["user"].handle}</p>
  </header>
  <p>${data["content"].text}</p>
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
      return alert("Error, empty tweets cannot be posted");
    } else if ($("#tweet-text").val().length > 140) { // checking for character limit overage
      return alert("Tweet not allowed to exceed 140 characters");
    } else {
      $.ajax("/tweets", {
        method: "POST",
        data: $(this).serialize(),
        success: function(data) {
          console.log(data);
          loadTweets();
        },
        error: function(error) {
          console.log(error);
        }
      })
    }
  })
});