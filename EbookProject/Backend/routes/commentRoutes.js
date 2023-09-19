const express = require('express');
const CommentController = require('../controllers/commentController');

const routerComment = express.Router();

routerComment.get('/comments', CommentController.getAllComments);
routerComment.post('/addcomment', CommentController.addComment);
routerComment.put('/updatecomment/:id', CommentController.updateComment);
routerComment.delete('/deletecomment/:id', CommentController.deleteComment);
routerComment.get('/getcomment/:id', CommentController.getComment);
routerComment.get('/search/:bookid', CommentController.searchBooksByBookid);

module.exports = routerComment;
