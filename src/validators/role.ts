import Joi from 'joi';

export const roleSchema = {
    createRole: Joi.object({
        name: Joi.string().required(),
        created_at: Joi.date().default('now'),
        updated_at: Joi.date().allow(null).optional()
    })
}
