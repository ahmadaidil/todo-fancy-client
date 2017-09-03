$(function() {
    $('#login-form-link').click(function(e) {
        $("#login-form").delay(300).fadeIn(300);
            $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(300).fadeIn(300);
            $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
});

var login = new Vue({
    el: '#login',
    data: {
      loginUsername : null,
      loginPass : null,
      loginError : false,
      loginMessage : null,
  
      signupEmail : null,
      signupFullname : null,
      signupUsername : null,
      signupPass : null,
      signupMsg : null
  
    //   panel: false
    },
    methods: {
    //   togglePanel() {
    //     this.panel = !this.panel
    //   },
  
      login() {
        axios.post('http://localhost:3000/api/auth/signin', {
          username: this.loginUsername,
          password: this.loginPass
        })
        .then(result => {
          console.log(result.data)
          if (result.data.err) {
            this.loginError = true
            this.loginMessage = result.data.msg
            this.loginUsername = null
            this.loginPass = null
          } else {
            // $('.container').addClass("active")
            localStorage.setItem('accesstoken', result.data.token)
            // localStorage.setItem('fbAuth', false)
            this.loginError = false
            this.loginMessage = null
            this.loginUsername = null
            this.loginPass = null
            window.location = `${window.location.protocol}//${window.location.hostname}:8080/dashboard`
          }
        })
        .catch(err => console.log(err))
      },
  
      register() {
        axios.post('http://localhost:3000/api/auth/signup', {
          username: this.signupUsername,
          password: this.signupPass,
          fullname: this.signupFullname,
          email: this.signupEmail
        })
        .then(() => {
            $("#login-form").delay(300).fadeIn(300);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $("#login-form").addClass('active');
            this.signupUsername = null
            this.signupPass = null
            this.signupFullname = null
            this.signupEmail = null
        })
        .catch(err => { this.signupMsg=err.toString(), console.log(err) })
      }
    }
  })