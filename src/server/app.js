const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const control = require('./controller')
const {sequelize} = require('./database')
var cookieParser = require('cookie-parser');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session); 

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));
app.use(cookieParser());

var options ={                                               
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'web_db'
};
var sessionStore = new MySQLStore(options);

app.use(express.json());
app.use(session({
  secret: 'very secret',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  secure: false,

  sameSite: 'None',
  cookie: { secure: false }
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
app.post('/login', (req, res)=>{
  control.login(req, res);
})
app.get('/getUser', (req, res)=>{
  control.getUser(req, res);
})


server.listen(port, console.log("Server running"))
