var menuOpen = false;

// Event listeners for once the window is loaded
$(document).ready(function(){
  
  //About Me scroll-sensitive card control
  createAboutObserver();

  //Navbar transparency control
  $(window).on("scroll", function () {
    if($(this).scrollTop() > 64 || menuOpen) {
      $("#navbar").addClass("navbar-not-transparent");
    }
    else{
      $("#navbar").removeClass("navbar-not-transparent")
      $("#navbar").addClass("transparent");
    }

  });

  //Fix glitches with menu display upon resize due to use of "slideUp" and "slideDown"
  var mobileThreshold = 843;
  $(window).on("resize", function(){
    if(menuOpen && $(this).width() > mobileThreshold){
      if($(window).scrollTop() < 64){
        $("#navbar").removeClass("navbar-not-transparent")
        $("#navbar").addClass("transparent");
      }

      menuOpen = false;
      $(".menu-icon").removeClass("menu-icon-selected")
    }
    if(!menuOpen && $(".navbar-menu-button").css("display") == "none" ){ //$(this).width() > mobileThreshold){
      $(".navbar-container").css('display','block');
    }
    if(!menuOpen && $(".navbar-menu-button").css("display") != "none" ){  //$(this).width() < mobileThreshold){
      $(".navbar-container").css('display','none');
    }
  });


  //Closes menu bar when user clicks outside of it
  $(document).on("click", function(event) {
    var over = $(event.target);
    //Checks if the navbar is expanded and the click target does not have a parent of class navbar
    if(menuOpen && over.closest(".navbar").length == 0){
      menuOpenClick();
    }

  });
});

function menuOpenClick(){
   //Menu close controls. Toggle transparency if needed
  if(menuOpen){
    if($(window).scrollTop() < 64){
      $("#navbar").removeClass("navbar-not-transparent")
      $("#navbar").addClass("transparent");
    }

    $(".menu-icon").removeClass("menu-icon-selected")
    $(".navbar-container").slideUp();
  }
  //Menu open controls
  else{
    $(".menu-icon").addClass("menu-icon-selected")
    $("#navbar").addClass("navbar-not-transparent");
    $(".navbar-container").slideDown();
  }
  menuOpen = !menuOpen;
}
function navClick(){
  if(menuOpen){
    menuOpenClick();
  }
}

//Intersection Observer Code for About Me page
function createAboutObserver() {
  var observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  var aboutObserver = new IntersectionObserver(handleAbout, observerOptions);
  aboutObserver.observe(document.getElementById("about-text"));
}

function handleAbout(entries, observer){
  entries.forEach(entry => {
    if (entry.isIntersecting){
      $("#about-text").addClass("card-hover-manual");
    }
    else{
      $("#about-text").removeClass("card-hover-manual");
    }
  })
}
