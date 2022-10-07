const express = require("express"); 
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path"); 
const weatherData = require("./utils/weatherData");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.render("home", {
        title:"Weather App"
    })
});

app.get("/weather", function(req,res){
    const address = req.query.address
    if(!address){
        return res.send({
            error: "you must enter address"
        });
    }

    weatherData(address, (error, {temperature, description, cityName} = {})=>{
        if(error){
            return res.send({
                error
            });
        }
        
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

app.get("*", function(req,res){
    res.render('404', {
        title: "Page not found"
    });
})
app.listen(3000, function(){
    console.log("Server is running on port 3000."); 
});