var TOKEN = localStorage.getItem('xsffncToken');
var PAGE = 1;

function getContacts(page) {
  var cb = $('#contactsBoard');
  
  // Pagination highlighting
  if (page > 1) {
    $('#prevLi').removeClass('disabled');
  } else if (page === 1) {
    $('#prevLi').addClass('disabled');
  }

  $.ajax({
    url: 'http://localhost:8000/api/contact/page/'+page,
    headers: { 'Authorization':  TOKEN},
    success: function (data, status) {
      if (data.contacts.length === 0) {
        $('#noMsg').show();
        $('#nextLi').addClass('disabled');
      } else {
        $('#noMsg').hide();
        $('#nextLi').removeClass('disabled');
      }
    },
    error: function (data, status) {
      $('#contactsError').show();
    }
  });
}

$('document').ready(function() {
  getContacts(PAGE);

  // Button Listeners
  $('#logoutBtn').click(function() {
    localStorage.removeItem('xsffncToken');
    window.location.replace('/login');
  });
  $('#prevPage').click(function() { 
    PAGE--;
    getContacts(PAGE);
    return false;
  });
  $('#nextPage').click(function() { 
    PAGE++;
    getContacts(PAGE);
    return false;
  });
});