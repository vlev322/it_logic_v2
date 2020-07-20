const SECRET_KEY = "6Lc_GK8ZAAAAAAEFdfvB0S7JbHfkSOGj5CnM8kLC";
const buildQuery = (data) => {
  if (typeof data === "string") return data;
  let query = [];
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
  }
  return query.join("&");
};

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

  async function sendForm(clientData) {
    const responce = await fetch("/sendmail", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(clientData),
    });
    const data = await responce.json();
    return data;
  }

  async function isValidRecaptcha(response) {
    const query = buildQuery({
      secret: SECRET_KEY,
      response,
    });
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
    const res = await fetch(proxyUrl + verifyURL);
    const isValidRes = await res.json();
    if (!isValidRes.success) {
      return { success: false, msg: "Failed captcha verification", error: isValidRes["error-codes"][0] };
    }
    return isValidRes;
  }

  $("#contact_form").on("submit", async function (e) {
    e.preventDefault();
    $(".contact_spinner").toggle();
    const formDataInObject = {};
    $.each($(this).serializeArray(), function (_, v) {
      formDataInObject[v.name.replace(/-/gi, v.name.charAt(0).toUpperCase())] = v.value;
    });
    formDataInObject.file = $(".fileInput").val().split("\\").reverse()[0];

    const { success: isValid } = await isValidRecaptcha(formDataInObject.gGrecaptchaGresponse);
    if (!isValid) {
      $(".contact_spinner").toggle();
      $(".captchaNote").text("Failed captcha verification. \nCheck captcha.");
      return;
    } else {
      const { success: isSent } = await sendForm(formDataInObject);
      if (!isSent) {
        toggle(spinerContactUs);
        alert("Something was wrong, try again.");
        return;
      } else {
        resetForm();
      }
    }
  });

  $("#contact_res_btn").on("click", () => {
    $(".contact_success").toggle();
  });
});
