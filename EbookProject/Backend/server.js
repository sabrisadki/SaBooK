const app = require('./app');
const cors = require('cors');
const { PORT } = require('./config/config');
const router = require('./routes/bookRoutes');
const routerOrder = require('./routes/orderRoutes');
const routerFeedback = require('./routes/feedbackRoutes');
const routerComment = require('./routes/commentRoutes');
const authRouter  = require('./routes/authRoutes'); 
const routerInvoices = require('./routes/invoiceRoutes');
const express = require('express');

app.use(cors());

app.use('/api/book', router);
app.use('/api/ord', routerOrder);
app.use('/api/fb', routerFeedback);
app.use('/api/comment', routerComment);
app.use('/api/auth', authRouter);
app.use('/api/invo', routerInvoices);
app.use('/uploads', express.static('public'));
app.use('/uploadpdf', express.static('public'));


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
