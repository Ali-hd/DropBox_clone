const mongoose = require('mongoose');


// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); 
// var yyyy = today.getFullYear();

// var hr = today.getHours();
// var min = today.getMinutes(); 
// var sec = today.getSeconds();

// today =  dd + '/' + mm + '/' + yyyy;

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