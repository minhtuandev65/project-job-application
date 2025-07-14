// route cho việc quản lý người dùng

import express from 'express'
import { linkedinController } from '~/controllers/auth/linkedinController'

const Router = express.Router()

Router.route('/linkedin/callback').get(linkedinController.handleCallback)

export const linkedinRoute = Router
