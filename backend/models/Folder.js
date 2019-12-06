const mongoose = require('mongoose');

 const FolderSchema = new mongoose.Schema({
     name:{
         type: String,
         required: true
     },date:{
        type: Date,
        default: Date.now
    },img:{
        type: String,
        default: 'https://i.imgur.com/CrS2iXw.png'
    }
 })

 const Folder = mongoose.model('Folder', FolderSchema);

 module.exports = Folder;