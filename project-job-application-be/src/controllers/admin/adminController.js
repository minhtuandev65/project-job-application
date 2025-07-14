import { StatusCodes } from 'http-status-codes'
import { adminServices } from '~/services/admin/adminServices'

const getCandidateProfileDetail = async (req, res, next) => {
    try {
        const candidateProfileId = req.params.candidateProfileId
        const result =
            await adminServices.getCandidateProfileDetail(candidateProfileId)
        const data = result[0]
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}
const getAllCandidateProfileAdmin = async (req, res, next) => {
    try {
        const data = await adminServices.getAllCandidateProfileAdmin()
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}
const createNewPost = async (req, res, next) => {
    try {
        const logoFile = req.file
        const reqBody = req.body
        if (typeof reqBody.positions === 'string') {
            try {
                reqBody.positions = JSON.parse(reqBody.positions)
            } catch {
                return res
                    .status(400)
                    .json({ message: 'Invalid JSON in positions' })
            }
        }
        const companyData = {
            ...reqBody,
            logoUrl: logoFile || null
        }

        const data = await adminServices.createNewPost(companyData)

        res.status(StatusCodes.CREATED).json({
            message: 'Created successfully',
            data
        })
    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const companyId = req.params.companyId
        const result = await adminServices.deletePost(companyId)
        const { _id, _destroy } = result
        res.status(StatusCodes.OK).json({
            message: 'Deleted successfull',
            data: {
                _id,
                _destroy
            }
        })
    } catch (error) {
        next(error)
    }
}
const updatePost = async (req, res, next) => {
    try {
        const companyId = req.params.companyId
        const companyData = req.body
        const logoFile = req.file
        if (typeof companyData.positions === 'string') {
            try {
                companyData.positions = JSON.parse(companyData.positions)
            } catch {
                return res
                    .status(400)
                    .json({ message: 'Invalid JSON in positions' })
            }
        }
        const data = await adminServices.updatePost({
            companyId,
            companyData,
            logoFile
        })

        res.status(StatusCodes.OK).json({
            message: 'Updated successfully',
            data
        })
    } catch (error) {
        next(error)
    }
}

const acceptedCandidateProfile = async (req, res, next) => {
    try {
        const candidateProfileId = req.params.candidateProfileId
        const result =
            await adminServices.acceptedCandidateProfile(candidateProfileId)
        const { status, _id } = result
        res.status(StatusCodes.OK).json({
            message: 'Accepted candidate profile successfull',
            data: { status, _id }
        })
    } catch (error) {
        next(error)
    }
}
const rejectedCandidateProfile = async (req, res, next) => {
    try {
        const candidateProfileId = req.params.candidateProfileId
        const result =
            await adminServices.rejectedCandidateProfile(candidateProfileId)
        const { status, _id } = result
        res.status(StatusCodes.OK).json({
            message: 'Rejected candidate profile successfull',
            data: { status, _id }
        })
    } catch (error) {
        next(error)
    }
}
const lockUser = async (req, res, next) => {
    try {
        let userId = req.params.userId

        const result = await adminServices.lockUser(userId)
        const { isActive, _id } = result
        res.status(StatusCodes.OK).json({
            message: 'Lock user successfull',
            data: { isActive, _id }
        })
    } catch (error) {
        next(error)
    }
}
const activateUser = async (req, res, next) => {
    try {
        let userId = req.params.userId

        const result = await adminServices.activateUser(userId)
        const { isActive, _id } = result
        res.status(StatusCodes.OK).json({
            message: 'Active user successfull',
            data: { isActive, _id }
        })
    } catch (error) {
        next(error)
    }
}
const getUserDetails = async (req, res, next) => {
    try {
        let userId = req.params.userId

        const result = await adminServices.getUserDetails(userId)
        const { verifyToken, password, ...data } = result[0]
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}
const getAllUsers = async (req, res, next) => {
    try {
        const { role, email, status, sortBy, sortOrder, page, limit, search } =
            req.query
        const data = await adminServices.getAllUsers({
            role,
            email,
            status,
            sortBy,
            sortOrder,
            page,
            limit,
            search
        })
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}
export const adminController = {
    getCandidateProfileDetail,
    getAllCandidateProfileAdmin,
    createNewPost,
    deletePost,
    updatePost,
    acceptedCandidateProfile,
    rejectedCandidateProfile,
    lockUser,
    getAllUsers,
    activateUser,
    getUserDetails
}
