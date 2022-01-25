const express = require('express')
const { get } = require('express/lib/response')
const app = express()
const bodyParser = require("body-parser")
const path = require('path')
const mustacheExpress = require('mustache-express')

const VIEWS_PATH = path.join(__dirname, '/client')

app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine','mustache')

app.use(bodyParser.urlencoded({extended: false}))

let toDos = []

app.get('/', (req, res) =>{
    res.render('index', toDos)
})

app.post('/', (req, res) => {
    let {title, priority} = req.body
    const date = new Date

    toDos.push({title, priority, date})

    console.log(toDos)

    res.render('index', {toDos})
})


app.listen(3000,() => {
    console.log("Server is running...")
  })