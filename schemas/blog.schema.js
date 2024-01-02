const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    published_date:{
        type: String,
        required: true,
    },
    modify_date:{
        type: String,
        default:null,
    },
    status:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    isDeleted: {
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});

const BLOG = mongoose.model('Blog',blogSchema);
module.exports = BLOG;

