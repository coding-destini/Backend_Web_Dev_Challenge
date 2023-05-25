const mongoose = require('mongoose')
const multer = require('multer')
const Path = require('path') 
const FILE = Path.join('/upload/user/file')

const eventSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['event'],
  },
  uid: {
    type: Number,
  },
  name: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    required: true
  },
  schedule: {
    type: String,
    match: /^(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  files: {
    type:String,
    required: true
  },
  moderator: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  sub_category: {
    type: String,
    required: true
  },
  rigor_rank: {
    type: Number,
    required: true
  },
  attendees: {
    type: [String],
    required:true
  },
},{
  timestamps:true
});

//**Multer code when user add an from from frontend part ***

// // Configuring Multer storage for file uploads
// const storage = multer.diskStorage({
//   // Specify the destination directory for storing uploaded files
//   destination: function (req, file, cb) {
//     cb(null, Path.join(__dirname, '..', FILE))
//   },
//   // Generate a unique filename for each uploaded file
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// // Define static functions for eventSchema
// // Configure Multer middleware for handling file uploads
// eventSchema.static.uploadEvent = multer({ storage: storage }).single('avatar')

// // Set the value of eventSchema.static.filePath to the variable File
// eventSchema.static.filePath = File


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;