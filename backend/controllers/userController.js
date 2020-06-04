const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/User');

exports.createUser = (req,res,next)=>{
  bcrypt.hash(req.body.password,10)
    .then((hashPassword)=>{
      const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : hashPassword,
        createdOn : Date.now()
      });
      user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Creating user failed!"
        });
      });

    })
}

exports.userLogin =  (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Invalid Authentication Credentials"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Invalid Authentication Credentials"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_TOKEN,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid Authentication Credentials"
      });
    });
}

exports.listUser = (req, res, next) => {
  const postQuery = User.find({}).select({ "password": 0});
  let fetchedUsers;
  postQuery
    .then(documents => {
      fetchedUsers = documents;
      return User.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        users: fetchedUsers,
        maxPosts: count
      });
    }).catch(error=>{
      res.status(500).json({
        message : "Couldn't retrieve users"
      })
    });
}
