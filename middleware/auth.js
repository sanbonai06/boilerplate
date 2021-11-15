const { User } = require('../model/User');


let auth = (req,res,next) => {
    //인증처리를 하는곳

    //클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies.x_auth;
    //토큰을 복호화 한 후 user 를 찾음
    User.findByToken(token, (err,user) =>{
        //없으면 실패
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false,
            error: true
        }) 
        //user가 있으면 인증 완료 
        req.token = token;
        req.user = user;
        next();
    })
   

    

}

module.exports = {auth};