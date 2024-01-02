exports.errorHandler = (err, req,res,next) => {
    try{

        const statusCode = err.statusCode || 500;

        let errMsg = '';
        if(err.details){
            if(err.details.body){
                errMsg = err.details.body[0].message;
            }else if(err.details.params){
                errMsg = err.details.params[0].message;
            }else if(err.details.query){
                errMsg = err.details.query[0].message;
            }else {
                errMsg = err.message
            }

            res.status(statusCode).json({
                status:statusCode,
                message:errMsg,
                error:err.message
            })
        }

    }catch(error){
        next(error);
    }
}