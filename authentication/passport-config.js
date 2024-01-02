const passport = require('passport');
const passportJwt = require('passport-jwt');
const jwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;
require('dotenv').config();
const USER = require('../schemas/user.schema'); 


const jwtOptions = {
    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_KEY
}

passport.use(new jwtStrategy(jwtOptions , async (payload, done) =>{
    try{
        const user = await USER.findById(payload.id);
        if(user){
            return done(null,user)
        }else {
            return done(null,false);
        }
    }catch(error){
        done(error, false)
    }
}));

module.exports = passport;

