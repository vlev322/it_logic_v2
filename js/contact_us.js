$(document).ready(function () {
  const resetForm = () => {
    $(".contact_success").toggle();
    $(".contact_spinner").toggle();
    grecaptcha.reset();
    $("#contact_form")[0].reset();
    $(".fileClear").hide();
    $(".fileName").hide().text("");
    $(".fileUploadError").text("");
    $('.toggle_contact_form button[type="submit"]').disabled = true;
    $(".countrySelect").val("");
    $(".countrySelect").trigger("change");
  };

  function sendForm(clientData) {
    fetch("/sendmail", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(clientData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          resetForm();
        } else {
          toggle(spinerContactUs);
          alert("Failed captcha verification, try again.");
          $(".captchaNote").text = "Failed captcha verification.";
        }
      });
  }

  $("#contact_form").on("submit", function (e) {
    e.preventDefault();
    $(".contact_spinner").toggle();
    const contactFormData = $(this).serializeArray();
    const contactFormObject = {};
    $.each(contactFormData, function (_, v) {
      contactFormObject[v.name.replace(/-/gi, v.name.charAt(0).toUpperCase())] = v.value;
    });
    contactFormObject.file = $(".fileInput").val().split("\\").reverse()[0];
    sendForm(contactFormObject);
  });

  $("#contact_res_btn").on("click", () => {
    $(".contact_success").toggle();
  });
});