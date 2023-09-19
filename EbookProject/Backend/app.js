const express = require('express');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const orderRoutes = require('./routes/orderRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const commentRoutes = require('./routes/commentRoutes')
const connectdb =require('./config/connectdb');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/api', bookRoutes);
app.use('/api', orderRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', commentRoutes);
app.use('/api', authRouter);

connectdb();

module.exports = app;











    // app.use((req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    // next(); });
