const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/lanshanlogin')
const usersschema = new mongoose.Schema({
  acct:{
      type: String,
      required: true
  },
  psw:{
      type: String,
      required: true,
      min: 3,
      max: 12
  }
})
const Users = mongoose.model('user',usersschema)
module.exports = Users