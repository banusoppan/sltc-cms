const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const studentSchema = mongoose.Schema({
  firstName: {type: String,required: true},
  lastName:{type:String,required: true},
  fullName : {type:String,required:true},
  title : {type :String,required:true},
  nic : {type : String,required:true},
  email : {type : String,required:true},
  mobile : {type : String,required:true},
  address1 : {type : String},
  address2 : {type : String},
  address3 : {type : String},
  city : {type:String},
  district : {type:String,required:true},
  testLanguage :{type:String,required:true},
  awareness : {type:String},
  likedMost : {type:String},
  highestEducation : {type:String,required:true},
  uniPreparation : {type:Boolean,required:true},
  userName : {type:String,required:true,unique:true},
  password : {type:String,required:true},
  createdOn : {type: Date,required:true},
  status : {type : String,required: true}
});
studentSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Student',studentSchema);
