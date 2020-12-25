import mongoose from 'mongoose'

const Schema = mongoose.Schema
import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import Token from './Token'

const UserSchema = new Schema(
    {
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'guest'],
            required: true,
            default: 'guest',
        },
        avatar: {
            type: String,
        },
        avatarId: {
            type: String,
            ref: 'File',
        },
        // decks: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'Deck'
        // }]
    },
    { timestamps: { createdAt: 'createdAt' } },
)

// UserSchema.methods = {
//     createAccessToken: async function () {
//         try {
//             let { _id, email } = this
//             const accessToken = jwt.sign(
//                 { user: { _id, email } },
//                 process.env.SECRET_ACCESS_TOKEN,
//                 {
//                     expiresIn: +process.env.SECRET_ACCESS_TOKEN_EXPIRE,
//                 },
//             )
//             return accessToken
//         } catch (error) {
//             console.error(error)
//         }
//     },
//     createRefreshToken: async function () {
//         try {
//             let { _id, email } = this
//             const refreshToken = jwt.sign(
//                 { user: { _id, email } },
//                 process.env.SECRET_REFRESH_ACCESS_TOKEN,
//                 {
//                     expiresIn: +process.env.SECRET_REFRESH_ACCESS_TOKEN_EXPIRE,
//                 },
//             )
//             await new Token({ token: refreshToken }).save()
//             return refreshToken
//         } catch (error) {
//             console.error(error)
//         }
//     },
// }

UserSchema.pre('save', async function (next) {
    try {
        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hashSync(
            this.password,
            bcrypt.genSaltSync(8), // Generate Salt
            null,
        )
        // Re-assign password hashed
        this.password = passwordHash
    } catch (e) {
        next(e)
    }
})

export default mongoose.model('User', UserSchema)
