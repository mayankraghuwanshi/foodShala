const router = require('express').Router();
const Users = require('../models/user.entity');
const validateUserRegisterInput = require('../validators/registerUser.validator');
const validateUserUpdateInput = require('../validators/registerUser.validator');
const errorCode = require('../errorCodes.constants');

router.get('/' , (req , res)=>{
    Users.find()
        .then(data=>{
            return res.send(data);
        })
        .catch(err=>{
            console.error(err);
            res.send(err);
        })
})


router.post('/' , async (req  , res , next)=>{
    const {isValid , errors} = validateUserRegisterInput(req.body);
    if(!isValid){
        errors.statusCode = 500;
        return next(errors);
    }
    const {
        name,
        password,
        email,
        role,
        preferredMeal,
        address
    } = req.body;

    const user = await Users.findOne({email}).catch(err=>{
        err.statusCode = 500;
        return next(err);
    })
    if(user){
        errors.email = "user already exists";
        errors.statusCode = 500;
        return next(errors);
    }

    const newUser = new Users({
        name,
        password,
        email,
        role,
        preferredMeal,
        address
    });

    newUser.save()
        .then(data=>{
            return res.send(data);
        })
        .catch(err=>{
            err.statusCode = 500;
            return next(err);
        })
})



router.put('/:id',async (req , res , next)=>{
    const {errors , isValid} = validateUserRegisterInput(req.body);
    const id = req.params.id;
    if(!isValid){
        errors.statusCode = errorCode.VALIDATION_FAIL;
        return next(errors);
    }
   //TODO

})





router.delete('/:id',(req, res , next)=>{
    const id = req.params.id;
    Users.deleteOne({_id:id})
         .then(data=>{
             return res.send({success  :true});
         })
        .catch(err=>{
            err.statusCode = errorCode.BAD_REQUEST;
            err.msg = "Something went wrong!";
            return next(err);
        })
})





router.use((err, req, res, next) => {
    res.status(err.statusCode || 400).json(err)
})



module.exports = router;