/**lap_trinh_tich_hop_nang_cao_MERN_stack*/
import express from 'express'
import { authRoute } from './auth/authRoute'
import { companyRoute } from './company/companyRoute'
import { linkedinRoute } from './auth/linkedinRoute'
import { usersRoute } from './users/usersRoute'
import { candidateProfileRoute } from './candidateProfile/candidateProfileRoute'
import { adminRoute } from './admin/adminRoute'

const Router = express.Router()

Router.get('/health', (req, res) => {
    res.json({
        message: 'Ready to use.'
    })
})

Router.use('/api/auth', authRoute)
Router.use('/api/authLinkedin', linkedinRoute)
Router.use('/api/company', companyRoute)
Router.use('/api/users', usersRoute)
Router.use('/api/candidateProfile', candidateProfileRoute)
Router.use('/api/admin', adminRoute)
export const APIs_v1 = Router
