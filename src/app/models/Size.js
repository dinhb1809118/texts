const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Size = new Schema({
    name: { type: Array, require: true }
}, {
    collection: 'size',
    timestamps: true
});
module.exports = mongoose.model('size', Size); 