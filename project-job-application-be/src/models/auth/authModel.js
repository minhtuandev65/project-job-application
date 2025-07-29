import { GET_DB } from '~/config/mongodb'
import Joi from 'joi'
import {
    CV_MESSAGE,
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE
} from '~/validations/validators'
import { ObjectId } from 'mongodb'
import { ROLE, GENDER } from '~/utils/constants'
import { env } from '~/config/environment'

export const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
    email: Joi.string()
        .required()
        .pattern(EMAIL_RULE)
        .message(EMAIL_RULE_MESSAGE), // unique
    password: Joi.string().required(),
    // username cắt ra từ email sẽ có khả năng không unique bởi vì sẽ có những tên email trùng nhau nhưng từ các nhà cung cấp khác nhau
    username: Joi.string().required().trim().strict(),
    displayName: Joi.string().required().trim().strict(),
    avatar: Joi.string().default(env.DEFAULT_AVATAR),
    role: Joi.array()
        .items(Joi.string().valid(...Object.values(ROLE)))
        .default([ROLE.EMPLOYEE]),
    skillSets: Joi.array().items(Joi.string().trim()).default([]),
    cvUrl: Joi.string().uri().optional().allow('').messages({
        'string.uri': CV_MESSAGE
    }),
    gender: Joi.string()
        .valid(...Object.values(GENDER))
        .default([GENDER.MALE]),
    isActive: Joi.boolean().default(false),
    verifyToken: Joi.string(),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    latestActiveAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'email', 'username', 'createdAt']

const validateBeforeCreate = async (data) => {
    return await USER_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}

const createNewAccount = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const exist = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .insertOne(validData)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}

const findByEmail = async (emailValue) => {
    try {
        const exist = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .findOne({ email: emailValue })

        return exist
    } catch (error) {
        throw new Error(error)
    }
}
const findById = async (id) => {
    try {
        const exist = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } })

        return exist
    } catch (error) {
        throw new Error(error)
    }
}
const findAllUsers = async () => {
    try {
        const exist = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .find({}, { projection: { password: 0 } }) // loại bỏ password nếu cần
            .toArray()

        return exist
    } catch (error) {
        throw new Error(error)
    }
}

const pushNewRole = async (userId, role) => {
    try {
        const exist = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .updateOne(
                {
                    _id: new ObjectId(userId)
                },
                {
                    $addToSet: {
                        role: role
                    }
                }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
const getMyProfile = async (id) => {
    try {
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id)
                }
            },
            {
                $project: {
                    password: 0
                }
            }
        ]
        const exist = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .aggregate(pipeline)
            .toArray()

        return exist
    } catch (error) {
        throw new Error(error)
    }
}

const getAllUsers = async (req) => {
    try {
        const {
            role,
            email,
            status,
            sortBy,
            sortOrder,
            page,
            limit = 30,
            search
        } = req

        const query = {}
        if (search) {
            query.$or = [
                { username: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        }
        if (role) query.role = role
        if (email) query.email = { $regex: `^${email}$`, $options: 'i' } // Exact email match
        if (status) query.status = status

        // Build sort object
        const sort = {}
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1

        // Calculate skip
        const skip = (page - 1) * limit

        // Get total count
        const total = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .countDocuments(query)

        // Execute query
        const users = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .find(query)
            .project({
                _id: 1,
                email: 1,
                displayName: 1,
                role: 1,
                gender: 1,
                createdAt: 1,
                avatar: 1,
                isActive: 1
            })
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit))
            .toArray()

        return {
            users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getUserDetails = async (userId) => {
    try {
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(userId) // ID của user
                }
            },
            {
                $project: {
                    _id: 1,
                    email: 1,
                    displayName: 1,
                    role: 1,
                    gender: 1,
                    skillSets: 1,
                    cvUrl: 1,
                    createdAt: 1,
                    avatar: 1,
                    isActive: 1
                }
            }
        ]
        const user = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .aggregate(pipeline)
            .toArray()

        return user
    } catch (error) {
        throw new Error(error)
    }
}
const update = async (userId, updatedData) => {
    try {
        Object.keys(updatedData).forEach((fieldName) => {
            if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
                delete updatedData[fieldName]
            }
        })
        const exist = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .findOneAndUpdate(
                {
                    _id: new ObjectId(userId)
                },
                { $set: { ...updatedData, updatedAt: new Date() } },
                { returnDocument: 'after' }
            )

        return exist
    } catch (error) {
        throw new Error(error)
    }
}

const updateLatestActive = async (userId) => {
    try {
        const exist = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(userId) },
                {
                    $set: {
                        latestActiveAt: new Date()
                    }
                }
            )

        return exist
    } catch (error) {
        throw new Error(error)
    }
}

export const authModel = {
    findByEmail,
    createNewAccount,
    update,
    findById,
    pushNewRole,
    updateLatestActive,
    getMyProfile,
    getAllUsers,
    getUserDetails,
    findAllUsers
}
