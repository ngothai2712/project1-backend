import { respondWithError } from '../helpers/messageResponse'
import { ErrorCodes } from '../helpers/constants'
import jwt from 'jsonwebtoken'

function extractToken(authorization = '') {
    const bearerHeader = authorization.split(' ')
    if (bearerHeader.length === 2 && bearerHeader[0] === 'Bearer') {
        return bearerHeader[1]
    }
    return ''
}

export async function authenticate(req, res, next) {
    try {
        const token = extractToken(req.headers.authorization || '')
        const user =
            req?.authorization_type === 'refresh'
                ? jwt.verify(token, process.env.SECRET_REFRESH_ACCESS_TOKEN)
                : jwt.verify(token, process.env.SECRET_ACCESS_TOKEN)
        if (user?.id) {
            req.loginUser = user
            if (req.authorization_type === 'refresh') {
                req.refreshToken = token
            }
            return next()
        }
        return res.json(
            respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'Unauthorized'),
        )
    } catch (e) {
        return res.json(
            respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'Unauthorized'),
        )
    }
}
