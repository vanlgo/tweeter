/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const renderTweets = (tweets) => {
  for (tweet of tweets) {
    const thisTweet = createTweetElement(tweet);
    $('#tweets-container').append(thisTweet);
  }
}

const createTweetElement = (data) => {
  const name = data["user"].name;
  const handle = data["user"].handle;
  const avatar = data["user"].avatars;
  const content = data["content"].text;
  const createdAt = timeago.format(data["created_at"]);

  let $tweet = `
  <article class="tweet">
  <header>
    <div>
      <img src="${avatar}"> 
      <h4>${name}</h4>
    </div>
    <p>${handle}</p>
  </header>
  <p>${content}</p>
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
    data: $(this).serialize(),
    success: function(submit) {
      renderTweets(submit);
    }
  })
};

loadTweets();

$(document).ready(function() {
  console.log("ready this doc");

  $("#tweet-form").submit(function(event) {
    event.preventDefault();

    if (!$("#tweet-text").val()) {
      return alert("Error, empty tweets cannot be posted");
    } else if ($("#tweet-text").val().length > 140) {
      return alert("Tweet not allowed to exceed 140 characters");
    } else {
      $.ajax("/tweets", {
        method: "POST",
        data: $(this).serialize(),
        success: function(data) {
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      })
    }
  });
  renderTweets(data);
});