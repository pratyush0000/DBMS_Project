The following tables are used in the project 

 desc patients;
+---------------+-------------+------+-----+---------+-------+
| Field         | Type        | Null | Key | Default | Extra |
+---------------+-------------+------+-----+---------+-------+
| P_ID          | int         | NO   | PRI | NULL    |       |
| Name          | varchar(50) | YES  |     | NULL    |       |
| DOB           | date        | YES  |     | NULL    |       |
| Sex           | varchar(2)  | YES  |     | NULL    |       |
| mobile_number | bigint      | YES  |     | NULL    |       |
| password      | varchar(20) | YES  |     | NULL    |       |
+---------------+-------------+------+-----+---------+-------+
6 rows in set (0.03 sec)

desc consultants;
+---------------+--------------+------+-----+---------+-------+
| Field         | Type         | Null | Key | Default | Extra |
+---------------+--------------+------+-----+---------+-------+
| C_ID          | int          | NO   | PRI | NULL    |       |
| Name          | varchar(100) | YES  |     | NULL    |       |
| Password      | varchar(30)  | YES  |     | NULL    |       |
| Department    | varchar(80)  | YES  |     | NULL    |       |
| Qualification | varchar(30)  | YES  |     | NULL    |       |
+---------------+--------------+------+-----+---------+-------+
5 rows in set (0.00 sec)

desc medicine;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| M_ID  | int         | NO   | PRI | NULL    |       |
| Name  | varchar(50) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
2 rows in set (0.00 sec)

desc pres_tr;
+-----------+-------------+------+-----+---------+-------+
| Field     | Type        | Null | Key | Default | Extra |
+-----------+-------------+------+-----+---------+-------+
| Pres_ID   | int         | YES  | MUL | NULL    |       |
| Med_ID    | int         | YES  | MUL | NULL    |       |
| Noofdays  | int         | YES  |     | NULL    |       |
| Frequency | varchar(30) | YES  |     | NULL    |       |
+-----------+-------------+------+-----+---------+-------+
4 rows in set (0.00 sec)

