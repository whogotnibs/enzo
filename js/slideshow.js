const TOTAL_IMAGES = 6;
var currentPage =  1;

$(document).ready(function() {
  loadPages();

  numbering();

  arrowKeys();

})

function loadPages () {
  for (var i = 1; i < (TOTAL_IMAGES+1); i++) {
    $('.container').append('<section id="'+i+'"><img class="slideshow"src="images/'+i+'.jpg"></section>');
  }
}

function numbering () {

  //start numbering at 1
  $('body').append('<h4>'+currentPage+'<span id="total">/'+TOTAL_IMAGES+'</span></h4>');

  //check which section is showing
  $('.container').scroll(function() {
    var cutoff = $(window).scrollLeft();
    $('section').each(function(){
      if($(this).offset().left + $(this).width() > cutoff){
          //give the active section a class of "current" and update the current page
          $('section').removeClass('current');
          $(this).addClass('current');
          currentPage = this.id;
          //update the page number
          $('h4').remove();
          $('body').append('<h4>'+currentPage+'<span id="total">/'+TOTAL_IMAGES+'</span></h4>');
          //stop the iteration after the first one on screen
          return false;
      }
    });
  });
}

function arrowKeys () {
  $(document).keydown(function (evt) {
    if (evt.keyCode == 39 && currentPage != TOTAL_IMAGES) { // right arrow
      evt.preventDefault(); // prevents the usual scrolling behaviour
      scrollToNext(); // scroll to the next section
    }
    else if (evt.keyCode == 37 && currentPage > 1) { // left arrow
      evt.preventDefault(); // prevents the usual scrolling behaviour
      scrollToPrevious(); // scroll to the next section
    }
  });
}

function scrollToNext () {

}

function scrollToPrevious () {

}
