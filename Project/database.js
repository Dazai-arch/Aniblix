const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3409,
  user: 'root',
  password: 'rootpw'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  connection.query('create database if not exists Aniblix',function(err,result){
    if (!err)console.log("Database created");
    else console.log(err);
  });
});

function insertUserToDatabase(userin){
  try{
    const sql = 'insert into table user(email,password,lastlogin)';
    const values = [userin.email,userin.password, new Date()];
    connection.query(sql,values,(err,result) =>{
      if(err){
        console.error('Error inserting user',err);
      }
      else{
        console.log('User inserted successfully');
      }
    });
  }catch(err){
    console.error('Error in insertUserToDatabase:', err);
 }
}