import Joi from 'joi';

export const userSchema = {
    createUser: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        roles: Joi.array().items(Joi.string().trim().min(1)).min(1).required().messages({
            'array.base': 'Roles must be an array',
            'array.min': 'At least one role must be provided',
            'string.empty': 'Role cannot be an empty string'
        }),
        reset_token: Joi.string().allow(null).optional(),
        phone_number: Joi.string().allow(null).optional(),
        hire_date: Joi.date().required(),
        department_id: Joi.string().allow(null).optional(),
        employment_type: Joi.string().valid('FULL_TIME', 'PART_TIME').optional(),
        compensation_type: Joi.string().valid('HOURLY', 'SALARY').optional(),
        salary_rate: Joi.number().positive().optional().options({ convert: false }),
        center_id: Joi.string().allow(null).optional(),
        created_at: Joi.date().default('now'),
        updated_at: Joi.date().allow(null).optional(),
        employeDepartments: Joi.optional()

    }),
    updateUser: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().optional(),
        roles: Joi.array().items(Joi.string().trim().min(1)).min(1).required().messages({
            'array.base': 'Roles must be an array',
            'array.min': 'At least one role must be provided',
            'string.empty': 'Role cannot be an empty string'
        }),
        hire_date: Joi.date().required(),
        department_id: Joi.string().allow(null).optional(),
        employment_type: Joi.string().valid('FULL_TIME', 'PART_TIME').optional(),
        compensation_type: Joi.string().valid('HOURLY', 'SALARY').optional(),
        salary_rate: Joi.number().positive().required().options({ convert: false }),
        center_id: Joi.string().allow(null).optional()
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
}
