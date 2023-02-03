const express = require('express');
const app = express();
const db = require('./database');
require('dotenv').config();
const userController = require('./controllers/userController');
const routes = require('./router/routes');
const cors = require('cors');
const port = process.env.PORT || 5000;
// const oo = require('./authentication/userAuth')
db();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use('/', routes);

app.listen(port, (error) => {
    if(error) console.log(error)
    else console.log(`Server listen at ${port}.`);
});