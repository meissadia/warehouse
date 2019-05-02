const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const locationSchema = new Schema({
    name: String,
    photo_url: String,
});

module.exports = mongoose.model("Location", locationSchema);
