const express = require('express')
const {engine} = require('express-handlebars')
const mysql = require('mysql')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('', (req, res) => {
    res.render('home')
})

const port = process.env.PORT || 5000


app.listen(port, () => console.log("App is runing"))