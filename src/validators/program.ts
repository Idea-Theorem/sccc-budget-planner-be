import Joi from 'joi';

export const programSchema = {
    createProgram: Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        department_id: Joi.string().required(),
        from_date: Joi.date().iso().required(),
        to_date: Joi.date().iso().required(),
        income: Joi.array().items(
            Joi.object({
                id: Joi.string().required(),
                name: Joi.string().required(),
                amount: Joi.number().required().options({ convert: false })
            })
        ).required(),
        supply_expense: Joi.array().items(
            Joi.object({
                id: Joi.string().required(),
                name: Joi.string().required(),
                amount: Joi.number().required().options({ convert: false })
            })
        ).required(),
        salary_expense: Joi.array().items(
            Joi.object({
                id: Joi.string().required(),
                name: Joi.string().required(),
                amount: Joi.number().required().options({ convert: false })
            })
        ).required(),
        status: Joi.string().valid('PENDING', 'REJECTED', 'APPROVED', 'DRAFTED').required(),
        created_at: Joi.date().default('now'),
        updated_at: Joi.date().allow(null).optional()
    }),
    updateProgramStatus: Joi.object({
        progamIds: Joi.array().items(Joi.string().required()),
        status: Joi.string().valid('PENDING', 'REJECTED', 'APPROVED', 'DRAFTED').required(),
    }),
    updateProgram: Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        department_id: Joi.string().required(),
        from_date: Joi.date().iso().optional(),
        to_date: Joi.date().iso().optional(),
    })
}
