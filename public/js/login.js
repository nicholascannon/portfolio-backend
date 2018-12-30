var API_HOST = 'http://localhost:8000';

$('document').ready(function() {
  $('#loginForm').submit(function(e) {
    e.preventDefault();
    
    $.ajax({
      type: 'POST',
      url: API_HOST+'/api/auth/login',
      data: { password: $('#userPassword').val() },
      success: function(data, status) {
        localStorage.setItem('xsffncToken', data.token);
        window.location.replace('/');
      },
      error: function(data, status) {
        alert('incorrect');
      }
    })
  });
});