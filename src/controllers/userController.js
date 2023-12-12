const userModel = require("../models/user");
const bcryt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {

    //Existing User
    //Hashed Password
    //User Creation
    //Generate Token
    
    const {username, email, password} = req.body;
    try {
        const userExist = await userModel.findOne({email : email});
        if(userExist){
            return res.status(400).json({message : "User already exist"});
            //400 means (Bad Request) because user already exist
        }

        const hashedPassword = await bcryt.hash(password, 10);

        const result = await userModel.create({
            email : email,
            password: hashedPassword,
            username: username  
        });

        const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY);
        res.status(201).json({user: result, token: token});    //201 means record create successfully

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }

}

const signin = async (req, res) => {

    const {email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({email : email});
        if(!existingUser){
            return res.status(404).json({message : "User not found"});
        }

        const matchedPassword = await bcryt.compare(password, existingUser.password);
        if(!matchedPassword){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET_KEY);
        res.status(200).json({user: existingUser, token: token});

    }


    catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}

module.exports = {signin , signup};