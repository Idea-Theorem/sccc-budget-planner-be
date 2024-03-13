import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export enum EmploymentType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME'
}

export enum CompensationType {
    HOURLY = 'HOURLY',
    SALARY = 'SALARY'
}

export interface User {
    id: string;
    firstname?: string;
    lastname?: string;
    email: string;
    password: string;
    role_id?: string;
    resetToken?: string | null;
    phoneNumber?: string | null;
    hiredate?: Date;
    department_id?: string;
    employment_type?: EmploymentType;
    compensation_type?: CompensationType;
    salary_rate: number;
    center_id?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface AuthRequest extends Request {
    user?: User;
}

export interface TokenPayload extends JwtPayload {
    id: number;
}

export interface Program {
    id: string;
    name: string;
    code: string;
    department_id: string;
    from_date: Date;
    to_date: Date;
    income: Record<string, number>;
    supply_expense: Record<string, number>;
    salary_expense: Record<string, number>;
    createdAt: Date;
    updatedAt: Date;
}
