const BLOG = require('../schemas/blog.schema');
const ROLE = require('../schemas/role.schema');

//Create new blog :-
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createBlog = async (req,res,next) =>{
    try{
        const {title , description , status, category} = req.body;

        const newBlog = {
            title,
            description,
            status,
            category,
            author: req.user._id,
            publish_date: new Date()
        };

        console.log('newBlog',newBlog);

        const blogCreated = await BLOG.create(newBlog);
        await blogCreated.save();
        console.log('blog created===>',blogCreated);
        res.status(200).json({blogCreated});
    }catch(error){
        next(error);
    }
}

//List all blogs :-
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getBlogs = async (req,res,next) =>{
    try{
        const roleFound = await ROLE.findById(req.user.role);
        const role = roleFound.name;
        let query ;

        if(role === 'User'){
            query = {
                author: req.user._id
            }
        }else {
            query = {};
        }

        const blogs = await BLOG.find(query);
        res.status(200).json({blogs});
    }catch(error){
        next(error);
    }
}

//Get blogs between 2 dates :-
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getBlogsByDate = async (req,res,next) =>{
    try{
        const {startDate, endDate} = req.query;
        const roleFound = await ROLE.findById(req.user.role);
        const role = roleFound.name;
        let query;

        if(role === 'User'){
            query = {
                author:req.user._id,
                publish_date : {
                    $gt: startDate,
                    $lt: endDate
                }
            }
        }else{
            query = {
                publish_date : {
                    $gt: startDate,
                    $lt: endDate
                }
            }
        }

        const blogs = await BLOG.find(query)
        res.status(200).json({blogs});
    }catch(error){
        next(error);
    }
}


//Get blogs by author:-
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findBlogsByAuthor = async (req,res,next) =>{
    try{
        const authorId = req.params;

        const blogs = await BLOG.find({author:authorId});

        if(blogs.length === 0){
            return res.status(404).json({message:'No blogs found for given user'});
        }

        res.status(200).json({blogs});

    }catch(error){
        next(error);
    }
}

exports.deleteBlog = async(req,res,next) =>{
    try{

        const blogId = req.params;

        const blogFound = await BLOG.findOne({_id:blogId});

        if(blogFound.author !== req.user._id){
            return res.status(403).json({message:'Forbidden'});
        }

        await BLOG.updateOne({_id:blogId}, {isDeleted:true}, {new:true});
        res.status(200).json({message:'Blog deleted successfully'});

    }catch(error){
        next(error);
    }
}