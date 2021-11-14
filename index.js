const express = require('express')
const app = express()
const port = 5000
const bodyParser=require('body-parser');
const {User}=require('./model/User');

const config=require('./config/key');



//application/x-www-form-urlencoded 타입을 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));
//application/json 타입을 분석해서 가져옴
app.use(bodyParser.json());


const mongoose=require('mongoose')
mongoose.connect(config.mongoURI ,{
}).then(()=> console.log('MongoDB Connected...'))
  .catch(err=> console.log(err))

  
app.get('/', (req, res) => {
  res.send('Hello World!::안녕하세요 반갑습니다')
})

app.post('/register', (req,res) =>{
  //회원가입할때 필요한 정보들 client에서 가져오면 그것들을 DB에다가 넣어줌
  const user=new User(req.body)

  user.save((err, userInfo)=>{
    if(err) return res.json({ success: false, err})
    return res.status(200).json({                       //status(200)은 성공이란 의미
      success: true                                     //postman에서 json으로 success: true라는 req가 옴
    })
  })   //몽고디비
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})