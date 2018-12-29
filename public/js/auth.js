if (!localStorage.getItem('xsffncToken')) {
  window.location.replace('/login');
} else {
  // validate token
  var token = localStorage.getItem('xsffncToken');
  $.ajax({
    url: 'http://localhost:8000/api/auth/validate',
    headers: { 'Authorization': token },
    success: function(data, status) {
      if (!data.valid) {
        // Token is invalid
        window.location.replace('/login');
      }
    }
  })
}