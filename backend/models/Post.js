const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String,required: true},
  content:{type:String,required: true},
  imagePath : {type:String,required:true},
  link : {type :String,required:true},
  creator : {type: mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  createdOn : {type: Date,required:true}
});

module.exports = mongoose.model('Post',postSchema);
