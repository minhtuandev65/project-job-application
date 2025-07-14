import { S3Storage } from '~/middlewares/S3StorageProvider'

const { StatusCodes } = require('http-status-codes')
const { authModel, USER_COLLECTION_NAME } = require('~/models/auth/authModel')
const { CloudStorageProvider } = require('~/providers/CloudStorageProvider')
const { default: ApiError } = require('~/utils/ApiError')

const uploadCV = async ({ userId, fileBuffer, fileName }) => {
    const user = await authModel.findById(userId)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')

    const { url } = await S3Storage.streamUploadCv(fileBuffer, fileName)

    const updatedUser = await authModel.update(userId, { cvUrl: url })

    return updatedUser
}
const getMyProfile = async (userId) => {
    try {
        const result = await authModel.getMyProfile(userId)

        return result
    } catch (error) {
        throw Error(error)
    }
}
const updateProfile = async (reqBody) => {
    try {
        const existUser = await authModel.findById(reqBody.userId)

        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')

        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'Please active your account first!'
            )

        let result = {}

        if (reqBody.userAvatarFile) {
            const uploadResult = await CloudStorageProvider.streamUpload(
                reqBody.userAvatarFile.buffer,
                USER_COLLECTION_NAME
            )
            const updatedData = {
                ...reqBody.body,
                avatar: uploadResult.secure_url
            }
            result = await authModel.update(existUser._id, updatedData)
        } else {
            const updatedData = reqBody.body
            result = await authModel.update(existUser._id, updatedData)
        }
        return result
    } catch (error) {
        throw Error(error)
    }
}
export const usersServices = {
    uploadCV,
    getMyProfile,
    updateProfile
}
