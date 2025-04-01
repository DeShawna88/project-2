const mongoose = require('mongoose')

const dessertSchema = new mongoose.Schema({
    name: String,
    recipe: String,
    newSubmit: Boolean,
})

const Dessert = mongoose.model('Dessert', dessertSchema);
module.exports = Dessert;