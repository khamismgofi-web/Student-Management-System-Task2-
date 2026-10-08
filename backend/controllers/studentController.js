import pool from '../config/db.js';
import { HttpError } from '../utils/HttpErrors.js';
import { validateStudent } from '../validators/studentValidator.js';
 
function parseId(rawId) {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) {
    throw new HttpError(400, 'id must be a positive whole number');
  }
  return id;
}
function readValidStudent(body) {
  const { errors, values } = validateStudent(body);
  if (errors.length > 0) {
    throw new HttpError(400, 'Validation failed', errors);
  }
  return values;
}
 
async function findStudent(id) {
  const [rows] = await pool.execute('SELECT * FROM students WHERE id = ?', [id]);
  if (rows.length === 0) {
    throw new HttpError(404, 'Student not found');
  }
  return rows[0];
}
 
export async function listStudents(req, res) {
  const [rows] = await pool.execute('SELECT * FROM students ORDER BY id DESC');
  res.json(rows);
}
 
export async function getStudent(req, res) {
  const student = await findStudent(parseId(req.params.id));
  res.json(student);
}
 
export async function createStudent(req, res) {
  const s = readValidStudent(req.body);
 
  const [result] = await pool.execute(
    `INSERT INTO students
       (first_name, last_name, email, course, year_of_study, phone)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [s.first_name, s.last_name, s.email, s.course, s.year_of_study, s.phone]
  );
 
  const created = await findStudent(result.insertId);
  res.status(201).json(created);
}
 
export async function updateStudent(req, res) {
  const id = parseId(req.params.id);
  const s = readValidStudent(req.body);
 
  const [result] = await pool.execute(
    `UPDATE students
     SET first_name = ?, last_name = ?, email = ?, course = ?,
         year_of_study = ?, phone = ?
     WHERE id = ?`,
    [s.first_name, s.last_name, s.email, s.course, s.year_of_study, s.phone, id]
  );
 
  if (result.affectedRows === 0) {
    throw new HttpError(404, 'Student not found');
  }
 const updated = await findStudent(id);
  res.json(updated);
}
 
export async function deleteStudent(req, res) {
  const id = parseId(req.params.id);
  const [result] = await pool.execute('DELETE FROM students WHERE id = ?', [id]);
 
  if (result.affectedRows === 0) {
    throw new HttpError(404, 'Student not found');
  }
 
  res.status(204).send();
}