import { respondWithError } from '../../helpers/messageResponse'
import { ErrorCodes } from '../../helpers/constants'

import Joi from '@hapi/joi'
// import Extension from '@hapi/joi-date';
// const Joi = BaseJoi.extend(Extension);

const signUpValidSchema = Joi.object().keys({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().max(255).email().required(),
    password: Joi.string().min(6).max(255).required(),
    address: Joi.string().max(255).allow(null),
    phone: Joi.string().max(20).allow(null),
    role: Joi.string().valid('admin', 'guest'),
})

export async function signUpValidator(req, res, next) {
    const { body } = req

    // const result = Joi.validate(body, signUpValidSchema);
    const result = signUpValidSchema.validate(body)

    if (result.error) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                result.error.message,
                result.error.details,
            ),
        )
        return
    }
    next()
}

const signInValidSchema = Joi.object().keys({
    email: Joi.string().max(255).email().required(),
    password: Joi.string().min(6).max(255).required(),
})

export async function signInValidator(req, res, next) {
    const { body } = req

    // const result = Joi.validate(body, signUpValidSchema);
    const result = signInValidSchema.validate(body)

    if (result.error) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                result.error.message,
                result.error.details,
            ),
        )
        return
    }
    next()
}
