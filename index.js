const express = require('express')
const app = express()
const port = 5000

const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://sanbonai06:yohan72301107@cluster0.igyr6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
}).then(()=> console.log('MongoDB Connected...'))
  .catch(err=> console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!::안녕하세요')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})