const { sequelize, DataTypes} = require('./database');

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 const User = sequelize.define("users", {
    user_id: {
      type: DataTypes.STRING,
      aloowNull: false
    }, 
    password: {
      type: DataTypes.STRING,
      aloowNull: false
    },
    is_admin:{
      type: DataTypes.BOOLEAN,
      aloowNull: false
    }
 })

 const Message = sequelize.define("messages", {
    message_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      aloowNull: false
    }, 
    user_id: {
      type: DataTypes.STRING,
      aloowNull: false
    }, 
    body:{
      type: DataTypes.STRING,
      aloowNull: false
    }, 
    created: {
      type: DataTypes.DATETIME,
      aloowNull: false
    }
 })

 const Score = sequelize.define("scores", {
    score_id: {
      type: DataTypes.UUID,
      aloowNull: false
    }, 
    user_id: {
      type: DataTypes.STRING,
      aloowNull: false
    }, 
    score: {
      type: DataTypes.INTEGER,
      aloowNull: false
    }, 
    finish_time: {
      type: DataTypes.DATETIME,
      aloowNull: false
    }
 })

 User.belongsToMany(Message, {through: 'user_id'});
 User.belongsToMany(Score, {through: 'user_id'});

 sequelize.sync().then(()=>{
   console.log('models created successfully');
 }).catch((e)=>{
   console.error('unable to create table: ', e);
 });

 export {
   User, 
   Message,
   Score
 }