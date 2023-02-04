const express = require('express');
const app = express();
const db = require('./database');
require('dotenv').config();
const userController = require('./controllers/userController');
const routes = require('./router/routes');
const cors = require('cors');
const port = process.env.PORT || 5000;
// const oo = require('./authentication/userAuth')
const cookieSession = require("cookie-session")
const passport = require("passport")
const passportSetup = require("./passport/passport")

app.use(
    cookieSession({
        name:"session",
        keys:["hrmanagement"],
        maxAge:24*60*60*100,
    })
)

app.use(passport.initialize());
app.use(passport.session())

app.use(
    cors({
        origin:"http://localhost:3000",
        method:"GET,POST,PUT,DELETE",
        credentials:true,
    })
)
app.use("/auth",routes);

db();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use('/', routes);

app.listen(port, (error) => {
    if(error) console.log(error)
    else console.log(`Server listen at ${port}.`);
});