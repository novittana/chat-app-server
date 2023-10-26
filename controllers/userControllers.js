const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const {username, password, email} = req.body;
        const userNameCheck = await User.findOne({username});
        if (userNameCheck)
            return res.json({msg: "Username is already exist", status: false});
        const emailCheck = await User.findOne({email});
        if (emailCheck)
            return res.json({msg: "Email is already used", status: false});
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({status: true, user});
    } catch (ex) {
        next(ex);
    }
};


module.exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user)
            return res.json({msg: "Incorrect username or password", status: false});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({msg: "Incorrect username or password", status: false});
        delete user.password;

        return res.json({status: true, user});
    } catch (ex) {
        next(ex);
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
const userId = req.params.id;
const avatarImage = req.body.image;
const userData = await User.findByIdAndUpdate(userId, {
    isAvatarImageSet:true,
    avatarImage,
},
    {new:true});
        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage,
        })
    } catch (ex) {
        next(ex)
    }
}


module.exports.getAllUsers = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const users = await User.find({_id: {$ne: userId}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        console.log(users)
        return res.json(users);
    } catch (ex) {
        next(ex)
    }
}


module.exports.getUser = async (req, res, next) => {
    const _id = req.params.id;
    try {
        const user = await User.findOne({_id}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        console.log(user)
        return res.json(user);
    } catch (ex) {
        next(ex)
    }
}