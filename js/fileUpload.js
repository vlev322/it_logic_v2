$(document).ready(function () {
  $(".fileInput").change(function (e) {
    if (e.target.files[0].size > 10485760) {
      $(".fileInput").val("");
      $(".fileName").hide().text("");
      $(".fileUploadError").text("File size should not exceed 10MB");
      $(".fileClear").hide();
      return false;
    } else {
      $(".fileName").show().text(e.target.files[0].name);
      $(".fileClear").show();
      $(".fileUploadError").text("");
    }
  });

  $(".fileClear").click(function (e) {
    e.preventDefault();
    var inputGroup = $(this).parents(".fileUpload");
    inputGroup.find(".fileInput").val("");
    inputGroup.find(".fileName").show().text("");
    $(this).hide();
  });

  $("#file").on("change", function () {
    const file = $(this)[0].files[0];
    fetch("/upload", {
      method: "POST",
      headers: { "Content-type": "application/octet-stream" },
      body: file,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.files.file.path) {
          console.log("File upload failed.. ", data);
        }
      });
  });
});
