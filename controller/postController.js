const Post = require('../model/postModel')
const Comment = require('../model/commentModel')
const User = require('../model/userModel')

const getPosts = (req,res) => {
    Post.find()
    .populate("comments","user_id comment")
    .populate("user_id", "firstname")
    
    .populate({
    path: 'comments',
    model: 'Comment',
    populate: {
        path: 'user_id',
        model: 'User'
    }
    })
    
    .sort({created_at : -1})
    //.then((result) => 

    
    
    //)
    //.catch((err)=> console.log(err))
}

const createPost = async (req, res) => {
    try {
        const newPost = new Post({
            review: req.body.review,
        });
        await newPost.save();
        res.redirect('/');
    } catch (error) {
        // Handle the error appropriately (e.g., log the error, send an error response)
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const deletePost = async (req,res) => {
    const {id} = req.params;
    await Post.findOneAndDelete(id);
    res.redirect('/')
}

const editPost = async(req,res)=> {
    const {id} = req.params;
    const post = await Post.findById(id)
    res.render('edit', {post})
}
const updatePost = async (req,res) => {
    const {id} = req.params;
    await Post.findByIdAndUpdate(id,req.body,{runValidators:true})
    res.redirect('/')
}

    

module.exports = { getPosts, createPost, deletePost,editPost,updatePost}