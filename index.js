require("dotenv").config();
var express = require("express");
var app = express();
var port = 4000;
var cookieParser = require('cookie-parser')


//require routing
var userRoute = require("./routes/users.route");
var bookRoute = require("./routes/books.route");
var loginRoute = require("./routes/login.route");
var signupRoute = require("./routes/signup.route");

//require middleware
var authMiddleware = require("./middleware/auth.middleware");

//require models
var User = require("./models/user.model");
var Book = require("./models/book.model");


//config body-parse
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

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
// app use cookie
app.use(cookieParser())

//app use
app.use("/users", userRoute);
app.use("/books", bookRoute);
app.use("/login", loginRoute)
app.use("/signup", signupRoute);


app.get("/",(req, res)=>{
	res.render("books/home");
})


app.listen(port,()=>{
	console.log("I'm waitting for you at " + port);
})