const express = require('express');
const app = express();
const conf = require('./conf');
const mongoose = require('mongoose');
const indexRoute = require('./routes/index.router');

mongoose.connect(conf.MONGODB_URL , {useNewUrlParser : true , useUnifiedTopology: true}).then(()=>console.log("Database is connected.")).catch(err=>console.log(err));


app.use(express.json());
app.use(express.urlencoded({
    extented : false
}))


app.get('/' , (req , res)=>{
    res.send("Hello, World.");
})
app.use('/api' , indexRoute);







app.listen(conf.PORT , ()=>{
    console.log('Server is started on port '+conf.PORT);
})