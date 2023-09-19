const Order = require('../models/Order');

const orderController = {

getAllOrders: async (req, res) => {
try {
    const Orders = await Order.find();
    res.json(Orders);
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
},

addOrder : async (req, res) => {
try {
    const newOrders = await Order(req.body);
    await newOrders.save();
    res.status(200).json({ msg: 'you could add your new Order', newOrders });
} catch (err) {
    console.log(err);
}
},

updateOrder : async (req, res) => {
try {
    const { id } = req.params;
    const updateOrder = await Order.findByIdAndUpdate(id, { $set: { ...req.body } });
    res.status(200).json({ msg: 'you could update me', updateOrder });
} catch (err) {
    console.log(err);
}
},
deleteOrder : async (req, res) => {
try {
    const { id } = req.params;
    const deletcont = await Order.findByIdAndDelete(id);
    res.status(200).json({ msg: 'you deleted that Order' });
} catch (err) {
    console.log(err);
}
},
getUniqueOrder : async (req, res) => {
try {
    const { id } = req.params;
    const getuniqueOrder = await Order.findById(id);
    res.status(200).json({ msg: 'you found that Order', getuniqueOrder });
} catch (err) {
    console.log(err);
}
},

    patchOrder : async (req, res) => {
        try {
        const { id } = req.params;    
        const patchOrder = await Order.findByIdAndUpdate(id, { $set: { ...req.body } }, );
    
        res.status(200).json({ msg: 'Oreder patched successfully', patchOrder });
        } catch (err) {
        console.error('Error patching order:', err);
        res.status(500).json({ error: 'Internal server error' });
        }
    },

}

module.exports = orderController;