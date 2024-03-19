import Joi from 'joi';

export const programSchema = {
    createProgram: Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        department_id: Joi.string().required(),
        from_date: Joi.date().iso().required(),
        to_date: Joi.date().iso().required(),
        income: Joi.object().required(),
        supply_expense: Joi.object().required(),
        salary_expense: Joi.object().required(),
        created_at: Joi.date().default('now'),
        updated_at: Joi.date().allow(null).optional()
    })
}
