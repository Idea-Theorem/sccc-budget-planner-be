import Joi from 'joi';

export const programSchema = {
    createProgram: Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        department_id: Joi.string().required(),
        from_date: Joi.date().iso().required(),
        to_date: Joi.date().iso().required(),
        income: Joi.array().items(Joi.object().unknown()).required(),
        supply_expense: Joi.array().items(Joi.object().unknown()).required(),
        salary_expense: Joi.array().items(Joi.object().unknown()).required(),
        status: Joi.string().valid('PENDING', 'REJECTED', 'APPROVED', 'DRAFTED').required(),
        created_at: Joi.date().default('now'),
        updated_at: Joi.date().allow(null).optional()
    })
}
