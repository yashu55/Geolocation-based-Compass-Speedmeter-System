const Promise = require('bluebird');
const mysql = require('mysql');

Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'Manimau@11',
  database: 'geolocation',
};

let addUser = async (input) => {
  const connection = mysql.createConnection(DB_CONFIG);
  await connection.connectAsync();

  let sql =
    'INSERT INTO users (email, password, firstname,  lastname, mobile, securityquestion, answer) VALUES (?, ?, ?, ?, ?, ?, ?)';
  await connection.queryAsync(sql, [
    input.email,
    input.password,
    input.firstname,
    input.lastname,
    input.mobile,
    input.securityquestion,
    input.answer,
  ]);

  await connection.endAsync();
};

let authenticateUser = async (input) => {
  const connection = mysql.createConnection(DB_CONFIG);
  await connection.connectAsync();

  let sql = 'SELECT * FROM users WHERE email=? AND password=?';
  const results = await connection.queryAsync(sql, [input.email, input.password]);

  await connection.endAsync();

  if (results.length === 0) {
    throw new Error('Invalid Credentials');
  }
};

let forgotpassword = async (input) => {
  const connection = mysql.createConnection(DB_CONFIG);
  await connection.connectAsync();
  let sql = 'SELECT * FROM users WHERE email=?  And securityquestion=? and answer=?';
  const results = await connection.queryAsync(sql, [input.email, input.securityquestion, input.answer]);
  if (results.length === 0) {
    await connection.endAsync();
    throw new Error('Invalid Credentials');
  } else if (results.length === 1) {
    let sql2 = "update users set password=? where email=?";
    await connection.queryAsync(sql2, [input.password, input.email]);
    await connection.endAsync();
    return true;
  }
};


let updatepassword = async (input) => {
  const connection = mysql.createConnection(DB_CONFIG);
  await connection.connectAsync();
  let sql = 'SELECT * FROM users WHERE email=?  And password=?';
  const results = await connection.queryAsync(sql, [input.email, input.opassword]);
  if (results.length === 0) {
    await connection.endAsync();
    throw new Error('Invalid Credentials');
  } else if (results.length === 1) {
    let sql2 = "update users set password=? where email=?";
    await connection.queryAsync(sql2, [input.password, input.email]);
    await connection.endAsync();
    return true;
  }
};


let deleteacc = async (input) => {
  const connection = mysql.createConnection(DB_CONFIG);
  await connection.connectAsync();
  let sql = 'SELECT * FROM users WHERE email=?';
  const results = await connection.queryAsync(sql, [input.email]);
  if (results.length === 0) {
    await connection.endAsync();
    throw new Error('Invalid Credentials');
  } else if (results.length === 1) {
    let sql2 = "delete from users where email=?";
    await connection.queryAsync(sql2, [input.email]);
    await connection.endAsync();
    return true;
  }
};



let detailsUser = async (input) => {
  const connection = mysql.createConnection(DB_CONFIG);
  await connection.connectAsync();
  let sql = 'SELECT * FROM users WHERE email=?';
  const results = await connection.queryAsync(sql, [input.email]);
  if (results.length === 0) {
    await connection.endAsync();
    throw new Error('Invalid Credentials');
  } else if (results.length === 1) {
    await connection.endAsync();
    return results;
  }
};
// let validateData = (data) => {
//     if(data.)
// }

module.exports = {
  addUser,
  authenticateUser,
  forgotpassword,
  updatepassword,
  deleteacc,
  detailsUser,
};