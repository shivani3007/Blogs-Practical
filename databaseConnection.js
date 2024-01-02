const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = async () =>{
    try{
        const db = await mongoose.connect(process.env.DB_URL);
        if(db){
            console.log('Connected to database');
        }
    }catch(error){
        console.log('Error while connecting to database',error);
    }
}