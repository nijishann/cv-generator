const db = require('../database/db');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// ─── Save CV Data ───────────────────────────────────────────
exports.saveCV = async (req, res) => {
  try {
    const data = req.body;
    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

    // Insert main CV record
    const [result] = await db.query(
      `INSERT INTO cv_submissions 
        (template_type, full_name, designation, phone, email, address, permanent_address,
         dob, nationality, religion, blood_group, marital_status, gender, nid, linkedin,
         father_name, mother_name, father_profession, mother_profession,
         height, complexion, siblings, income, about, partner_expectation,
         objective, computer_skills, language_skills, other_skills, photo_path)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.template_type, data.full_name, data.designation, data.phone, data.email,
        data.address, data.permanent_address, data.dob, data.nationality, data.religion,
        data.blood_group, data.marital_status, data.gender, data.nid, data.linkedin,
        data.father_name, data.mother_name, data.father_profession, data.mother_profession,
        data.height, data.complexion, data.siblings, data.income, data.about,
        data.partner_expectation, data.objective, data.computer_skills,
        data.language_skills, data.other_skills, photoPath
      ]
    );

    const submissionId = result.insertId;

    // Insert education records
    if (data.education && Array.isArray(data.education)) {
      for (const edu of data.education) {
        await db.query(
          `INSERT INTO cv_education (submission_id, exam_name, subject, institute, board, passing_year, result)
           VALUES (?,?,?,?,?,?,?)`,
          [submissionId, edu.exam, edu.subject, edu.institute, edu.board, edu.year, edu.result]
        );
      }
    }

    // Insert experience records
    if (data.experience && Array.isArray(data.experience)) {
      for (const exp of data.experience) {
        await db.query(
          `INSERT INTO cv_experience (submission_id, role, company, start_date, end_date, description)
           VALUES (?,?,?,?,?,?)`,
          [submissionId, exp.role, exp.company, exp.start, exp.end, exp.desc]
        );
      }
    }

    // Insert training records
    if (data.trainings && Array.isArray(data.trainings)) {
      for (const tr of data.trainings) {
        await db.query(
          `INSERT INTO cv_training (submission_id, course_name, organization, duration, year)
           VALUES (?,?,?,?,?)`,
          [submissionId, tr.name, tr.org, tr.duration, tr.year]
        );
      }
    }

    // Insert reference records
    if (data.refs && Array.isArray(data.refs)) {
      for (const ref of data.refs) {
        await db.query(
          `INSERT INTO cv_references (submission_id, ref_name, ref_designation, ref_phone, ref_email)
           VALUES (?,?,?,?,?)`,
          [submissionId, ref.name, ref.designation, ref.phone, ref.email]
        );
      }
    }

    res.json({ success: true, submission_id: submissionId });

  } catch (err) {
    console.error('Save CV error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Generate PDF ────────────────────────────────────────────
exports.generatePDF = async (req, res) => {
  try {
    const { submission_id } = req.params;

    // Fetch CV data
    const [rows] = await db.query('SELECT * FROM cv_submissions WHERE id = ?', [submission_id]);
    if (!rows.length) return res.status(404).json({ message: 'CV পাওয়া যায়নি' });

    const cv = rows[0];
    const [edu] = await db.query('SELECT * FROM cv_education WHERE submission_id = ?', [submission_id]);
    const [exp] = await db.query('SELECT * FROM cv_experience WHERE submission_id = ?', [submission_id]);
    const [training] = await db.query('SELECT * FROM cv_training WHERE submission_id = ?', [submission_id]);
    const [refs] = await db.query('SELECT * FROM cv_references WHERE submission_id = ?', [submission_id]);

    // Build HTML for PDF
    const htmlContent = buildCVHTML(cv, edu, exp, training, refs);

    // Launch Puppeteer
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
    });

    await browser.close();

    // Send PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${cv.full_name || 'CV'}_CV.pdf"`);
    res.send(pdfBuffer);

  } catch (err) {
    console.error('PDF error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get All Submissions (Admin) ─────────────────────────────
exports.getAllSubmissions = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, full_name, template_type, phone, email, created_at FROM cv_submissions ORDER BY created_at DESC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Build CV HTML for PDF ────────────────────────────────────
function buildCVHTML(cv, edu, exp, training, refs) {
  const today = new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });

  const eduRows = edu.map(e => `
    <tr>
      <td>${e.exam_name || ''}</td>
      <td>${e.institute || ''}</td>
      <td>${e.board || ''}</td>
      <td>${e.passing_year || ''}</td>
      <td>${e.result || ''}</td>
    </tr>`).join('');

  const expRows = exp.map(e => `
    <tr>
      <td>${e.role || ''}</td>
      <td>${e.company || ''}</td>
      <td>${e.start_date || ''}${e.end_date ? ' — ' + e.end_date : ''}</td>
    </tr>`).join('');

  const trainingRows = training.map(t => `
    <tr>
      <td>${t.course_name || ''}</td>
      <td>${t.organization || ''}</td>
      <td>${t.duration || ''}</td>
      <td>${t.year || ''}</td>
    </tr>`).join('');

  const refRows = refs.map(r => `
    <tr>
      <td>${r.ref_name || ''}</td>
      <td>${r.ref_designation || ''}</td>
      <td>${r.ref_phone || ''}</td>
      <td>${r.ref_email || ''}</td>
    </tr>`).join('');

  const photoTag = cv.photo_path
    ? `<img src="http://localhost:${process.env.PORT || 3000}${cv.photo_path}" style="width:90px;height:110px;object-fit:cover;border:2px solid #1a3c5e;border-radius:4px;">`
    : '';

  return `<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: 'Hind Siliguri', Arial, sans-serif; font-size: 13px; color: #222; margin: 0; padding: 20px; }
  h1 { font-size: 22px; color: #1a3c5e; text-align: center; margin: 0; }
  .subtitle { text-align: center; color: #555; font-size: 12px; }
  .header { text-align: center; border-bottom: 2px solid #1a3c5e; padding-bottom: 16px; margin-bottom: 16px; }
  .sec-title { background: #1a3c5e; color: white; padding: 4px 12px; font-weight: 700; margin: 14px 0 8px; }
  table { width: 100%; border-collapse: collapse; }
  table th { background: #e8edf3; padding: 5px 8px; text-align: left; font-size: 12px; }
  table td { padding: 4px 8px; border-bottom: 1px solid #eee; font-size: 12px; }
  .info-row { display: flex; gap: 20px; }
  .info-col { flex: 1; }
  .info-item { margin-bottom: 4px; }
  .info-item span { font-weight: 600; }
  .footer { margin-top: 30px; display: flex; justify-content: space-between; font-size: 12px; color: #555; }
</style>
</head>
<body>
<div class="header">
  ${photoTag}
  <h1>${cv.full_name || ''}</h1>
  <div class="subtitle">${cv.designation || ''}</div>
  <div class="subtitle">📞 ${cv.phone || ''} &nbsp; ✉ ${cv.email || ''} &nbsp; 📍 ${cv.address || ''}</div>
</div>

${cv.objective ? `<div class="sec-title">উদ্দেশ্য</div><p>${cv.objective}</p>` : ''}

<div class="sec-title">ব্যক্তিগত তথ্য</div>
<table>
  <tr><td><span style="font-weight:600;">জন্ম তারিখ</span></td><td>${cv.dob || '—'}</td>
      <td><span style="font-weight:600;">রক্তের গ্রুপ</span></td><td>${cv.blood_group || '—'}</td></tr>
  <tr><td><span style="font-weight:600;">ধর্ম</span></td><td>${cv.religion || '—'}</td>
      <td><span style="font-weight:600;">জাতীয়তা</span></td><td>${cv.nationality || '—'}</td></tr>
  <tr><td><span style="font-weight:600;">বৈবাহিক অবস্থা</span></td><td>${cv.marital_status || '—'}</td>
      <td><span style="font-weight:600;">লিঙ্গ</span></td><td>${cv.gender || '—'}</td></tr>
  ${cv.father_name ? `<tr><td><span style="font-weight:600;">পিতার নাম</span></td><td>${cv.father_name}</td>
      <td><span style="font-weight:600;">মাতার নাম</span></td><td>${cv.mother_name || '—'}</td></tr>` : ''}
  <tr><td><span style="font-weight:600;">বর্তমান ঠিকানা</span></td><td colspan="3">${cv.address || '—'}</td></tr>
  <tr><td><span style="font-weight:600;">স্থায়ী ঠিকানা</span></td><td colspan="3">${cv.permanent_address || '—'}</td></tr>
</table>

${edu.length ? `
<div class="sec-title">শিক্ষাগত যোগ্যতা</div>
<table>
  <thead><tr><th>পরীক্ষা</th><th>প্রতিষ্ঠান</th><th>বোর্ড/বিশ্ববিদ্যালয়</th><th>সাল</th><th>ফলাফল</th></tr></thead>
  <tbody>${eduRows}</tbody>
</table>` : ''}

${exp.length ? `
<div class="sec-title">কর্মঅভিজ্ঞতা</div>
<table>
  <thead><tr><th>পদবি</th><th>প্রতিষ্ঠান</th><th>সময়কাল</th></tr></thead>
  <tbody>${expRows}</tbody>
</table>` : ''}

${training.length ? `
<div class="sec-title">প্রশিক্ষণ / কোর্স</div>
<table>
  <thead><tr><th>কোর্স</th><th>প্রতিষ্ঠান</th><th>মেয়াদ</th><th>সাল</th></tr></thead>
  <tbody>${trainingRows}</tbody>
</table>` : ''}

${cv.computer_skills || cv.language_skills ? `
<div class="sec-title">দক্ষতা</div>
<table>
  ${cv.computer_skills ? `<tr><td style="font-weight:600;width:25%;">কম্পিউটার</td><td>${cv.computer_skills}</td></tr>` : ''}
  ${cv.language_skills ? `<tr><td style="font-weight:600;">ভাষা</td><td>${cv.language_skills}</td></tr>` : ''}
  ${cv.other_skills ? `<tr><td style="font-weight:600;">অন্যান্য</td><td>${cv.other_skills}</td></tr>` : ''}
</table>` : ''}

${refs.length ? `
<div class="sec-title">রেফারেন্স</div>
<table>
  <thead><tr><th>নাম</th><th>পদবি</th><th>মোবাইল</th><th>ইমেইল</th></tr></thead>
  <tbody>${refRows}</tbody>
</table>` : ''}

<div class="footer">
  <span>তারিখ: ${today}</span>
  <span>প্রার্থীর স্বাক্ষর: ________________</span>
</div>
</body>
</html>`;
}
