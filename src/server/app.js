const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const {DBtest} = require('./controller')

app.use(cors());
app.use(express.json());
const port = 8080


app.get('/api', (req, res)=>{
    // res.send({message: "   . . . Connected to the server. . ."});
    DBtest(req, res);
});
app.post('/api', (req, res)=>{
    DBtest(req, res);
})


server.listen(port, console.log("Server running"))
