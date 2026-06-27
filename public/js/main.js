// =============================================
//  CV BUILDER BD — FRONTEND JAVASCRIPT
// =============================================

let selectedTemplate = 'normal';
let photoDataURL = null;
let photoFile = null;
let cvLang = 'bangla';
let eduCount = 0, expCount = 0, trainingCount = 0, refCount = 0;

// ── All Labels (English / Bangla) ───────────
const LABELS = {
  english: {
    formTitle: 'Fill In Your Details',
    formSub: 'Provide accurate information to get the best CV output',
    personal: 'Personal Information',
    nophoto: 'No Photo',
    upload: 'Upload Photo',
    hint: 'JPG, PNG (Max 5MB, Passport size recommended)',
    name: 'Full Name *',
    designation: 'Profession / Designation',
    phone: 'Mobile Number *',
    email: 'Email Address',
    address: 'Present Address',
    paddress: 'Permanent Address',
    dob: 'Date of Birth',
    nationality: 'Nationality',
    religion: 'Religion',
    blood: 'Blood Group',
    marital: 'Marital Status',
    gender: 'Gender',
    nid: 'NID Number',
    linkedin: 'LinkedIn / Website',
    fname: "Father's Name",
    mname: "Mother's Name",
    fprof: "Father's Profession",
    mprof: "Mother's Profession",
    height: 'Height',
    complexion: 'Complexion',
    siblings: 'Number of Siblings',
    income: 'Monthly Income',
    about: 'About Yourself',
    partner: 'Expected Life Partner',
    objTitle: 'Career Objective',
    obj: 'Career Objective',
    eduTitle: 'Educational Qualifications',
    expTitle: 'Work Experience',
    skillTitle: 'Skills',
    computer: 'Computer Skills',
    lang: 'Language Skills',
    other: 'Other Skills',
    trainTitle: 'Training / Courses',
    refTitle: 'References',
    btnPreview: '👁️ Preview CV',
    btnSave: '💾 Save & Download PDF',
    addEdu: '+ Add Education',
    addExp: '+ Add Experience',
    addTrain: '+ Add Training',
    addRef: '+ Add Reference',
    optSelect: 'Select',
    optUnmarried: 'Unmarried', optMarried: 'Married', optWidowed: 'Widowed', optDivorced: 'Divorced',
    optMale: 'Male', optFemale: 'Female', optOther: 'Other',
    namePH: 'Md. Rahim Uddin', desPH: 'Software Engineer / Student',
    phonePH: '01XXXXXXXXX', emailPH: 'example@gmail.com',
    addrPH: 'Village/Area, Upazila, District', paddrPH: 'Village, Post Office, District',
    dobPH: 'January 1, 2000', natVal: 'Bangladeshi',
    relPH: 'Islam / Hindu / Christian', bloodPH: 'A+, B-, O+',
    nidPH: 'National ID Number', linkedinPH: 'linkedin.com/in/username',
    fnamePH: 'Md. Abdur Rahim', mnamePH: 'Mst. Rahima Begum',
    fprofPH: 'Farmer / Businessman / Service', mprofPH: 'Housewife / Teacher',
    heightPH: '5 feet 6 inches', complexionPH: 'Fair / Dark / Medium',
    siblingsPH: '3 Brothers, 2 Sisters', incomePH: '৳ 30,000',
    aboutPH: 'I am an honest, hardworking and religious person...',
    partnerPH: 'Educated, religious and family-oriented...',
    objPH: 'I am a motivated and hardworking individual eager to contribute to organizational growth...',
    eduExam: 'Exam Name', eduSubject: 'Subject / Department',
    eduInstitute: 'Institution Name', eduBoard: 'Board / University',
    eduYear: 'Passing Year', eduResult: 'Result / GPA',
    eduExamPH: 'SSC / HSC / B.Sc / M.Sc', eduSubjectPH: 'Science / CSE / BBA',
    eduInstitutePH: 'School / College / University Name', eduBoardPH: 'Dhaka Board / University of Chittagong',
    eduYearPH: '2023', eduResultPH: 'GPA 5.00 / A+',
    expRole: 'Position / Role', expCompany: 'Company / Organization',
    expStart: 'Start Date', expEnd: 'End Date', expDesc: 'Responsibilities / Description',
    expRolePH: 'Sales Executive / Teacher', expCompanyPH: 'Company Name',
    expStartPH: 'January 2022', expEndPH: 'December 2023 / Present',
    expDescPH: 'Describe your daily responsibilities and achievements...',
    trName: 'Course Name', trOrg: 'Institution', trDuration: 'Duration', trYear: 'Year',
    trNamePH: 'Web Development / Graphic Design', trOrgPH: 'BITM / BASIS / Others',
    trDurationPH: '3 Months / 6 Months', trYearPH: '2023',
    refName: 'Name', refDes: 'Designation', refPhone: 'Mobile', refEmail: 'Email',
    refNamePH: 'Professor / Mr. ...', refDesPH: 'Professor, Dept., University',
    refPhonePH: '01XXXXXXXXX', refEmailPH: 'email@domain.com',
    remove: '✕ Remove', eduLabel: 'Education', expLabel: 'Experience',
    trainLabel: 'Training', refLabel: 'Reference',
    computerPH: 'MS Word, Excel, PowerPoint, Internet Browsing',
    langPH: 'Bengali (Native), English (Good)', otherPH: 'Leadership, Teamwork, Communication',
  },
  bangla: {
    formTitle: 'আপনার তথ্য পূরণ করুন',
    formSub: 'সঠিক তথ্য দিন, সুন্দর CV পাবেন',
    personal: 'ব্যক্তিগত তথ্য',
    nophoto: 'ছবি নেই',
    upload: 'ছবি আপলোড করুন',
    hint: 'JPG, PNG (সর্বোচ্চ ৫MB, পাসপোর্ট সাইজ প্রস্তাবিত)',
    name: 'পুরো নাম *',
    designation: 'পেশা / পদবি',
    phone: 'মোবাইল নম্বর *',
    email: 'ইমেইল ঠিকানা',
    address: 'বর্তমান ঠিকানা',
    paddress: 'স্থায়ী ঠিকানা',
    dob: 'জন্ম তারিখ',
    nationality: 'জাতীয়তা',
    religion: 'ধর্ম',
    blood: 'রক্তের গ্রুপ',
    marital: 'বৈবাহিক অবস্থা',
    gender: 'লিঙ্গ',
    nid: 'NID নম্বর',
    linkedin: 'LinkedIn / ওয়েবসাইট',
    fname: 'পিতার নাম',
    mname: 'মাতার নাম',
    fprof: 'পিতার পেশা',
    mprof: 'মাতার পেশা',
    height: 'উচ্চতা',
    complexion: 'গায়ের রং',
    siblings: 'ভাই-বোনের সংখ্যা',
    income: 'মাসিক আয়',
    about: 'নিজের সম্পর্কে',
    partner: 'প্রত্যাশিত জীবনসঙ্গী',
    objTitle: 'ক্যারিয়ার উদ্দেশ্য',
    obj: 'ক্যারিয়ার উদ্দেশ্য',
    eduTitle: 'শিক্ষাগত যোগ্যতা',
    expTitle: 'কর্মঅভিজ্ঞতা',
    skillTitle: 'দক্ষতা',
    computer: 'কম্পিউটার দক্ষতা',
    lang: 'ভাষাগত দক্ষতা',
    other: 'অন্যান্য দক্ষতা',
    trainTitle: 'প্রশিক্ষণ / কোর্স',
    refTitle: 'রেফারেন্স',
    btnPreview: '👁️ CV Preview দেখুন',
    btnSave: '💾 Save করুন ও PDF নামান',
    addEdu: '+ শিক্ষাগত তথ্য যোগ করুন',
    addExp: '+ অভিজ্ঞতা যোগ করুন',
    addTrain: '+ প্রশিক্ষণ যোগ করুন',
    addRef: '+ রেফারেন্স যোগ করুন',
    optSelect: 'নির্বাচন করুন',
    optUnmarried: 'অবিবাহিত', optMarried: 'বিবাহিত', optWidowed: 'বিপত্নীক/বিধবা', optDivorced: 'তালাকপ্রাপ্ত',
    optMale: 'পুরুষ', optFemale: 'মহিলা', optOther: 'অন্যান্য',
    namePH: 'মোঃ রাহিম উদ্দিন', desPH: 'সফটওয়্যার ইঞ্জিনিয়ার / শিক্ষার্থী',
    phonePH: '০১XXXXXXXXX', emailPH: 'example@gmail.com',
    addrPH: 'গ্রাম/পাড়া, উপজেলা, জেলা', paddrPH: 'গ্রাম, পোস্ট, জেলা',
    dobPH: '১ জানুয়ারি, ২০০০', natVal: 'বাংলাদেশী',
    relPH: 'ইসলাম / হিন্দু / খ্রিস্টান', bloodPH: 'A+, B-, O+',
    nidPH: 'জাতীয় পরিচয়পত্র নম্বর', linkedinPH: 'linkedin.com/in/username',
    fnamePH: 'মোঃ আবদুর রহিম', mnamePH: 'মোসাম্মাৎ রহিমা বেগম',
    fprofPH: 'কৃষক / ব্যবসায়ী / চাকরিজীবী', mprofPH: 'গৃহিণী / শিক্ষক',
    heightPH: '৫ ফুট ৬ ইঞ্চি', complexionPH: 'ফর্সা / শ্যামলা / মাঝারি',
    siblingsPH: '৩ ভাই, ২ বোন', incomePH: '৳ ৩০,০০০',
    aboutPH: 'আমি একজন সৎ, পরিশ্রমী এবং ধার্মিক মানুষ...',
    partnerPH: 'শিক্ষিত, ধার্মিক এবং পরিবারমুখী...',
    objPH: 'আমি একজন উদ্যমী ব্যক্তি হিসেবে আমার দক্ষতা ও জ্ঞান কাজে লাগিয়ে প্রতিষ্ঠানের উন্নয়নে অবদান রাখতে আগ্রহী...',
    eduExam: 'পরীক্ষার নাম', eduSubject: 'বিষয় / বিভাগ',
    eduInstitute: 'প্রতিষ্ঠানের নাম', eduBoard: 'বোর্ড / বিশ্ববিদ্যালয়',
    eduYear: 'পাশের সাল', eduResult: 'ফলাফল / GPA',
    eduExamPH: 'SSC / HSC / B.Sc / M.Sc', eduSubjectPH: 'বিজ্ঞান / CSE / BBA',
    eduInstitutePH: 'বিদ্যালয় / কলেজ / বিশ্ববিদ্যালয়ের নাম', eduBoardPH: 'ঢাকা বোর্ড / চট্টগ্রাম বিশ্ববিদ্যালয়',
    eduYearPH: '২০২৩', eduResultPH: 'GPA ৫.০০ / A+',
    expRole: 'পদবি', expCompany: 'প্রতিষ্ঠানের নাম',
    expStart: 'শুরুর সময়', expEnd: 'শেষের সময়', expDesc: 'দায়িত্ব / কাজের বিবরণ',
    expRolePH: 'Sales Executive / শিক্ষক', expCompanyPH: 'কোম্পানির নাম',
    expStartPH: 'জানুয়ারি ২০২২', expEndPH: 'ডিসেম্বর ২০২৩ / বর্তমান',
    expDescPH: 'প্রতিদিনের কাজের বিবরণ, অর্জন ইত্যাদি...',
    trName: 'কোর্সের নাম', trOrg: 'প্রতিষ্ঠান', trDuration: 'মেয়াদ', trYear: 'সাল',
    trNamePH: 'Web Development / Graphic Design', trOrgPH: 'BITM / BASIS / অন্যান্য',
    trDurationPH: '৩ মাস / ৬ মাস', trYearPH: '২০২৩',
    refName: 'নাম', refDes: 'পদবি', refPhone: 'মোবাইল', refEmail: 'ইমেইল',
    refNamePH: 'অধ্যাপক / জনাব...', refDesPH: 'অধ্যাপক, বিভাগ, বিশ্ববিদ্যালয়',
    refPhonePH: '০১XXXXXXXXX', refEmailPH: 'email@domain.com',
    remove: '✕ মুছুন', eduLabel: 'শিক্ষাগত যোগ্যতা', expLabel: 'অভিজ্ঞতা',
    trainLabel: 'প্রশিক্ষণ', refLabel: 'রেফারেন্স',
    computerPH: 'MS Word, Excel, PowerPoint, ইন্টারনেট',
    langPH: 'বাংলা (মাতৃভাষা), ইংরেজি (ভালো)', otherPH: 'নেতৃত্বগুণ, দলগত কাজ, যোগাযোগ দক্ষতা',
  }
};

