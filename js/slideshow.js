const TOTAL_NAR = 6;
const TOTAL_NIGHT = 3;
const TOTAL_ML = 13;
var totalImages;
var currentPage =  1;
var width = $( window ).width();
var position;
var animating;

$(document).ready(function() {
  totalImages();

  loadPages();

  numbering();

  arrowKeys();

})

function totalImages () {
  if(window.location.href.indexOf("narratives") > -1) {
    totalImages = TOTAL_NAR;
  }
  else if(window.location.href.indexOf("night") > -1) {
    totalImages = TOTAL_NIGHT;
  }
  else if(window.location.href.indexOf("ml") > -1) {
    totalImages = TOTAL_ML;
  }
}

function loadPages () {
  for (var i = 1; i < (totalImages+1); i++) {
    $('.container').append('<section id="'+i+'"><img class="slideshow"src="images/'+i+'.jpg"></section>');
  }
}

function numbering () {

  //start numbering at 1
  $('body').append('<h4>'+currentPage+'<span id="total">/'+totalImages+'</span></h4>');

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
          $('body').append('<h4>'+currentPage+'<span id="total">/'+totalImages+'</span></h4>');
          //stop the iteration after the first one on screen
          return false;
      }
    });
  });
}

function arrowKeys () {
  $(document).keydown(function (evt) {
    if (evt.keyCode == 39 && currentPage != totalImages && animating != true) { // right arrow
      animating=true;
      setTimeout(function(){animating=false}, 700);
      evt.preventDefault();
      currentPage++;
      position = currentPage-1;
      width = $( window ).width();
      $('.container').animate({scrollLeft:(position*width)}, 400);
    }
    else if (evt.keyCode == 37 && currentPage > 1 && animating != true) { // left arrow
      animating=true;
      setTimeout(function(){animating=false}, 700);
      evt.preventDefault();
      currentPage--;
      position = currentPage-1;
      width = $( window ).width();
      $('.container').animate({scrollLeft:(position*width)}, 400);
    }

  });
}
