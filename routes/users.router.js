const router = require('express').Router();
const Users = require('../models/user.entity');
const validateUserRegisterInput = require('../validators/registerUser.validator');
const validateUserUpdateInput = require('../validators/registerUser.validator');
const errorCode = require('../errorCodes.constants');
const validateLoginUserInput = require('../validators/loginUser.validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {PASSPORT_SECRET_KEY} = require('../config');



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
        errors.statusCode = 400;
        return next({errors});
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
        return next({err});
    })
    if(user){
        errors.email = "user already exists";
        errors.statusCode = 500;
        return next({errors});
    }

    const newUser = new Users({
        name,
        password,
        email,
        role,
        preferredMeal,
        address
    });



    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => res.json(user))
                .catch(err => {
                    console.error(err);
                    return next({err})
                });
        });
    });
})



router.post('/login' , async (req , res , next)=>{
    const {errors , isValid} = validateLoginUserInput(req.body);
    if(!isValid){
        return next({errors});
    }

    const {
        email,
        password
    } = req.body;

    Users.findOne({email})
        .then(user=>{
            if(!user){
                errors.email = "User not found";
                return next({errors});
            }
            bcrypt.compare(password , user.password).then(match=>{
                if(match){
                    const payload = {
                        email,
                        _id : user._id,
                        name : user.name,
                        role : user.role,
                        preferredMeal : user.preferredMeal
                    };
                    jwt.sign(
                        payload,
                        PASSPORT_SECRET_KEY,
                        (error , token)=>{
                            return res.status(200).json({
                                success : true,
                                token : 'Bearer ' + token
                            });
                        }
                    );
                }
                else {
                    errors.password = "Password is not matched."
                    return res.status(400).json({errors});
                }
            })
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