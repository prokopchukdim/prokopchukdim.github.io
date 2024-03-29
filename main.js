var menuOpen = false;
var mobileThreshold = 860;
var observedAboutCounter = 0;
var observedAboutMin = 0;

// Event listeners for once the document is ready
$(document).ready(function(){

  var particleJson = {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#efae48"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 203.7962037962038,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };
  //Enable particles.js background
  particlesJS('particles-js', particleJson);


  //Scroll-sensitive animation control
  var observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6
  }
  var projectObserver = new IntersectionObserver(handleProject, observerOptions);
  
  //Keep About box observed as long as any of its subtitles are observed
  observerOptions["threshold"] = 0.0;
  var aboutObserver = new IntersectionObserver(handleAbout, observerOptions);

  var aboutTexts = $('.about-subtitle').get();
  aboutTexts.forEach(title => {
    aboutObserver.observe(title);
    observedAboutMin -= 1;
  });
  observedAboutCounter = observedAboutMin;

  // aboutObserver.observe(document.getElementById("about-text"));

  //Improves animation timing for mobile screens
  if ($(window).width() <= mobileThreshold){
    var projectCards = $(".project-box").get();
    projectCards.forEach(card => {
      projectObserver.observe(card);
    })
  }


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
  $(window).on("resize", function(){

    //Fix project card button location
    projectCardReposition();

    //Recreates scroll-sensitive animation control to account for switch between desktop and mobile
    var projectCards = $(".project-box").get();
    if ($(window).width() >= mobileThreshold){
      projectCards.forEach(card => {
        card.classList.remove("card-hover-manual");
      })
      projectObserver.disconnect();
    }
    else{
      projectCards.forEach(card => {
        projectObserver.observe(card);
      })
    }

    if(menuOpen && $(this).width() > mobileThreshold){
      if($(window).scrollTop() < 64){
        $("#navbar").removeClass("navbar-not-transparent")
        $("#navbar").addClass("transparent");
      }

      menuOpen = false;
      $(".menu-icon").removeClass("menu-icon-selected")
    }
    if(!menuOpen && $(".navbar-menu-button").css("display") == "none" ){ //$(this).width() > mobileThreshold){
      $(".navbar-container").css('display','flex');
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
  //Fix project card button location. Has to be called twice, once with delay, to fix a weird display bug.
  projectCardReposition();

  setTimeout(function() {
    projectCardReposition();
}, 100);

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

// //Intersection Observer Code for About Me page

function handleAbout(entries, observer){

  entries.forEach(entry => {
    if (entry.isIntersecting){
      observedAboutCounter += 1;
    }
    else {
      if (observedAboutCounter > observedAboutMin) {
        observedAboutCounter -= 1;
      }
    }
  });

  if (observedAboutCounter > observedAboutMin) {
    $("#about-text").addClass("card-hover-manual");
  }
  else {
    $("#about-text").removeClass("card-hover-manual");
  }
}

//Handles project cards upon scroll for mobiles
function handleProject(entries, observer){
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add("card-hover-manual");
    }
    else{
      entry.target.classList.remove("card-hover-manual");
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
    // button.css("margin-top", requiredMargin);
    card.find(".project-button-wrapper").css("margin-top", requiredMargin);
  })
}
