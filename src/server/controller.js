const { connection } = require('./database');

async function DBtest(req, res) {

    // GET ------------------
    if (req.method == 'GET') {

        connection.getConnection((err, connect) => {

            if (err) {
                connect.release();
                throw err;
            }
            connect.query('SELECT * from Messages', (err, rows) => {
                connect.release();
                if (!err) {
                    res.send(rows)
                }
                else {
                    console.error("Error fetching messages from the database:", err);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            })
        })
    }


    // POST ------------------
    else if (req.method == 'POST') {

        connection.getConnection((err, connect) => {

            const id = req.body.id;
            const body = req.body.body;
            const created = req.body.created;
            if (err) {
                connect.release();
                throw err;
            }
            const query = 'INSERT INTO Messages (id, body, created) VALUES (?, ?, ?)';
            connect.query(query, [id, body, created]) 
                connect.release();
                
                if (!err) {
                    res.status(201).json({ message: "Message created successfully" });
                }
                else {
                    console.error("Error during message to DB", err);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
                
            });
        }
    }


module.exports = {
    DBtest,
}