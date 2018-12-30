var TOKEN = localStorage.getItem('xsffncToken');
var PAGE = 1;
var API_HOST = 'http://localhost:8000';

/**
 * Deletes contact object by id
 */
function deleteContact(id) {
  $.ajax({
    url: API_HOST+'/api/contact/'+id,
    headers: { 'Authorization':  TOKEN},
    type: 'DELETE',
    success: function(data, status) {
      // Remove contact card and refresh
      getContacts(PAGE);
    },
    error: function(data, status) {
      $('#contactsError').html('Error deleting Contact object id='+id).show();
    }
  });
  return false;
}

/**
 * Returns the HTML for a contact object
 */
function buildContactCard(contact) {
  // I know template strings are ES6 but I'm 
  // only going to use this in Chrome 
  return `<div class="card mb-3" id="${contact._id}">
    <div class="card-body">
      <h5 class="card-title">${contact.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${contact.email}</h6>
      <p class="card-text">${contact.message}</p>
      <a href="mailto:${contact.email}" class="card-link text-primary" role="button" target="_blank">Reply</a>
      <a href="" onclick="return deleteContact('${contact._id}')" class="card-link text-danger" role="button">Delete</a>
    </div>
    <div class="card-footer text-muted">${contact.date.toString()}</div>
  </div>`;
}

/**
 * Fetches contact objects from admin API.
 */
function getContacts(page) {
  // Empty contacts board
  var cb = $('#contactBoard');
  cb.empty();

  // Pagination highlighting
  if (page > 1) {
    $('#prevLi').removeClass('disabled');
  } else if (page === 1) {
    $('#prevLi').addClass('disabled');
  }

  $.ajax({
    url: API_HOST+'/api/contact/page/'+page,
    headers: { 'Authorization':  TOKEN},
    success: function (data, status) {
      
      if (data.contacts.length === 0) {
        $('#noMsg').show();
        $('#nextLi').addClass('disabled');
      } else {
        $('#noMsg').hide();
        $('#nextLi').removeClass('disabled');
        
        data.contacts.forEach(contact => {
          const contactCard = buildContactCard(contact);
          cb.append(contactCard);
        });
      }
    },
    error: function (data, status) {
      $('#contactsError').html('Failed to fetch data!').show();
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