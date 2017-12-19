
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
