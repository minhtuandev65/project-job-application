import { companyModel } from '~/models/company/companyModel'
import { geocodeAddress } from './geocodeAddress'

import { elasticClient } from '~/config/elasticsearch'
import { INDEX_NAME } from '~/utils/constants'

const getAllCompanies = async () => {
    try {
        const company = await companyModel.getAllCompanies()
        return company
    } catch (error) {
        throw Error(error)
    }
}

const getCompanyById = async (companyId) => {
    try {
        const company = await companyModel.getCompanyById(companyId)

        return company
    } catch (error) {
        throw Error(error)
    }
}
const filterCompanies = async (queryData) => {
    try {
        const { category, minSalary, workingType, address, radius } = queryData
        let lat, lng

        if (address) {
            // Chỉ gọi geocodeAddress nếu có address
            const location = await geocodeAddress(address)
            lat = location.lat
            lng = location.lng
        }
        const data = await companyModel.filterCompanies({
            category,
            minSalary,
            workingType,
            lat,
            lng
        })
        return data
    } catch (error) {
        throw Error(error)
    }
}

const searchCompaniesInElastic = async (keyword) => {
    try {
        const result = await elasticClient.search({
            index: INDEX_NAME.COMPANY,
            query: {
                multi_match: {
                    query: keyword,
                    fields: [
                        'companyName',
                        'title',
                        'description',
                        'address',
                        'category',
                        'text'
                    ],
                    fuzziness: 'AUTO'
                }
            }
        })
        return result.hits.hits.map((hit) => ({
            id: hit._id,
            ...hit._source
        }))
    } catch (error) {
        throw new Error('[Elastic Search Error] ' + error.message)
    }
}
export const companyService = {
    getAllCompanies,
    getCompanyById,
    filterCompanies,
    searchCompaniesInElastic
}
