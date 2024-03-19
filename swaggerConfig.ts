import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export default (app: Express) => {
    const options = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'Your API Title',
                version: '1.0.0',
                description: 'API Documentation',
            },
            servers: [
                {
                    url: 'http://20.151.79.66/',
                    description: 'Production server',
                },
                {
                    url: 'http://localhost:5000/',
                    description: 'Development server',
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
                schemas: {
                    User: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            firstname: { type: "string" },
                            lastname: { type: "string" },
                            email: { type: "string" },
                            password: { type: "string" },
                            role_id: { type: "string" },
                            resetToken: { type: "string" },
                            phoneNumber: { type: "string" },
                            hiredate: { type: "string", format: "date-time" },
                            department_id: { type: "string" },
                            employment_type: { type: "string", enum: ["FULL_TIME", "PART_TIME"] },
                            compensation_type: { type: "string", enum: ["HOURLY", "SALARY"] },
                            salary_rate: { type: "number" },
                            center_id: { type: "string" },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" },
                        },
                    },
                    Login: {
                        type: "object",
                        properties: {
                            email: { type: "string" },
                            password: { type: "string" },
                        },
                    },
                    Role: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            createdAt: { type: "string", format: "date-time" },
                            updatedAt: { type: "string", format: "date-time" },
                        },
                    },
                    Department: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            createdAt: { type: "string", format: "date-time" },
                            updatedAt: { type: "string", format: "date-time" },
                        },
                    },
                    Center: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            createdAt: { type: "string", format: "date-time" },
                            updatedAt: { type: "string", format: "date-time" },
                        },
                    },
                    Program: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            code: { type: "string" },
                            department_id: { type: "string" },
                            from_date: { type: "string", format: "date-time" },
                            to_date: { type: "string", format: "date-time" },
                            income: { type: "object" },
                            supply_expense: { type: "object" },
                            salary_expense: { type: "object" },
                            createdAt: { type: "string", format: "date-time" },
                            updatedAt: { type: "string", format: "date-time" },
                        },
                    },
                },
            },
            security: [{ bearerAuth: [] }],
        },
        apis: ['src/routes/*.ts'],
    };

    const specs = swaggerJsdoc(options);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};