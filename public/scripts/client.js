/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */





const createTweetElement = (data) => {
  const name = data["user"].name;
  const handle = data["user"].handle;
  const avatar = data["user"].avatars;
  const content = data["content"].text;
  const createDate = data["created_at"];
  const today = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;
  const createdAt = Math.round((today - createDate) / msPerDay);

  const template = `
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
    <sub>${createdAt} days ago</sub>
    <div class="tweeticons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;

  return template;
}

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

$(document).ready( () => {
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
})