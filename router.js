const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/lanshanlogin");
const Users = require("./schema");

module.exports = function (app) {
  app.get("/login", function (req, res) {
    res.render("login.html");
  });
  app.get("/register", function (req, res) {
    res.render("register.html");
  });
  app.post("/register", async function (req, res) {
    let User = await Users.findOne({
      acct: req.body.acct,
    });
    console.log(User);
    if (User != null) {
      res.status(200).send({ code: 1, msg: "账号已注册" });
    } else {
      const admin = await Users.create({
        acct: req.body.acct,
        psw: req.body.psw
      });
      if(admin){
        res.status(200).send({
          code: 0, msg: "注册成功",
        })
      }else{
        res.status(200).send({ code: 1, msg: "注册失败" });
      }
    }

  });

  app.post('/login', async function(req,res){
    let User = await Users.findOne({
      acct: req.body.acct,
    });
    console.log(User);
    if(User){
      if(req.body.psw === User.psw){
        res.status(200).send({code: 0,msg: '登录成功'})
      }else{
        res.status(200).send({code: 1,msg: '密码错误'})
      }
    }else{
      res.status(200).send({code: 1,msg: '未注册该账号'})
    }
  })
};
