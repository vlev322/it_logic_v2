$(document).ready(function() {
  $('#contact_form').submit(function(){
    $('.contact_spinner').fadeIn(100);
  });

  contactUs = {
    toggleContactForm: function() {
      $('.contact_success').toggle();
      $('.contact_spinner').hide();
    },
  }
});
