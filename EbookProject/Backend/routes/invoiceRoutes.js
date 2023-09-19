const express = require('express');
const invoiceController = require('../controllers/invoiceController');
const routerInvoices = express.Router();

routerInvoices.get('/invoices', invoiceController.getAllInvoices);
routerInvoices.post('/postinvo', invoiceController.addInvoice);
routerInvoices.put('/updateinvoice/:id', invoiceController.updateInvoice);
routerInvoices.delete('/deleteinvoice/:id', invoiceController.deleteInvoice);
routerInvoices.get('/invoice/:id', invoiceController.getUniqueInvoice);

module.exports = routerInvoices;
