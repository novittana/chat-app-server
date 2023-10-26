const {Message} = require("../models/Message")

module.exports.addMessage = async (req,res, next) => {
try{
    const newMessage = await Message.create(req.body);
    res.status(200).json(newMessage);
    } catch (ex){
    next(ex);
}
};

module.exports.getMessages = async  (req, res, next) => {
    try{
        const messages = await Message.find({
            conversationId:req.params.conversationId,
        })
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json(err);
    }
}


// module.exports.addMessage = async (req,res, next) => {
// try{
//     const {from, to, message} = req.body;
//     const data = await Message.create({
//         message: {text: message},
//         users: [from, to],
//         sender: from,
//     });
//     if(data) return res.json({message: "Message added successfully"});
//     return res.json({message:"Failed to add message to the DB"});
//
// }
// catch (ex){
//     next(ex);
// }
// };
// module.exports.getAllMessages = async (req,res, next) => {
//     try{const {from, to} = req.body;
//         const messages = await Message.find({
//             users: {
//                 $all: [from, to],
//             }
//         }).sort({updatedAt: 1});
//         const  projectMessages = messages.map(message => {
//             return {
//                 fromSelf:message.sender.toString() === from,
//                 message: message.message.text,
//             }
//         })
// res.json(projectMessages);
//     }
//     catch (ex){
//         next(ex);
//     }
// }