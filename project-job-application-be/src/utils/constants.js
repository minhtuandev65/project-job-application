/**
 *
 *
 *
 * "Nơi lưu trữ các trạng thái, hằng số, biến toàn cục dùng chung trong ứng dụng"
 */

import { env } from '~/config/environment'

export const WEBSITE_DOMAIN =
    env.BUILD_MODE === 'production'
        ? env.WEBSITE_DOMAIN_PRODUCTION
        : env.WEBSITE_DOMAIN_DEVELOPMENT
export const APP_LOGO =
    'https://res.cloudinary.com/dyp1giiye/image/upload/v1748533208/main-logo_jjaqmh.jpg'
export const ROLE = {
    ADMIN: 'ADMIN',
    EMPLOYEE: 'EMPLOYEE'
}

export const CANDIDATEPROFILE_STATUS = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED'
}
export const CATEGORY = {
    RESTAURANT: 'RESTAURANT',
    HOTEL: 'HOTEL',
    TECHNOLOGY: 'TECHNOLOGY',
    STORE: 'STORE',
    OTHER: 'OTHER'
}
export const WORKINGTYPE = {
    PARTTIME: 'PARTTIME',
    FULLTIME: 'FULLTIME'
}

export const INDEX_NAME = {
    COMPANY: 'search-axwg'
}

export const GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE'
}
