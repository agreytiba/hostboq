const  express = require('express')
const router =express.Router()
const { getBlogPost, getBlogPosts, setBlogPost, updateBlogPost, deleteBlogPost, getCountBlogPosts } = require("../controllers/blogControllers")
const {protect} = require("../middleware/authMiddleware")
//  post and get all  blogPost method have the same root address("/")
router.route('/').get(protect,getBlogPosts).post(protect,setBlogPost)
router.route('/count').get(getCountBlogPosts)
// getBlogPost, update,delete blog post have the same root address
router.route('/:id').get(protect,getBlogPost).delete(protect,deleteBlogPost).put(protect,updateBlogPost)

module.exports = router