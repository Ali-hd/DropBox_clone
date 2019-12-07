const mongoose = require('mongoose');

 const FileSchema = new mongoose.Schema({
     name:{
         type: String,
         required: true
     },date:{
        type: Date,
        default: Date.now
    },img:{
        type: String,
        default: 'https://img.icons8.com/plasticine/100/000000/file.png'
    },parentid:{
        type: String,
        required: true
    }
 })

 const File = mongoose.model('File', FileSchema);

 module.exports = File;