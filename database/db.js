const mysql = require('mysql2');
require('dotenv').config();

// Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

const db = pool.promise();

// Auto-create tables if not exist
async function initDB() {
  try {
    // Main CV submissions table
    await db.query(`
      CREATE TABLE IF NOT EXISTS cv_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        template_type VARCHAR(20) NOT NULL,
        full_name VARCHAR(255),
        designation VARCHAR(255),
        phone VARCHAR(20),
        email VARCHAR(255),
        address TEXT,
        permanent_address TEXT,
        dob VARCHAR(100),
        nationality VARCHAR(100),
        religion VARCHAR(100),
        blood_group VARCHAR(10),
        marital_status VARCHAR(50),
        gender VARCHAR(20),
        nid VARCHAR(50),
        linkedin VARCHAR(255),
        father_name VARCHAR(255),
        mother_name VARCHAR(255),
        father_profession VARCHAR(255),
        mother_profession VARCHAR(255),
        height VARCHAR(50),
        complexion VARCHAR(50),
        siblings VARCHAR(100),
        income VARCHAR(100),
        about TEXT,
        partner_expectation TEXT,
        objective TEXT,
        computer_skills TEXT,
        language_skills TEXT,
        other_skills TEXT,
        photo_path VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Education table
    await db.query(`
      CREATE TABLE IF NOT EXISTS cv_education (
        id INT AUTO_INCREMENT PRIMARY KEY,
        submission_id INT,
        exam_name VARCHAR(255),
        subject VARCHAR(255),
        institute VARCHAR(255),
        board VARCHAR(255),
        passing_year VARCHAR(20),
        result VARCHAR(50),
        FOREIGN KEY (submission_id) REFERENCES cv_submissions(id) ON DELETE CASCADE
      )
    `);

    // Experience table
    await db.query(`
      CREATE TABLE IF NOT EXISTS cv_experience (
        id INT AUTO_INCREMENT PRIMARY KEY,
        submission_id INT,
        role VARCHAR(255),
        company VARCHAR(255),
        start_date VARCHAR(100),
        end_date VARCHAR(100),
        description TEXT,
        FOREIGN KEY (submission_id) REFERENCES cv_submissions(id) ON DELETE CASCADE
      )
    `);

    // Training table
    await db.query(`
      CREATE TABLE IF NOT EXISTS cv_training (
        id INT AUTO_INCREMENT PRIMARY KEY,
        submission_id INT,
        course_name VARCHAR(255),
        organization VARCHAR(255),
        duration VARCHAR(100),
        year VARCHAR(20),
        FOREIGN KEY (submission_id) REFERENCES cv_submissions(id) ON DELETE CASCADE
      )
    `);

    // References table
    await db.query(`
      CREATE TABLE IF NOT EXISTS cv_references (
        id INT AUTO_INCREMENT PRIMARY KEY,
        submission_id INT,
        ref_name VARCHAR(255),
        ref_designation VARCHAR(255),
        ref_phone VARCHAR(20),
        ref_email VARCHAR(255),
        FOREIGN KEY (submission_id) REFERENCES cv_submissions(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Database tables ready!');
  } catch (err) {
    console.error('❌ Database init error:', err.message);
  }
}

initDB();

module.exports = db;
