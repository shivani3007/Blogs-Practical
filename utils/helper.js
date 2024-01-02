const bcrypt = require('bcrypt');

exports.verifyPassword = async (plainPassword, hashedPassword) => {
    try{
        const isPasswordMatched = await bcrypt.compare(plainPassword, hashedPassword);
        if(isPasswordMatched){
            return true;
        }
        return false;
    }catch(error){
        log(error,'error')
    }
}