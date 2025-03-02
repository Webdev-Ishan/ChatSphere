const express = require('express')
const Router = express.Router()


Router.get('/', (req,res)=>{

res.render('index.ejs')

})

Router.get('/chat', (req,res)=>{

    res.render('chat.ejs')
    
    })

module.exports = Router