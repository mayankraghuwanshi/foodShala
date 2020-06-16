const express = require('express');
const app = express();
const conf = require('./config');
const mongoose = require('mongoose');
const indexRoute = require('./routes/index.router');
const cors = require('cors');
const passport = require('passport');
const path = require('path');




const {MONGODB_URL} = require('./config');
const {PORT} = require('./config');


mongoose.connect(MONGODB_URL , {useNewUrlParser : true , useUnifiedTopology: true}).then(()=>console.log("Database is connected.")).catch(err=>console.log(err));


app.use(passport.initialize());
require('./passport.config')(passport);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extented : false
}))



app.use('/api' , indexRoute);


app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    const index = path.join(__dirname, "client","build", "index.html")
    res.sendFile(index);
})





app.listen(PORT , ()=>{
    console.log('Server is started on port '+conf.PORT);
})