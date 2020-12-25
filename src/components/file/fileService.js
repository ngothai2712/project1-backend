import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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
