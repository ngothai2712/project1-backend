import { ErrorCodes } from './constants'

export function respondSuccess(value, message = 'Success') {
    return {
        code: ErrorCodes.ERROR_CODE_SUCCESS,
        message,
        data: value,
        success: true,
    }
}

export function respondWithError(errorCode, message = 'Error', value = {}) {
    return {
        code: errorCode,
        message,
        errors: value,
    }
}

export function logSystemError(res, error, functionName) {
    const errorObj = {}
    errorObj.id = `${Date.now()}`
    errorObj.message = error.message
    errorObj.stack = error.stack
    errorObj.functionName = functionName
    return res.json(
        respondWithError(
            ErrorCodes.ERROR_CODE_SYSTEM_ERROR,
            `SYSTEM_ERROR: ${errorObj.id}`,
        ),
    )
}
