// route cho việc quản lý người dùng

import express from 'express'
import { companyController } from '~/controllers/company/companyController'

const Router = express.Router()

// Router lấy tất cả danh sách công ty
Router.route('/getAllCompany').get(companyController.getAllCompanies)
Router.route('/filter').get(companyController.filterCompanies)
Router.route('/search').get(companyController.searchCompaniesInElastic)
// Router lấy công ty theo id công ty
Router.route('/:companyId').get(companyController.getCompanyById)

export const companyRoute = Router