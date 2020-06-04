const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const postRoutes = require('./routes/Posts');
const userRoutes = require('./routes/Users');
const studentRoutes = require('./routes/Students');
const organisationRoute = require('./routes/Organisations');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://sltc_user:'+process.env.MONGO_ATLAS_PW+'@cluster0-ch1z4.mongodb.net/sltc?w=majority&retryWrites=truemongodb+srv://sltc_user:<password>@cluster0-ch1z4.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=>{
  console.log("connected to database");
})
.catch(()=>{
  console.log("connection failed");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS,PUT"
  );
  next();
});

app.use("/api/posts",postRoutes);
app.use("/api/users",userRoutes);
app.use("/api/students",studentRoutes);
app.use("/api/organisations",organisationRoute);



module.exports = app;
