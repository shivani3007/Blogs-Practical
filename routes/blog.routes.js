const express = require('express');
const router = express.Router();
const {validate} = require('express-validation');
const {authenticateAndAuthorise} = require('../middlewares/authentication');
const {ROLES} = require('../utils/enums');
const {createBlog , getBlogs , getBlogsByDate, findBlogsByAuthor, deleteBlog} = require('../controllers/blog.controller');
const BLOG = require('../validations/blog.validation');

router.post('/create-blog',authenticateAndAuthorise([ROLES.USER]),validate(BLOG.create),createBlog);
router.get('/get-blogs',authenticateAndAuthorise([ROLES.USER , ROLES.ADMIN]),getBlogs);
router.get('get-blogs-by-date',authenticateAndAuthorise([ROLES.USER,ROLES.ADMIN]),getBlogsByDate);
router.get('/get-blogs-by-author/:authorId',authenticateAndAuthorise([ROLES.ADMIN]), findBlogsByAuthor);
router.delete('/delete-blog/:blogId',authenticateAndAuthorise([ROLES.ADMIN, ROLES.USER]),deleteBlog);


module.exports = router;