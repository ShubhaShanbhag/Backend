const express = require('express');
const route = express.Router();
const postController = require('../controller/postController')
const commentController = require('../controller/commentController')
const userController = require('../controller/userController')
const auth = require('../middleware/auth')

route.get('/',auth.userAuth, postController.getPosts);
route.post('/create-post',auth.userAuth, postController.createPost)
route.post('/posts/:id/delete', postController.deletePost)
route.post('/posts/:id/edit', postController.editPost)
route.post('/posts/:id/update', postController.updatePost)
route.get('/posts/:id/comment', commentController.createComment)
route.post('/posts/:id/addComment',auth.userAuth, commentController.addComment)
route.post('/signup', userController.signupUser)
route.post('/login', userController.loginUSer)

module.exports= route;