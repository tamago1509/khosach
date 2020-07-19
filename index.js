require("dotenv").config();
var methodOverride = require('method-override');
var express = require("express");
var app = express();
var port = 4000;
var cookieParser = require('cookie-parser');





//set public file
app.use(express.static('public'))


//
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// app use cookie
app.use(cookieParser(process.env.secret_key))

//require routing
var userRoute = require("./routes/users.route");
var bookRoute = require("./routes/books.route");
var loginRoute = require("./routes/login.route");
var signupRoute = require("./routes/signup.route");
var apiRoute = require("./routes/api.route");


//require middleware
var authMiddleware = require("./middleware/auth.middleware");
var loginValidator = require("./middleware/login.validator");

//require models
var User = require("./models/user.model");
var Book = require("./models/book.model");



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



//app use
app.use("/users",authMiddleware.auth, userRoute);
app.use("/books", authMiddleware.auth, bookRoute);
app.use("/login", loginRoute)
app.use("/signup", signupRoute);
app.use("/api", authMiddleware.auth, apiRoute);



app.get("/",(req, res)=>{
	res.render("auth/login");
})


app.listen(port,()=>{
	console.log("I'm waitting for you at " + port);
})