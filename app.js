const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  //   console.log(firstName, lastName, email);
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/4620302ad3";

  const options = {
    method: "POST",
    auth: "okoro:6b48785c45f19ee13cbe06b3d411bbd2-us21",
  };

  https.request(url, options, function (respone) {
    respone.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function (req, res) {
  console.log("Server is running on port 3000");
});

// API Key
//1bdb821b5a8d051e58766b951df26d24-us21

// list Id
// 4620302ad3
