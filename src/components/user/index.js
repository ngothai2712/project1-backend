// const express = require('express')
// // const router = express.Router()
// const router = require('express-promise-router')()
//
//
// const {validateBody, validateParam, schemas} = require('../../helpers/routerHelpers')
//
// router.route('/')
//     .get(UserController.index)
//     .post(validateBody(schemas.userSchema), UserController.newUser)
//
// router.route('/signUp').post(validateBody(schemas.authSignUpSchema), UserController.signUp)
//
// router.route('/signIn').post(validateBody(schemas.authSignInSchema),UserController.signIn)
//
// router.route('/secret').get(UserController.secret)
//
// router.route('/:userID')
//     .get(validateParam(schemas.idSchema, 'userID'), UserController.getUser)
//     .put(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userSchema), UserController.replaceUser)
//     .patch(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userOptionalSchema), UserController.updateUser)
//
// router.route('/:userID/decks')
//     .get(validateParam(schemas.idSchema, 'userID'), UserController.getUserDecks)
//     .post(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.deckSchema), UserController.newUserDeck)
//
// module.exports = router
import express from 'express'

import { getDetail, getList, newUser, update, deleteUser } from './userController'
import { createValidator, updateValidator } from './userValidator'
import { authenticate, checkIsAdmin } from '../../middleware/auth'

export default (app) => {
    const router = express.Router()
    router.get('/', authenticate, getList)

    // router.post('/', createValidator, newUser)

    router.get('/:id', authenticate, getDetail)

    router.patch('/:id', authenticate, updateValidator, update)

    // router.patch('/:id/password', authenticate, checkPermission([
    //     'update_user',
    // ]), updatePasswordValidator, updatePassword);
    //
    router.delete('/:id', authenticate, checkIsAdmin, deleteUser)

    app.use('/api/v1/user', router)
}
