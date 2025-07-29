// src/middlewares/uploadSingleCV.js
import multer from 'multer'

// Chỉ cho phép pdf, doc, docx
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    if (allowedTypes.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Only .pdf, .doc, .docx files are allowed'), false)
}

export const uploadSingleCV = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // max 5MB
}).single('cv')
