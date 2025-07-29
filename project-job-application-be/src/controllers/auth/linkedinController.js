import { StatusCodes } from 'http-status-codes'
import { linkedinService } from '~/services/auth/linkedinServices'

const handleCallback = async (req, res) => {
    try {
        const { code } = req.query
        const jwtToken = await linkedinService.handleLinkendInLogin(code)

        res.status(StatusCodes.OK).json({
            token: jwtToken
        })
    } catch (error) {
        console.error('LinkedIn callback error:', error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'LinkedIn login failed',
            error: error?.message || 'Unknown error'
        })
    }
}
export const linkedinController = {
    handleCallback
}
