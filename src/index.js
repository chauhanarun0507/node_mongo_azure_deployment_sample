const app = require('./app');
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port ,() => {
    console.log('server is running on port '+port);
})
