// route cho việc quản lý người dùng

import express from 'express'
import { adminController } from '~/controllers/admin/adminController'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { multerUploadMiddleware } from '~/middlewares/multerUploadMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()
// Router tạo mới công ty
Router.route('/company/createNewPost').post(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    multerUploadMiddleware.upload.single('logo'),
    adminController.createNewPost
)
Router.route('/company/:companyId/delete').delete(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminController.deletePost
)
Router.route('/company/:companyId/update').put(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    multerUploadMiddleware.upload.single('logo'),
    adminController.updatePost
)
Router.route('/candidateProfile/:candidateProfileId/accepted').put(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminController.acceptedCandidateProfile
)
Router.route('/candidateProfile/:candidateProfileId/rejected').put(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminController.rejectedCandidateProfile
)
Router.route('/users/:userId/lock').put(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminController.lockUser
)
Router.route('/users/:userId/activate').put(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminController.activateUser
)
Router.route('/users').get(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminController.getAllUsers
)
Router.route('/users/:userId/details').get(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminController.getUserDetails
)
Router.route('/candidateProfile').get(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminController.getAllCandidateProfileAdmin
)
Router.route('/candidateProfile/:candidateProfileId/details').get(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminController.getCandidateProfileDetail
)

export const adminRoute = Router
