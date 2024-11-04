import express from "express"

const router = express.Router()

router.get('/people',(req,res)=>{
    
    const data = [
        {name : 'myo set paing', age : 21},
        {name : 'paing set myo' , age : 12}
    ]

    return res.status(200).json(data)
})

export default router;



