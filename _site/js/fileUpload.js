$(document).ready(function() {
  $('.fileInput').change(function (e) {

    if(e.target.files[0].size > 10485760) {
      $('.fileInput').val('');
      $('.fileName').hide().text('');
      $('.fileUploadError').text('File size should not exceed 10MB');
      $('.fileClear').hide();
      return false;
    }
    else {
      $('.fileName').show().text(e.target.files[0].name);
      $('.fileClear').show();
      $('.fileUploadError').text('');
    }
  });

  $('.fileClear').click(function (e) {
    e.preventDefault();
    var inputGroup = $(this).parents('.fileUpload');
    inputGroup.find('.fileInput').val('');
    inputGroup.find('.fileName').show().text('');
    $(this).hide();
  });
});
