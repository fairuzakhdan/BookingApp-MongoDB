const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const register = async (req, res) => {
  try {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
        status: 'fail',
        message: 'Invalid Input'
    })
  }
  const passwordHash = bcrypt.hashSync(password,10)
  const emailUsed = await User.findOne({email});
  if (emailUsed) {
    return res.status(409).json({
      status: 'fail',
      message: 'Email sudah digunakan'
    })
  }
  const register =  new User({
    username,
    email,
    password: passwordHash,
  })
  await register.save()
  return res.status(201).json({
    status: 'success',
    message: 'Register Accepted'
})
  }catch(err) {
    console.log(err.message);
  }
};

const authLogin = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid Input'
    })
  }
  const user = await User.findOne({email})
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Email tidak terdaftar'
    })
  }
  const passwordIncorrect = bcrypt.compareSync(password, user.password);
  if (!passwordIncorrect) {
    return res.status(401).json({
      status: 'fail',
      message: 'Email and Password incorrect'
    })
  }
  const data = {
    _id: user.id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  }
  const token = jwt.sign({data},'inisecret',{
    expiresIn: '1d'
  })
  return res.cookie('access_token',token, {
    httpOnly: true,
  }).status(200).json({
    status: 'success',
    message: 'Loggedin',
  })
}

module.exports = { register, authLogin };