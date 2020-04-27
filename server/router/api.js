const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user')
const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/Danippa";

mongoose.connect(db, err => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('connected to MongoDB')
    }
})
router.get('/', (req, res) => {
    res.send('From Servers Route')
})

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, regsiteredUser) => {
        if (error) {
            console.log(error)
        }
        else {
            let payload = { subject: regsiteredUser._id };
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
        }
    })
})

router.post('/login', (req, res) => {

    let userData = req.body;
    User.findOne({
        email: userData.email
    },
        (error, user) => {
            if (error) {
                console.log('Error is' + error)
            }
            else {
                if (!user) {
                    res.status(401).send('Invalid Mail')
                }
                else if (user.password !== userData.password) {
                    res.status(401).send('Invalid Password')
                } else {
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
               }
            }
        })


})
router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "22-01-2019"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "22-01-2019"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "22-01-2019"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "22-01-2019"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "22-01-2019"
        }
    ];
    res.json(events)
});

router.get('/special', verifyToken, (req, res) => {
    let special = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "22-01-2019"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "22-01-2019"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "22-01-2019"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "22-01-2019"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "22-01-2019"
        }
    ];
    res.json(special)
})

function verifyToken(req,res,next){

    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized Request');
    }
    var token = req.headers.authorization.split(' ')[1];
        console.log(token)
    if( token === null){
        return res.status(401).send('Unauthorized Request');
    }
    let payload = jwt.verify(token,'secretKey');
    console.log("Payload is" + payload)
    if(!payload){
        return res.status(401).send('Unauthorized Request');       
    }
    req.userId =  payload.subject;
    next()
 
    

}
module.exports = router;