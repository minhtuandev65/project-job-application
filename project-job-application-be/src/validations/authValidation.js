import { USER_OAUTH_SCHEMA } from '~/models/auth/authModel'

export const validateBeforeOAuthCreate = async (data) => {
    return await USER_OAUTH_SCHEMA.validateAsync(data, { abortEarly: false })
}
