import Joi from 'joi';

export const benefitSchema = {
    createBenefit: Joi.object({
        name: Joi.string().required(),
        created_at: Joi.date().default('now'),
        updated_at: Joi.date().allow(null).optional()
    })
}
