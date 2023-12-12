const noteModel = require("../models/note");

const createNote = async (req, res)=>{
    const {title, description} = req.body;

    const newNote = new noteModel({
        title: title,
        description: description,
        userId : req.userId
    });

    try {
        await newNote.save();
        res.status(201).json(newNote);
        

    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Something went wrong (Unable to create note)"});
    }
}

const updateNote = async (req, res)=>{
    const id = req.params.id;
    const {title, description} = req.body;

    const updateNote = {
        title: title,
        description: description,
        userId : req.userId
    }

    try {
        await noteModel.findByIdAndUpdate(id, updateNote, {new : true});
            res.status(200).json(updateNote);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const deleteNote = async (req, res)=>{
    const id = req.params.id;
    try {
        const deletedNote = await noteModel.findByIdAndDelete(id);
        res.status(202).json(deletedNote);
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const getNotes = async (req, res)=>{
    try {
        const notes = await noteModel.find({userId: req.userId});
        res.status(201).json(notes);

    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Something went wrong (Unable to fetch notes)"});
    }
    
}

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes
}
