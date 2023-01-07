const fs = require("fs/promises")
const path = require("path")
const Jimp = require('jimp')

const { User } =  require ("../../models/user")

const avatarsDir = path.join(__dirname,"../../", "public","avatars");

const updateAvatar = async(req, res)=> {
    const {path: tempUpload, originalname} = req.file;
    const {_id} = req.user;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});

 Jimp.read(avatarURL, (err, avatarURL) => {
    if (!err) {
        avatarURL
      .resize(256, 256) // resize
      .quality(60) 
      .greyscale() 
      .write(avatarURL); // save
    }
    console.log(err);
    

  });

    res.json({
        avatarURL,
    })
}

 module.exports = updateAvatar;

//  Jimp.read('lenna.png', (err, lenna) => {
//     if (err) throw err;
//     lenna
//       .resize(256, 256) // resize
//       .quality(60) // set JPEG quality
//       .greyscale() // set greyscale
//       .write('lena-small-bw.jpg'); // save
//   });

// Jimp.read('http://www.example.com/path/to/lenna.jpg')
//   .then(image => {
//     // Do stuff with the image.
//   })
//   .catch(err => {
//     // Handle an exception.
//   });