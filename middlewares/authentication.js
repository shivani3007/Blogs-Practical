const passport = require('../authentication/passport-config');
const ROLE = require('../schemas/role.schema');

exports.authenticateAndAuthorise = (roles = []) => (req,res,next) =>{
    passport.authenticate('jwt',{session:false} , async (err,user) =>{

        if(err){
            return next(err);
        }

        if(!user){
            return res.status(401).json({message:'Unauthorized'});
        }

        const roleId = user.role;
        const roleFound = await ROLE.findById(roleId);
        const roleName = roleFound.name;

        if(!roles.includes(roleName)){
            return res.status(403).json({message:'Forbbiden'});
        }

        req.user = user;
    
        next();
    })(req,res,next);
}