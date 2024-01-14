const { sequelize } = require('./database');
var { User, Message, Score } = require('./models');

async function DBtest(req, res) {

    // GET ------------------
    if (req.method == 'GET') {

        sequelize.sync().then(() => {
            Message.findAll().then(msgs => {
                res.send(msgs)
            }).catch((e) => {
                console.error("failed to retrieve data: ", e);
            })
        })


        // connection.getConnection((err, connect) => {

        //     if (err) {
        //         connect.release();
        //         throw err;
        //     }
        //     connect.query('SELECT * from Messages', (err, rows) => {
        //         connect.release();
        //         if (!err) {
        //             res.send(rows)
        //         }
        //         else {
        //             console.error("Error fetching messages from the database:", err);
        //             res.status(500).json({ error: 'Internal Server Error' });
        //         }
        //     })
        // })
    }


    // POST ------------------
    else if (req.method == 'POST') {


        sequelize.sync().then(() => {
            Message.create({
                user_id: "userid",
                body: "Hello",
                created: Date.now()
            })
        })


        // connection.getConnection((err, connect) => {

        //     const id = req.body.id;
        //     const body = req.body.body;
        //     const created = req.body.created;
        //     if (err) {
        //         connect.release();
        //         throw err;
        //     }
        //     const query = 'INSERT INTO Messages (id, body, created) VALUES (?, ?, ?)';
        //     connect.query(query, [id, body, created]) 
        //         connect.release();

        //         if (!err) {
        //             res.status(201).json({ message: "Message created successfully" });
        //         }
        //         else {
        //             console.error("Error during message to DB", err);
        //             res.status(500).json({ error: 'Internal Server Error' });
        //         }

        //     });
        // }
    }
}


module.exports = {
    DBtest,
}