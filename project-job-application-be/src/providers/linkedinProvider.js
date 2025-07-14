import axios from 'axios'

const getAccessToken = async (code) => {
    const response = await axios.post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        null,
        {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
    )

    return response.data.access_token
}
const getProfile = async (accessToken) => {
    const res = await axios.get('https://api.linkedin.com/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}
const getEmail = async (accessToken) => {
    const res = await axios.get(
        'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
        {
            headers: { Authorization: `Bearer ${accessToken}` }
        }
    )
    return res.data.elements[0]['handle~'].emailAddress
}
export const linkedinProvider = {
    getAccessToken,
    getEmail,
    getProfile
}
