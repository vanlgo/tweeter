console.log("Is this working?")

$(document).ready(function() {

  $("#tweet-text").on("input", function () {
    let charRemain = 140 - $(this).val().length;

    $(".counter").text(charRemain);

    if (charRemain < 0) {
      $(".counter").addClass("err")
    } else {
      $(".counter").removeClass("err")
    }
  });
});



