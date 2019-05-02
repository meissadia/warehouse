const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    name: String,
    description: String,
    photo_url: String,
    quantity: Number,
    locationid: String
})

module.exports = mongoose.model("InventoryItem", inventorySchema);
