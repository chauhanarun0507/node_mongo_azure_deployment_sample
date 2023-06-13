const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user')

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.get('/', (req,res) => {
    res.send('<h1>Hello World!</h1>')
})
app.use('/user', userRouter);

const port = process.env.PORT

module.exports = app;