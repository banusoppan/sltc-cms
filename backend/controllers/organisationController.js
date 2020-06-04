const Organisation = require('../models/Organisation');

exports.updateSocialMedia = (req,res,next)=>{
  Organisation.findOne().then(document=>{
    document.facebook = req.body.facebook,
    document.instagram = req.body.instagram,
    document.twitter = req.body.twitter,
    document.linkedin = req.body.linkedin,
    document.youtube = req.body.youtube
    document.save().then(updatedOrganisation=>{
      res.status(200).json({
        message : 'updated successfully'
      })
    })
  }).catch(error=>{
    res.status(500).json({
      message : "Update Failed"
    })
  })


}
exports.updateContactDetail = (req,res,next)=>{
  Organisation.findOne().then(document=>{
    document.email = req.body.email;
    document.mobile = req.body.mobile;
    document.save().then(updatedOrganisation=>{
      res.status(200).json({
        message : 'updated successfully'
      })
    })
  }).catch(error=>{
    res.status(500).json({
      message : "Update Failed"
    })
  })
}

exports.changeLogo = (req,res,next)=>{

  const url = req.protocol + '://' + req.get('host');
  Organisation.findOne().then(document=>{
    document.iconPath =  url + "/images/" + req.file.filename
    document.save().then(updatedOrganisation=>{
      res.status(200).json({
        message : 'updated successfully'
      })

    })
  }).catch(error=>{
    res.status(500).json({
      message : "Update Failed"
    })
  })

}

exports.addBranch = (req,res,next)=>{
  Organisation.findOne().then(document=>{
    document.branch = req.body.branch;
    document.save().then(updatedOrganisation=>{
      res.status(200).json({
        message : 'updated successfully'
      })
    })
  }).catch(error=>{
    res.status(500).json({
      message : "Update Failed"
    })
  })
}

exports.getOrganisation = (req, res, next) => {
  Organisation.findOne().then(organisation => {
    if (organisation) {
      res.status(200).json(organisation);
    } else {
      res.status(404).json({ message: "Organisation not found!" });
    }
  }).catch(error=>{
    res.status(500).json({
      message : "Update Failed"
    })
  });
}
