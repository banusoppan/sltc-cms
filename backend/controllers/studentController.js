const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
nodeMailer = require('nodemailer'),
//const sms = require('../util/notify');

//const email = require('../util/mail');

exports.registerStudent = (req,res,next)=>{
  bcrypt.hash(req.body.password,10)
    .then((hashPassword)=>{
      const student = new Student({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        fullName : req.body.fullName,
        title : req.body.title,
        nic : req.body.nic,
        email : req.body.email,
        mobile : req.body.mobile,
        address1 : req.body.address1,
        address2 : req.body.address2,
        address3 : req.body.address3,
        city : req.body.city,
        district : req.body.district,
        testLanguage : req.body.testLanguage,
        awareness : req.body.awareness,
        likedMost : req.body.likedMost,
        highestEducation : req.body.highestEducation,
        uniPreparation : req.body.uniPreparation,
        userName : req.body.userName,
        password : hashPassword,
        createdOn : Date.now(),
        status : "10"
      });
      student
      .save()
      .then(result => {

        res.status(201).json({
          message: "Student created!",
          result: result
        });

      })
      .catch(err => {
        res.status(500).json({
          message: "Creating Student failed!!"
        });
      });

    })
}

exports.getAllStudents = (req, res, next) => {
  const postQuery = Student.find({}).select({ "_id": 1,"firstName":1,"lastName":1,"email":1,"mobile":1});
  let fetchedPosts;
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Student.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Student fetched successfully!",
        students: fetchedPosts,
        maxPosts: count
      });
    }).catch(error=>{
      res.status(500).json({
        message : "Fetching students Failed!"
      })
    });
}

exports.getStudent = (req, res, next) => {
  Student.findById(req.params.id).then(student => {
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Student not found!" });
    }
  }).catch(error=>{
    res.status(500).json({
      message :"Fetching student Failed!"
    })
  });
}
