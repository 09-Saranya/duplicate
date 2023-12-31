const express = require('express');
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
const session = require('express-session');

const User = require('./models/registerDb')
const app = express();
const port = 5000;


app.set('view engine', 'ejs');
// Connect to MongoDB
try{
 mongoose.connect('mongodb+srv://stharansampath:Tharany2003@tharan.i32hjuv.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
} 
catch(err){
  console.log("The error is "+err);
}


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname+'/views'));

app.get("/signup",(req,res)=>{
  res.sendFile(__dirname+"/public/signup.html")
 
})   

app.get("/login",(req,res)=>{
  res.sendFile(__dirname+"/public/login.html")
})  



app.post("/register", async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("Email already registered");
    }

    const newUser = new User({ name, mobile, email, password });

    // console.log(newUser);
    await newUser.save();
    res.send("User successfully registered!");
  } catch (err) {
    console.log("ERROR OCCURRED IN POST REGISTER " + err);
    res.status(500).send("An error occurred while registering the user");
  }
});

app.post("/login", async (req, res) => {
  try { 
    const { email, password } = req.body;
    console.log(email)

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).send("password wrong");
    }

    // Successful login
   res.render('dashboard',{user:user});
  } catch (err) {
    console.log("ERROR OCCURRED IN LOGIN " + err);
    res.status(500).send("An error occurred while logging in");
  }
});

 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
