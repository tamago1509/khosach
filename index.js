require("dotenv").config();
var express = require("express");
var app = express();
var port = 4000;




//config mongo Atlas
var mongoose = require("mongoose");
var uri= process.env.uri;

mongoose
.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongo Atlas")
});

//set view engine
app.set('view engine', 'pug')
app.set("views", "./views")


//set public file
app.use(express.static('public'))



app.get("/",(req, res)=>{
	res.render("users/signUp");
})


app.listen(port,()=>{
	console.log("I wait you at " + port);
})