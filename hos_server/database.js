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

  export async function getPatientID(name,password)
  {
    const [rows] = await pool.query(`SELECT P_ID FROM Patients WHERE Name = ? AND Password = ?`, [name, password]);
    return rows[0].P_ID;
  }

  export async function getDepartments() {
    const [rows] = await pool.query(`SELECT DISTINCT Department FROM consultants;`);
    const departments = rows.map(row => row.Department);
    return departments;
  }

  export async function getDoctorsOfDepartment(department) {
    const [rows] = await pool.query(`SELECT C_ID, Name FROM Consultants WHERE Department = ?`, [department]);
    const doctors = rows.map(row => ({ id: row.C_ID, name: row.Name }));
    return doctors;
}

export async function insertAppointment(symptoms, doctor, patient, status) {
    const [rows] = await pool.query(`SELECT MAX(Pres_ID) as maxId FROM prescriptions`);
    const newId = rows[0].maxId + 1;
    await pool.query(`INSERT INTO prescriptions (Pres_ID, Date, Diagnosis, Advice, Consultant_Notes, Patient_ID, Consultant_ID, symptoms, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [newId, new Date(), "", "", "", patient, doctor, symptoms, status]);
    const [newRows] = await pool.query(`SELECT Pres_ID, Date, Diagnosis, Advice, Consultant_Notes, Patient_ID, Consultant_ID, symptoms, status FROM prescriptions WHERE Pres_ID = ?`, [newId]);
    return newRows[0];
  }

  export async function getDocAppointments(doctorid) {
    const [rows] = await pool.query(`SELECT * FROM prescriptions WHERE Consultant_ID = ?`, [doctorid]);
    return rows;
  }

  export async function updateAppointment(status, diagnosis, advice, consultant_notes, doctorid, presid) {
    await pool.query(`UPDATE prescriptions SET status = ?, Diagnosis = ?, Advice = ?, Consultant_Notes = ? WHERE Consultant_ID = ? AND Pres_ID = ?`, [status, diagnosis, advice, consultant_notes, doctorid, presid]);
    const [newRows] = await pool.query(`SELECT Pres_ID, Date, Diagnosis, Advice, Consultant_Notes, Patient_ID, Consultant_ID, symptoms, status FROM prescriptions WHERE Pres_ID = ?`, [presid]);
    return newRows[0];
  }

  export async function getpres(patientid)
  {
    const [rows] = await pool.query(`SELECT * FROM prescriptions WHERE Patient_ID = ? and status=1`, [patientid]);
    return rows;
  }

 export async function updateprescriptiontr(presid,meds)
 {
   for(let i=0;i<meds.length;i++)
   {
    const[rows]=await pool.query(`SELECT M_ID,Name FROM medicine where Name=?`,[meds[i].name]);
    if(rows.length==0)
    {
        const [newrows] = await pool.query(`SELECT MAX(M_ID) as maxId FROM medicine`);
        const newId = newrows[0].maxId + 1;
        await pool.query(`INSERT INTO medicine (M_ID, Name) VALUES (?, ?)`, [newId, meds[i].name]);
        await pool.query(`INSERT INTO pres_tr (Pres_ID, Med_ID, Noofdays, Frequency) VALUES (?, ?, ?, ?)`, [presid, newId, meds[i].noofdays, meds[i].frequency]);
    }
    else
    {
      await pool.query(`INSERT INTO pres_tr (Pres_ID, Med_ID, Noofdays, Frequency) VALUES (?, ?, ?, ?)`, [presid, rows[0].M_ID, meds[i].noofdays, meds[i].frequency]);
    
    }
   }
   return true;
 }

