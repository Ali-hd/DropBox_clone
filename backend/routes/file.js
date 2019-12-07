const express = require('express')
const router = express.Router()


const File = require('../models/File')
// create
router.post('/createfile',(req,res)=>{
    const newFile = {
        name: req.body.name,
        parentid: req.body.parentid
    }
    console.log('new file')
    console.log(newFile)

    File.findOne({
        name: req.body.name,
        parentid: req.body.parentid
    })
    .then(file =>{
        //checking if file name exist
        if(!file){
            File.create(newFile)
            .then(file=>res.send("file created" + newFile.name))
            .catch(err=>res.send(err))
            res.json({msg :"file created success"})
        }
        else{
            res.json({msg :"file with that name already exist"})
        }
    })
    .catch(err=>res.send(err))
    
})
// display
router.get('/',(req,res)=>{
    File.find()
    .then(file=>res.json(file))
    .catch(err=>res.send(err))
})

//update
router.put('/:id', (req,res)=>{
    File.findByIdAndUpdate(req.params.id, {name: req.body.updatedname})
    .then(() => { res.json("successfully updated") })
    .catch(() => { res.json("error")})
})

// delete 
router.delete('/:id', (req,res) =>{
    console.log(req.params.id)
    File.findByIdAndRemove(req.params.id, (err, data) => {
        console.log("deleted");
    })
    .then(() => { res.json("successfully deleted") })
    .catch(() => { res.json("error")})
})



module.exports = router