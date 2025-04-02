const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Dessert = require('./models/dessert.js');


// --------------- MIDDLEWARE ---------------

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));




// --------------- ROUTES -------------------

app.get('/', async (req, res) => {
    res.render('home.ejs')
});

app.get('/desserts', async (req, res) => {
    const recipes = await Dessert.find()
    res.render('desserts/recipes.ejs', {
        recipes: recipes
    })
});

app.get("/desserts/new", async (req, res) => {
    res.render("desserts/new.ejs");
}); 

app.get('/desserts/:dessertId', async (req, res) => {
    const recipe = await Dessert.findById(req.params.dessertId);
    res.render('desserts/show.ejs', {
        recipe: recipe
    })
})

app.post('/desserts', async (req, res) => {
    console.log(req.body);
    if (req.body.newSubmit === 'on') {
        req.body.newSubmit = true;
    }  else {
        req.body.newSubmit = false;
    }
    await Dessert.create(req.body);
    res.redirect('/desserts');
})

app.delete('/desserts/:dessertId', async (req, res) => {
    // res.send('This is the delete route')
    await Dessert.findByIdAndDelete(req.params.dessertId);
    res.redirect('/desserts');
})

app.get("/desserts/:dessertId/edit", async (req, res) => {
    const foundDessert = await Dessert.findById(req.params.dessertId);
    res.render("desserts/edit.ejs", {
      dessert: foundDessert,
    });
  });

app.put('/desserts/:dessertId', async (req, res) => {
    if (req.body.newSubmit === 'on') {
        req.body.newSubmit = true;
    }  else {
        req.body.newSubmit = false;
    }
    await Dessert.findByIdAndUpdate(req.params.dessertId, req.body);
    res.redirect(`/desserts/${req.params.dessertId}`);
})

app.listen(3002, () => {
    console.log('Listening on port 3002');
});