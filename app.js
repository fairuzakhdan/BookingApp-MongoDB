const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const hotelRouter = require('./routes/hotels')
const authRouter = require('./routes/auth.js')
const userRouter = require('./routes/users.js')
const roomRouter = require('./routes/rooms.js')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/BookingHotel').then((result) => {
    console.log('Database Connected');
}).catch((err) => {
    console.log('Database tidak Connect',err);
})

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/hotels', hotelRouter);
app.use('/rooms', roomRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.all('*', (req, res, next) => {
  res.status(404).json({message: 'Page Not Found'});
  next()
});
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).json({
    err,
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})