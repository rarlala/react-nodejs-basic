const { User } = require('../models/User');

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳
  // Client Cookie에서 token을 가져옴

  let token = req.cookies.x_auth;

  // token을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  });

  // 유저가 있으면 인증, 유저가 없으면 인증하지 않는다.
};

module.exports = { auth };
