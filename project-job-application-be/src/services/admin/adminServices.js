import { candidateProfileModel } from '~/models/candidateProfile/candidateProfileModel'
import {
    COMPANY_COLLECTION_NAME,
    companyModel
} from '~/models/company/companyModel'
import companyCreatedTemplate from '~/template/company/notifyCompanyCreatedTemplate'
import { ResendProvider } from '~/providers/ResendProvider'
import { geocodeAddress, reverseGeocode } from '../company/geocodeAddress'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { CANDIDATEPROFILE_STATUS, INDEX_NAME } from '~/utils/constants'
import { authModel } from '~/models/auth/authModel'
import { notifyNewJobPostTemplate } from '~/template/company/notifyNewJobPostTemplate'
import { elasticClient } from '~/config/elasticsearch'
import { notifyCandidateProfileStatusTemplate } from '~/template/users/notifyCandidateProfileStatusTemplate'
import { CloudStorageProvider } from '~/providers/CloudStorageProvider'
const createNewPost = async (companyData) => {
    try {
        const {
            address,
            email,
            companyName,
            positions,
            category,
            logoUrl,
            lat,
            lng
        } = companyData

        let finalLat = lat
        let finalLng = lng
        let finalAddress = address

        // Nếu có address nhưng chưa có lat/lng → geocode
        if (address && (!lat || !lng)) {
            const geo = await geocodeAddress(address)
            finalLat = geo.lat
            finalLng = geo.lng
        }

        // Nếu có lat/lng nhưng chưa có address → reverse geocode
        if ((!address || address.trim() === '') && lat && lng) {
            finalAddress = await reverseGeocode(lat, lng)
        }

        // Upload logo nếu có
        let logoUploadUrl = null
        if (logoUrl) {
            const uploadResult = await CloudStorageProvider.streamUpload(
                logoUrl.buffer,
                COMPANY_COLLECTION_NAME
            )
            logoUploadUrl = uploadResult.secure_url
        }

        const newCompany = {
            ...companyData,
            email,
            companyName,
            positions,
            category,
            lat: finalLat,
            lng: finalLng,
            address: finalAddress,
            location: {
                type: 'Point',
                coordinates: [finalLng, finalLat]
            },
            ...(logoUploadUrl && { logoUrl: logoUploadUrl })
        }

        const result = await companyModel.createNewPost(newCompany)
        const savedDataToElastic = { _id: result.insertedId, ...newCompany }
        await indexCompanyToElastic(savedDataToElastic)

        // Gửi email xác nhận tạo công ty
        const allUsers = await authModel.findAllUsers()
        const companyCreatedMailTemplate = companyCreatedTemplate({
            email,
            companyName
        })
        ResendProvider.sendMail(
            email,
            'Company Registration Successful',
            companyCreatedMailTemplate
        )

        // Gửi email cho những người có role phù hợp
        const targetUsers = allUsers.filter(
            (user) =>
                Array.isArray(user.role) &&
                (user.role.includes('EMPLOYEE') || user.role.includes('ADMIN'))
        )

        for (const user of targetUsers) {
            const displayName = user.displayName || 'Bạn'
            const emailUser = user.email
            const positionTitles =
                positions.map((pos) => pos.title).join(', ') || 'Chưa xác định'

            const notifyNewJobPostEmailTemplate = notifyNewJobPostTemplate({
                displayName,
                companyName,
                positionTitles,
                address: finalAddress,
                category
            })

            await ResendProvider.sendMail(
                emailUser,
                'New Job Opportunity Just For You!',
                notifyNewJobPostEmailTemplate
            )
        }

        return savedDataToElastic
    } catch (error) {
        throw Error(error)
    }
}
const deletePost = async (companyId) => {
    try {
        const existCompany = await companyModel.companyFindById(companyId)
        if (!existCompany)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Company not found')
        const result = await companyModel.deletePost(companyId)
        await elasticClient.delete({
            index: INDEX_NAME.COMPANY,
            id: companyId
        })
        return result
    } catch (error) {
        throw Error(error)
    }
}
const indexCompanyToElastic = async (data) => {
    try {
        // Tạo text tổng hợp từ positions và skills
        const allPositionTitles =
            data.positions?.map((p) => p.title).join(' ') || ''
        const allSkills =
            data.positions
                ?.flatMap((p) => p.skills?.map((s) => s.name))
                .join(' ') || ''
        const fullText = `${data.companyName} ${data.title} ${data.description} ${allPositionTitles} ${allSkills}`
        const { _id, ...rest } = data
        await elasticClient.index({
            index: INDEX_NAME.COMPANY,
            id: data._id?.toString(),
            document: {
                rest,
                text: fullText
            }
        })
    } catch (error) {
        throw Error('[Elastic Index Error] ' + error.message)
    }
}
const getCandidateProfileDetail = async (candidateProfileId) => {
    try {
        const result =
            await candidateProfileModel.getCandidateProfileDetail(
                candidateProfileId
            )

        return result
    } catch (error) {
        throw Error(error)
    }
}
const getAllCandidateProfileAdmin = async () => {
    try {
        const result = await candidateProfileModel.getAllCandidateProfileAdmin()
        return result
    } catch (error) {
        throw Error(error)
    }
}

