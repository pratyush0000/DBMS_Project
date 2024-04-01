import mysql from 'mysql2';

const pool=mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'hello123',
    database: 'project_dbms'
}).promise();

export async function checkcreds(name, password,tablename) {
    const [rows] = await pool.query(`SELECT * FROM ${tablename} WHERE Name = ? AND Password = ?`, [name, password]);
    return rows.length > 0;
  }

export async function getNote(id)
{
    const[rows]=await pool.query(`SELECT * FROM notes WHERE id=${id}`)
    return rows[0];
}




export async function createNote(title,content)
{
    const [result]=await pool.query(`INSERT INTO notes(title,content) VALUES(?,?)`,[title,content])
    return result.insertId; 
}

