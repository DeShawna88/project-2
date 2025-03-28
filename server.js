const { name } = require('ejs');
const express = require('express');
const app = express();




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