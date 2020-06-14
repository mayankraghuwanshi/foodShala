const router = require('express').Router();
const Recipe = require('../models/recipe.entity');
const Restaurant = require('../models/restourant.entity');
const validateRegisterRecipeInput = require('../validators/registerRecipe.validator')



router.get('/' , (req , res , next)=>{
    Recipe.find({})
        .then(data=>{
            return res.send(data);
        })
        .catch(err=>{
            return next(err);
        })
})


router.post('/:restaurantId' , async (req , res , next)=>{
    const {restaurantId} = req.params;
    const {errors , isValid} = validateRegisterRecipeInput(req.body);
    if(!isValid){
        return next(errors);
    }
    const restaurant = await Restaurant.findOne({_id:restaurantId})
        .catch(err=>{
            return next(err);
        });

    if(!restaurant){
        const errors = {};
        errors.msg = "Please provide valid restaurant id";
        return next(errors);
    }


    const {
        name,
        description,
        imageUrl,
        price,
        mealType,
        category
    } = req.body;



    const recipe = new Recipe({
        name,
        description,
        imageUrl,
        price,
        mealType,
        category,
        restaurant : restaurantId
    });



    recipe.save()
        .then(data=>{
            restaurant.menu.push(data._id)
            restaurant.save()
                .catch(err=>{
                    err.msg = "Something went wrong while adding menu to restaurant";   return next(err)
                });
            return res.send(data);
        })
        .catch(err=>{
            return next(err);
        })
})

router.get('/:restaurantId' , (req ,res , next)=>{
    const {restaurantId} = req.params;
    Recipe.find({restaurant : restaurantId})
        .then(data=>{
            return res.send(data);
        })
        .catch(err=>{
            return next(err);
        })
})


router.delete('/:id', async (req , res , next)=> {
    const {id} = req.params;
    const recipe = await Recipe.findOne({_id:id}).catch(err=> {return next(err)});
    if(!recipe){
        const errors = {};
        errors.msg = "Recipe with id "+id+" not found!";
        return next(errors);
    }

    const restaurant = await Restaurant.findOne({_id : recipe.restaurant}).populate('menu').catch(err=> {return next(err)});

    if(!restaurant){
        errors.msg = "Restaurant with id "+recipe.restaurant+" not found!";
        return next(errors);
    }

    let menu = restaurant.menu;
    menu = menu.filter(item=>item._id!==id);

    restaurant.menu = menu;
    Promise.all([restaurant.save() , recipe.deleteOne({_id:id})])
        .then(data=>{
            return res.send({
                success  :true,
                data
            })
        })
        .catch(err=>{
            next(err);
        })
})


router.patch('/:restaurantId/:recipeId' ,async (req , res , next)=>{
    const {restaurantId , recipeId} = req.params;
    const {errors , isValid} = validateRegisterRecipeInput(req.body);
    if(!isValid){
        return next(errors);
    }
    const recipe = await Recipe.findOne({_id:recipeId})
        .catch(err=>{
            err.msg = "Something went wrong while fetching recipe with id "+recipeId;
            return next(err);
        })
    if(!recipe){
        errors.recipe = "Recipe with id "+recipeId+" is not found.";
        return next(errors);
    }

    const restaurant = await Restaurant.findOne({_id:restaurantId})
        .catch(err=>{
            err.msg = "Something went wrong while fetching restaurant with id "+restaurantId
            return next(err);
        })
    if(!restaurant){
        errors.recipe = "Restaurant with id "+restaurantId+" is not found.";
        return next(errors);
    }

    const {
        name,
        description,
        imageUrl,
        price,
        mealType,
        category
    } = req.body;

    recipe.name = name;
    recipe.description = description;
    recipe.imageUrl = imageUrl;
    recipe.price = price;
    recipe.mealType = mealType;
    recipe.category = category;

    recipe.save()
        .then(data=>{
            return res.send({
                success : true,
                data
            })
        })
        .catch(err=>{

            return next(err);
        })

})


router.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 400).json(err)
})







module.exports = router;