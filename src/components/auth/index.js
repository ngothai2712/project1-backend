import express from 'express'

import { signUpValidator, signInValidator } from './authValidator'
import { signUp, signIn, refreshToken } from './authController'
import { authenticate } from '../../middleware/auth'

export default (app) => {
    const router = express.Router()

    router.post('/sign-up', signUpValidator, signUp)
    router.post('/sign-in', signInValidator, signIn)
    router.post(
        '/refresh-token',
        (req, res, next) => {
            req.authorization_type = 'refresh'
            next()
        },
        authenticate,
        refreshToken,
    )

    // router.get('/:id', authenticate, checkPermission([
    //     'read_user',
    // ]), getDetail);
    //
    // router.patch('/:id', authenticate, checkPermission([
    //     'update_user',
    // ]), updateValidator, update);
    //
    // router.patch('/:id/password', authenticate, checkPermission([
    //     'update_user',
    // ]), updatePasswordValidator, updatePassword);
    //
    // router.delete('/:id', authenticate, checkPermission([
    //     'delete_user',
    // ]), deleteUser);

    app.use('/api/v1/auth', router)
}
