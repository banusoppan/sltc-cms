const Post = require('../models/Post');

exports.createPost = (req,res,next)=>{
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title : req.body.title,
    content : req.body.content,
    imagePath : url + "/images/" + req.file.filename,
    link : req.body.link,
    creator : req.userData.userId,
    createdOn : Date.now()
  });
  post.save().then(createdPost=>{
    res.status(200).json({
      message : 'Post added successfully',
      post : {
        ...createdPost,
        id: createdPost._id,

      },

    });

  }).catch(error=>{
    res.status(500).json({
      message : "Creating post Failed!"
    })
  });


}

exports.getAllPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    }).catch(error=>{
      res.status.json({
        message : "Fetching Post Failed"
      })
    });
}

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    link : req.body.link
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({
      message: "Update successful!" });
  }).catch(error=>{
    res.status(500).json({
      message : "Couldn't update post"
    })
  });
}

exports.deletePost = (req,res,next)=>{
  Post.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({
      message: 'Post deleted!'
    });

  }).catch(error=>{
    res.status(500).json({
      message : "Deleting Post Failed"
    })
  });


}
exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  }).catch(error=>{
    res.status(500).json({
      message : "Couldn't Fetch Post"
    })
  });
}
