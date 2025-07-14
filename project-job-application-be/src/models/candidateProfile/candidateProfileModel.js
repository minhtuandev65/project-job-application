import { StatusCodes } from 'http-status-codes'
import { ObjectId, ReturnDocument } from 'mongodb'
import ApiError from '~/utils/ApiError'

const Joi = require('joi')
const { GET_DB } = require('~/config/mongodb')
const { CANDIDATEPROFILE_STATUS } = require('~/utils/constants')
const {
    OBJECT_ID_RULE,
    NUMBER_BASE_MESSAGE,
    NUMBER_MIN_MESSAGE,
    FIELD_REQUIRED_MESSAGE
} = require('~/validations/validators')

const CANDIDATEPROFILE_COLLECTION_NAME = 'candidateprofile'
const CANDIDATEPROFILE_COLLECTION_SCHEMA = Joi.object({
    userId: Joi.string().pattern(OBJECT_ID_RULE).required().label('ID user'),
    companyId: Joi.string()
        .pattern(OBJECT_ID_RULE)
        .required()
        .label('ID company'),
    position: Joi.object({
        title: Joi.string().required().trim().strict().label('title'),
        skill: Joi.array()
            .items(
                Joi.object({
                    name: Joi.string()
                        .required()
                        .trim()
                        .strict()
                        .label('Skill name'),
                    level: Joi.string()
                        .required()
                        .trim()
                        .strict()
                        .label('Level')
                })
            )
            .min(1)
            .required()
            .label('Danh sách kỹ năng'),

        basicSalary: Joi.number()
            .required()
            .min(0)
            .messages({
                'number.base': NUMBER_BASE_MESSAGE,
                'number.min': NUMBER_MIN_MESSAGE(0),
                'any.required': FIELD_REQUIRED_MESSAGE
            })
            .label('basic salary')
    })
        .required()
        .label('position'),
    status: Joi.string()
        .valid(
            CANDIDATEPROFILE_STATUS.PENDING,
            CANDIDATEPROFILE_STATUS.ACCEPTED,
            CANDIDATEPROFILE_STATUS.REJECTED
        )
        .default(CANDIDATEPROFILE_STATUS.PENDING)
        .label('status'),
    createdAt: Joi.date()
        .timestamp('javascript')
        .default(Date.now)
        .label('createAt'),
    updatedAt: Joi.date()
        .timestamp('javascript')
        .default(null)
        .label('updatedAt')
})
const validateBeforeCreate = async (data) => {
    return await CANDIDATEPROFILE_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}

const createNewCandidateProfile = async ({ userId, companyId, position }) => {
    try {
        const rawCandidateProfile = {
            position,
            status: CANDIDATEPROFILE_STATUS.PENDING
        }
        const candidateProfileToInsert = {
            ...rawCandidateProfile,
            userId: new ObjectId(userId),
            companyId: new ObjectId(companyId)
        }

        const result = await GET_DB()
            .collection(CANDIDATEPROFILE_COLLECTION_NAME)
            .insertOne(candidateProfileToInsert)

        return {
            _id: result.insertedId,
            ...candidateProfileToInsert
        }
    } catch (error) {
        throw new Error(error)
    }
}
const findCandidateProfileById = async (candidateProfileId) => {
    try {
        const exist = await GET_DB()
            .collection(CANDIDATEPROFILE_COLLECTION_NAME)
            .findOne({ _id: new ObjectId(candidateProfileId) })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
const findByUserId = async (userId) => {
    try {
        const pipeline = [
            {
                $match: { userId: new ObjectId(userId) }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'company'
                }
            },
            { $unwind: '$company' },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    createdAt: 1,
                    position: 1,
                    'user.email': 1,
                    'user.displayName': 1,
                    'user.role': 1,
                    'company.companyName': 1,
                    'company.address': 1,
                    'company.phone': 1,
                    'company.title': 1,
                    'company.email': 1,
                    'company.category': 1,
                    'company.positions': 1,
                    'company.description': 1
                }
            }
        ]
        const exist = await GET_DB()
            .collection(CANDIDATEPROFILE_COLLECTION_NAME)
            .aggregate(pipeline)
            .toArray()

        return exist
    } catch (error) {
        throw new Error(error)
    }
}
const getCandidateProfileDetail = async (candidateProfileId) => {
    try {
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(candidateProfileId)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'company'
                }
            },
            { $unwind: '$company' },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    createdAt: 1,
                    position: 1,
                    'user.email': 1,
                    'user.displayName': 1,
                    'user.role': 1,
                    'user.skillSets': 1,
                    'user.avatar': 1,
                    'user.cvUrl': 1,
                    'company.companyName': 1,
                    'company.address': 1,
                    'company.phone': 1,
                    'company.logoUrl': 1,
                    'company.title': 1,
                    'company.email': 1,
                    'company.category': 1,
                    'company.positions': 1,
                    'company.description': 1
                }
            }
        ]
        const exist = await GET_DB()
            .collection(CANDIDATEPROFILE_COLLECTION_NAME)
            .aggregate(pipeline)
            .toArray()
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
const getAllCandidateProfile = async ({ userId, status }) => {
    try {
        const matchQuery = {
            userId: new ObjectId(userId)
        }

        if (status) {
            matchQuery.status = status
        }

        const pipeline = [
            {
                $match: matchQuery
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'company'
                }
            },
            { $unwind: '$company' },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    createdAt: 1,
                    'user.email': 1,
                    'company.logoUrl': 1,
                    'company.companyName': 1,
                    'company.address': 1,
                    'company.phone': 1,
                    'company.email': 1,
                    'company.category': 1
                }
            }
        ]
        const exist = await GET_DB()
            .collection(CANDIDATEPROFILE_COLLECTION_NAME)
            .aggregate(pipeline)
            .toArray()
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
const getAllCandidateProfileAdmin = async () => {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'company'
                }
            },
            { $unwind: '$company' },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    createdAt: 1,
                    position: 1,
                    'user.email': 1,
                    'company.companyName': 1,
                    'company.address': 1,
                    'company.phone': 1,
                    'company.email': 1,
                    'company.category': 1
                }
            }
        ]
        const exist = await GET_DB()
            .collection(CANDIDATEPROFILE_COLLECTION_NAME)
            .aggregate(pipeline)
            .toArray()
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
const updatedStatusCandidateProfile = async (id, updatedStatus) => {
    try {
        const result = await GET_DB()
            .collection(CANDIDATEPROFILE_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { status: updatedStatus, updatedAt: Date.now() } },
                { returnDocument: 'after' }
            )

        return result
    } catch (error) {
        throw Error(error)
    }
}
export const candidateProfileModel = {
    createNewCandidateProfile,
    findByUserId,
    getCandidateProfileDetail,
    getAllCandidateProfile,
    updatedStatusCandidateProfile,
    findCandidateProfileById,
    getAllCandidateProfileAdmin
}
