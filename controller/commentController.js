const Post = require('../model/postModel')
const Comment = require('../model/commentModel')

const createComment = async(req,res)=>{
    const {id} = req.params;
    const posts = await Post.findById(id)
    //res.render('comment', {posts})
}

const addComment =async (req,res)=> {
    const comment = new Comment({
        comment : req.body.comment,
        post_id : req.params.id,
        user_id : res.locals.id
    })
    // await comment.save()
    // const commentedPost = await Post.findById(req.params.id)
    // commentedPost.comments.push(comment._id)
    // await commentedPost.save()
}

module.exports= {createComment, addComment}