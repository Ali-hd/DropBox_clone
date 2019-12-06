const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv/config");
const cors = require('cors')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())



mongoose.connect(
    process.env.DEV_DB, {useNewUrlParser:true, useUnifiedTopology: true })
.then(console.log('MongoDB Connected!'))
.catch(err=>console.log(err));


app.use(express.urlencoded({extended: true}))

app.use('/', require('./routes/folder'))



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))