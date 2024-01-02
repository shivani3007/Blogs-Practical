const jwt = require('jsonwebtoken');
const ROLE = require('../schemas/role.schema');
const USER = require('../schemas/user.schema');
const {verifyPassword} = require('../utils/helper');


//Registration api for user:-
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.register = async (req,res,next) => {
    try{
        const {firstName , lastName , email , password, dob, role} = req.body;

        const roleFound  = await ROLE.findOne({name:role});

        const newUser = new USER({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            dob:dob,
            role:roleFound._id
        });

        const userCreated = await newUser.save();
        res.status(200).json({userCreated});
    }catch(error){
        next(error);
    }
}

//Login api for user:-
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = async (req,res,next) => {
    try{
        const {email, password} = req.body;

        const user = await USER.findOne({email:email});

        if(!user){
            return res.status(401).json({message:'User not found with this email'});
        }

        const isPasswordCorrect = await verifyPassword(password, user.password);

        if(!isPasswordCorrect){
            return res.status(401).json({message:'Invalid credentials'});
        }

        const token  = await jwt.sign({id:user._id},process.env.SECRET_KEY, {expiresIn:'24h'});
        res.status(200).json({accessToken:token});
    }catch(error){
        next(error);
    }
}