/**
 * We can interact with mongoose in three different ways:
 * [v] Callback
 * [v] Promises
 * [v] Async/await (Promises)
 */
import { ErrorCodes } from '../../helpers/constants'
import {
    logSystemError,
    respondSuccess,
    respondWithError,
} from '../../helpers/messageResponse'
import User from '../../models/User'
import { fetchUserDetail, fetchUserList, updateUser } from './userService'
// const Deck = require('../../models/Deck')
// const User = require('../../models/User')
// import {User} from '../../models/User'

// create new user
// export async function create(user) {
//     try {
//         const newUser = await User.create(user);
//         return newUser;
//     } catch (e) {
//         console.log(`Error in createUser ${e.message}`);
//         throw e;
//     }
// }

const detailUserAttributes = {
    name: 1,
    address: 1,
    phone: 1,
    email: 1,
    role: 1,
    avatar: 1,
}

// update user
export async function update(req, res) {
    try {
        const { id } = req.params
        const user = req.body
        const isUserExist = await User.findOne({
            $and: [{ email: user.email }, { _id: { $ne: id } }],
        })
        if (isUserExist) {
            return res.json(
                respondWithError(
                    ErrorCodes.ERROR_CODE_ITEM_NOT_EXIST,
                    'user.emailIsAlready',
                    {},
                ),
            )
        }
        await updateUser(id, user)
        // if (user.role) await correctManagerToNewRole(id, user.role);
        const rawData = await User.findById(id, detailUserAttributes)
        if (rawData?.avatar) rawData.avatar = process.env.ASSETS_URL + rawData.avatar
        return res.json(respondSuccess({ items: rawData, totalItems: 1 }))
    } catch (error) {
        return logSystemError(res, error, 'userController - update')
    }
}

// get list user
export async function getList(req, res) {
    try {
        const rawData = await fetchUserList(req.query)
        console.log('controller', rawData.rows)
        if (rawData?.rows.length) {
            rawData.rows.map((data) => {
                if (data.avatar) data.avatar = process.env.ASSETS_URL + data.avatar
                return {
                    ...data,
                }
            })
        }
        return res.json(
            respondSuccess({ items: rawData.rows, totalItems: rawData.count }),
        )
    } catch (error) {
        return logSystemError(res, error, 'userController - getList')
    }
}

export async function getDetail(req, res) {
    try {
        const userID = req.params.id
        const rawData = await User.findById(userID, detailUserAttributes)
        if (rawData?.avatar) rawData.avatar = process.env.ASSETS_URL + rawData.avatar

        return res.json(respondSuccess({ items: rawData, totalItems: 1 }))
    } catch (error) {
        return logSystemError(res, error, 'userController - getDetail')
    }
}

// const getUserDecks = async (req, res, next) => {
//     const {userID} = req.value.params
//
//     // Get user
//     const user = await User.findById(userID).populate('decks')
//
//     return res.status(200).json({decks: user.decks})
// }
//
// const index = async (req, res, next) => {
//     const users = await User.find({})
//
//     return res.status(200).json({users})
// }

// const newUser = async (req, res, next) => {
//     try {
//         // const newUser = new User(req.value.body)
//         //
//         // await newUser.save()
//         //
//         // return res.status(201).json({user: newUser})
//         // const user = req.body;
//         const isEmailExist = await User.findOne({email: req.value.body.email});
//         if (isEmailExist) {
//             return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST,'user.emailExisted', {}));
//         }
//         // const newUser = await createUser(user);
//         // return res.json(respondSuccess(newUser));
//     } catch (error) {
//         // return logSystemError(res, error, 'userController - create');
//     }
//
// }
//
// const newUserDeck = async (req, res, next) => {
//     const {userID} = req.value.params
//
//     // Create a new deck
//     const newDeck = new Deck(req.value.body)
//
//     // Get user
//     const user = await User.findById(userID)
//
//     // Assign user as a deck's owner
//     newDeck.owner = user
//
//     // Save the deck
//     await newDeck.save()
//
//     // Add deck to user's decks array 'decks'
//     user.decks.push(newDeck._id)
//
//     // Save the user
//     await user.save()
//
//     res.status(201).json({deck: newDeck})
// }
//
// const replaceUser = async (req, res, next) => {
//     // enforce new user to old user
//     const {userID} = req.value.params
//
//     const newUser = req.value.body
//
//     const result = await User.findByIdAndUpdate(userID, newUser)
//
//     return res.status(200).json({success: true})
// }
//
// const updateUser = async (req, res, next) => {
//     // number of fields
//     const {userID} = req.value.params
//
//     const newUser = req.value.body
//
//     const result = await User.findByIdAndUpdate(userID, newUser)
//
//     return res.status(200).json({success: true})
// }
//
// const signIn = async (req, res, next) => {
//     console.log('signIn')
// }
//
// const signUp = async (req, res, next) => {
//     const {name, phone, address, email, password} = req.value.body
//     const isEmailExist = await User.findOne({email});
//     console.log('isEmailExist', isEmailExist)
//
//     if (isEmailExist) {
//         return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST, 'user.emailExisted', {}));
//     }
//
//     const newUser = new User({name, phone, address, email, password})
//     await newUser.save()
//     return res.status(201).json({success: true})
// }
//
// const secret = async (req, res, next) => {
//     console.log('secret')
//
// }
//
// module.exports = {
//     getUser,
//     getUserDecks,
//     index,
//     newUser,
//     newUserDeck,
//     replaceUser,
//     updateUser,
//     signIn,
//     signUp,
//     secret
// }
