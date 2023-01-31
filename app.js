const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){



const query=req.body.cityName;
const apiKey="26ddb9573881de0e3a1c107c18156ae0";
const unit="metric";

const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey +"&units=" + unit;

https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const icon=weatherData.weather[0].icon;
       const imageURL= "http://openweathermap.org/img/wn/"+  icon  +"@2x.png";
        
       const temp=weatherData.main.temp;
       const weatherDesc=weatherData.weather[0].description;
       //multiple write methood 
       res.write("<h1>Temprature in "+ query  +" is "+ temp + "degree celcius.</h1>");
       res.write("<p>The weather is currently " + weatherDesc + "</p>");
       res.write("<img src=" +imageURL +">");
    //only one send methood 
    res.send();
    })
})



})








app.listen(3000,function(){
    console.log("Server is running on port 3000");
})