/**
 * RequestSuccessstatus码
 */
export const SUCCESS_CODE = 0

/**
 * RequestcontentType
 */
export const CONTENT_TYPE: AxiosContentType = 'application/json'

/**
 * Request超时Time
 */
export const REQUEST_TIMEOUT = 60000

/**
 * 不重定向白名单
 */
export const NO_REDIRECT_WHITE_LIST = ['/login']

/**
 * 不ResetRouter白名单
 */
export const NO_RESET_WHITE_LIST = ['Redirect', 'Login', 'NoFind', 'Root']

/**
 * table默认Filter列Set字段
 */
export const DEFAULT_FILTER_COLUMN = ['expand', 'selection']

/**
 * 是否根据headers->content-type自动转换data格式
 */
export const TRANSFORM_REQUEST_DATA = true
