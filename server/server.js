const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('dotenv').config()
const PORT = process.env.PORT || 4000;
const app = express();
// const Schemas = require('../models/schemas')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//DB connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log(err);
})

const accountsRouter = require('./routes/accounts')


app.use('/accounts',accountsRouter)
// app.use('/weapons',Schemas.Weapons)


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})


