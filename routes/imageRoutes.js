const cloudinary = require('cloudinary');
const config = require('../config/keys');

cloudinary.config({
  cloud_name: config.fileDrive.CLOUD_NAME,
  api_key: config.fileDrive.API_KEY,
  api_secret: config.fileDrive.API_SECRET
})

module.exports = (app) => {
  app.post('/api/images/upload', (req, res) => {
    console.log('files', req.files);
    const values = Object.values(req.files)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))
    Promise
      .all(promises)
      .then(results => res.json(results))
      .catch((err) => res.status(400).json(err))
  })
}