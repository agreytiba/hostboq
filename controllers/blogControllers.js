const asyncHandler = require('express-async-handler')

const Blog =require('../models/blogModel')

// @desc Get all blogposts submitted
// @route GET /api/blogposts
// @access  public
const getBlogPosts =asyncHandler( async(req,res)=>{
  const blogposts = await Blog.find().sort({ createdAt: -1 })
    res.status(200).json(blogposts)
}
) 



// @desc set   create blog post to system
// @route POST /api/blogposts
// @access private
const setBlogPost =asyncHandler(  async(req,res)=>{
    const data = req.body
    if (!data) {
        res.status(400)
        throw new Error('jaza form')
    }
    const blogPost = await Blog.create(data)
    res.status(200).json(blogPost)
}
)
// @desc update blog post using the  blog post id
// @route PUT /api/blogposts/:id
// @access private
const updateBlogPost =asyncHandler( async(req,res)=>{
    const blogPost = await Blog.findById(req.params.id)
    if (!blogPost) {
         res.status(400)
         throw new Error (' hii ramani haipo')
    }
  
    const updatedBlogPost =await Blog.findByIdAndUpdate(req.params.id, req.body,{new: true,})
    res.status(200).json(updatedBlogPost)
})
// @desc  get single  blogPost detail using blog post  id
// @route GET /api/blog[posts/:id
// @access  private
const getBlogPost = asyncHandler( async(req,res)=>{
    const blogPost = await Blog.findById(req.params.id)
    res.status(200).json(blogPost)
})

// @desc  Delete single  blog posts
// @route DELETE /api/blogposts/:id
// @access private
const deleteBlogPost = asyncHandler( async(req,res)=>{
    const blogPost = await Blog.findById(req.params.id)

    // check for if no blogpsot in the database
    if(!blogPost){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Blog.findOneAndDelete(req.params.id)
    res.status(200).json("successfully deleted")
})
module.exports ={getBlogPosts, getBlogPost, updateBlogPost, setBlogPost, deleteBlogPost}