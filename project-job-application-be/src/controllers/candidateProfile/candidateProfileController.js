import { StatusCodes } from 'http-status-codes'
import { candidateProfileServices } from '~/services/candidateProfile/candidateProfileServices'

const createNewCandidateProfile = async (req, res, next) => {
    try {
        const userId = req.payload._id
        const { companyId, position } = req.body
        const result = await candidateProfileServices.createNewCandidateProfile(
            {
                userId,
                companyId,
                position
            }
        )
        const { userId: _, ...data } = result
        res.status(StatusCodes.CREATED).json({
            message: 'Create candidate profile successfull',
            data
        })
    } catch (error) {
        next(error)
    }
}
const getCandidateProfileDetail = async (req, res, next) => {
    try {
        const candidateProfileId = req.params.candidateProfileId
        const result =
            await candidateProfileServices.getCandidateProfileDetail(
                candidateProfileId
            )
        const { userId: _, ...data } = result[0]
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}
const getAllCandidateProfile = async (req, res, next) => {
    try {
        const status = req.query.status?.toUpperCase()
        const userId = req.payload._id
        const data = await candidateProfileServices.getAllCandidateProfile({
            userId,
            status
        })
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}

export const candidateProfileController = {
    createNewCandidateProfile,
    getCandidateProfileDetail,
    getAllCandidateProfile
}
