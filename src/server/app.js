const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const control = require('./controller')
const {sequelize} = require('./database')
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session); 

var options ={                                               
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'web_db'
};
var sessionStore = new MySQLStore(options);

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'very secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    maxAge: 24 * 6 * 60 * 10000,
    sameSite: 'None',
    httpOnly: true,
    secure: true,
  },
  store: sessionStore     
}))
const port = 8080

sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.get('/chat', (req, res)=>{
    control.getMsgs(req, res);
});
app.post('/chat', (req, res)=>{
    control.postMsgs(req, res);
})
app.delete('/chat/:id', (req, res)=>{
  control.deleteMsgs(req, res);
})

app.post('/register', (req, res)=>{
  control.register(req, res);
})
app.post('/auth', (req, res)=>{
  control.login(req, res);
})
app.get('/logout', (req, res)=>{
  control.getUser(req, res);
})


server.listen(port, console.log("Server running"))
