import express from "express"
import mongojs from "mongojs"
import bodyParser from "body-parser"
import { body,header,param,validationResult } from "express-validator"
import jwt from "jsonwebtoken";



const app = express()
const db = mongojs('travel',["records"])

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/api/records',(requset,response)=>{

    const options = requset.query
    const sort = options.sort || {}
    const filter = options.filter || {}
    const limit = 10
    const page = parseInt(options.page) || 1
    const skip = (page - 1) * limit

    for( let i in sort){
        sort[i] = parseInt(sort[i])
    }
  
    db.records.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit,(error,data)=>{
        if(error){
            return response.status(500)
        }

        return response.status(200).json({
            meta: { total : data.length ,
                sort : sort,
                skip : skip ,
                limit : limit,
                filter : filter
            },
            data,
            links : {
                self : requset.originalUrl
            }
  
        })
    })
})

app.post('/api/records/',[
    body('name').not().isEmpty(),
    body('from').not().isEmpty(),
    body('to').not().isEmpty()
],(request,response)=>{
    const error = validationResult(request)
    if(!error.isEmpty()){
        return response.status(400).json({errors : error.array()})
    }
    db.records.insert(request.body,(error,data)=>{
        if(error){
            return response.status(500)
        }
        const id = data._id
        response.append('Location','api/records'+id)
        return response.status(201).json({meta:{id},data})
    })
})

app.put('/api/records/:id',
    [param('id').isMongoId()],
    (request, response) => {
        const _id = request.params.id;
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        db.records.count(
            { _id: mongojs.ObjectID(_id) },
            (error, count) => {
                if (error) {
                    return response.status(500).json({ error: 'Database error occurred' });
                }

                if (count) {
                    // Update existing record
                    db.records.updateOne(
                        { _id: mongojs.ObjectID(_id) }, // Filter
                        { $set: { ...request.body } },  // Update operation using $set
                        (error, data) => {
                            if (error) {
                                return response.status(500).json({ error: 'Update failed' });
                            }
                            return response.status(200).json({ meta: { _id }, data });
                        }
                    );
                } else {
                    // Insert new record if not found
                    db.records.insert(
                        { _id: mongojs.ObjectID(_id), ...request.body },
                        (error, data) => {
                            if (error) {
                                return response.status(500).json({ error: 'Insert failed' });
                            }
                            return response.status(201).json({ meta: { _id }, data });
                        }
                    );
                }
            }
        );
    }
);


app.delete('/api/records/:id', [
    param('id').isMongoId()
], (request, response) => {
    const id = request.params.id;
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    db.records.count(
        { _id: mongojs.ObjectID(id) }, // Corrected field name to _id
        (error, count) => {
            if (error) {
                return response.status(500).json({ error: 'Database error occurred' });
            }

            if (count === 0) {
                return response.status(404).json({ message: 'Record not found' });
            }

            db.records.remove(
                { _id: mongojs.ObjectID(id) }, // Corrected field name to _id
                (error, data) => {
                    if (error) {
                        return response.status(500).json({ error: 'Failed to delete record' });
                    }

                    return response.status(200).json({ message: 'Record deleted successfully', data });
                }
            );
        }
    );
});

const users = [
    {username : "ko ko",password : 12345,role : "admin"},
    {username : "nyi nyi",password : 12345,role : "member"}
]

const secret = "ahahahtohnntaemodaisukidoraemon"

app.post('/api/login',(request,response)=>{
    const {username,password} = request.body
    const user = users.find((u)=>{
        u.username === username && u.password === password
    })
    if(user){
        jwt.sign(user,secret,{
            expiresIn : "1h"
        },(error,token)=>{
            if(error){
                return response.status(400)
            }
            return response.status(200).json({token:{token}})
        })
    }
})

const auth = (request,response,next)=>{
    const header = request.headers["authorization"]
    if(header){
        return response.status(403)
    }

    const [type,token] = header.split(" ")

    if(type !== 'Bearer'){
        return response.status(401)
    }

    jwt.verify(token,secret,(error,data)=>{
        if(error){
            return response.status(403)
        }
        return next()
    })

}

const adminOnly = (request,response,next)=>{
    const auth = request.headers['authorization']
    const [type,token] = auth.split(' ')
    jwt.verify(token,secret,(error,user)=>{
        if(user.role === 'admin'){
            return next()
        }
        return response.status(403)
    })
}
 

app.get('/test',(request,response)=>{
    return response.json(request.query)
})

app.listen(9000,()=>{
    console.log('travel project is running')
})