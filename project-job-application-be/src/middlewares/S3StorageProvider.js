// src/middlewares/S3StorageProvider.js
import { Upload } from '@aws-sdk/lib-storage'
import { s3Client } from '~/config/awsS3'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { env } from '~/config/environment'

const streamUploadCv = async (fileBuffer, originalFileName) => {
    const ext = path.extname(originalFileName)
    const key = `cvs/${uuidv4()}${ext}`

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: env.S3_BUCKET,
            Key: key,
            Body: fileBuffer,
            ContentType: getMimeType(ext),
            ACL: 'public-read'
        }
    })

    const result = await upload.done()
    return {
        url: result.Location,
        key: result.Key
    }
}

const getMimeType = (ext) => {
    switch (ext.toLowerCase()) {
        case '.pdf':
            return 'application/pdf'
        case '.doc':
            return 'application/msword'
        case '.docx':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        default:
            return 'application/octet-stream'
    }
}

export const S3Storage = { streamUploadCv }
