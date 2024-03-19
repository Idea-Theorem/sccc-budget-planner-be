import Joi from 'joi';

export const userSchema = {
    createUser: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role_id: Joi.string().required(),
        reset_token: Joi.string().allow(null).optional(),
        phone_number: Joi.string().allow(null).optional(),
        hire_date: Joi.date().required(),
        department_id: Joi.string().allow(null).optional(),
        employment_type: Joi.string().valid('FULL_TIME', 'PART_TIME').required(),
        compensation_type: Joi.string().valid('HOURLY', 'SALARY').required(),
        salary_rate: Joi.number().positive().required(),
        center_id: Joi.string().allow(null).optional(),
        created_at: Joi.date().default('now'),
        updated_at: Joi.date().allow(null).optional()
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
}
