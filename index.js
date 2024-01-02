const express = require('express');
const app = express();
require('dotenv').config();
const {connect} = require('./databaseConnection');
const passport = require('./authentication/passport-config');
const { errorHandler } = require('./middlewares/errorHandler');

connect();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());
app.use('/api',require('./routes/index.routes'));
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`App is running on port ${port}`);
});