import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export function isValidPassword(password, userPass) {
    return bcrypt.compareSync(password, userPass)
}
export function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

export async function signToken(user) {
    try {
        // sign token

        const SECRET_ACCESS_TOKEN_EXPIRE = process.env.SECRET_ACCESS_TOKEN_EXPIRE
        const SECRET_REFRESH_ACCESS_TOKEN_EXPIRE =
            process.env.SECRET_REFRESH_ACCESS_TOKEN_EXPIRE

        const tokenExpiredAt = new Date()
        tokenExpiredAt.setSeconds(
            tokenExpiredAt.getSeconds() + +SECRET_ACCESS_TOKEN_EXPIRE,
        )
        const refreshTokenExpiredAt = new Date()
        refreshTokenExpiredAt.setSeconds(
            tokenExpiredAt.getSeconds() + +SECRET_REFRESH_ACCESS_TOKEN_EXPIRE,
        )

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_ACCESS_TOKEN,
            {
                expiresIn: +SECRET_ACCESS_TOKEN_EXPIRE,
            },
        )
        const rToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_REFRESH_ACCESS_TOKEN,
            {
                expiresIn: +SECRET_REFRESH_ACCESS_TOKEN_EXPIRE,
            },
        )

        const accessToken = {
            token,
            expiresIn: SECRET_ACCESS_TOKEN_EXPIRE,
            expiredAt: tokenExpiredAt.getTime(),
        }
        const refreshToken = {
            token: rToken,
            expiresIn: SECRET_REFRESH_ACCESS_TOKEN_EXPIRE,
            expiredAt: refreshTokenExpiredAt.getTime(),
        }

        return { accessToken, refreshToken, role: user.role }
    } catch (e) {
        console.log(`Error in signToken ${e.message}`)
        throw e
    }
}

//
// export async function saveToken(user, token, type = 'refresh_token') {
//     try {
//         const tokenDate = {
//             userId: user.id,
//             type,
//             token,
//         }
//         const newToken = await models.UserToken.create(tokenDate)
//         return newToken
//     } catch (e) {
//         logger.error(`Error in saveRefreshToken ${e.message}`)
//         throw e
//     }
// }
