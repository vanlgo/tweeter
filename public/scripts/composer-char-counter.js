console.log("Is this working?")

$(document).ready(function() {

  $("#tweet-text").on("input", function() {
    // checking how many characters are left in the counter
    let charRemain = 140 - $(this).val().length;

    // searching for counter in the DOM tree
    let counter = $(this).next("div").children(".counter");

    // allowing counter to find remaining count
    counter.text(charRemain);

    if (charRemain < 0) {
      counter.addClass("charError")
    } else {
      counter.removeClass("charError")
    }
  });
});



