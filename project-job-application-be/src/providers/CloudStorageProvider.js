import { v2 as cloudinary } from 'cloudinary'
import { env } from '~/config/environment'
import streamifier from 'streamifier'
import { v4 as uuidv4 } from 'uuid'
cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
})

const streamUpload = (fileBuffer, folderName) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folderName,
                resource_type: 'auto',
                upload_preset: 'ml_default'
            },
            (err, result) => {
                if (err) reject(err)
                else resolve(result)
            }
        )

        streamifier.createReadStream(fileBuffer).pipe(stream)
    })
}

const streamUploadCv = (fileBuffer, folderName, originalFileName) => {
    return new Promise((resolve, reject) => {
        const extension = originalFileName.split('.').pop() // lấy đuôi: pdf, doc...
        const uniqueFileName = `${uuidv4()}.${extension}` // ví dụ: 3f32-1f2e...pdf
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folderName,
                resource_type: 'raw',
                upload_preset: 'ml_default', // dùng preset đã cấu hình
                use_filename: true,
                unique_filename: false,
                public_id: uniqueFileName // giữ đúng tên có đuôi .pdf
            },
            (err, result) => {
                if (err) reject(err)
                else resolve(result)
            }
        )

        streamifier.createReadStream(fileBuffer).pipe(stream)
    })
}
export const CloudStorageProvider = {
    streamUpload,
    streamUploadCv
}
