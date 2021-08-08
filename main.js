var menuOpen = false;

// Event listeners for once the document is ready
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

    //Fix project card button location
    projectCardReposition();

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

//Code to fire once the whole window is fully loaded
$(window).on("load", function(){
  //Fix project card button location
  projectCardReposition();
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

//Repositions buttons under project cards to make better use of the space. Called upon load and viewport resize.
function projectCardReposition(){
  var buttons = new Array();
  $(".project-button").each(function(){
    buttons.push($(this));
    
  });

  buttons.forEach(button => {
    var requiredMargin = 15;
    
    var card = button.closest(".project-box");
    var imageHeight = parseFloat(card.find(".project-image").css("height"));
    var titleHeight = parseFloat(card.find(".project-title").css("height"));
    var textHeight = parseFloat(card.find(".project-text").css("height"));
    var buttonHeight = parseFloat(button.css("height"));

    var paddingOffset = 53;
    var ttbCombined = titleHeight + textHeight + buttonHeight + paddingOffset;

    var textWidth = parseFloat(card.find(".project-text").css("width"));
    card.find(".project-button-wrapper").css("width",textWidth);

    if(textWidth <= 300 && $(window).width() <= 699){
      button.css("width", "95%");
      card.find(".project-button-divider").css("display","none");
    }
    else if(textWidth <= 300 && $(window).width() >= 699){
      card.find(".project-button-divider").css("width",0);
      card.find(".project-button-divider").css("display","inline-block");
    }
    else{
      button.css("width", "42.5%");
      card.find(".project-button-divider").css("display","inline-block");
    }

    //button.css("width", 0.42 * textWidth)

    if (ttbCombined < imageHeight && $(window).width() >= 699){
      requiredMargin = imageHeight - ttbCombined;
      if (requiredMargin < 15){
        requiredMargin = 15;
      }
    }
    button.css("margin-top", requiredMargin);
  })
}
