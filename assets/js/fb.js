window.fbAsyncInit = function() {
  FB.init({
    appId      : '155617368351865',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  // FB.getLoginStatus(function(response) {
  //   statusChangeCallback (response)
  // });
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// function statusChangeCallback (response) {
//   if (response.status === 'connected') {
//     createAccess(response);
//     // localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
//     // localStorage.setItem('fbAuth', true);
//     // window.location = `${window.location.protocol}//${window.location.hostname}:8080/dashboard`
//     $('#login-btn').fadeOut('slow')
//     $('#timeline-wrapper').fadeIn('slow')
//   }
// }

// function checkLoginState() {
//     FB.getLoginStatus(function(response) {
//       statusChangeCallback(response);
//     });
//   }

function FBLogin () {
  FB.login(function(response) {
    // console.log('fblogin response ',response)
    if (response.authResponse) {
      createAccess(response.authResponse);
      // localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
      // localStorage.setItem('fbAuth', true);
      // window.location = `${window.location.protocol}//${window.location.hostname}:8080/dashboard`
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {scope: 'public_profile, email'});
}

function FBLogout () {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
        FB.logout(function(response) {
            //user is logout now
        });
    }
  });
}

function createAccess (response) {
  FB.api('/me', function(response){
    // console.log(response.id);
    axios.post('http://localhost:3000/api/auth/signinFB', {
      fullname : response.name,
      userId : response.id
    })
    .then(result=>{
      // console.log(result)
      localStorage.setItem('accesstoken', result.data.token)
      window.location = `${window.location.protocol}//${window.location.hostname}:8080/dashboard`
    })
    .catch(err=>{
      console.log(err)
    })
  })
}