// ── Apply Labels to DOM ─────────────────────
function applyLabels() {
  const L = LABELS[cvLang];
  const set = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
  const setPH = (id, txt) => { const el = document.getElementById(id); if (el) el.placeholder = txt; };
  const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.value = txt; };

  set('form-main-title', L.formTitle); set('form-main-sub', L.formSub);
  set('lbl-personal', L.personal); set('lbl-nophoto', L.nophoto);
  set('lbl-upload', L.upload); set('lbl-hint', L.hint);
  set('lbl-name', L.name); set('lbl-designation', L.designation);
  set('lbl-phone', L.phone); set('lbl-email', L.email);
  set('lbl-address', L.address); set('lbl-paddress', L.paddress);
  set('lbl-dob', L.dob); set('lbl-nationality', L.nationality);
  set('lbl-religion', L.religion); set('lbl-blood', L.blood);
  set('lbl-marital', L.marital); set('lbl-gender', L.gender);
  set('lbl-nid', L.nid); set('lbl-linkedin', L.linkedin);
  set('lbl-fname', L.fname); set('lbl-mname', L.mname);
  set('lbl-fprof', L.fprof); set('lbl-mprof', L.mprof);
  set('lbl-height', L.height); set('lbl-complexion', L.complexion);
  set('lbl-siblings', L.siblings); set('lbl-income', L.income);
  set('lbl-about', L.about); set('lbl-partner', L.partner);
  set('lbl-obj-title', L.objTitle); set('lbl-obj', L.obj);
  set('lbl-edu-title', L.eduTitle); set('lbl-exp-title', L.expTitle);
  set('lbl-skill-title', L.skillTitle);
  set('lbl-computer', L.computer); set('lbl-lang', L.lang); set('lbl-other', L.other);
  set('lbl-train-title', L.trainTitle); set('lbl-ref-title', L.refTitle);
  set('btn-preview', L.btnPreview); set('btn-save', L.btnSave);
  set('btn-add-edu', L.addEdu); set('btn-add-exp', L.addExp);
  set('btn-add-train', L.addTrain); set('btn-add-ref', L.addRef);
  set('opt-select', L.optSelect); set('opt-unmarried', L.optUnmarried);
  set('opt-married', L.optMarried); set('opt-widowed', L.optWidowed); set('opt-divorced', L.optDivorced);
  set('opt-gselect', L.optSelect);
  set('opt-male', L.optMale); set('opt-female', L.optFemale); set('opt-other', L.optOther);
  setPH('name', L.namePH); setPH('designation', L.desPH);
  setPH('phone', L.phonePH); setPH('email', L.emailPH);
  setPH('address', L.addrPH); setPH('permanent_address', L.paddrPH);
  setPH('dob', L.dobPH); setPH('religion', L.relPH); setPH('blood', L.bloodPH);
  setPH('nid', L.nidPH); setPH('linkedin', L.linkedinPH);
  setPH('father_name', L.fnamePH); setPH('mother_name', L.mnamePH);
  setPH('father_profession', L.fprofPH); setPH('mother_profession', L.mprofPH);
  setPH('height', L.heightPH); setPH('complexion', L.complexionPH);
  setPH('siblings', L.siblingsPH); setPH('income', L.incomePH);
  setPH('about', L.aboutPH); setPH('partner_expectation', L.partnerPH);
  setPH('objective', L.objPH);
  setPH('computer_skills', L.computerPH); setPH('language_skills', L.langPH); setPH('other_skills', L.otherPH);
  setVal('nationality', L.natVal);
  document.querySelectorAll('#edu-list .entry-block').forEach((b, i) => updateEntryLabels(b, 'edu', i + 1));
  document.querySelectorAll('#exp-list .entry-block').forEach((b, i) => updateEntryLabels(b, 'exp', i + 1));
  document.querySelectorAll('#training-list .entry-block').forEach((b, i) => updateEntryLabels(b, 'training', i + 1));
  document.querySelectorAll('#ref-list .entry-block').forEach((b, i) => updateEntryLabels(b, 'ref', i + 1));
}

function updateEntryLabels(block, type, num) {
  const L = LABELS[cvLang];
  const setPH = (cls, txt) => { const el = block.querySelector(cls); if (el) el.placeholder = txt; };
  const removeBtn = block.querySelector('.remove-btn');
  if (removeBtn) removeBtn.textContent = L.remove;
  if (type === 'edu') {
    const label = block.querySelector('.entry-label');
    if (label) label.textContent = `${L.eduLabel} #${num}`;
    block.querySelectorAll('label')[0].textContent = L.eduExam;
    block.querySelectorAll('label')[1].textContent = L.eduSubject;
    block.querySelectorAll('label')[2].textContent = L.eduInstitute;
    block.querySelectorAll('label')[3].textContent = L.eduBoard;
    block.querySelectorAll('label')[4].textContent = L.eduYear;
    block.querySelectorAll('label')[5].textContent = L.eduResult;
    setPH('.edu-exam', L.eduExamPH); setPH('.edu-subject', L.eduSubjectPH);
    setPH('.edu-institute', L.eduInstitutePH); setPH('.edu-board', L.eduBoardPH);
    setPH('.edu-year', L.eduYearPH); setPH('.edu-result', L.eduResultPH);
  } else if (type === 'exp') {
    const label = block.querySelector('.entry-label');
    if (label) label.textContent = `${L.expLabel} #${num}`;
    block.querySelectorAll('label')[0].textContent = L.expRole;
    block.querySelectorAll('label')[1].textContent = L.expCompany;
    block.querySelectorAll('label')[2].textContent = L.expStart;
    block.querySelectorAll('label')[3].textContent = L.expEnd;
    block.querySelectorAll('label')[4].textContent = L.expDesc;
    setPH('.exp-role', L.expRolePH); setPH('.exp-company', L.expCompanyPH);
    setPH('.exp-start', L.expStartPH); setPH('.exp-end', L.expEndPH); setPH('.exp-desc', L.expDescPH);
  } else if (type === 'training') {
    const label = block.querySelector('.entry-label');
    if (label) label.textContent = `${L.trainLabel} #${num}`;
    block.querySelectorAll('label')[0].textContent = L.trName;
    block.querySelectorAll('label')[1].textContent = L.trOrg;
    block.querySelectorAll('label')[2].textContent = L.trDuration;
    block.querySelectorAll('label')[3].textContent = L.trYear;
    setPH('.tr-name', L.trNamePH); setPH('.tr-org', L.trOrgPH);
    setPH('.tr-duration', L.trDurationPH); setPH('.tr-year', L.trYearPH);
  } else if (type === 'ref') {
    const label = block.querySelector('.entry-label');
    if (label) label.textContent = `${L.refLabel} #${num}`;
    block.querySelectorAll('label')[0].textContent = L.refName;
    block.querySelectorAll('label')[1].textContent = L.refDes;
    block.querySelectorAll('label')[2].textContent = L.refPhone;
    block.querySelectorAll('label')[3].textContent = L.refEmail;
    setPH('.ref-name', L.refNamePH); setPH('.ref-designation', L.refDesPH);
    setPH('.ref-phone', L.refPhonePH); setPH('.ref-email', L.refEmailPH);
  }
}

// ── Set CV Language ─────────────────────────
function setCVLang(lang) {
  cvLang = lang;
  document.getElementById('btn-en').classList.toggle('active', lang === 'english');
  document.getElementById('btn-bn').classList.toggle('active', lang === 'bangla');
  applyLabels();
}

// ── Template Selection ──────────────────────
function selectTemplate(t) {
  selectedTemplate = t;
  // Deselect all cards
  document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.template-card-new').forEach(c => c.classList.remove('selected'));
  // Select clicked card
  const card = document.getElementById('t-' + t);
  if (card) card.classList.add('selected');

  const marriageFields = document.getElementById('marriage-fields');
  const objectiveSec = document.getElementById('objective-section');
  const expSec = document.getElementById('exp-section');
  const langToggle = document.getElementById('lang-toggle');
  const linkedinField = document.getElementById('linkedin-field');

  if (t === 'normal') {
    marriageFields.style.display = '';
    objectiveSec.style.display = 'none';
    langToggle.style.display = '';
    linkedinField.style.display = 'none';
    setCVLang('bangla');
  } else if (t === 'student') {
    marriageFields.style.display = 'none';
    objectiveSec.style.display = '';
    expSec.style.display = 'none';
    langToggle.style.display = '';
    linkedinField.style.display = '';
    setCVLang('english');
  } else if (t === 'honours') {
    marriageFields.style.display = 'none';
    objectiveSec.style.display = '';
    expSec.style.display = '';
    langToggle.style.display = '';
    linkedinField.style.display = '';
    setCVLang('english');
  } else if (t === 'pro') {
    marriageFields.style.display = 'none';
    objectiveSec.style.display = '';
    expSec.style.display = '';
    langToggle.style.display = 'none';
    linkedinField.style.display = '';
    cvLang = 'english';
  } else if (t === 't1' || t === 't2' || t === 't6') {
    // Professional new templates
    marriageFields.style.display = 'none';
    objectiveSec.style.display = '';
    expSec.style.display = '';
    langToggle.style.display = 'none';
    linkedinField.style.display = '';
    cvLang = 'english';
  } else if (t === 't3') {
    // Student Maroon
    marriageFields.style.display = 'none';
    objectiveSec.style.display = '';
    expSec.style.display = '';
    langToggle.style.display = 'none';
    linkedinField.style.display = '';
    cvLang = 'english';
  } else if (t === 't4' || t === 't5') {
    // Floral Biodata templates
    marriageFields.style.display = '';
    objectiveSec.style.display = 'none';
    expSec.style.display = 'none';
    langToggle.style.display = 'none';
    linkedinField.style.display = 'none';
    cvLang = 'english';
  }

  if (t !== 'pro' && !['t1','t2','t3','t4','t5','t6'].includes(t)) applyLabels();
}

