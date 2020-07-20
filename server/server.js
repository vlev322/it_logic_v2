require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const mailer = require("./mail/mailer");
const formidable = require("formidable");

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Read static files
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/images", express.static(__dirname + "/images"));
app.use("/services", express.static(__dirname + "/services"));
app.use("/technologies", express.static(__dirname + "/technologies"));
app.use("/fonts", express.static(__dirname + "/fonts"));

// Read root file index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let file = {};
app.post("/upload", (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    file.path = files.file.path;
    res.json({ fields, files });
  });
});

app.post("/sendmail", async (req, res) => {
  let dataForSending = req.body;

  delete dataForSending.gGrecaptchaGresponse;
  // Check if file attached
  if (dataForSending.file) {
    file.name = dataForSending.file;
    dataForSending = { ...dataForSending, file };
  }
  // Sending mail
  const info = await mailer.main(dataForSending);
  return res.json({
    success: true,
    msgMail: "Mail successfully sent",
    information: info,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on localhost:${PORT}`);
});
