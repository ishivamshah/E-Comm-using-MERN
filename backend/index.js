const express = require('express')
require('./db/config')
const cors = require('cors')
const app = express()
const User = require('./db/user')
const Product = require('./db/product')
const Jwt = require('jsonwebtoken')

const jwtKey ='e-comm'
app.use(express.json())
app.use(cors())

app.post("/register", async (req, res) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    if (result) {
        Jwt.sign({result}, jwtKey, {expiresIn : '2h'}, (err, token) => {
            if(err) {
                res.send({result: 'something went wrong'})
            } else {
                res.send({result, auth: token})
            }
        })
        
    }
})

app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password')
        if (user) {
            Jwt.sign({user}, jwtKey, {expiresIn : '2h'}, (err, token) => {
                if(err) {
                    res.send({result: 'something went wrong'})
                } else {
                    res.send({user, auth: token})
                }
            })
            
        } else {
            res.send({ result: 'No user found' })
        }
    } else {
        res.send({ result: 'No user found' })
    }
})

app.post('/add-product', verifyToken, async (req, res) => {
    let product = new Product(req.body)
    let result = await product.save()
    res.send(result)
})

app.get('/products', verifyToken, async (req, res) => {
    let product = await Product.find()
    if(product.length) res.send(product)
        else res.send('No product found')
})

app.delete('/product/:id', verifyToken, async (req, res) => {
    let result = await Product.deleteOne({_id: req.params.id})
    res.send(result)
})

app.get('/product/:id', verifyToken, async (req, res) => {
    let result = await Product.findOne({_id: req.params.id})
    if(result) {
        res.send(result)
    } else {
        res.send({result: "No product found."})
    }
})

app.put('/product/:id', verifyToken, async (req, res) => {
    let result = await Product.updateOne({_id: req.params.id}, {
        $set: req.body
    })
    if(result) {
        res.send(result)
    } 

})

app.get('/search/:key', verifyToken, async (req, res) => {
    let result = await Product.find({
        '$or' : [
            {name: {$regex: req.params.key}},
            {company: {$regex: req.params.key}},
            {category: {$regex: req.params.key}},
        ]
    })
    res.send(result)
})

function verifyToken(req, res, next) {
    let token = req.headers['authorization']
    if(token) {
        token = token.split(' ')[1]
        Jwt.verify(token, jwtKey, (err, valid) => {
            if(err) {
                res.status(401).send({result: 'Please provide valid token'})
            } else {
                next()
            }
        })
    } else {
        res.status(403).send({result: 'Please add token'})
    }
}

app.listen(5000)