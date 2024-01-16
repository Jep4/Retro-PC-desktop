const { sequelize } = require('./database');
const { DataTypes } = require('sequelize')

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
})

const Message = sequelize.define("Message", {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

const Score = sequelize.define("Score", {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  finish_time: {
    type: DataTypes.DATE,
    allowNull: false
  }
})

User.belongsToMany(Message, { through: 'user_id' });
User.belongsToMany(Score, { through: 'user_id' });

module.exports = {
  User,
  Message,
  Score
};