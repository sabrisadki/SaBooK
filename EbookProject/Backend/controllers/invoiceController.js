const Invoice = require('../models/Invoice');

const invoiceController = {

getAllInvoices: async (req, res) => {
try {
    const Invoices = await Invoice.find();
    res.json(Invoices);
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
},


addInvoice: async (req, res) => {
    try {
        const newInvoice = new Invoice(req.body);
        await newInvoice.save();
        res.status(200).json({ msg: 'you could add your new Order', newInvoice });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
},

updateInvoice : async (req, res) => {
try {
    const { id } = req.params;
    const updateInvoice = await Invoice.findByIdAndUpdate(id, { $set: { ...req.body } });
    res.status(200).json({ msg: 'you could update me', updateInvoice });
} catch (err) {
    console.log(err);
}
},
deleteInvoice : async (req, res) => {
try {
    const { id } = req.params;
    const deletcont = await Invoice.findByIdAndDelete(id);
    res.status(200).json({ msg: 'you deleted that Invoice' });
} catch (err) {
    console.log(err);
}
},
getUniqueInvoice : async (req, res) => {
try {
    const { id } = req.params;
    const getuniqueInvoice = await Invoice.findById(id);
    res.status(200).json({ msg: 'you found that Invoice', getuniqueInvoice });
} catch (err) {
    console.log(err);
}
}
}

module.exports = invoiceController;