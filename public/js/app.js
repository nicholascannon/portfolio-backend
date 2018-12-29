var TOKEN = localStorage.getItem('xsffncToken');

function getContacts(page) {
  var cb = $('#contactsBoard');

  $.ajax({
    url: 'http://localhost:8000/api/contact/page/'+page,
    headers: { 'Authorization':  TOKEN},
    success: function (data, status) {
      if (data.contacts.length === 0) {
        // No contact objects
        
      }
    },
    error: function (data, status) {

    }
  })
}

$('document').ready(function() {
  getContacts(1);
});