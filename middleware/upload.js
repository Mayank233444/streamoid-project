const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'products-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['text/csv', 'application/vnd.ms-excel'];
  const fileExt = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(file.mimetype) || fileExt === '.csv') {
    cb(null, true); 
  } else {
    cb(new Error('Only CSV files are allowed'), false); 
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

module.exports = upload;