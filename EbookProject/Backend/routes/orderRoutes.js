const express = require('express');
const orderController = require('../controllers/orderController');

const routerOrder = express.Router();

routerOrder.get('/orders', orderController.getAllOrders);
routerOrder.post('/addorders', orderController.addOrder);
routerOrder.delete('/deleteorder/:id', orderController.deleteOrder);
routerOrder.put('/updateorder/:id', orderController.updateOrder);
routerOrder.patch('/patchorder/:id', orderController.patchOrder);

module.exports = routerOrder;
