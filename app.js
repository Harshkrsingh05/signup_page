const express = require("express");
const bodyParser = require("body-Parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };
  const jsonData= JSON.stringify(data);

  const url = "https://us11.api.mailchimp.com/3.0/lists/3746c3c18d.";
  const options = {
    method: "POST",
    auth: "harshK1:3ba08960a1a91b740edf1bbb81a9d9f2-us11"
  }
  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
  
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});

