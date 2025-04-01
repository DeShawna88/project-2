const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Dessert = require('./models/dessert.js');

// const recipes = [
//     { 
//         name: 'Red Velvet Cake', 
//         ingredients: '2 ¾ cups all-purpose flour, ¼ cup cornstarch, 2 tablespoons unsweetened cocoa powder, 1 teaspoon baking soda, ¾ teaspoon salt, 1 stick unsalted butter, softened to room temperature, 2 ⅛ cups granulated sugar, 1 cup vegetable or canola oil, 3 large eggs, 2 teaspoons vanilla extract, 1 ¼ teaspoons distilled white vinegar, 2 - 3 tablespoons red food coloring gel, 1 cup buttermilk',
//     },
//     {
//         name: 'Death By Chocolate', 
//         ingredients: '3 cups all-purpose flour, 2 ⅔ cups granulated sugar, ½ cup cocoa powder, 1 ½ teaspoon baking powder, 1 tablespoon baking soda, ½ cup Greek yogurt, ¾ cup vegetable oil, 1 cup full-fat buttermilk, 1 tablespoon vanilla extract, 1 ½ cups hot water, 3 large eggs at room temp', 
//     },
//     { 
//         name: 'New York Style Cheesecake', 
//         ingredients: 'Crust: 19 honey graham crackers, crushed into crumbs, 4 tablespoons unsalted melted butter, ¼ cup white sugar, Cheesecake: 4 (8 ounce) packages cream cheese, cut into cubes, at room temperature, 1 ½ cups white sugar, 4 jumbo eggs, at room temperature, 1 cup sour cream, ¼ cup heavy whipping cream, 1 tablespoon pure vanilla extract, ⅛ cup all-purpose flour, sifted',
//     },
//     {
//         name: 'Strawberry Shortcake', 
//         ingredients: '6 cups fresh strawberries, ⅓ cup white sugar, 2 ¼ cups all-purpose flour, ¼ cup white sugar, 1 tablespoon baking powder, ¼ teaspoon salt, ½ cup cold unsalted butter, cut into ½-inch pieces, 1 large egg, lightly beaten, ¾ cup half-and-half, 2 teaspoons vanilla extract, divided, 1 ½ cups whipped heavy cream, ¼ cup powdered sugar', 
//     },
//     { 
//         name: 'Double Fudge Brownies', 
//         ingredients: '1 ¼ stick unsalted butter, ¾ cup dutch process cocoa powder, 2 large eggs, 1 large egg yolk, 1 cup granulated sugar, ½ cup light brown sugar, 1 teaspoon vanilla extract, ½ cup all purpose flour, 1 teaspoon kosher salt, 1 teaspoon espresso powder, ⅓ cup finely chopped chocolate',
//     },
//     { 
//         name: 'Peach Cobbler', 
//         ingredients: '½ cup melted unsalted butter, 1 cup self-rising flour, 1 cup white sugar, 1 cup milk, 2 (16 ounce) cans sliced peaches in heavy syrup',
//     }, 
// ]

// --------------- MIDDLEWARE ---------------

app.use(express.urlencoded({ extended: false }));









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

app.get('/desserts/:dessertId', async (req, res) => {
    const recipe = await Dessert.findById(req.params.dessertId);
    res.render('desserts/show.ejs', {
        recipe: recipe
    })
})


app.get("/desserts/new", async (req, res) => {
    res.render("desserts/new.ejs");
}); 

app.post('/desserts', async (req, res) => {
    console.log(req.body);
    if (req.body.newSubmit === 'on') {
        req.body.newSubmit = true;
    }  else {
        req.body.newSubmit = false;
    }
    await Dessert.create(req.body);
    res.redirect('/desserts/new');
})






app.listen(3002, () => {
    console.log('Listening on port 3002');
});