//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

//To send index.html when server request access to the server
app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html");
  });

//To set Post Method
app.post("/",function(req,res){
    var cyrpto = req.body.cyrpto; //To hold cyrpto name in a variable
    var fiat = req.body.fiat; //To hold fiat name in a variable
    
    var amount= req.body.amount;

    //Without parameters part
    // var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"; // Without parameters
    // var finalURL = baseURL +cyrpto + fiat; 
     
    //API Request to achive current Coin Values
    //  request(baseURL, function (err, response, body) {
    //      var data = JSON.parse(body); //To Parse response JSON to the 
    //      var price = data.last; //Gets 'last' element from the data 

    //      console.log(price);

    //      var currentDate = data.display_timestamp;


    //      //To make data ready to send back
    //      res.write("<p>The current date is: " + currentDate + "</p>");
    //      res.write("<h1>" + cyrpto + " is: " + price + " " + fiat + "</h1>");

    //      res.send(); //Sends all of the data back as response
    //  });

    //With Parameters
    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        
        //request package determined variable qs
        //These keywords are coming form the API
        qs: { 
            from: cyrpto,
            to: fiat,
            amount: amount
        }
    };


    //API Request to achive current Coin Values
    request( options , function (err, response, body) {
        var data = JSON.parse(body);//To Parse response JSON to the 
        var price = data.price; //Gets 'last' element from the data 

        console.log(price);

        var currentDate = data.time;


        //To make data ready to send back
        res.write("<p>The current date is: "+ currentDate+"</p>");
        res.write("<h1>"+amount+" " +cyrpto + " is currently worth: " + price + " " + fiat + "</h1>");

        res.send();//Sends all of the data back as response
    });
    
});



app.listen(3000,function () {
    console.log("Server is running on port 3000");
  });