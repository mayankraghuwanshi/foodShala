const router = require('express').Router();
const Restaurant = require('../models/restourant.entity');
const errorCodes = require('../errorCodes.constants');
const validateRegisterRestourantInput = require('../validators/registerRestaurant.validator');
const validateUpdateRestaurantInput = require('../validators/updateRestaurant.validator');

router.get('/' , (req , res ,next)=>{
    Restaurant.find()
        .then(data=>{
            return res.send(data);
        })
        .catch(err=>{
            err.statusCode = errorCodes.BAD_REQUEST;
            err.msg = "Something went wrong";
            return next(err);
        })
})


router.get('/:id' , (req , res , next)=>{
    const {id} = req.params;
    Restaurant.findOne({_id:id}).populate('menu')
        .then(data=>{
            return res.send(data);
        })
        .catch(err=>{
            err.msg = "Something went wrong while fetching restourant from db."
            return next(err);
        })
})


router.post('/' , (req , res , next)=>{
    const {errors , isValid} = validateRegisterRestourantInput(req.body);
    if(!isValid){
        errors.statusCode = errorCodes.VALIDATION_FAIL;
        return next({errors});
    }
    //TODO : fetch user id from session.
    const {userId} = req.body;


    const {
        name,
        address,
        description,
        contactNumber,
        status,
        imageUrl,
    } = req.body;

    const restourant = new Restaurant({
        name,
        address,
        description,
        contactNumber,
        status,
        imageUrl,
        owner : userId
    })

    restourant.save()
        .then(data=>{
            return res.send(data);
        })
        .catch(err=>{
            err.statusCode = errorCodes.BAD_REQUEST;
            err.msg = "Something went wrong";
            return next({err});
        })
})



router.patch('/:id' , async (req , res, next)=>{
    const {errors , isValid} = validateUpdateRestaurantInput(req.body);
    if(!isValid){
        return next({errors});
    }
    const id = req.params.id;

    const restaurant = await Restaurant.findOne({_id:id})
        .catch(err=>{
            err.msg = "Something went wrong while fetching restaurant";
            return next({err});
        });


    if(!restaurant){
        errors.msg = "Restaurant doesn't exist!";
        return next({errors});
    }
    const {
        name,
        description,
        contactNumber,
        status,
        address
    } = req.body;

    restaurant.name=name;
    restaurant.description = description;
    restaurant.contactNumber = contactNumber;
    restaurant.status = status;
    restaurant.address = address;

    restaurant.save()
        .then(data=>{
            return res.send(data);
        })
        .catch(err=>{
            err.msg = "Something went wrong while saving restaurant";
            return next({err});
        })
})

router.delete('/:id' , (req , res, next)=>{
    const {id} = req.params;
    Restaurant.deleteOne({_id:id})
        .then(data=>{
            return res.send(data);
        })
        .catch(err=>{
            err.msg = "Something went wrong while deleting restaurant with id "+id;
            return next({err});
        })
})


router.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 400).json(err)
})




module.exports = router;
