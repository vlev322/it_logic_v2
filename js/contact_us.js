const CAPTCHA_KEY = "6Les8KYZAAAAAAmhgeHbwWvDye9k5RYQgEGLnknr";
const CAPTCHA_VERIFICATION_URL = "https://www.google.com/recaptcha/api/siteverify";
const FILE_MAX_SIZE = 20;
const secretKey = "6Les8KYZAAAAAAmhgeHbwWvDye9k5RYQgEGLnknr";

$.ready(() => {
  contactUs = {
    toggleContactForm: function () {
      $(".contact_success").toggle();
      $(".contact_spinner").hide();
    },
  };
});

const show = function (elem) {
  elem.style.display = "block";
};

const hide = function (elem) {
  elem.style.display = "none";
};

const toggle = function (elem) {
  if (window.getComputedStyle(elem).display === "block") {
    hide(elem);
    return;
  }
  show(elem);
};

const formData = new FormData();
const serializeArray = function (form) {
  const arr = [];
  Array.prototype.slice.call(form.elements).forEach(function (field) {
    if (!field.name || field.disabled || ["reset", "submit", "button"].indexOf(field.type) > -1) {
      return;
    }
    if (field.type === "select-multiple") {
      Array.prototype.slice.call(field.options).forEach(function (option) {
        if (!option.selected) return;
        arr.push({
          name: field.name,
          value: option.value,
        });
      });
      return;
    }
    if (["checkbox", "radio"].indexOf(field.type) > -1 && !field.checked) return;
    arr.push({
      name: field.name.replace(/-/gi, field.name.charAt(0).toUpperCase()),
      value: field.value,
    });
    if (field.name === "file") {
      // arr.push({ name: field.name, value: field.files[0].name });
    }
  });
  return arr;
};

const dialogSuccess = document.getElementsByClassName("contact_success")[0];
const spinerContactUs = document.getElementsByClassName("contact_spinner")[0];
const captchaNote = document.getElementsByClassName("captchaNote")[0];
const contactForm = document.getElementById("contact_form");
const button = document.querySelectorAll('.toggle_contact_form button[type="submit"]');

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  toggle(spinerContactUs);

  const formData = {};
  const formattedData = serializeArray(contactForm);
  formattedData.forEach((element) => {
    if (formData[element.name] !== undefined) {
      if (!formData[element.name].push) {
        formData[element.name] = [formData[this.name]];
      }
      formData[element.name].push(element.value || "");
    } else {
      formData[element.name] = element.value || "";
    }
  });
  fetch("/sendmail", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        toggle(dialogSuccess);
        toggle(spinerContactUs);
        grecaptcha.reset();
        contactForm.reset();
        button[0].disabled = true;
      } else {
        captchaNote.innerHTML = "Failed captcha verification";
      }
    });
});

const contactResBtn = document.getElementById("contact_res_btn");

contactResBtn.addEventListener("click", () => {
  toggle(dialogSuccess);
});
