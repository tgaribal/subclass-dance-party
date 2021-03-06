$(document).ready(function() {
  window.dancers = [];
  
  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
    var dancer = new dancerMakerFunction(
      $('body').height() * Math.random() - 120,
      $('body').width() * Math.random() - 120,
      Math.random() * 1000
    );
    window.dancers.push(dancer);
    $('body').append(dancer.$node);
  });

  $(document).on('mousedown', '.dancer', function() {
    $(this).draggable();
  });

  $(document).on('click', '.dancer', function() {
    $(this).css('background-image', 'url("assets/explosion.gif")');
    var temp = $(this);
    setTimeout(function () {
      temp.remove();
    }, 400);
  });


  $('.lineUp').on('click', function(event) {
    for (var i = 0; i < window.dancers.length; i++) {
      var lth = window.dancers.length;
      window.dancers[i].lineUp(i, lth);
    }
  });
  $('.party').on('click', function(event) {
    for (var i = 0; i < window.dancers.length; i++) {
      if (window.dancers[i].linedUp) {
        window.dancers[i].step();
        this.lineUp = false;
      }
    }
  });

  $('.clear').on('click', function(event) {
    for (var i = 0; i < window.dancers.length; i++) {
      window.dancers[i].$node.remove();
    }
    window.dancers = [];
  });
});


