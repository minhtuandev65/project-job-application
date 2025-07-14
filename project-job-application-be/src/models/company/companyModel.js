import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import Joi from 'joi'
import {
    ARRAY_MIN_MESSAGE,
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    FIELD_REQUIRED_MESSAGE,
    NUMBER_BASE_MESSAGE,
    NUMBER_MIN_MESSAGE,
    PHONE_RULE,
    PHONE_RULE_MESSAGE,
    STRING_BASE_MESSAGE
} from '~/validations/validators'
import { CATEGORY, WORKINGTYPE } from '~/utils/constants'
import { env } from '~/config/environment'

export const COMPANY_COLLECTION_NAME = 'companies'
const COMPANY_COLLECTION_SCHEMA = Joi.object({
    companyName: Joi.string().required().trim().strict(),
    title: Joi.string().required().trim().strict(),
    address: Joi.string().required().trim().strict(),
    logoUrl: Joi.string().default(env.DEFAULT_LOGO),
    location: Joi.object({
        type: Joi.string().valid('Point').required(),
        coordinates: Joi.array()
            .ordered(
                Joi.number().required(), // lng
                Joi.number().required() // lat
            )
            .required()
    }).required(),

    phone: Joi.string()
        .optional()
        .pattern(PHONE_RULE)
        .message(PHONE_RULE_MESSAGE),
    email: Joi.string()
        .required()
        .pattern(EMAIL_RULE)
        .message(EMAIL_RULE_MESSAGE),
    category: Joi.string()
        .valid(
            CATEGORY.RESTAURANT,
            CATEGORY.HOTEL,
            CATEGORY.STORE,
            CATEGORY.TECHNOLOGY,
            CATEGORY.OTHER
        )
        .required(),
    positions: Joi.array()
        .items(
            Joi.object({
                title: Joi.string().required().trim().strict(),
                quantity: Joi.number().required().min(1),
                description: Joi.string().optional().allow('').trim(),
                basicSalary: Joi.number()
                    .required()
                    .min(0)
                    .messages({
                        'number.base': NUMBER_BASE_MESSAGE,
                        'number.min': NUMBER_MIN_MESSAGE(0),
                        'any.required': FIELD_REQUIRED_MESSAGE
                    }),
                workingType: Joi.string()
                    .valid(WORKINGTYPE.PARTTIME, WORKINGTYPE.FULLTIME)
                    .required()
                    .label('Hình thức làm việc'),
                workingHours: Joi.string()
                    .optional()
                    .allow('')
                    .trim()
                    .label('Giờ làm việc'),
                skills: Joi.array()
                    .items(
                        Joi.object({
                            name: Joi.string().required().trim().strict(),
                            level: Joi.string()
                                .required()
                                .trim()
                                .strict()
                                .messages({
                                    'any.required': FIELD_REQUIRED_MESSAGE,
                                    'string.base': STRING_BASE_MESSAGE
                                })
                        })
                    )
                    .min(1)
                    .required()
                    .messages({
                        'array.min': ARRAY_MIN_MESSAGE(1),
                        'any.required': FIELD_REQUIRED_MESSAGE
                    })
            })
        )
        .required(),

    description: Joi.string().optional().allow('').trim(),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})
const INVALID_UPDATE_FIELDS = ['_id', 'email', 'createdAt']
const validateBeforeCreate = async (data) => {
    return await COMPANY_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
const createNewPost = async (newCompany) => {
    try {
        const validData = await validateBeforeCreate(newCompany)
        const exist = await GET_DB()
            .collection(COMPANY_COLLECTION_NAME)
            .insertOne(validData)

        return exist
    } catch (error) {
        throw new Error(error)
    }
}
const companyFindById = async (companyId) => {
    try {
        const exist = await GET_DB()
            .collection(COMPANY_COLLECTION_NAME)
            .findOne({
                _id: new ObjectId(companyId)
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
const getAllCompanies = async () => {
    try {
        const exist = await GET_DB()
            .collection(COMPANY_COLLECTION_NAME)
            .find({ _destroy: false })
            .toArray()
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
const getCompanyById = async (companyId) => {
    try {
        const exist = await GET_DB()
            .collection(COMPANY_COLLECTION_NAME)
            .findOne({
                _id: new ObjectId(companyId),
                _destroy: false
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
const filterCompanies = async ({
    category,
    minSalary,
    workingType,
    address,
    lat,
    lng,
    radius
}) => {
    const query = {}

    if (category && category.toLowerCase() !== 'other') {
        query.category = category.toUpperCase()
    }

    // Lọc theo địa chỉ
    if (address) query.address = { $regex: address, $options: 'i' }

    // Lọc theo positions
    const positionFilter = {}

    if (minSalary) {
        positionFilter.basicSalary = { $lte: Number(minSalary) } // Đã đổi từ $gte thành $lte
    }

    if (workingType) {
        positionFilter.workingType = workingType.toUpperCase()
    }

    if (Object.keys(positionFilter).length > 0) {
        query.positions = { $elemMatch: positionFilter }
    }

    // Lọc theo vị trí địa lý (radius)
    if (lat && lng && radius) {
        const earthRadiusInKm = 6378.1
        const radiusInRadians = Number(radius) / earthRadiusInKm

        query.location = {
            $geoWithin: {
                $centerSphere: [[Number(lng), Number(lat)], radiusInRadians]
            }
        }
    }

    const result = await GET_DB()
        .collection(COMPANY_COLLECTION_NAME)
        .find(query)
        .toArray()

    return result
}

const deletePost = async (companyId) => {
    try {
        const exist = await GET_DB()
            .collection(COMPANY_COLLECTION_NAME)
            .findOneAndUpdate(
                {
                    _id: new ObjectId(companyId),
                    _destroy: false
                },
                { $set: { _destroy: true, updatedAt: Date.now() } },
                { returnDocument: 'after' }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
const updatePost = async ({ companyId, newUpdateData }) => {
    try {
        Object.keys(newUpdateData).forEach((fieldName) => {
            if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
                delete newUpdateData[fieldName]
            }
        })
        const exist = await GET_DB()
            .collection(COMPANY_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(companyId), _destroy: false },
                { $set: { ...newUpdateData, updatedAt: new Date() } },
                { returnDocument: 'after' }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
export const companyModel = {
    createNewPost,
    getAllCompanies,
    getCompanyById,
    filterCompanies,
    deletePost,
    updatePost,
    companyFindById
}
