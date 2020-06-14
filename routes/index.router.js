const router = require('express').Router();
const userRoute = require('./users.router');
const restaurantRouter = require('./restourants.router');
const recipeRouter = require('./recipes.router');


router.use('/users' , userRoute);
router.use('/restaurants' , restaurantRouter);
router.use('/recipes' , recipeRouter);




module.exports = router;