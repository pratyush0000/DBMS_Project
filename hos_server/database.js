import mysql from 'mysql2';

const pool=mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'hello123',
    database: 'new_project_dbms'
}).promise();

export async function checkcreds(name, password,tablename) {
    const [rows] = await pool.query(`SELECT * FROM ${tablename} WHERE Name = ? AND Password = ?`, [name, password]);
    return rows.length > 0;
  }

  export async function insertPatient(name, dob, mobile, gender, password) {
    const [rows] = await pool.query(`SELECT MAX(P_ID) as maxId FROM Patients`);
    const newId = rows[0].maxId + 1;
    await pool.query(`INSERT INTO Patients (P_ID, Name,dob,mobile_number,sex, Password) VALUES (?, ?, ?, ?, ?, ?)`, [newId, name, dob, mobile, gender, password]);
    const [newRows] = await pool.query(`SELECT P_ID, Name,dob,mobile_number,sex, Password FROM Patients WHERE P_id = ?`, [newId]);
    return newRows[0];
  }