const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


const inventory = [
   { name: 'Red Velvet Cake', price: 40},
   { name: 'Death By Chocolate', price: 50},
   { name: 'New York Style Cheesecake', price: 45},
   { name: 'Strawberry Shortcake', price: 30},
   { name: 'Double Fudge Brownies', price: 25},
   { name: 'Peach Cobbler', price: 30}, 
]

// --------------- MIDDLEWARE ---------------











// --------------- ROUTES -------------------

app.get('/', async (req, res) => {
    res.render('home.ejs')
});

app.get('/desserts', (req, res) => {
    res.render('desserts/menu.ejs', {
        inventory: inventory
    })
});

app.get('/:itemId', (req, res) => {
    const index = req.params.itemId;
    res.render('desserts/show.ejs', {
        item: inventory[index]
    })
})








app.listen(3002, () => {
    console.log('Listening on port 3002');
});