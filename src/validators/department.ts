import Joi from 'joi';

export const departmentSchema = {
    createDepartment: Joi.object({
        name: Joi.string().required(),
        center_id: Joi.string().required(),
        created_at: Joi.date().default('now'),
        updated_at: Joi.date().allow(null).optional()
    })
}
