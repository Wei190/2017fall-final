
  $(document).ready(function() {
    $('#closeBtn').click(function() {
      $('.homeBackgroundContainer').fadeOut();
      $('.backgroundOverlay').fadeOut();
    })
    // setTimeout(function() {
    //   $('.homeBackgroundContainer').fadeIn();
    //   $('.backgroundOverlay').fadeIn();
    // }, 3000)
    $('.backgroundOverlay').click(function(event) {
      $('.homeBackgroundContainer').fadeOut();
      $('.backgroundOverlay').fadeOut();
    });

    //slide trigger logic
    $('#slideTrigger').click(function(event) {
      $('#body').toggleClass('body-move-down');
      $('.yellowbee').fadeOut()
    });
    $('.closeSlideBtn').click(function(event) {
      $('#body').toggleClass('body-move-down');
      $('.yellowbee').fadeIn();
    });
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $(".button-collapse").sideNav();

    $('.featured-flights').owlCarousel({
          loop:true,
          margin:20,
          nav:false,
          center: false,
          responsive:{
              0:{
                  items:1,
                  stagePadding: 50,
                  margin: 30,
                  center: false,
              },
              600:{
                  items:3
              },
              1000:{
                  items:3
              },
              1300: {
                items: 3
              }
          },
          autoplay:true,
          autoplayTimeout:3000,
          autoplayHoverPause:true
      })
      $('.popular-flights').owlCarousel({
          loop:true,
          margin:20,
          nav:false,
          center: false,
          responsive:{
              0:{
                  items:1,
                  stagePadding: 50,
                  margin: 30,
                  center: false,
              },
              600:{
                  items:3
              },
              1000:{
                  items:4
              },
              1300: {
                items: 4
              }
          },
          autoplay:true,
          autoplayTimeout:2000,
          autoplayHoverPause:true
      })
      $('.featured-trainers').owlCarousel({
          loop:true,
          margin:20,
          nav:false,
          responsive:{
              0:{
                  items:1
              },
              600:{
                  items:2
              },
              1000:{
                  items:3
              },
              1300: {
                items: 3
              }
          },
          autoplay:true,
          autoplayTimeout:2000,
          autoplayHoverPause:true
      })
      $('.featured-school').owlCarousel({
          loop:true,
          margin:20,
          nav:false,
          responsive:{
              0:{
                  items:1
              },
              600:{
                  items:2
              },
              1000:{
                  items:3
              },
              1300: {
                items: 3
              }
          },
          autoplay:true,
          autoplayTimeout:2000,
          autoplayHoverPause:true
      })



    $modal = $('.modal-frame');
    $overlay = $('.modal-overlay1');

    /* Need this to clear out the keyframe classes so they dont clash with each other between ener/leave. Cheers. */
    $modal.bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
      if($modal.hasClass('state-leave')) {
        $modal.removeClass('state-leave');
      }
    });

    $('.close').on('click', function(){
      $overlay.removeClass('state-show');
      $modal.removeClass('state-appear').addClass('state-leave');
    });

    $('.authBtn').on('click', function(){
      console.log(12111)
      $overlay.addClass('state-show');
      $modal.removeClass('state-leave').addClass('state-appear');
    });
      $('.dropdown-button').dropdown({
           inDuration: 300,
           outDuration: 225,
           constrain_width: true,
           hover: false,
           gutter: 0,
           belowOrigin: false
           }
      );
    $(function() {
        var arr = ['S','Sk','Sky','Sky','Sky','Sky','Sky','Sky','Sky','Sky','Sk','S','T', 'To', 'Tou', 'Tour', 'Tour', 'Tour', 'Tour', 'Tour', 'Tour', 'Tou', 'T','F','Fl','Fli','Flig','Fligh','Flight', 'Flight ', 'Flight T', 'Flight Tr', 'Flight Tra', 'Flight Trai', 'Flight Train', 'Flight Traini', 'Flight Trainin', 'Flight Training','Flight Training','Flight Training','Flight Training','Flight Training','Flight Training','Flight Training','Flight Training','Flight Training','Flight Training','Flight Trainin','Flight Traini','Flight Tra','Flig','F',];
        var elem = $('#ani');
        var i = 0;
        var loop = function(){
          elem.text(arr[i++]);
          if(i>arr.length) {
            //clearInterval(intervalID);
          //   if (i>=12) {
          //   $('#ani').css('color', 'red')
          // }
              i=0;
            }

        }

        var intervalID = setInterval(loop, 100);
      })
  });

  function onSignIn(googleUser) {
  if (clicked) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token: " + id_token);


    $.ajax({
      type: "POST",
      url: '/ajax/googleRegister',
      dataType: "json",
      data: {
        username: profile.getId(),
        email: profile.getEmail(),
        password: id_token
      },
      success: function(json) {
        if (json.success) {
          location.href = window.location;
        } else {
          if (JSON.stringify(json.error) == JSON.stringify("google account already exists")) {
            $.ajax({
              type: "POST",
              url: '/ajax/login',
              dataType: "json",
              data: {
                username: profile.getId(),
                email: profile.getEmail(),
                password: id_token,
                isGoogle: true
              },
              success: function(json) {
                if (json.success) {
                  location.href = window.location;
                } else {
                  console.log("Failed to signin: " + JSON.stringify(json.error));
                }
              },
              error: function(error) {
                console.log("Failed to signin: " + JSON.stringify(error));
              }
            });
          } else {
            console.log("Failed to register: " + JSON.stringify(json.error));
          };

        }
      },
      error: function(error) {

      }
    });
  }
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId: '1415410545232892',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v2.10'
  });
  FB.AppEvents.logPageView();

  };

  (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function googleClick() {
  // console.log("#googleButton");
  // jQuery('#googleButton')[0].trigger("click");
  $('.g-signin2')[0].click();
  clicked = true;
  }

  function checkLoginState() {
  FB.getLoginStatus(function(response) {
    var result = "status: " + JSON.stringify(response.status);
    if (response.authResponse) {
      result = result + "<br/>userID: " + JSON.stringify(response.authResponse.userID);
    }
    $("#status").html(result);
    console.log(response);
  });

  }

  function myFacebookLogin() {
  FB.login(function() {
    FB.api('/me', {
        locale: 'en_US',
        fields: 'id,name,gender,email'
      },
      function(response) {
        $.ajax({
          type: "POST",
          url: '/ajax/facebookRegister',
          dataType: "json",
          data: {
            username: response.id,
            email: response.name.replace(" ", "_") + "@airacer.com"
          },
          success: function(json) {
            if (json.success) {
              location.href = window.location;
            } else {
              if (JSON.stringify(json.error) == JSON.stringify("facebook account already exists")) {
                $.ajax({
                  type: "POST",
                  url: '/ajax/login',
                  dataType: "json",
                  data: {
                    username: response.id,
                    email: response.name.replace(" ", "_") + "@airacer.com",
                    isFacebook: true
                  },
                  success: function(json) {
                    if (json.success) {
                      location.href = window.location;
                    } else {
                      console.log("Failed to signin: " + JSON.stringify(json.error));
                    }
                  },
                  error: function(error) {
                    console.log("Failed to signin: " + JSON.stringify(error));
                  }
                });
              } else {
                console.log("Failed to register: " + JSON.stringify(json.error));
              };

            }
          },
          error: function(error) {

          }
        });
        console.log(response);
      }
    );

  }, {
    scope: 'email,publish_actions'
  });
  }

  function fbLogout() {
  FB.logout(function(response) {
    $("#status").html("logout");
  });
  }
