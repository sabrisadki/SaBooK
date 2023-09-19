const Comment = require("../models/Comment");

const CommentController = {

getAllComments: async (req, res) => {
    try {
    const Comments = await Comment.find();
    res.json(Comments);
    } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    }
},

addComment: async (req, res) => {
    try {
    const newComment = await Comment.create(req.body);
    res.status(200).json({ msg: "New Comment added", newComment });
    } catch (err) {
    console.error(err);
    // Handle the error appropriately, e.g., by sending an error response
    res.status(500).json({ error: "Internal server error" });
    }
},

updateComment: async (req, res) => {
    const { id } = req.params;
    const updateComment = await Comment.findByIdAndUpdate(id, {
    $set: { ...req.body },
    });
    res.status(200).json({ msg: "you could update me", updateComment });
},

deleteComment: async (req, res) => {
    const { id } = req.params;
    const deletcont = await Comment.findByIdAndDelete(id);
    res.status(200).json({ msg: "you deleted that Comment" });
},

getComment: async (req, res) => {
    const { id } = req.params;
    const deletcont = await Comment.findById(id);
    res.status(200).json({ msg: "you found that Comment" });
},

searchBooksByBookid: async (req, res) => {
    const bookid = req.params.bookid;

    try {
    const foundComments = await Comment.find({
        $or: [
        { bookid: { $regex: bookid, $options: "i" } }, // Case-insensitive title search
        ],
    });

    res.json(foundComments);
    } catch (error) {
    console.error("Error searching Books by Keyword:", error);
    res
        .status(500)
        .json({ error: "An error occurred while searching for books." });
    }
},
};

module.exports = CommentController;
