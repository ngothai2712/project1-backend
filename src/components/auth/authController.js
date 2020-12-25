import { ErrorCodes } from '../../helpers/constants'
import { respondSuccess, respondWithError } from '../../helpers/messageResponse'
import User from '../../models/User'
import { createUser } from '../user/userService'
import { isValidPassword, signToken } from './authService'

export const signUp = async (req, res) => {
    const user = req.body
    const isEmailExist = await User.findOne({ email: user.email })

    if (isEmailExist) {
        return res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_ITEM_EXIST,
                'auth.signUp.emailExisted',
                {},
            ),
        )
    }

    const newUser = await createUser(user)
    return res.json(respondSuccess(newUser))
}

export const signIn = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.json(
            respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST, 'user.emailNotExist', {}),
        )
    }

    const validPassword = isValidPassword(password, user?.password)
    if (validPassword) {
        const { accessToken, refreshToken } = await signToken(user)

        // delete user?._doc['password']
        // user._doc.accessToken = accessToken
        // user._doc.refreshToken = refreshToken
        const userRes = {
            accessToken,
            refreshToken,
            _id: user?._id,
            role: user?.role,
            email: user?.email,
            name: user?.name,
        }
        if (user?.avatar) userRes.avatar = process.env.ASSETS_URL + user.avatar
        return res.json(respondSuccess(userRes))
    }
    return res.json(
        respondWithError(
            ErrorCodes.ERROR_CODE_ITEM_EXIST,
            'auth.signIn.wrongEmailOrPassword',
            {},
        ),
    )
}

// export async function refreshToken(req, res) {
//     try {
//         const { loginUser = {}, refreshToken: oldRefreshToken = null } = req
//         const user = await getUserDetail(loginUser.id)
//         if (!user) {
//             return res.json(
//                 respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'Unauthorized'),
//             )
//         }
//         const isTokenExit = await checkIfTokenExist(user, oldRefreshToken)
//         if (!isTokenExit) {
//             return res.json(
//                 respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'Unauthorized'),
//             )
//         }
//
//         const { token, rToken, permissions } = await signToken(user)
//         await Promise.all([destroyToken(isTokenExit.id), saveToken(user, rToken)])
//         return res.json(respondSuccess(userAuthInfo(user, token, rToken, permissions)))
//     } catch (error) {
//         return logSystemError(res, error, 'authController - refreshToken')
//     }
// }

export async function refreshToken(req, res) {
    const refreshTokenFromClient = req.body.refreshToken
    console.log('refreshTokenFromClient', refreshTokenFromClient)
    return false
    // debug("tokenList: ", tokenList);

    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    // if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
    //     try {
    //         // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded
    //         const decoded = await jwtHelper.verifyToken(
    //             refreshTokenFromClient,
    //             refreshTokenSecret,
    //         )
    //         // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
    //         // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
    //         // debug("decoded: ", decoded);
    //         const userFakeData = decoded.data
    //         debug(
    //             `Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`,
    //         )
    //         const accessToken = await jwtHelper.generateToken(
    //             userFakeData,
    //             accessTokenSecret,
    //             accessTokenLife,
    //         )
    //         // gửi token mới về cho người dùng
    //         return res.status(200).json({ accessToken })
    //     } catch (error) {
    //         // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
    //         debug(error)
    //         res.status(403).json({
    //             message: 'Invalid refresh token.',
    //         })
    //     }
    // } else {
    //     // Không tìm thấy token trong request
    //     return res.status(403).send({
    //         message: 'No token provided.',
    //     })
    // }
}
