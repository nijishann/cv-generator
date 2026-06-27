const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cvController = require('../controllers/cvController');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('শুধুমাত্র JPG, PNG ছবি আপলোড করুন'));
  }
});

// POST /api/cv/save — CV ডেটা সেভ করুন
router.post('/save', upload.single('photo'), cvController.saveCV);

// GET /api/cv/pdf/:submission_id — PDF জেনারেট করুন
router.get('/pdf/:submission_id', cvController.generatePDF);

// GET /api/cv/all — সব submission দেখুন
router.get('/all', cvController.getAllSubmissions);

module.exports = router;
