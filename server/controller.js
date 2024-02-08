const { sequelize } = require('./database');
const { Message, User, Score } = require('./models')
const bcrypt =  require("bcrypt")
const jwt = require('jsonwebtoken');



const getMsgs= async (req, res) => {
    await Message.findAll().then(msgs => {
        res.send(msgs)
    }).catch((e) => {
        console.error("failed to retrieve data: ", e);
    })
}


const postMsgs =async (req, res) => {

    const id = req.body.id;
    const body = req.body.body;

    await Message.create({
        user_id: id,
        body: body
    })

    return getMsgs(req, res);

}


const deleteMsgs =async (req, res) => {
    const id = req.params.id;
    
    await Message.destroy({
        where: {id: id}
    }).then(()=>{
    return getMsgs(req, res);
    }).catch(e => {
        console.log(id + "Messege not deleted: " + e)
    });
}

const register = async(req, res)=>{
    const username = req.body.id;
    const password = req.body.password;
    
    const user = await User.findAll({where: {user_id: username}})
    if(user.length !== 0){
        return res.status(400).json({
            message: "The id has already been taken. Choose another one",
        })
    }
else{
    
    try{
        await bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, function(err, hash){
                User.create({
                    user_id: username,
                    password: hash,
                    is_admin: false
                })
                return res.status(200).json({
                    message: "Successfully Registered!",
                })
            })
        })
    }
    catch(e){
    res.status(401).json({
        message: "User not successful created",
        error: e.message,
      })
    }
}
}

const login = async (req, res) => {
    const username = req.body.id;
    const password = req.body.password;

    try {
        const user = await User.findAll({ where: { user_id: username } });

        if (user.length === 0) {
            return res.status(400).json({
                message: "Username or password not present.",
            });
        } else {
            const passwordMatch = await bcrypt.compare(password, user[0].password);

            if (passwordMatch) {
                const token = jwt.sign({ userId: user[0].id }, 'yayyay_secret_key', { expiresIn: '1h' });
                res.json({ token });
            } else {
                return res.status(401).json({
                    message: "Invalid password.",
                });
            }
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    jwt.verify(token, 'yayay_secret_key', (err, decoded) => {
        if (err) {
            alert("Failed to authenticate token");
            return res.status(401).json({ message: 'Failed to authenticate token.' });
        }
        
        req.userId = decoded.userId;
        next();
    });
};

module.exports = verifyToken;


const getUser = async (req, res) => {

    return res.json({uid: "user1"})

};


module.exports = {
    getMsgs,
    postMsgs,
    deleteMsgs,
    register,
    login,
    getUser,
    verifyToken
}