const updatePost = async ({ companyId, companyData, logoFile }) => {
    try {
        const existCompany = await companyModel.companyFindById(companyId)
        if (!existCompany)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Company not found')

        let newUpdateData = { ...companyData }

        const { address, lat, lng } = companyData
        let finalLat = lat
        let finalLng = lng
        let finalAddress = address

        // Nếu có address nhưng chưa có lat/lng → geocode
        if (address && (!lat || !lng)) {
            const geo = await geocodeAddress(address)
            finalLat = geo.lat
            finalLng = geo.lng
        }

        // Nếu có lat/lng nhưng chưa có address → reverse geocode
        if ((!address || address.trim() === '') && lat && lng) {
            finalAddress = await reverseGeocode(lat, lng)
        }

        // Gán lại giá trị đã xử lý
        newUpdateData.lat = finalLat
        newUpdateData.lng = finalLng
        newUpdateData.address = finalAddress

        // Nếu có logo mới thì upload
        if (logoFile) {
            const uploadResult = await CloudStorageProvider.streamUpload(
                logoFile.buffer,
                COMPANY_COLLECTION_NAME
            )
            newUpdateData.logoUrl = uploadResult.secure_url
        }

        const result = await companyModel.updatePost({
            companyId,
            newUpdateData
        })

        return result
    } catch (error) {
        throw Error(error)
    }
}

const acceptedCandidateProfile = async (candidateProfileId) => {
    try {
        const existCandidateProfile =
            await candidateProfileModel.findCandidateProfileById(
                candidateProfileId
            )
        const positionCandidateProfile = existCandidateProfile.position
        const existEmail =
            await candidateProfileModel.getCandidateProfileDetail(
                candidateProfileId
            )
        const companyId = existCandidateProfile.companyId
        const existCompany = await companyModel.getCompanyById(companyId)
        const positionCompany = [...existCompany.positions]
        const { user, company } = existEmail[0]
        const email = user.email
        const index = positionCompany.findIndex(
            (find) => find.title === positionCandidateProfile.title
        )
        if (index === -1) throw new Error('Position not found')
        if (!existCandidateProfile)
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                'Candidate profile not found'
            )
        if (existCandidateProfile.status == CANDIDATEPROFILE_STATUS.ACCEPTED)
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                'Candidate profile has already accepted'
            )
        const result =
            await candidateProfileModel.updatedStatusCandidateProfile(
                existCandidateProfile._id,
                CANDIDATEPROFILE_STATUS.ACCEPTED
            )
        const notifyCandidateProfileStatusMailTemplate =
            notifyCandidateProfileStatusTemplate({
                displayName: user.displayName,
                companyName: company.companyName,
                status: CANDIDATEPROFILE_STATUS.ACCEPTED
            })
        ResendProvider.sendMail(
            email,
            'Notify about Candidate Profile',
            notifyCandidateProfileStatusMailTemplate
        )
        positionCompany[index].quantity -= 1
        await companyModel.updatePost({
            companyId,
            newUpdateData: { positions: positionCompany }
        })
        return result
    } catch (error) {
        throw Error(error)
    }
}
const rejectedCandidateProfile = async (candidateProfileId) => {
    try {
        const existCandidateProfile =
            await candidateProfileModel.findCandidateProfileById(
                candidateProfileId
            )
        const existEmail =
            await candidateProfileModel.getCandidateProfileDetail(
                candidateProfileId
            )
        const { user, company } = existEmail[0]

        const email = user.email
        if (!existCandidateProfile)
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                'Candidate profile not found'
            )
        const result =
            await candidateProfileModel.updatedStatusCandidateProfile(
                existCandidateProfile._id,
                CANDIDATEPROFILE_STATUS.REJECTED
            )
        const notifyCandidateProfileStatusMailTemplate =
            notifyCandidateProfileStatusTemplate({
                displayName: user.displayName,
                companyName: company.companyName,
                status: CANDIDATEPROFILE_STATUS.REJECTED
            })
        ResendProvider.sendMail(
            email,
            'Notify about Candidate Profile',
            notifyCandidateProfileStatusMailTemplate
        )
        return result
    } catch (error) {
        throw Error(error)
    }
}
const lockUser = async (userId) => {
    try {
        const existUser = await authModel.findById(userId)
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
        const updatedData = { isActive: false }
        let result = await authModel.update(existUser._id, updatedData)

        return result
    } catch (error) {
        throw Error(error)
    }
}
const activateUser = async (userId) => {
    try {
        const existUser = await authModel.findById(userId)

        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')

        const updatedData = { isActive: true }
        let updatedUser = await authModel.update(existUser._id, updatedData)
        return updatedUser
    } catch (error) {
        throw Error(error)
    }
}
const getAllUsers = async (reqBody) => {
    try {
        const result = await authModel.getAllUsers(reqBody)

        return result
    } catch (error) {
        throw Error(error)
    }
}
const getUserDetails = async (userId) => {
    try {
        const result = await authModel.getUserDetails(userId)

        return result
    } catch (error) {
        throw Error(error)
    }
}
export const adminServices = {
    getCandidateProfileDetail,
    createNewPost,
    deletePost,
    updatePost,
    acceptedCandidateProfile,
    rejectedCandidateProfile,
    lockUser,
    getAllUsers,
    activateUser,
    getUserDetails,
    indexCompanyToElastic,
    getAllCandidateProfileAdmin
}