// ── Photo Upload ────────────────────────────
function previewPhoto(input) {
  if (input.files && input.files[0]) {
    photoFile = input.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      photoDataURL = e.target.result;
      document.getElementById('photoPreview').innerHTML =
        `<img src="${photoDataURL}" alt="Photo" style="width:100%;height:100%;object-fit:cover;">`;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

// ── Dynamic Entries ─────────────────────────
function addEntry(type) {
  const L = LABELS[cvLang];
  let html = '';
  if (type === 'edu') {
    eduCount++;
    html = `<div class="entry-block" id="edu-${eduCount}">
      <div class="entry-header">
        <span class="entry-label">${L.eduLabel} #${eduCount}</span>
        <button class="remove-btn" onclick="removeEntry('edu-${eduCount}')">${L.remove}</button>
      </div>
      <div class="form-row">
        <div class="form-group"><label>${L.eduExam}</label><input type="text" class="edu-exam" placeholder="${L.eduExamPH}"></div>
        <div class="form-group"><label>${L.eduSubject}</label><input type="text" class="edu-subject" placeholder="${L.eduSubjectPH}"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>${L.eduInstitute}</label><input type="text" class="edu-institute" placeholder="${L.eduInstitutePH}"></div>
        <div class="form-group"><label>${L.eduBoard}</label><input type="text" class="edu-board" placeholder="${L.eduBoardPH}"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>${L.eduYear}</label><input type="text" class="edu-year" placeholder="${L.eduYearPH}"></div>
        <div class="form-group"><label>${L.eduResult}</label><input type="text" class="edu-result" placeholder="${L.eduResultPH}"></div>
      </div>
    </div>`;
    document.getElementById('edu-list').insertAdjacentHTML('beforeend', html);
  } else if (type === 'exp') {
    expCount++;
    html = `<div class="entry-block" id="exp-${expCount}">
      <div class="entry-header">
        <span class="entry-label">${L.expLabel} #${expCount}</span>
        <button class="remove-btn" onclick="removeEntry('exp-${expCount}')">${L.remove}</button>
      </div>
      <div class="form-row">
        <div class="form-group"><label>${L.expRole}</label><input type="text" class="exp-role" placeholder="${L.expRolePH}"></div>
        <div class="form-group"><label>${L.expCompany}</label><input type="text" class="exp-company" placeholder="${L.expCompanyPH}"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>${L.expStart}</label><input type="text" class="exp-start" placeholder="${L.expStartPH}"></div>
        <div class="form-group"><label>${L.expEnd}</label><input type="text" class="exp-end" placeholder="${L.expEndPH}"></div>
      </div>
      <div class="form-row full">
        <div class="form-group"><label>${L.expDesc}</label><textarea class="exp-desc" placeholder="${L.expDescPH}"></textarea></div>
      </div>
    </div>`;
    document.getElementById('exp-list').insertAdjacentHTML('beforeend', html);
  } else if (type === 'training') {
    trainingCount++;
    html = `<div class="entry-block" id="training-${trainingCount}">
      <div class="entry-header">
        <span class="entry-label">${L.trainLabel} #${trainingCount}</span>
        <button class="remove-btn" onclick="removeEntry('training-${trainingCount}')">${L.remove}</button>
      </div>
      <div class="form-row">
        <div class="form-group"><label>${L.trName}</label><input type="text" class="tr-name" placeholder="${L.trNamePH}"></div>
        <div class="form-group"><label>${L.trOrg}</label><input type="text" class="tr-org" placeholder="${L.trOrgPH}"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>${L.trDuration}</label><input type="text" class="tr-duration" placeholder="${L.trDurationPH}"></div>
        <div class="form-group"><label>${L.trYear}</label><input type="text" class="tr-year" placeholder="${L.trYearPH}"></div>
      </div>
    </div>`;
    document.getElementById('training-list').insertAdjacentHTML('beforeend', html);
  } else if (type === 'ref') {
    refCount++;
    html = `<div class="entry-block" id="ref-${refCount}">
      <div class="entry-header">
        <span class="entry-label">${L.refLabel} #${refCount}</span>
        <button class="remove-btn" onclick="removeEntry('ref-${refCount}')">${L.remove}</button>
      </div>
      <div class="form-row">
        <div class="form-group"><label>${L.refName}</label><input type="text" class="ref-name" placeholder="${L.refNamePH}"></div>
        <div class="form-group"><label>${L.refDes}</label><input type="text" class="ref-designation" placeholder="${L.refDesPH}"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>${L.refPhone}</label><input type="text" class="ref-phone" placeholder="${L.refPhonePH}"></div>
        <div class="form-group"><label>${L.refEmail}</label><input type="text" class="ref-email" placeholder="${L.refEmailPH}"></div>
      </div>
    </div>`;
    document.getElementById('ref-list').insertAdjacentHTML('beforeend', html);
  }
}

function removeEntry(id) { const el = document.getElementById(id); if (el) el.remove(); }

// ── Collect Data ────────────────────────────
function gv(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }

function collectData() {
  const edu = [];
  document.querySelectorAll('#edu-list .entry-block').forEach(b => {
    edu.push({ exam: b.querySelector('.edu-exam')?.value||'', subject: b.querySelector('.edu-subject')?.value||'',
      institute: b.querySelector('.edu-institute')?.value||'', board: b.querySelector('.edu-board')?.value||'',
      year: b.querySelector('.edu-year')?.value||'', result: b.querySelector('.edu-result')?.value||'' });
  });
  const exp = [];
  document.querySelectorAll('#exp-list .entry-block').forEach(b => {
    exp.push({ role: b.querySelector('.exp-role')?.value||'', company: b.querySelector('.exp-company')?.value||'',
      start: b.querySelector('.exp-start')?.value||'', end: b.querySelector('.exp-end')?.value||'',
      desc: b.querySelector('.exp-desc')?.value||'' });
  });
  const trainings = [];
  document.querySelectorAll('#training-list .entry-block').forEach(b => {
    trainings.push({ name: b.querySelector('.tr-name')?.value||'', org: b.querySelector('.tr-org')?.value||'',
      duration: b.querySelector('.tr-duration')?.value||'', year: b.querySelector('.tr-year')?.value||'' });
  });
  const refs = [];
  document.querySelectorAll('#ref-list .entry-block').forEach(b => {
    refs.push({ name: b.querySelector('.ref-name')?.value||'', designation: b.querySelector('.ref-designation')?.value||'',
      phone: b.querySelector('.ref-phone')?.value||'', email: b.querySelector('.ref-email')?.value||'' });
  });
  return {
    template_type: selectedTemplate,
    full_name: gv('name'), designation: gv('designation'), phone: gv('phone'), email: gv('email'),
    address: gv('address'), permanent_address: gv('permanent_address'), dob: gv('dob'),
    nationality: gv('nationality'), religion: gv('religion'), blood_group: gv('blood'),
    marital_status: gv('marital'), gender: gv('gender'), nid: gv('nid'), linkedin: gv('linkedin'),
    father_name: gv('father_name'), mother_name: gv('mother_name'),
    father_profession: gv('father_profession'), mother_profession: gv('mother_profession'),
    height: gv('height'), complexion: gv('complexion'), siblings: gv('siblings'), income: gv('income'),
    about: gv('about'), partner_expectation: gv('partner_expectation'), objective: gv('objective'),
    computer_skills: gv('computer_skills'), language_skills: gv('language_skills'), other_skills: gv('other_skills'),
    education: edu, experience: exp, trainings, refs
  };
}

function lb(en, bn) { return cvLang === 'bangla' ? bn : en; }

// ── Save & PDF ───────────────────────────────
async function saveAndDownloadPDF() {
  const data = collectData();
  if (!data.full_name) { showToast(lb('❌ Please enter your full name!','❌ অনুগ্রহ করে নাম পূরণ করুন!'), 'error'); return; }
  showToast(lb('⏳ Saving CV...','⏳ CV সেভ হচ্ছে...'), '');
  try {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (['education','experience','trainings','refs'].includes(key)) formData.append(key, JSON.stringify(data[key]));
      else formData.append(key, data[key]||'');
    });
    if (photoFile) formData.append('photo', photoFile);
    const saveRes = await fetch('/api/cv/save', { method: 'POST', body: formData });
    const saveData = await saveRes.json();
    if (!saveData.success) { showToast(lb('❌ Failed to save!','❌ সেভ করতে সমস্যা হয়েছে!'), 'error'); return; }
    showToast(lb('✅ Saved! Generating PDF...','✅ সেভ হয়েছে! PDF তৈরি হচ্ছে...'), 'success');
    const pdfRes = await fetch(`/api/cv/pdf/${saveData.submission_id}`);
    const blob = await pdfRes.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${data.full_name}_CV.pdf`; a.click();
    window.URL.revokeObjectURL(url);
    showToast(lb('🎉 PDF Downloaded!','🎉 PDF ডাউনলোড হয়েছে!'), 'success');
  } catch(err) { showToast(lb('❌ Error! Make sure server is running.','❌ সমস্যা হয়েছে!'), 'error'); }
}

// ── Generate CV Preview ──────────────────────
function generateCV() {
  const d = collectData();
  const isBn = cvLang === 'bangla';
  const today = new Date().toLocaleDateString(isBn ? 'bn-BD' : 'en-US', { day:'numeric', month:'long', year:'numeric' });
  const photo = photoDataURL
    ? `<img src="${photoDataURL}" style="width:90px;height:110px;object-fit:cover;border:2px solid #1a3c5e;border-radius:4px;">`
    : `<div style="width:90px;height:110px;background:#dde3ea;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:2rem;">👤</div>`;

  let html = '';

  // ── Template: normal ──
  if (selectedTemplate === 'normal') {
    html = `<div class="cv-normal">
      <div class="cv-header">
        ${photo}
        <div class="cv-name">${d.full_name||lb('Your Name','আপনার নাম')}</div>
        <div class="cv-subtitle">${d.designation||''}</div>
      </div>
      ${d.about?`<div class="cv-sec"><div class="cv-sec-title">${lb('About Me','নিজের সম্পর্কে')}</div><p style="font-size:13px;line-height:1.8;padding:0 4px;">${d.about}</p></div>`:''}
      <div class="cv-sec"><div class="cv-sec-title">${lb('Personal Information','ব্যক্তিগত তথ্য')}</div>
        <table>
          ${row(lb('Name','নাম'),d.full_name)}${row(lb('Date of Birth','জন্ম তারিখ'),d.dob)}
          ${row(lb('Gender','লিঙ্গ'),d.gender)}${row(lb('Height','উচ্চতা'),d.height)}
          ${row(lb('Complexion','গায়ের রং'),d.complexion)}${row(lb('Religion','ধর্ম'),d.religion)}
          ${row(lb('Blood Group','রক্তের গ্রুপ'),d.blood_group)}${row(lb('Nationality','জাতীয়তা'),d.nationality)}
          ${row(lb('Marital Status','বৈবাহিক অবস্থা'),d.marital_status)}${row(lb('NID Number','NID নম্বর'),d.nid)}
          ${row(lb('Siblings','ভাই-বোন'),d.siblings)}${row(lb('Monthly Income','মাসিক আয়'),d.income)}
          ${row(lb('Present Address','বর্তমান ঠিকানা'),d.address)}${row(lb('Permanent Address','স্থায়ী ঠিকানা'),d.permanent_address)}
          ${row(lb('Mobile','মোবাইল'),d.phone)}${row(lb('Email','ইমেইল'),d.email)}
        </table>
      </div>
      ${(d.father_name||d.mother_name)?`<div class="cv-sec"><div class="cv-sec-title">${lb('Family Information','পারিবারিক তথ্য')}</div>
        <table>
          ${row(lb("Father's Name",'পিতার নাম'),d.father_name+(d.father_profession?` (${d.father_profession})`:'' ))}
          ${row(lb("Mother's Name",'মাতার নাম'),d.mother_name+(d.mother_profession?` (${d.mother_profession})`:'' ))}
        </table></div>`:''}
      ${d.education.length?`<div class="cv-sec"><div class="cv-sec-title">${lb('Educational Qualifications','শিক্ষাগত যোগ্যতা')}</div>
        <table><tr style="background:#1a3c5e;color:white;">
          <th style="padding:5px 8px;">${lb('Exam','পরীক্ষা')}</th><th style="padding:5px 8px;">${lb('Institution','প্রতিষ্ঠান')}</th>
          <th style="padding:5px 8px;">${lb('Board/University','বোর্ড/বিশ্ববিদ্যালয়')}</th><th style="padding:5px 8px;">${lb('Year','সাল')}</th><th style="padding:5px 8px;">${lb('Result','ফলাফল')}</th></tr>
        ${d.education.map(e=>`<tr><td style="padding:4px 8px;">${e.exam}</td><td style="padding:4px 8px;">${e.institute}</td><td style="padding:4px 8px;">${e.board}</td><td style="padding:4px 8px;">${e.year}</td><td style="padding:4px 8px;">${e.result}</td></tr>`).join('')}
        </table></div>`:''}
      ${(d.computer_skills||d.language_skills)?`<div class="cv-sec"><div class="cv-sec-title">${lb('Skills','দক্ষতা')}</div>
        <table>${row(lb('Computer','কম্পিউটার'),d.computer_skills)}${row(lb('Language','ভাষা'),d.language_skills)}${row(lb('Others','অন্যান্য'),d.other_skills)}</table></div>`:''}
      ${d.partner_expectation?`<div class="cv-sec"><div class="cv-sec-title">${lb('Expected Life Partner','প্রত্যাশিত জীবনসঙ্গী')}</div><p style="font-size:13px;line-height:1.8;padding:0 4px;">${d.partner_expectation}</p></div>`:''}
      ${d.refs.length?`<div class="cv-sec"><div class="cv-sec-title">${lb('References','রেফারেন্স')}</div>
        <table><tr style="background:#1a3c5e;color:white;">
          <th style="padding:5px 8px;">${lb('Name','নাম')}</th><th style="padding:5px 8px;">${lb('Designation','পদবি')}</th><th style="padding:5px 8px;">${lb('Mobile','মোবাইল')}</th></tr>
        ${d.refs.map(r=>`<tr><td style="padding:4px 8px;">${r.name}</td><td style="padding:4px 8px;">${r.designation}</td><td style="padding:4px 8px;">${r.phone}</td></tr>`).join('')}
        </table></div>`:''}
      <div class="cv-sign"><span>${lb('Date','তারিখ')}: ${today}</span><span>${lb('Signature','স্বাক্ষর')}: ________________</span></div>
    </div>`;
    document.getElementById('modalTitle').textContent = '💍 Marriage / General CV';
  }

  // ── Template: student ──
  else if (selectedTemplate === 'student') {
    html = `<div class="cv-student">
      <div class="cv-header">
        ${photo.replace('border:2px solid #1a3c5e','border:2px solid #2ecc71')}
        <div class="cv-header-info">
          <div class="cv-name">${d.full_name||lb('Your Name','আপনার নাম')}</div>
          <div class="cv-subtitle">${d.designation||lb('SSC/HSC Graduate','SSC/HSC পাসধারী')}</div>
          <div class="cv-contact-line">📞 ${d.phone} &nbsp; ✉ ${d.email}</div>
          <div class="cv-contact-line">📍 ${d.address}</div>
        </div>
      </div>
      ${d.objective?`<div class="cv-sec"><div class="cv-sec-title">${lb('Career Objective','ক্যারিয়ার উদ্দেশ্য')}</div><p>${d.objective}</p></div>`:''}
      <div class="cv-sec"><div class="cv-sec-title">${lb('Personal Information','ব্যক্তিগত তথ্য')}</div>
        <table>
          <tr><td style="font-weight:600;width:30%;">${lb("Father's Name",'পিতার নাম')}</td><td>${d.father_name||'—'}</td><td style="font-weight:600;width:30%;">${lb("Mother's Name",'মাতার নাম')}</td><td>${d.mother_name||'—'}</td></tr>
          <tr><td style="font-weight:600;">${lb('Date of Birth','জন্ম তারিখ')}</td><td>${d.dob||'—'}</td><td style="font-weight:600;">${lb('Blood Group','রক্তের গ্রুপ')}</td><td>${d.blood_group||'—'}</td></tr>
          <tr><td style="font-weight:600;">${lb('Religion','ধর্ম')}</td><td>${d.religion||'—'}</td><td style="font-weight:600;">${lb('Nationality','জাতীয়তা')}</td><td>${d.nationality||'—'}</td></tr>
          <tr><td style="font-weight:600;">${lb('Marital Status','বৈবাহিক অবস্থা')}</td><td>${d.marital_status||'—'}</td><td style="font-weight:600;">NID</td><td>${d.nid||'—'}</td></tr>
          <tr><td style="font-weight:600;">${lb('Permanent Address','স্থায়ী ঠিকানা')}</td><td colspan="3">${d.permanent_address||'—'}</td></tr>
        </table>
      </div>
      ${d.education.length?`<div class="cv-sec"><div class="cv-sec-title">${lb('Educational Qualifications','শিক্ষাগত যোগ্যতা')}</div>
        <table><thead><tr><th>${lb('Exam','পরীক্ষা')}</th><th>${lb('Institution','প্রতিষ্ঠান')}</th><th>${lb('Board/University','বোর্ড/বিশ্ববিদ্যালয়')}</th><th>${lb('Year','সাল')}</th><th>${lb('Result','ফলাফল')}</th></tr></thead><tbody>
        ${d.education.map(e=>`<tr><td>${e.exam}</td><td>${e.institute}</td><td>${e.board}</td><td>${e.year}</td><td>${e.result}</td></tr>`).join('')}
        </tbody></table></div>`:''}
      ${d.trainings.length?`<div class="cv-sec"><div class="cv-sec-title">${lb('Training / Courses','প্রশিক্ষণ / কোর্স')}</div>
        <table><thead><tr><th>${lb('Course','কোর্স')}</th><th>${lb('Institution','প্রতিষ্ঠান')}</th><th>${lb('Duration','মেয়াদ')}</th><th>${lb('Year','সাল')}</th></tr></thead><tbody>
        ${d.trainings.map(t=>`<tr><td>${t.name}</td><td>${t.org}</td><td>${t.duration}</td><td>${t.year}</td></tr>`).join('')}
        </tbody></table></div>`:''}
      ${(d.computer_skills||d.language_skills)?`<div class="cv-sec"><div class="cv-sec-title">${lb('Skills','দক্ষতা')}</div><ul>
        ${d.computer_skills?`<li><strong>${lb('Computer','কম্পিউটার')}:</strong> ${d.computer_skills}</li>`:''}
        ${d.language_skills?`<li><strong>${lb('Language','ভাষা')}:</strong> ${d.language_skills}</li>`:''}
        ${d.other_skills?`<li><strong>${lb('Others','অন্যান্য')}:</strong> ${d.other_skills}</li>`:''}
      </ul></div>`:''}
      ${d.refs.length?`<div class="cv-sec"><div class="cv-sec-title">${lb('References','রেফারেন্স')}</div>
        <table><thead><tr><th>${lb('Name','নাম')}</th><th>${lb('Designation','পদবি')}</th><th>${lb('Mobile','মোবাইল')}</th><th>Email</th></tr></thead><tbody>
        ${d.refs.map(r=>`<tr><td>${r.name}</td><td>${r.designation}</td><td>${r.phone}</td><td>${r.email}</td></tr>`).join('')}
        </tbody></table></div>`:''}
      <div style="margin-top:24px;display:flex;justify-content:space-between;font-size:12px;color:#555;">
        <span>${lb('Date','তারিখ')}: ${today}</span><span>${lb('Signature','স্বাক্ষর')}: ________________</span>
      </div>
    </div>`;
    document.getElementById('modalTitle').textContent = '🎓 SSC/HSC CV';
  }

  // ── Template: honours ──
  else if (selectedTemplate === 'honours') {
    const allSkills=[...(d.computer_skills?d.computer_skills.split(','):[]),...(d.other_skills?d.other_skills.split(','):[])].filter(Boolean);
    html = `<div class="cv-honours">
      <div class="cv-header">
        ${photo.replace('border:2px solid #1a3c5e;border-radius:4px','border:3px solid rgba(255,255,255,0.5);border-radius:50%')}
        <div class="cv-header-info">
          <div class="cv-name">${d.full_name||lb('Your Name','আপনার নাম')}</div>
          <div class="cv-subtitle">${d.designation||lb('Honours/Masters Graduate','অনার্স/মাস্টার্স গ্র্যাজুয়েট')}</div>
          <div class="cv-contact-line">${d.phone?`📞 ${d.phone}`:''} ${d.email?`&nbsp; ✉ ${d.email}`:''}</div>
          <div class="cv-contact-line">${d.address?`📍 ${d.address}`:''}</div>
          ${d.linkedin?`<div class="cv-contact-line">🔗 ${d.linkedin}</div>`:''}
        </div>
      </div>
      <div class="cv-body">
        ${d.objective?`<div class="cv-sec cv-col-full"><div class="cv-sec-title">${lb('Career Objective','ক্যারিয়ার উদ্দেশ্য')}</div><p style="font-size:13px;">${d.objective}</p></div>`:''}
        ${d.education.length?`<div class="cv-sec cv-col-full"><div class="cv-sec-title">${lb('Educational Qualifications','শিক্ষাগত যোগ্যতা')}</div>
          <table><thead><tr><th>${lb('Exam','পরীক্ষা')}</th><th>${lb('Institution','প্রতিষ্ঠান')}</th><th>${lb('Board/University','বোর্ড/বিশ্ববিদ্যালয়')}</th><th>${lb('Year','সাল')}</th><th>${lb('Result','ফলাফল')}</th></tr></thead><tbody>
          ${d.education.map(e=>`<tr><td>${e.exam}${e.subject?` (${e.subject})`:''}</td><td>${e.institute}</td><td>${e.board}</td><td>${e.year}</td><td>${e.result}</td></tr>`).join('')}
          </tbody></table></div>`:''}
        <div class="cv-sec"><div class="cv-sec-title">${lb('Personal Information','ব্যক্তিগত তথ্য')}</div>
          <table>
            ${smallRow(lb('Date of Birth','জন্ম তারিখ'),d.dob)}${smallRow(lb('Gender','লিঙ্গ'),d.gender)}
            ${smallRow(lb('Religion','ধর্ম'),d.religion)}${smallRow(lb('Blood Group','রক্তের গ্রুপ'),d.blood_group)}
            ${smallRow(lb('Nationality','জাতীয়তা'),d.nationality)}${smallRow(lb('Marital Status','বৈবাহিক অবস্থা'),d.marital_status)}
            ${smallRow('NID',d.nid)}${smallRow(lb('Permanent Address','স্থায়ী ঠিকানা'),d.permanent_address)}
          </table>
        </div>
        ${allSkills.length?`<div class="cv-sec"><div class="cv-sec-title">${lb('Skills','দক্ষতা')}</div>
          <div>${allSkills.map(s=>`<span class="skill-tag">${s.trim()}</span>`).join('')}</div>
          ${d.language_skills?`<div style="margin-top:8px;font-size:12px;"><strong>${lb('Languages','ভাষা')}:</strong> ${d.language_skills}</div>`:''}
        </div>`:''}
        ${d.experience.length?`<div class="cv-sec cv-col-full"><div class="cv-sec-title">${lb('Work Experience','কর্মঅভিজ্ঞতা')}</div>
          <table><thead><tr><th>${lb('Position','পদবি')}</th><th>${lb('Organization','প্রতিষ্ঠান')}</th><th>${lb('Duration','সময়কাল')}</th></tr></thead><tbody>
          ${d.experience.map(e=>`<tr><td>${e.role}</td><td>${e.company}</td><td>${e.start}${e.end?` — ${e.end}`:''}</td></tr>`).join('')}
          </tbody></table></div>`:''}
        ${d.trainings.length?`<div class="cv-sec cv-col-full"><div class="cv-sec-title">${lb('Training / Courses','প্রশিক্ষণ / কোর্স')}</div>
          <table><thead><tr><th>${lb('Course','কোর্স')}</th><th>${lb('Institution','প্রতিষ্ঠান')}</th><th>${lb('Duration','মেয়াদ')}</th><th>${lb('Year','সাল')}</th></tr></thead><tbody>
          ${d.trainings.map(t=>`<tr><td>${t.name}</td><td>${t.org}</td><td>${t.duration}</td><td>${t.year}</td></tr>`).join('')}
          </tbody></table></div>`:''}
        ${d.refs.length?`<div class="cv-sec cv-col-full"><div class="cv-sec-title">${lb('References','রেফারেন্স')}</div>
          <table><thead><tr><th>${lb('Name','নাম')}</th><th>${lb('Designation','পদবি')}</th><th>${lb('Mobile','মোবাইল')}</th><th>Email</th></tr></thead><tbody>
          ${d.refs.map(r=>`<tr><td>${r.name}</td><td>${r.designation}</td><td>${r.phone}</td><td>${r.email}</td></tr>`).join('')}
          </tbody></table></div>`:''}
      </div>
      <div style="margin-top:24px;display:flex;justify-content:space-between;font-size:12px;color:#555;border-top:1px solid #e2e8f0;padding-top:12px;">
        <span>${lb('Date','তারিখ')}: ${today}</span><span>${lb('Signature','স্বাক্ষর')}: ________________</span>
      </div>
    </div>`;
    document.getElementById('modalTitle').textContent = '🏛️ Honours/Masters CV';
  }

  // ── Template: pro ──
  else if (selectedTemplate === 'pro') {
    const allSkills=[...(d.computer_skills?d.computer_skills.split(','):[]),...(d.other_skills?d.other_skills.split(','):[])].filter(Boolean);
    html = `<div class="cv-pro">
      <div class="cv-sidebar">
        ${photo.replace('border:2px solid #1a3c5e;border-radius:4px','border:3px solid rgba(232,160,32,0.7);border-radius:6px;display:block;margin:0 auto 16px;')}
        <div class="cv-name">${d.full_name||'Your Name'}</div>
        <div class="cv-subtitle">${d.designation||'Professional'}</div>
        <div class="sidebar-sec"><div class="sidebar-sec-title">CONTACT</div>
          ${d.phone?`<div class="sidebar-item">📞 ${d.phone}</div>`:''}
          ${d.email?`<div class="sidebar-item">✉ ${d.email}</div>`:''}
          ${d.address?`<div class="sidebar-item">📍 ${d.address}</div>`:''}
          ${d.linkedin?`<div class="sidebar-item">🔗 ${d.linkedin}</div>`:''}
        </div>
        <div class="sidebar-sec"><div class="sidebar-sec-title">PERSONAL</div>
          ${d.dob?`<div class="sidebar-item">Date of Birth<span>${d.dob}</span></div>`:''}
          ${d.nationality?`<div class="sidebar-item">Nationality<span>${d.nationality}</span></div>`:''}
          ${d.blood_group?`<div class="sidebar-item">Blood Group<span>${d.blood_group}</span></div>`:''}
          ${d.marital_status?`<div class="sidebar-item">Marital Status<span>${d.marital_status}</span></div>`:''}
          ${d.nid?`<div class="sidebar-item">NID<span>${d.nid}</span></div>`:''}
        </div>
        ${allSkills.length?`<div class="sidebar-sec"><div class="sidebar-sec-title">SKILLS</div>
          ${allSkills.map(s=>`<div class="sidebar-item" style="padding:2px 0;">${s.trim()}</div>`).join('')}
        </div>`:''}
        ${d.language_skills?`<div class="sidebar-sec"><div class="sidebar-sec-title">LANGUAGES</div>
          ${d.language_skills.split(',').map(l=>`<div class="sidebar-item">${l.trim()}</div>`).join('')}
        </div>`:''}
      </div>
      <div class="cv-main">
        ${d.objective?`<div class="cv-sec"><div class="cv-sec-title">Professional Summary</div><p style="font-size:12px;line-height:1.7;">${d.objective}</p></div>`:''}
        ${d.experience.length?`<div class="cv-sec"><div class="cv-sec-title">Work Experience</div>
          ${d.experience.map(e=>`<div class="exp-item"><div class="exp-role">${e.role}</div><div class="exp-company">${e.company}</div>
          <div class="exp-date">${e.start}${e.end?' – '+e.end:''}</div>${e.desc?`<div class="exp-desc">${e.desc}</div>`:''}</div>`).join('')}</div>`:''}
        ${d.education.length?`<div class="cv-sec"><div class="cv-sec-title">Education</div>
          <table><thead><tr><th>Degree</th><th>Institution</th><th>Year</th><th>Result</th></tr></thead><tbody>
          ${d.education.map(e=>`<tr><td>${e.exam}${e.subject?` (${e.subject})`:''}</td><td>${e.institute}<br><small style="color:#888">${e.board}</small></td><td>${e.year}</td><td>${e.result}</td></tr>`).join('')}
          </tbody></table></div>`:''}
        ${d.trainings.length?`<div class="cv-sec"><div class="cv-sec-title">Training & Certifications</div>
          <table><thead><tr><th>Course</th><th>Institution</th><th>Duration</th><th>Year</th></tr></thead><tbody>
          ${d.trainings.map(t=>`<tr><td>${t.name}</td><td>${t.org}</td><td>${t.duration}</td><td>${t.year}</td></tr>`).join('')}
          </tbody></table></div>`:''}
        ${d.refs.length?`<div class="cv-sec"><div class="cv-sec-title">References</div>
          <table><thead><tr><th>Name</th><th>Designation</th><th>Mobile</th><th>Email</th></tr></thead><tbody>
          ${d.refs.map(r=>`<tr><td>${r.name}</td><td>${r.designation}</td><td>${r.phone}</td><td>${r.email}</td></tr>`).join('')}
          </tbody></table></div>`:''}
        <div style="margin-top:30px;display:flex;justify-content:space-between;font-size:11px;color:#888;border-top:1px solid #f0f4f8;padding-top:12px;">
          <span>Date: ${today}</span><span>Signature: ________________</span>
        </div>
      </div>
    </div>`;
    document.getElementById('modalTitle').textContent = '💼 Professional CV';
  }

  // ── Template t1: Navy Professional ──
  else if (selectedTemplate === 't1') {
    const allSkills=[...(d.computer_skills?d.computer_skills.split(','):[]),...(d.other_skills?d.other_skills.split(','):[])].filter(Boolean);
    const pTag = photoDataURL?`<img src="${photoDataURL}" style="width:100px;height:100px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.3);display:block;margin:0 auto 12px;">`:`<div style="width:100px;height:100px;border-radius:50%;background:#2a4a6e;display:flex;align-items:center;justify-content:center;font-size:2.5rem;margin:0 auto 12px;">👤</div>`;
    html = `<div style="display:grid;grid-template-columns:210px 1fr;min-height:900px;font-family:Inter,Arial,sans-serif;font-size:12px;">
      <div style="background:#1a3c5e;color:white;padding:0;">
        <div style="background:#0d2a45;padding:28px 16px 20px;text-align:center;">
          ${pTag}
          <div style="font-size:18px;font-weight:800;text-transform:uppercase;line-height:1.2;">${d.full_name||'Your Name'}</div>
          <div style="font-size:11px;color:#e8a020;font-weight:600;margin-top:4px;">${d.designation||'Professional'}</div>
        </div>
        <div style="padding:18px;">
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#e8a020;border-bottom:1px solid rgba(232,160,32,0.3);padding-bottom:4px;margin-bottom:8px;">Contact</div>
          ${d.phone?`<div style="font-size:11px;opacity:0.9;margin-bottom:5px;">📞 ${d.phone}</div>`:''}
          ${d.email?`<div style="font-size:11px;opacity:0.9;margin-bottom:5px;">✉ ${d.email}</div>`:''}
          ${d.address?`<div style="font-size:11px;opacity:0.9;margin-bottom:5px;">📍 ${d.address}</div>`:''}
          ${d.linkedin?`<div style="font-size:11px;opacity:0.9;margin-bottom:5px;">🔗 ${d.linkedin}</div>`:''}
          ${d.education.length?`<div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#e8a020;border-bottom:1px solid rgba(232,160,32,0.3);padding-bottom:4px;margin:16px 0 8px;">Education</div>
            ${d.education.map(e=>`<div style="margin-bottom:10px;"><div style="font-size:11px;font-weight:600;">${e.exam}${e.subject?` — ${e.subject}`:''}</div><div style="font-size:10px;color:#e8a020;font-weight:700;">${e.institute}</div><div style="font-size:10px;opacity:0.7;">${e.year}${e.result?` | ${e.result}`:''}</div></div>`).join('')}
          `:''}
          ${allSkills.length?`<div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#e8a020;border-bottom:1px solid rgba(232,160,32,0.3);padding-bottom:4px;margin:16px 0 8px;">Skills</div>
            ${allSkills.map(s=>`<div style="font-size:11px;opacity:0.88;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.07);">• ${s.trim()}</div>`).join('')}
          `:''}
          ${d.language_skills?`<div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#e8a020;border-bottom:1px solid rgba(232,160,32,0.3);padding-bottom:4px;margin:16px 0 8px;">Languages</div>
            ${d.language_skills.split(',').map(l=>`<div style="font-size:11px;opacity:0.88;padding:2px 0;">${l.trim()}</div>`).join('')}
          `:''}
          ${(d.dob||d.nationality)?`<div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#e8a020;border-bottom:1px solid rgba(232,160,32,0.3);padding-bottom:4px;margin:16px 0 8px;">Personal</div>
            ${d.dob?`<div style="font-size:11px;opacity:0.88;margin-bottom:4px;">DOB: ${d.dob}</div>`:''}
            ${d.nationality?`<div style="font-size:11px;opacity:0.88;margin-bottom:4px;">Nationality: ${d.nationality}</div>`:''}
            ${d.blood_group?`<div style="font-size:11px;opacity:0.88;margin-bottom:4px;">Blood: ${d.blood_group}</div>`:''}
            ${d.marital_status?`<div style="font-size:11px;opacity:0.88;margin-bottom:4px;">Marital: ${d.marital_status}</div>`:''}
          `:''}
        </div>
      </div>
      <div style="background:white;padding:28px;">
        ${d.objective?`<div style="margin-bottom:20px;"><div style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#1a3c5e;border-bottom:2px solid #e8a020;padding-bottom:4px;margin-bottom:10px;">About Me</div><p style="font-size:12px;color:#444;line-height:1.7;">${d.objective}</p></div>`:''}
        ${d.experience.length?`<div style="margin-bottom:20px;"><div style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#1a3c5e;border-bottom:2px solid #e8a020;padding-bottom:4px;margin-bottom:10px;">Work Experience</div>
          ${d.experience.map(e=>`<div style="margin-bottom:14px;"><div style="font-size:10px;color:#e8a020;font-weight:700;">${e.start}${e.end?' – '+e.end:''}</div><div style="font-size:11px;color:#555;">${e.company}</div><div style="font-weight:700;font-size:13px;color:#1a3c5e;">${e.role}</div>${e.desc?`<div style="font-size:11px;color:#555;margin-top:3px;">${e.desc}</div>`:''}</div>`).join('')}
        </div>`:''}
        ${d.trainings.length?`<div style="margin-bottom:20px;"><div style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#1a3c5e;border-bottom:2px solid #e8a020;padding-bottom:4px;margin-bottom:10px;">Training & Certifications</div>
          <ul style="padding-left:16px;">${d.trainings.map(t=>`<li style="font-size:11px;margin-bottom:4px;"><strong>${t.name}</strong> — ${t.org} (${t.year})</li>`).join('')}</ul>
        </div>`:''}
        ${d.refs.length?`<div style="margin-bottom:20px;"><div style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#1a3c5e;border-bottom:2px solid #e8a020;padding-bottom:4px;margin-bottom:10px;">References</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            ${d.refs.map(r=>`<div><div style="font-weight:700;color:#1a3c5e;">${r.name}</div><div style="font-size:10px;color:#666;">${r.designation}</div><div style="font-size:10px;color:#555;margin-top:3px;">📞 ${r.phone}<br>✉ ${r.email}</div></div>`).join('')}
          </div>
        </div>`:''}
        <div style="margin-top:30px;display:flex;justify-content:space-between;font-size:11px;color:#aaa;border-top:1px solid #f0f0f0;padding-top:10px;">
          <span>Date: ${today}</span><span>Signature: ________________</span>
        </div>
      </div>
    </div>`;
    document.getElementById('modalTitle').textContent = '💼 Navy Professional CV';
  }

  // ── Template t2: Bold Dark Red ──
  else if (selectedTemplate === 't2') {
    const skills=[...(d.computer_skills?d.computer_skills.split(','):[]),...(d.other_skills?d.other_skills.split(','):[])].filter(Boolean);
    const langs=d.language_skills?d.language_skills.split(',').filter(Boolean):[];
    html = `<div style="font-family:Inter,Arial,sans-serif;font-size:12px;background:white;">
      <div style="background:#6b0f1a;color:white;padding:28px 32px;">
        <div style="font-size:28px;font-weight:900;text-transform:uppercase;line-height:1;">${d.full_name||'Your Name'}</div>
        <div style="font-size:13px;opacity:0.85;margin-top:4px;">${d.designation||'Professional'}</div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:10px;opacity:0.85;margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.2);">
          ${d.phone?`<span>📞 ${d.phone}</span>`:''}${d.email?`<span>✉ ${d.email}</span>`:''}${d.address?`<span>📍 ${d.address}</span>`:''}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:260px 1fr;">
        <div style="padding:20px;border-right:1px solid #f0f0f0;">
          ${d.objective?`<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#6b0f1a;border-bottom:2px solid #6b0f1a;padding-bottom:4px;margin-bottom:8px;">About Me</div><p style="font-size:11.5px;color:#444;line-height:1.7;margin-bottom:16px;">${d.objective}</p>`:''}
          ${d.education.length?`<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#6b0f1a;border-bottom:2px solid #6b0f1a;padding-bottom:4px;margin-bottom:8px;">Education</div>
            ${d.education.map(e=>`<div style="margin-bottom:10px;"><div style="font-size:11px;font-weight:700;color:#333;">${e.institute}</div><div style="font-size:11px;color:#555;">${e.exam}${e.subject?` (${e.subject})`:''}</div><div style="font-size:10px;color:#888;">${e.year}${e.result?` | ${e.result}`:''}</div></div>`).join('')}
          `:''}
          ${skills.length?`<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#6b0f1a;border-bottom:2px solid #6b0f1a;padding-bottom:4px;margin:16px 0 8px;">Skills</div>
            ${skills.map(s=>`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-size:11px;">${s.trim()}</span><div style="width:80px;height:4px;background:#eee;border-radius:2px;"><div style="width:75%;height:4px;background:#6b0f1a;border-radius:2px;"></div></div></div>`).join('')}
          `:''}
          ${langs.length?`<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#6b0f1a;border-bottom:2px solid #6b0f1a;padding-bottom:4px;margin:16px 0 8px;">Languages</div>
            ${langs.map(l=>`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-size:11px;">${l.trim()}</span><div style="width:80px;height:4px;background:#eee;border-radius:2px;"><div style="width:80%;height:4px;background:#6b0f1a;border-radius:2px;"></div></div></div>`).join('')}
          `:''}
        </div>
        <div style="padding:20px;">
          ${d.experience.length?`<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#6b0f1a;border-bottom:2px solid #6b0f1a;padding-bottom:4px;margin-bottom:10px;">Work Experience</div>
            ${d.experience.map(e=>`<div style="margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid #f5f5f5;">
              <div style="font-size:10px;color:#6b0f1a;font-weight:700;">${e.start}${e.end?' — '+e.end:''}</div>
              <div style="font-size:11px;font-weight:700;color:#333;">${e.company} — ${e.role}</div>
              ${e.desc?`<div style="font-size:11px;color:#555;line-height:1.6;margin-top:4px;">${e.desc}</div>`:''}
            </div>`).join('')}
          `:''}
          ${d.trainings.length?`<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#6b0f1a;border-bottom:2px solid #6b0f1a;padding-bottom:4px;margin:16px 0 10px;">Training</div>
            ${d.trainings.map(t=>`<div style="margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #f5f5f5;"><div style="font-size:10px;color:#6b0f1a;font-weight:700;">${t.year}</div><div style="font-size:11px;font-weight:700;">${t.name} — ${t.org}</div></div>`).join('')}
          `:''}
          ${d.refs.length?`<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#6b0f1a;border-bottom:2px solid #6b0f1a;padding-bottom:4px;margin:16px 0 10px;">References</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              ${d.refs.map(r=>`<div><div style="font-weight:700;font-size:12px;">${r.name}</div><div style="font-size:10px;color:#666;">${r.designation}</div><div style="font-size:10px;color:#555;margin-top:3px;">📞 ${r.phone}<br>✉ ${r.email}</div></div>`).join('')}
            </div>
          `:''}
          <div style="margin-top:24px;display:flex;justify-content:space-between;font-size:11px;color:#aaa;border-top:1px solid #f0f0f0;padding-top:10px;">
            <span>Date: ${today}</span><span>Signature: ________________</span>
          </div>
        </div>
      </div>
    </div>`;
    document.getElementById('modalTitle').textContent = '🔴 Bold Dark Red CV';
  }

  // ── Template t3: Student Maroon ──
  else if (selectedTemplate === 't3') {
    const pTag = photoDataURL?`<img src="${photoDataURL}" style="width:100px;height:100px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.3);display:block;margin:0 auto 12px;">`:`<div style="width:100px;height:100px;border-radius:50%;background:#9b2a3e;display:flex;align-items:center;justify-content:center;font-size:2.5rem;margin:0 auto 12px;">👤</div>`;
    const skills=[...(d.computer_skills?d.computer_skills.split(','):[]),...(d.other_skills?d.other_skills.split(','):[])].filter(Boolean);
    html = `<div style="display:grid;grid-template-columns:190px 1fr;min-height:900px;font-family:Inter,Arial,sans-serif;font-size:12px;">
      <div style="background:#7b1a2e;color:white;padding:0;">
        <div style="padding:24px 16px 16px;text-align:center;">${pTag}</div>
        <div style="padding:0 14px 20px;">
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:4px;margin-bottom:8px;">Education</div>
          ${d.education.map(e=>`<div style="margin-bottom:10px;font-size:11px;"><div style="font-size:10px;color:rgba(255,255,255,0.6);">${e.year}</div><div style="font-weight:700;">${e.exam}${e.subject?` (${e.subject})`:''}</div><div style="font-size:10px;color:rgba(255,255,255,0.8);font-weight:700;">${e.institute}</div></div>`).join('')}
          ${skills.length?`<div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:4px;margin:14px 0 8px;">Skills</div>
            ${skills.map(s=>`<div style="font-size:11px;padding:2px 0;opacity:0.9;">• ${s.trim()}</div>`).join('')}`:''}
          ${d.language_skills?`<div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:4px;margin:14px 0 8px;">Languages</div>
            ${d.language_skills.split(',').map(l=>`<div style="font-size:11px;padding:2px 0;opacity:0.9;">• ${l.trim()}</div>`).join('')}`:''}
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:4px;margin:14px 0 8px;">Contact</div>
          ${d.phone?`<div style="font-size:10.5px;padding:3px 0;opacity:0.88;word-break:break-all;">📞 ${d.phone}</div>`:''}
          ${d.email?`<div style="font-size:10.5px;padding:3px 0;opacity:0.88;word-break:break-all;">✉ ${d.email}</div>`:''}
          ${d.address?`<div style="font-size:10.5px;padding:3px 0;opacity:0.88;">📍 ${d.address}</div>`:''}
        </div>
      </div>
      <div style="background:white;padding:0;">
        <div style="background:#b0b0b0;padding:20px 24px;">
          <div style="font-size:26px;font-weight:900;color:white;text-transform:uppercase;letter-spacing:2px;">${d.full_name||'Your Name'}</div>
          <div style="font-size:11px;color:white;opacity:0.9;font-weight:600;letter-spacing:3px;text-transform:uppercase;margin-top:2px;">${d.designation||'Student'}</div>
        </div>
        <div style="padding:20px 24px;">
          ${d.objective?`<div style="margin-bottom:16px;"><div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#7b1a2e;margin-bottom:8px;">▶ Profile Info</div><p style="font-size:12px;color:#444;line-height:1.7;">${d.objective}</p></div>`:''}
          ${d.experience.length?`<div style="margin-bottom:16px;"><div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#7b1a2e;margin-bottom:8px;">▶ Work Experience</div>
            ${d.experience.map(e=>`<div style="margin-bottom:10px;"><div style="font-size:10px;color:#7b1a2e;font-weight:700;">${e.start}${e.end?' – '+e.end:''}</div><div style="font-weight:700;font-size:12px;">${e.role}</div><div style="font-size:11px;color:#555;">${e.company}</div>${e.desc?`<div style="font-size:11px;color:#444;margin-top:3px;">${e.desc}</div>`:''}</div>`).join('')}
          </div>`:''}
          ${d.trainings.length?`<div style="margin-bottom:16px;"><div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#7b1a2e;margin-bottom:8px;">▶ Training & Courses</div>
            ${d.trainings.map(t=>`<div style="margin-bottom:6px;font-size:12px;"><strong>${t.name}</strong> — ${t.org} (${t.duration}, ${t.year})</div>`).join('')}
          </div>`:''}
          ${d.refs.length?`<div style="margin-bottom:16px;"><div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#7b1a2e;margin-bottom:8px;">▶ References</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              ${d.refs.map(r=>`<div style="background:#f9f9f9;border-left:3px solid #7b1a2e;padding:8px 10px;"><div style="font-weight:700;font-size:12px;">${r.name}</div><div style="font-size:11px;color:#555;">${r.designation}</div><div style="font-size:10px;color:#777;margin-top:2px;">📞 ${r.phone}</div></div>`).join('')}
            </div>
          </div>`:''}
          <div style="margin-top:20px;display:flex;justify-content:space-between;font-size:11px;color:#888;border-top:1px solid #eee;padding-top:10px;">
            <span>Date: ${today}</span><span>Signature: ________________</span>
          </div>
        </div>
      </div>
    </div>`;
    document.getElementById('modalTitle').textContent = '🎓 Student Maroon CV';
  }

  // ── Template t4: Floral Biodata ──
  else if (selectedTemplate === 't4') {
    const pTag = photoDataURL?`<img src="${photoDataURL}" style="width:110px;height:130px;border-radius:50%;object-fit:cover;border:4px solid #c0392b;display:block;margin:0 auto 10px;">`:`<div style="width:110px;height:130px;border-radius:50%;background:#f0d0c8;display:flex;align-items:center;justify-content:center;font-size:2.5rem;margin:0 auto 10px;border:4px solid #c0392b;">👤</div>`;
    html = `<div style="font-family:Georgia,serif;background:#fff8f0;color:#333;font-size:13px;padding:30px;border:8px solid #c0392b;position:relative;line-height:1.7;">
      <div style="position:absolute;font-size:1.5rem;color:#c0392b;opacity:0.25;top:8px;left:8px;">❧</div>
      <div style="position:absolute;font-size:1.5rem;color:#c0392b;opacity:0.25;top:8px;right:8px;">❧</div>
      <div style="position:absolute;font-size:1.5rem;color:#c0392b;opacity:0.25;bottom:8px;left:8px;">❧</div>
      <div style="position:absolute;font-size:1.5rem;color:#c0392b;opacity:0.25;bottom:8px;right:8px;">❧</div>
      <div style="text-align:center;color:#c0392b;opacity:0.35;letter-spacing:4px;font-size:1rem;margin-bottom:8px;">✿ ❧ ✿ ❧ ✿ ❧ ✿</div>
      <div style="text-align:center;margin-bottom:16px;">
        <div style="font-size:22px;font-weight:700;color:#c0392b;letter-spacing:4px;text-transform:uppercase;border-bottom:2px solid #c0392b;display:inline-block;padding-bottom:4px;margin-bottom:12px;">BIO DATA</div>
        ${pTag}
        <div style="font-size:18px;font-weight:700;color:#333;">${d.full_name||'Your Name'}</div>
        ${d.designation?`<div style="font-size:12px;color:#888;">${d.designation}</div>`:''}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
        <div>
          <div style="font-size:15px;font-weight:700;color:#c0392b;font-style:italic;margin-bottom:10px;border-bottom:1px solid #e8c4b8;padding-bottom:4px;">Personal Details:</div>
          <table style="width:100%;">
            ${t4row('Name',d.full_name)}${t4row('Date of Birth',d.dob)}
            ${t4row('Height',d.height)}${t4row('Complexion',d.complexion)}
            ${t4row('Religion',d.religion)}${t4row('Blood Group',d.blood_group)}
            ${t4row('Marital Status',d.marital_status)}${t4row('Nationality',d.nationality)}
            ${t4row('Present Address',d.address)}${t4row('Permanent Address',d.permanent_address)}
            ${t4row('Mobile',d.phone)}${t4row('Email',d.email)}
          </table>
        </div>
        <div>
          <div style="font-size:15px;font-weight:700;color:#c0392b;font-style:italic;margin-bottom:10px;border-bottom:1px solid #e8c4b8;padding-bottom:4px;">Family Details:</div>
          <table style="width:100%;">
            ${t4row('Father',d.father_name+(d.father_profession?` (${d.father_profession})`:'' ))}
            ${t4row('Mother',d.mother_name+(d.mother_profession?` (${d.mother_profession})`:'' ))}
            ${t4row('Siblings',d.siblings)}
          </table>
          ${d.education.length?`<div style="font-size:15px;font-weight:700;color:#c0392b;font-style:italic;margin:14px 0 10px;border-bottom:1px solid #e8c4b8;padding-bottom:4px;">Education & Career:</div>
            <table style="width:100%;">
              ${d.education.map(e=>`<tr><td style="font-weight:700;font-size:12px;padding:3px 6px;">${e.exam}</td><td style="font-size:12px;padding:3px 6px;">${e.institute}, ${e.year}</td></tr>`).join('')}
              ${t4row('Monthly Income',d.income)}
            </table>`:''}
          ${d.about?`<div style="font-size:15px;font-weight:700;color:#c0392b;font-style:italic;margin:14px 0 6px;border-bottom:1px solid #e8c4b8;padding-bottom:4px;">About:</div><p style="font-size:12px;color:#555;line-height:1.7;">${d.about}</p>`:''}
          ${d.partner_expectation?`<div style="font-size:15px;font-weight:700;color:#c0392b;font-style:italic;margin:14px 0 6px;border-bottom:1px solid #e8c4b8;padding-bottom:4px;">Expected Partner:</div><p style="font-size:12px;color:#555;line-height:1.7;">${d.partner_expectation}</p>`:''}
        </div>
      </div>
      <div style="text-align:center;margin-top:16px;padding-top:10px;border-top:1px solid #e8c4b8;font-size:12px;color:#666;">
        Contact: ${d.phone||''} ${d.email?`| ${d.email}`:''}
      </div>
      <div style="text-align:center;color:#c0392b;opacity:0.35;letter-spacing:4px;font-size:1rem;margin-top:8px;">✿ ❧ ✿ ❧ ✿ ❧ ✿</div>
    </div>`;
    document.getElementById('modalTitle').textContent = '🌹 Floral Biodata CV';
  }

  // ── Template t5: Cream Floral ──
  else if (selectedTemplate === 't5') {
    const pTag = photoDataURL?`<img src="${photoDataURL}" style="width:110px;height:130px;border-radius:50%;object-fit:cover;border:4px solid #c8860a;">`:`<div style="width:110px;height:130px;border-radius:50%;background:#f0e0c0;display:flex;align-items:center;justify-content:center;font-size:2.5rem;border:4px solid #c8860a;">👤</div>`;
    html = `<div style="font-family:Georgia,serif;background:#fef9ef;color:#333;font-size:12.5px;padding:28px;border:6px solid #c8860a;line-height:1.7;">
      <div style="text-align:center;color:#c8860a;opacity:0.4;letter-spacing:6px;font-size:1rem;margin-bottom:8px;">✾ ✿ ✾ ✿ ✾ ✿ ✾ ✿ ✾</div>
      <div style="display:grid;grid-template-columns:1fr auto;gap:20px;align-items:start;margin-bottom:20px;">
        <div>
          <div style="font-size:26px;font-weight:700;color:#4a2c0a;font-style:italic;">${d.full_name||'Your Name'}</div>
          <div style="width:60%;height:1px;background:#c8860a;margin:8px 0;"></div>
          ${d.designation?`<div style="font-size:12px;color:#888;font-style:italic;">${d.designation}</div>`:''}
          <div style="margin-top:10px;">
            <div style="font-size:15px;font-weight:700;color:#c8860a;font-style:italic;margin-bottom:6px;border-bottom:1px solid #e8d5a0;padding-bottom:4px;">Contact Details:</div>
            ${d.phone?`<div style="font-size:12px;color:#555;">📞 ${d.phone}</div>`:''}
            ${d.email?`<div style="font-size:12px;color:#555;">✉ ${d.email}</div>`:''}
            ${d.address?`<div style="font-size:12px;color:#555;">📍 ${d.address}</div>`:''}
          </div>
        </div>
        <div>${pTag}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
        <div>
          <div style="font-size:15px;font-weight:700;color:#c8860a;font-style:italic;margin-bottom:8px;border-bottom:1px solid #e8d5a0;padding-bottom:4px;">Family Details:</div>
          <table style="width:100%;">
            ${t5row('Father',d.father_name+(d.father_profession?` (${d.father_profession})`:'' ))}
            ${t5row('Mother',d.mother_name+(d.mother_profession?` (${d.mother_profession})`:'' ))}
            ${t5row('Siblings',d.siblings)}
          </table>
          <div style="font-size:15px;font-weight:700;color:#c8860a;font-style:italic;margin:14px 0 8px;border-bottom:1px solid #e8d5a0;padding-bottom:4px;">Personal Details:</div>
          <table style="width:100%;">
            ${t5row('Date of Birth',d.dob)}${t5row('Height',d.height)}
            ${t5row('Religion',d.religion)}${t5row('Blood Group',d.blood_group)}
            ${t5row('Complexion',d.complexion)}${t5row('Marital Status',d.marital_status)}
            ${t5row('Nationality',d.nationality)}${t5row('Monthly Income',d.income)}
          </table>
          ${d.other_skills?`<div style="font-size:15px;font-weight:700;color:#c8860a;font-style:italic;margin:14px 0 8px;border-bottom:1px solid #e8d5a0;padding-bottom:4px;">Hobbies & Interests:</div>
            <ul style="padding-left:16px;">${d.other_skills.split(',').map(s=>`<li style="font-size:12px;margin-bottom:3px;color:#555;">${s.trim()}</li>`).join('')}</ul>`:''}
        </div>
        <div>
          ${d.education.length?`<div style="font-size:15px;font-weight:700;color:#c8860a;font-style:italic;margin-bottom:8px;border-bottom:1px solid #e8d5a0;padding-bottom:4px;">Education:</div>
            ${d.education.map(e=>`<div style="margin-bottom:8px;font-size:12px;"><div style="font-weight:700;color:#333;">${e.institute}</div><div>${e.exam}${e.subject?` — ${e.subject}`:''}</div><div style="font-size:11px;color:#888;">${e.year}${e.result?` | ${e.result}`:''}</div></div>`).join('')}`:''}
          ${d.about?`<div style="font-size:15px;font-weight:700;color:#c8860a;font-style:italic;margin:14px 0 8px;border-bottom:1px solid #e8d5a0;padding-bottom:4px;">Profession:</div><div style="font-size:12px;color:#555;">${d.about}</div>`:''}
          ${d.permanent_address?`<div style="font-size:15px;font-weight:700;color:#c8860a;font-style:italic;margin:14px 0 8px;border-bottom:1px solid #e8d5a0;padding-bottom:4px;">Permanent Address:</div><div style="font-size:12px;color:#555;">${d.permanent_address}</div>`:''}
          ${d.partner_expectation?`<div style="font-size:15px;font-weight:700;color:#c8860a;font-style:italic;margin:14px 0 8px;border-bottom:1px solid #e8d5a0;padding-bottom:4px;">Expected Partner:</div><div style="font-size:12px;color:#555;">${d.partner_expectation}</div>`:''}
        </div>
      </div>
      ${d.about?`<div style="margin-top:16px;font-size:12px;color:#555;font-style:italic;text-align:center;padding:12px;border:1px solid #e8d5a0;border-radius:8px;background:rgba(200,134,10,0.05);">"${d.about}"</div>`:''}
      <div style="text-align:center;margin-top:16px;padding-top:10px;border-top:1px solid #e8d5a0;font-size:11.5px;color:#666;">Date: ${today} &nbsp;|&nbsp; Signature: ________________</div>
      <div style="text-align:center;color:#c8860a;opacity:0.4;letter-spacing:6px;font-size:1rem;margin-top:8px;">✾ ✿ ✾ ✿ ✾ ✿ ✾ ✿ ✾</div>
    </div>`;
    document.getElementById('modalTitle').textContent = '🌸 Cream Floral CV';
  }

  // ── Template t6: Dark Two-tone ──
  else if (selectedTemplate === 't6') {
    const skills=[...(d.computer_skills?d.computer_skills.split(','):[]),...(d.other_skills?d.other_skills.split(','):[])].filter(Boolean);
    const langs=d.language_skills?d.language_skills.split(',').filter(Boolean):[];
    const pTag = photoDataURL?`<img src="${photoDataURL}" style="width:88px;height:88px;border-radius:50%;object-fit:cover;border:3px solid #c0392b;">`:`<div style="width:88px;height:88px;border-radius:50%;background:#2d2d4e;display:flex;align-items:center;justify-content:center;font-size:2rem;border:3px solid #c0392b;">👤</div>`;
    html = `<div style="font-family:Inter,Arial,sans-serif;background:white;font-size:12px;">
      <div style="background:#1a1a2e;color:white;padding:28px 32px 20px;">
        <div style="display:flex;align-items:center;gap:20px;margin-bottom:16px;">
          ${pTag}
          <div>
            <div style="font-size:28px;font-weight:800;line-height:1.1;">${d.full_name||'Your Name'}</div>
            <div style="font-size:12px;color:#c0392b;font-weight:600;margin-top:4px;">${d.designation||'Professional'}</div>
          </div>
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:10px;opacity:0.8;padding-top:12px;border-top:1px solid rgba(255,255,255,0.15);">
          ${d.phone?`<span>📞 ${d.phone}</span>`:''}${d.email?`<span>✉ ${d.email}</span>`:''}
          ${d.address?`<span>📍 ${d.address}</span>`:''}${d.linkedin?`<span>🔗 ${d.linkedin}</span>`:''}
        </div>
      </div>
      ${d.education.length?`<div style="background:#c0392b;color:white;padding:14px 32px;display:grid;grid-template-columns:repeat(${Math.min(d.education.length,3)},1fr);gap:1px;">
        ${d.education.slice(0,3).map(e=>`<div style="padding:0 12px;border-right:1px solid rgba(255,255,255,0.2);">
          <div style="font-size:10px;opacity:0.8;">${e.year}</div>
          <div style="font-size:11px;font-weight:700;">${e.institute}</div>
          <div style="font-size:10px;opacity:0.85;">${e.exam}${e.subject?` (${e.subject})`:''} ${e.result?`| ${e.result}`:''}</div>
        </div>`).join('')}
      </div>`:''}
      <div style="padding:24px 32px;">
        ${d.objective?`<p style="font-size:12px;color:#444;line-height:1.7;margin-bottom:20px;">${d.objective}</p>`:''}
        ${d.experience.length?`<div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#1a1a2e;border-bottom:2px solid #c0392b;padding-bottom:4px;margin:0 0 10px;">Work Experience</div>
          ${d.experience.map(e=>`<div style="margin-bottom:14px;padding-left:12px;border-left:3px solid #c0392b;">
            <div style="font-size:10px;color:#c0392b;font-weight:700;">${e.start}${e.end?' — '+e.end:''}</div>
            <div style="font-size:11px;font-weight:700;color:#333;">${e.company} — ${e.role}</div>
            ${e.desc?`<div style="font-size:11px;color:#555;line-height:1.6;margin-top:4px;">${e.desc}</div>`:''}
          </div>`).join('')}
        `:''}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:16px;">
          <div>
            ${skills.length?`<div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#1a1a2e;border-bottom:2px solid #c0392b;padding-bottom:4px;margin-bottom:10px;">Skills</div>
              ${skills.map(s=>`<div style="display:flex;justify-content:space-between;margin-bottom:8px;align-items:center;">
                <span style="font-size:11px;color:#333;">${s.trim()}</span>
                <div style="display:flex;gap:3px;">${[1,2,3,4,5,6,7,8,9,10].map(i=>`<div style="width:8px;height:8px;border-radius:50%;background:${i<=8?'#c0392b':'#eee'};"></div>`).join('')}</div>
              </div>`).join('')}`:''}
          </div>
          <div>
            ${langs.length?`<div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#1a1a2e;border-bottom:2px solid #c0392b;padding-bottom:4px;margin-bottom:10px;">Languages</div>
              ${langs.map(l=>`<div style="display:flex;justify-content:space-between;margin-bottom:8px;align-items:center;">
                <span style="font-size:11px;color:#333;">${l.trim()}</span>
                <div style="display:flex;gap:3px;">${[1,2,3,4,5,6,7,8,9,10].map(i=>`<div style="width:8px;height:8px;border-radius:50%;background:${i<=8?'#c0392b':'#eee'};"></div>`).join('')}</div>
              </div>`).join('')}`:''}
            ${d.refs.length?`<div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#1a1a2e;border-bottom:2px solid #c0392b;padding-bottom:4px;margin:16px 0 10px;">References</div>
              ${d.refs.map(r=>`<div style="margin-bottom:10px;"><div style="font-weight:700;color:#1a1a2e;font-size:12px;">${r.name}</div><div style="font-size:10px;color:#666;">${r.designation}</div><div style="font-size:10px;color:#555;margin-top:2px;">📞 ${r.phone}</div></div>`).join('')}`:''}
          </div>
        </div>
        <div style="margin-top:20px;display:flex;justify-content:space-between;font-size:11px;color:#aaa;border-top:1px solid #f0f0f0;padding-top:10px;">
          <span>Date: ${today}</span><span>Signature: ________________</span>
        </div>
      </div>
    </div>`;
    document.getElementById('modalTitle').textContent = '⚡ Dark Two-tone CV';
  }

  document.getElementById('cvPreview').innerHTML = html;
  document.getElementById('previewModal').classList.add('active');
}

// ── Helper Functions ────────────────────────
function row(label,val){if(!val)return '';return `<tr><td style="font-weight:600;width:40%;">${label}</td><td>${val}</td></tr>`;}
function smallRow(label,val){if(!val)return '';return `<tr><td style="font-weight:600;width:45%;font-size:11px;">${label}</td><td style="font-size:12px;">${val}</td></tr>`;}
function t4row(label,val){if(!val)return '';return `<tr><td style="font-weight:700;color:#555;width:45%;padding:3px 6px;font-size:12.5px;">${label}</td><td style="padding:3px 6px;font-size:12.5px;">${val}</td></tr>`;}
function t5row(label,val){if(!val)return '';return `<tr><td style="font-weight:700;color:#666;width:42%;padding:3px 4px;font-size:12px;">${label}</td><td style="padding:3px 4px;font-size:12px;">${val}</td></tr>`;}
function showToast(msg,type){const t=document.getElementById('toast');t.textContent=msg;t.className=`toast ${type} show`;setTimeout(()=>t.classList.remove('show'),3500);}
function closeModal(){document.getElementById('previewModal').classList.remove('active');}
document.getElementById('previewModal').addEventListener('click',function(e){if(e.target===this)closeModal();});

// ── Init ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  selectTemplate('t1');
  addEntry('edu');
  addEntry('ref');
});
