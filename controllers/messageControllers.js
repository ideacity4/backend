const Message = require('../models/messsage');

exports.createMessage = async(req,res)=>{
    try{
        const message = new Message(req.body);
        await message.save();
        res.status(201).json(message);
    }catch(err){
        res.status(400).json({error:"Failed to create message"});
    }
}

exports.getMessagebyUser = async(req,res)=>{
    try{
        const messages = await Message.find({user:req.params.userId});
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json({error:"Failed to fetch messages"});
    }
}
