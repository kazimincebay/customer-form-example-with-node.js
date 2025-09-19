const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerFullName: { type: String, required: true },
  customerBalance: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
