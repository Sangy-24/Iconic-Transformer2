//mongosh "mongodb+srv://cluster0.ahjca2j.mongodb.net/" --apiVersion 1 --username ghumresangram_db_user --password SPti3fhVAnTGbMhF
// user name : ghumresangram_db_user
//insert in db pass : SPti3fhVAnTGbMhF
require('dotenv').config();

const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.log('MongoDB Connection Error:', err);
    })
    
