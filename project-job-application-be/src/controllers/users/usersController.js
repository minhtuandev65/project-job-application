import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { usersServices } from '~/services/users/usersServices'

const uploadCV = async (req, res, next) => {
    try {
        if (!req.file) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: 'CV is required' })
        }

        const userId = req.payload._id
        const { buffer, originalname } = req.file

        const updatedUser = await usersServices.uploadCV({
            userId,
            fileBuffer: buffer,
            fileName: originalname
        })

        res.status(StatusCodes.CREATED).json({
            message: 'Upload CV thành công',
            data: updatedUser
        })
    } catch (error) {
        next(error)
    }
}
const getMyProfile = async (req, res, next) => {
    try {
        let userId = req.payload._id

        const result = await usersServices.getMyProfile(userId)
        const data = result[0]
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}
const updateProfile = async (req, res, next) => {
    try {
        const userId = req.payload._id
        const userAvatarFile = req.file
        const result = await usersServices.updateProfile({
            userId,
            userAvatarFile,
            body: req.body
        })
        const { password, ...data } = result
        res.status(StatusCodes.OK).json({
            message: 'Update profile successfull',
            data
        })
    } catch (error) {
        next(error)
    }
}
export const downloadCV = async (req, res, next) => {
    try {
        const fileUrl = req.query.url
        if (!fileUrl) {
            return res.status(400).json({ message: 'Missing file URL' })
        }

        const response = await axios.get(fileUrl, { responseType: 'stream' })

        // Lấy tên file từ URL (cuối chuỗi)
        const fileName = decodeURIComponent(fileUrl.split('/').pop())

        // Thiết lập headers tải xuống
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${fileName}"`
        )
        res.setHeader('Content-Type', response.headers['content-type'])

        // Truyền stream từ Cloudinary về client
        response.data.pipe(res)
    } catch (error) {
        next(error)
    }
}

export const usersController = {
    uploadCV,
    getMyProfile,
    updateProfile,
    downloadCV
}
