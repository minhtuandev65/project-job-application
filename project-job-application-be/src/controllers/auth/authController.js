/**
 user controller
 */

import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { authService } from '~/services/auth/authServices'
import ApiError from '~/utils/ApiError'
import { env } from '~/config/environment'

const createNewAccount = async (req, res, next) => {
    try {
        const createNew = await authService.createNewAccount(req.body)

        res.status(StatusCodes.CREATED).json(createNew)
    } catch (error) {
        next(error)
    }
}

const authenticate = async (req, res, next) => {
    try {
        const authenticated = await authService.authenticate(req.body)
        const isProduction = env.BUILD_MODE === 'production'
        res.cookie('accessToken', authenticated.accessToken, {
            httpOnly: true,
            secure: isProduction, // bỏ secure khi dev local http
            sameSite: isProduction ? 'None' : 'lax', // dev local không cần none
            maxAge: ms('14 days')
        })
        res.cookie('refreshToken', authenticated.refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'lax',
            maxAge: ms('14 days')
        })

        const { _id, email, ...data } = authenticated
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}
const logout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')

        res.status(StatusCodes.OK).json({ loggedOut: true })
    } catch (error) {
        next(error)
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const result = await authService.refreshToken(req.cookies?.refreshToken)
        // Tra ve cookie accessToken moi sau khi da refresh thanh cong
        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: true,
            sampleSite: 'none',
            maxAge: ms('14 days')
        })
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(
            new ApiError(
                StatusCodes.FORBIDDEN,
                'Please Sign In!, (Error from refresh token)'
            )
        )
    }
}

const verifyAccount = async (req, res, next) => {
    try {
        const result = await authService.verifyAccount(req.body)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        if (!req.body.email) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'email is required')
        }
        const result = await authService.forgotPassword({
            email: req.body.email
        })

        res.status(StatusCodes.OK).json({
            message: 'Check your mail box to reset your password',
            result
        })
    } catch (error) {
        next(error)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        if (!req.query.token) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'token is required')
        }

        if (!req.body.password || req.body.password?.length < 7) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                'Password is required, must be at least 7 characters'
            )
        }

        const result = await authService.resetPassword({
            newPassword: req.body.password,
            token: req.query.token
        })

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const authController = {
    createNewAccount,
    authenticate,
    logout,
    refreshToken,
    verifyAccount,
    forgotPassword,
    resetPassword
}
