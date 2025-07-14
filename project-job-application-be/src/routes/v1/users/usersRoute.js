// route cho việc quản lý người dùng

import express from 'express'
import { usersController } from '~/controllers/users/usersController'
import isAuthorized from '~/middlewares/authMiddleware'
import { uploadSingleCV } from '~/middlewares/multerCvUploadMiddleware'
import { multerUploadMiddleware } from '~/middlewares/multerUploadMiddleware'

const Router = express.Router()

Router.route('/upload-cv').post(
    isAuthorized,
    uploadSingleCV,
    usersController.uploadCV
)

Router.route('/update').put(
    isAuthorized,
    multerUploadMiddleware.upload.single('avatar'),
    usersController.updateProfile
)
Router.route('/me').get(isAuthorized, usersController.getMyProfile)
Router.route('/download-cv').get(isAuthorized, usersController.downloadCV)
export const usersRoute = Router
