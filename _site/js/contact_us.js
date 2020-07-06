$(document).ready(function() {
  const $contactForm = $('#contact_form')

  $contactForm.submit(function(){
    $('.contact_spinner').fadeIn(100);
  });

  contactUs = {
    toggleContactForm: function() {
      $('.contact_success').toggle();
      $('.contact_spinner').hide();
    },
  }
});
