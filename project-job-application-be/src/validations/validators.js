export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
export const OBJECT_ID_RULE_MESSAGE =
    'Your string fails to match the Object Id pattern!'
export const FIELD_REQUIRED_MESSAGE = 'This field is required.'
export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'Email is invalid. (example@example.com)'
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/
export const PASSWORD_RULE_MESSAGE =
    'Password must include at least 1 letter, a number, and at least 8 characters.'
// Liên quan đến Validate File
export const LIMIT_COMMON_FILE_SIZE = 10485760 // byte = 10 MB
export const ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']
// validator cv upload
export const ALLOW_CV_FILE_TYPES = [
    'application/pdf', // .pdf
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
]

export const LIMIT_CV_FILE_SIZE = 5242880 // 5 MB

// Common rule messages
export const STRING_BASE_MESSAGE = 'Must be a string.'
export const STRING_MIN_MESSAGE = (min) => `Must be at least ${min} characters.`
export const STRING_MAX_MESSAGE = (max) => `Must be at most ${max} characters.`

export const NUMBER_BASE_MESSAGE = 'Must be a number.'
export const NUMBER_MIN_MESSAGE = (min) => `Must be at least ${min}.`

export const ARRAY_BASE_MESSAGE = 'Must be an array.'
export const ARRAY_MIN_MESSAGE = (min) => `At least ${min} item(s) required.`

export const PHONE_RULE_MESSAGE = 'Phone number is not valid.'
export const PHONE_RULE = /^[0-9+().\s-]{6,20}$/
export const CV_MESSAGE = 'CV must be a valid URL'
// Custom reusable message maps
export const COMMON_VALIDATION_MESSAGES = {
    'any.required': FIELD_REQUIRED_MESSAGE,
    'string.base': STRING_BASE_MESSAGE,
    'number.base': NUMBER_BASE_MESSAGE,
    'array.base': ARRAY_BASE_MESSAGE,
    'string.min': (context) => STRING_MIN_MESSAGE(context.limit),
    'string.max': (context) => STRING_MAX_MESSAGE(context.limit),
    'number.min': (context) => NUMBER_MIN_MESSAGE(context.limit),
    'array.min': (context) => ARRAY_MIN_MESSAGE(context.limit),
    'string.email': EMAIL_RULE_MESSAGE,
    'string.uri': CV_MESSAGE
}
