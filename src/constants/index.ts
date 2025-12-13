/**
 * Request success status code
 */
export const SUCCESS_CODE = 0

/**
 * Request content type
 */
export const CONTENT_TYPE: AxiosContentType = 'application/json'

/**
 * Request timeout duration
 */
export const REQUEST_TIMEOUT = 60000

/**
 * No redirect white list
 */
export const NO_REDIRECT_WHITE_LIST = ['/login']

/**
 * No reset router white list
 */
export const NO_RESET_WHITE_LIST = ['Redirect', 'Login', 'NoFind', 'Root']

/**
 * Table default filter column setting fields
 */
export const DEFAULT_FILTER_COLUMN = ['expand', 'selection']

/**
 * Whether to automatically convert data format based on headers->content-type
 */
export const TRANSFORM_REQUEST_DATA = true
