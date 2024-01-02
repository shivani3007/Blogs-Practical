const bcrypt = require('bcrypt');

exports.verifyPassword = async (plainPassword, hashedPassword) => {
    try{
        console.log(plainPassword,hashedPassword);
        const isPasswordMatched = await bcrypt.compare(plainPassword, hashedPassword);
        if(isPasswordMatched){
            return true;
        }
        return false;
    }catch(error){
        console.log(error,'error')
    }
}