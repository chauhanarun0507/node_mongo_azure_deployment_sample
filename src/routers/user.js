const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const expressJoiMiddleware = require('express-joi-middleware');
const validator = require('../validations/user')

router.post('/addUser', expressJoiMiddleware(validator.usernotifications), async (req,res) => {
    try{
        console.log(typeof(req.body.notifications))
        const validationRes = await validationHelper(req.body.notifications);
        if(validationRes.status === false) {
            res.status(400).send(validationRes);
        } else {
            const user = new User(req.body)
            await user.save();
            res.status(201).send(user);
        }
    } catch(e) {
        if(e.errmsg){
            return res.status(400).send({status: 400, error: e.errmsg });
        }
        res.status(400).send(e)
    }
})

const validationHelper = async(body) => {
    if(typeof(body) === 'object') {
        const updates = Object.keys(body);
        if(updates.length <= 0) {
            return {status: false, error: "Notification object can not be blank!"}
        }
        for(let update of updates) {
            if(update === 'showFrom'){
                if(body.showFrom.length <= 0 ){
                    return {status: false, error: "showFrom Arrays in Notification can not be blank!"}
                }
            }
            if(update === 'hideFrom'){
                if(body.hideFrom.length <= 0 ){
                    return {status: false, error: "hideFrom Arrays in Notification can not be blank!"}
                }
            }
            if(update === 'showForSubjects'){
                if(body.showForSubjects.length <= 0 ){
                    return {status: false, error: "showForSubjects Arrays in Notification can not be blank!"}
                }
            }
            if(update === 'hideForSubjects'){
                if(body.hideForSubjects.length <= 0 ){
                    return {status: false, error: "hideForSubjects Arrays in Notification can not be blank!"}
                }
            }
        }
        const allowedUpdates = ['showFrom','hideFrom', 'showForSubjects','hideForSubjects'];
        const isVallidOperation = updates.every((update) => allowedUpdates.includes(update));

        if(!isVallidOperation){
            return {status: false, error: "Invallid updates!"}
        }
        return {status: true, error: ""}
    }
}

module.exports = router;