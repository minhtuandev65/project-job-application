import { jwt } from 'jsonwebtoken'
import { env } from '~/config/environment'
import { authModel } from '~/models/auth/authModel'
import { linkedinProvider } from '~/providers/linkedinProvider'
import { GENDER, ROLE } from '~/utils/constants'


const handleLinkendInLogin = async (code) => {
    const accessToken = await linkedinProvider.getAccessToken(code)
    const profile = await linkedinProvider.getProfile(accessToken)
    const email = await linkedinProvider.getEmail(accessToken)

    let user = await authModel.findByEmail(email)
    const displayName =
        `${profile.localizedFirstName} ${profile.localizedLastName}`.trim()
    const avatar =
        profile.profilePicture?.['displayImage~']?.elements?.[0]
            ?.identifiers?.[0]?.identifier
    if (!user) {
        user = await authModel.createNewAccount({
            email,
            password: '', // vì login bằng LinkedIn nên có thể bỏ hoặc set rỗng
            username: email.split('@')[0],
            displayName,
            avatar,
            role: [ROLE.EMPLOYEE], // hoặc ROLE.CANDIDATE tùy hệ thống bạn
            skillSets: [],
            gender: GENDER.MALE,
            isActive: true
        })
    }
    const token = jwt.sign(
        { _id: user._id, email: user.email },
        env.ACCESS_TOKEN_SECRET_SIGNATURE,
        { expiresIn: '7d' }
    )
    return token
}
export const linkedinService = {
    handleLinkendInLogin
}
