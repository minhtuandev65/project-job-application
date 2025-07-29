import { candidateProfileModel } from '~/models/candidateProfile/candidateProfileModel'
import { authModel } from '~/models/auth/authModel'
import { companyModel } from '~/models/company/companyModel'
import { ResendProvider } from '~/providers/ResendProvider'
import notifyCompanyCandidateProfileIdTemplate from '~/template/company/notifyCompanyCandidateProfileIdTemplate'
import candidateProfileIdSuccessTemplate from '~/template/users/candidateProfileIdSuccessTemplate'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNewCandidateProfile = async ({ userId, companyId, position }) => {
    try {
        const company = await companyModel.getCompanyById(companyId)
        const user = await authModel.findById(userId)

        if (!company) {
            throw new Error('Company not found')
        }

        const result = await candidateProfileModel.createNewCandidateProfile({
            userId,
            companyId,
            position
        })
        const candidateProfileSuccessMailTemplate =
            candidateProfileIdSuccessTemplate({
                displayName: user.displayName,
                companyName: company.companyName
            })
        await ResendProvider.sendMail(
            user.email,
            'candidate ProfileId success mail',
            candidateProfileSuccessMailTemplate
        )
        const notifyCompanyCandidateProfileEmailTemplate =
            notifyCompanyCandidateProfileIdTemplate({
                companyName: company.companyName,
                displayName: user.displayName,
                positionTitle: position.title
            })
        await ResendProvider.sendMail(
            user.email,
            'candidate ProfileId success mail',
            notifyCompanyCandidateProfileEmailTemplate
        )
        await ResendProvider.sendMail(
            company.email,
            'New candidate ProfileId Received',
            notifyCompanyCandidateProfileEmailTemplate
        )

        return result
    } catch (error) {
        throw new Error(error)
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
        throw new Error(error)
    }
}
const getAllCandidateProfile = async ({ userId, status }) => {
    try {
        const result = await candidateProfileModel.getAllCandidateProfile({
            userId,
            status
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}
export const candidateProfileServices = {
    createNewCandidateProfile,
    getCandidateProfileDetail,
    getAllCandidateProfile
}
