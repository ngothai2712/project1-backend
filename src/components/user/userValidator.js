import { respondWithError } from '../../helpers/messageResponse'
import { ErrorCodes } from '../../helpers/constants'

import Joi from '@hapi/joi'

const createValid = Joi.object().keys({
    name: Joi.string().max(255).required(),
    email: Joi.string().max(255).email().required(),
    // phone: Joi.string().max(20).allow(null),
    // role: Joi.string().valid('admin', 'supervisor', 'school_manager', 'teacher', 'business_unit_leader', 'academic_affairs').allow(null),
})

export async function createValidator(req, res, next) {
    const { body } = req

    // const result = Joi?.validate(body, createValid)
    const result = createValid.validate(body)

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

const updateValid = Joi.object().keys({
    name: Joi.string().max(255).required(),
    email: Joi.string().max(255).email().required(),
    phone: Joi.string().max(20).allow(null),
    address: Joi.string().max(255).allow(null),
    avatar: Joi.string().max(255).allow(null),
    // role: Joi.string().valid('admin', 'supervisor', 'school_manager', 'teacher', 'business_unit_leader', 'academic_affairs').allow(null),
})
export async function updateValidator(req, res, next) {
    const { body } = req
    // const result = Joi?.validate(body, updateValid)
    const result = updateValid.validate(body)

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
