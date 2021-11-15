const express = require('express')
const app = express()
const port = 5000
const bodyParser=require('body-parser');
const {User}=require('./model/User');
const config=require('./config/key');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');

app.use(cookieParser());

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

app.post('/api/users/register', (req,res) =>{
  //회원가입할때 필요한 정보들 client에서 가져오면 그것들을 DB에다가 넣어줌
  const user=new User(req.body)
  //users의 정보를 save하기 전에 암호화 시켜줘야 함
  user.save((err, userInfo)=>{
    if(err) return res.json({ success: false, err})
    return res.status(200).json({                       //status(200)은 성공이란 의미
      success: true                                     //postman에서 json으로 success: true라는 req가 옴
    })
  })   //몽고디비
})



app.post('/api/users/login', (req,res) => {

  //요청된 이메일을 DB에서 찾음
  User.findOne({ email: req.body.email }, (err,userInfo) => {
    if(!userInfo){
      return res.json({
        loginSuccess: false,
        message: "등록된 이메일 주소가 아닙니다."
      })
    }
    //요청된 이메일이 DB에 있으면 비밀번호도 맞는지 확인
    userInfo.comparePassword(req.body.password , (err, isMatch) =>{
      if(!isMatch)
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다."
      })

      userInfo.generateToken((err,userInfo) =>{
        if(err)
        return res.status(400).send(err);

        //토큰을 어디에 저장할까?? ex) 쿠키, 로컬스토리지
        res.cookie("x_auth", userInfo.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: userInfo._id
        })
      })
    })

  })


  

  //비밀번호도 맞다면 TOKEN 생성 

})

app.get('/api/users/auth' ,auth ,(req,res) =>{

  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})


app.get('/api/users/logout', auth, (req,res) =>{
  
  User.findOneAndUpdate({ _id: req.user._id}, {token: ""}, (err,user) =>{
    if(err) return res.json({ success: false, err })
    return res.status(200).send({ success: true})
  })
})







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})