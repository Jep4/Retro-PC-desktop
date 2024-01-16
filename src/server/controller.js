const { sequelize } = require('./database');
const { Message, User, Score } = require('./models')



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
        await User.create({
            user_id: username,
            password: password,
            is_admin: false
        })
        return res.status(200).json({
            message: "Successfully Registered!",
        })
    }
    catch(e){
    res.status(401).json({
        message: "User not successful created",
        error: error.message,
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
            if (user[0].password === password) {
                req.session.uid =user[0].user_id;
                req.session.save(function(){
                });
                return res.status(200).json({
                    message: "Successfully logged in!",
                });
            } else {
                return res.status(600).json({
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

const getUser = async (req, res) => {
    try {
        if (req.session && req.session.uid) {
            const user = await User.findAll({
                where: { user_id: req.session.uid }
            });

            if (user.length!==0) {
                return res.status(200).json({
                    user,
                });
            } else {
                return res.status(404).json({
                    message: "User not found.",
                });
            }
        } else {
            return res.status(401).json({
                message: "Not logged in.",
            });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};


module.exports = {
    getMsgs,
    postMsgs,
    deleteMsgs,
    register,
    login,
    getUser
}