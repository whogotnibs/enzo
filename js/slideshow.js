var project = [
  //name, number of images, url
  ["NARRATIVES", 6, "narratives"],
  ["NIGHT", 3, "night"],
  ["MANUFACTURED", 14, "ml"],
]
var proj;
var totalImages;
var currentPage =  1;
var width = $( window ).width();
var position;
var animating;
var x;
var prevx;

$(document).ready(function() {

  setProject();

  updatePage();

  arrowKeys();

})

function setProject () {
  //define the project
  if(window.location.href.indexOf(project[0][2]) > -1) {
    proj = 0;
  }
  else if(window.location.href.indexOf(project[1][2]) > -1) {
    proj = 1;
  }
  else if(window.location.href.indexOf(project[2][2]) > -1) {
    proj = 2;
  }
  //find out how many images are in the given project
  totalImages = project[proj][1];
  for (var i = 1; i < (totalImages+1); i++) {
    //add the pages
    $('.container').append('<section id="'+i+'"><img class="slideshow"src="images/'+i+'.jpg"></section>');
    //add the navigation tabs
    $('.nav').append('<li id="tab'+i+'"><a>|</a></li>');
    tabs();
  }
  //write the project name
  $('#title').append(project[proj][0]);

  var prevproj = proj-1;
  if (prevproj < 0) {prevproj = 2;}
  var nextproj = proj+1;
  if (nextproj > 2) {nextproj = 0;}
  $("#upbox").wrap("<a href='../"+project[prevproj][2]+"/index.html'></a>");
  $("#downbox").wrap("<a href='../"+project[nextproj][2]+"/index.html'></a>");
}


function updatePage () {
  $('.container').scroll(function() {

    var leftCutoff = $(window).scrollLeft();
    var rightCutoff = $( window ).width();
    prevx = x;
    x = $('.container').scrollLeft();
    console.log(prevx, x);

    //left scroll
    if (prevx > x) {
      $('section').each(function(){
        if($(this).offset().left + $(this).width() > leftCutoff){
            currentPage = this.id;
            tabs();
            return false;
        }
      });
    }

    //right scroll
    else {
      $($("section").get().reverse()).each(function(){
        if($(this).offset().left < rightCutoff){
            currentPage = this.id;
            tabs();
            return false;
        }
      });
    }
  });
}

function tabs () {
  $('li').css({
    "color": "white",
    "font-size": "145px",
    "transition": "all .3s ease-in-out",
    "-webkit-transition": "all .5s ease-out",
    "-moz-transition": "all .5s ease-out",
    "-o-transition": "all .5s ease-out",
  });
  $('#tab'+currentPage).css({
    "color": "grey",
    "font-size": "153px",
    "transition": "all .3s ease-in-out",
    "-webkit-transition": "all .5s ease-out",
    "-moz-transition": "all .5s ease-out",
    "-o-transition": "all .5s ease-out",
  });

  $('li').click(function() {
    var id = this.id
    var target = id.replace('tab', '');
    width = $( window ).width();
    $('.container').clearQueue().animate({scrollLeft:((target-1)*width)}, 500);
  });
}

function arrowKeys () {
  $(document).keydown(function (evt) {
    if (evt.keyCode == 39 && currentPage != totalImages && animating != true) { // right arrow
      setTimeout(function(){animating=false}, 700);
      animating=true;
      evt.preventDefault();
      currentPage++;
      position = currentPage-1;
      //fixes glitch where it sometimes it goes slightly past and scrolls 2 pages
      width = $( window ).width();
      $('.container').clearQueue().animate({scrollLeft:(position*width)}, 200);
    }
    else if (evt.keyCode == 37 && currentPage > 1 && animating != true) { // left arrow
      setTimeout(function(){animating=false}, 700);
      animating=true;
      evt.preventDefault();
      currentPage--;
      position = currentPage-1;
      width = $( window ).width();
      $('.container').clearQueue().animate({scrollLeft:(position*width)}, 200);
    }
    console.log(animating);

  });
}
