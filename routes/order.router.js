const router = require('express').Router();
const Orders = require('../models/order.entity');


router.get('/' , (req , res , next)=>{
    Orders.find({})
        .then(data=>{
            return res.send(data);
        })
        .catch(err=>{
            return next(err);
        })
})

router.get('/:id',async (req , res , next)=>{
    const {id} = req.params;
    const order = await Order.findOne({owner : id}).catch(err=>{return next(err)});
    return res.send(order);
})

router.post('/:id' , async (req , res , next)=>{
    const {id} = req.params;
    const {cart , customerId} = req.body;

    const order = new Order({
        owner : id,
        customer : customerId,
        cart : cart.items,
        totalPrice : cart.totalPrice
    })

    order.save()
        .then((data)=>{
            return res.send(data);
        })
        .catch(err=>{
            return next(err)
        })
})


router.get('/owner/:id' , (req , res , next)=>{
    const {id} = req.params;
    Orders.find({owner : id , isDelivered : false})
        .then(data=>{
            return res.send(data);
        })
        .catch(err=>{
            return next(err);
        })
})

router.get('/customer/:id',(req , res , next)=>{
    const {id} = req.params;
    Orders.find({customer : id})
        .then(data=>{
            return res.send(data);
        })
        .catch(err=>{
            return next(err);
        })
})




module.exports = router;