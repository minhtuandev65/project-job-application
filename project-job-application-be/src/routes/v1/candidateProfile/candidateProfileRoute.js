// route cho việc quản lý người dùng

import express from 'express'
import { candidateProfileController } from '~/controllers/candidateProfile/candidateProfileController'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

// Router xác thực dăng nhập của người dùng
Router.route('/craeteNew').post(
    isAuthorized,
    hasRole(ROLE.EMPLOYEE),
    candidateProfileController.createNewCandidateProfile
)
Router.route('/:candidateProfileId/historyCandidateProfile').get(
    isAuthorized,
    hasRole(ROLE.EMPLOYEE),
    candidateProfileController.getCandidateProfileDetail
)
Router.route('/').get(
    isAuthorized,
    candidateProfileController.getAllCandidateProfile
)
export const candidateProfileRoute = Router
