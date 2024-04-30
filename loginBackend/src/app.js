const express = require('express');
const app = express();
const path = require('path');
const hbs = require("hbs");
const bodyParser = require('body-parser');
const mailer = require('./mailer');

const db = require("./db/conn");
const User = require("./models/signups");

const port = process.env.PORT || 3000; 

const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
});


app.get("/login", (req, res) => {
    res.render("login");
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
        res.status(201).render("index");
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



//login check
app.post("/login", async(req,res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const useremail= await User.findOne({email:email});
        if(useremail.password === password){
            res.status(201).render("index");
        }else{
            res.status(400).send(`
        <script>
            alert('Invalid Email or Password');
            window.location.href = "/";
        </script>
        `);
        }
        
    }catch(error){
        res.status(400).send("invalid Email");
    }
});

// Contact form endpoint
app.post('/send_email', (req, res) => {
  mailer.sendMail(req.body, res);
});

app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});
