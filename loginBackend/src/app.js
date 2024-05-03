const express = require('express');
const app = express();
const path = require('path');
const hbs = require("hbs");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const mailer = require('./mailer');
// const livechat = require('./livechat');
const db = require("./db/conn");
const User = require("./models/signups");

const port = process.env.PORT || 3000; 

const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(static_path));
app.use(cookieParser());
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    // console.log({data: req.cookies.email});
    res.render("index", { data: req.cookies.email });
});


app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/chat", (req, res) => {
    res.render("liveChat");
});


app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send(`
            <script>
                alert('Email already exists');
                window.location.href = "/";
            </script>
            `);
        }

        const usersignup = new User({
            name: name,
            email: email,
            password: password
        });
        await usersignup.save();
        res.cookie("name", name, { maxAge: 3600000, httpOnly: true });
        res.status(201).render('index');    
    } catch (err) {
        console.error(err);
        res.status(400).send(`
        <script>
            alert('${err.message}');
            window.location.href = "/";
        </script>
        `);
    }
});

app.get('/logout', function (req, res) {
    res.clearCookie('email');
    res.redirect('/');
  });

//login check
app.post("/login", async(req,res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        // console.log("chal raha");
        const user= await User.findOne({email:email});
        if(!user || user.password !== password){
            return res.status(400).send(`
            <script>
                alert('Invalid Email or Password');
                window.location.href = "/login";
            </script>
            `);
        }
        const username = user.name;
        // console.log(username);
        res.cookie("email", email, { maxAge: 3600000, httpOnly: true });
        res.render("index", { data: username });
        
    }catch(error){
        res.status(400).send(`
            <script>
                alert('Invalid Email or password');
                window.location.href = "/login";
            </script>
        `);
    }
});


// Contact form endpoint
app.post('/send_email',async  (req, res) => {
    const { name, email } = req.body; 
    console.log(name);
    console.log(email);
    mailer.sendMail(req.body, res);
});




 

app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});
