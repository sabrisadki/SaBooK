const Feedback = require('../models/Feedback');

const feedbackController = {
getAllFeedbacks: async (req, res) => {
try {
    const Feedbacks = await Feedback.find();
    res.json(Feedbacks);
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
},
addFeedback: async (req, res) => {
        const newFeedback = new Feedback(req.body); 
        await newFeedback.save();
        res.status(200).json({ msg: 'New Feedback added', newFeedback });
},

upfb : async (req, res) => {
    const { id } = req.params;
    const updateFeedback = await Feedback.findByIdAndUpdate(id, { $set: { ...req.body } });
    res.status(200).json({ msg: 'you could update me', updateFeedback });

},

delfb : async (req, res) => {
    try {
        const { id } = req.params;
        const delFeed = await Feedback.findByIdAndDelete(id);
        res.status(200).json({ msg: 'you deleted that Feedback' });
    } catch (err) {
        console.log(err);
    }
    }


};

module.exports = feedbackController;
