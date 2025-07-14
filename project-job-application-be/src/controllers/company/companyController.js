import { StatusCodes } from 'http-status-codes'
import { companyService } from '~/services/company/companyServices'

const getAllCompanies = async (req, res, next) => {
    try {
        const data = await companyService.getAllCompanies()
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}
const getCompanyById = async (req, res, next) => {
    try {
        const companyId = req.params.companyId

        const data = await companyService.getCompanyById(companyId)
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}
const filterCompanies = async (req, res, next) => {
    try {
        const queryData = {
            ...req.query,
            category: req.query.category?.toUpperCase(),
            workingType: req.query.workingType?.toUpperCase()
        }

        const data = await companyService.filterCompanies(queryData)
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}
const searchCompaniesInElastic = async (req, res, next) => {
    try {
        const { keyword } = req.query
        if (!keyword) {
            return res.status(400).json({ message: 'Missing keyword in query' })
        }

        const data = await companyService.searchCompaniesInElastic(keyword)
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}

export const companyController = {
    getAllCompanies,
    getCompanyById,
    filterCompanies,
    searchCompaniesInElastic
}
