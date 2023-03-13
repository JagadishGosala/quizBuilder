const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const auth = require('./routers/auth');
const user = require('./routers/user');
const quiz = require('./routers/quiz');

const app = express();
app.use(express.json());

app.use('/auth', auth);
app.use('/quiz', quiz);
app.use('/user', user);

mongoose.connection.once('open', ()=>{
    console.log("Connection established");
})
mongoose.connection.on('error', ()=>{
    console.log("error in connecting DB");
})
const startServer = async ()=>{
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT, ()=>{
        console.log("server has started");
    })
}

startServer();