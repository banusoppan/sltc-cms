const mongoose = require('mongoose');

const organisationSchema = mongoose.Schema({
  facebook: {type: String,},
  instagram:{type:String,},
  twitter : {type:String,},
  linkedin : {type :String,},
  youtube : {type :String,},
  email : {type :String,},
  mobile : {type :String,},
  branch : [{branchName: String,address: String}],
  iconPath : {type :String}



});

module.exports = mongoose.model('Organisation',organisationSchema);
