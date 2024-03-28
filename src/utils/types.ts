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
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles: [];
    reset_token?: string | null;
    phone_number?: string | null;
    hire_date: Date;
    department_id?: string | null;
    employment_type: EmploymentType;
    compensation_type: CompensationType;
    salary_rate: number;
    center_id?: string;
    created_at: Date;
    updated_at?: Date;
}

export interface UpdateUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
    roles: [];
    hire_date: Date;
    department_id?: string | null;
    employment_type: EmploymentType;
    compensation_type: CompensationType;
    salary_rate: number;
    center_id?: string;
}

export interface UserRole {
    user: User;
    user_id: string;
    role: Role;
    role_id: string;
    created_at: Date;
    updated_at?: Date;
}

export interface Role {
    id: string;
    name: string;
    created_at: Date;
    updated_at?: Date;
}

export interface AuthRequest extends Request {
    user?: User;
}

export interface TokenPayload extends JwtPayload {
    id: number;
}

export enum ProgramStatus {
    PENDING = 'PENDING',
    REJECTED = 'REJECTED',
    APPROVED = 'APPROVED',
    DRAFTED = 'DRAFTED'
}

export interface Program {
    id: string;
    name: string;
    code: string;
    department_id: string;
    from_date: Date;
    to_date: Date;
    income: IncomeEntry[];
    supply_expense: SupplyExpenseEntry[];
    salary_expense: SalaryExpenseEntry[];
    status: ProgramStatus;
    created_at: Date;
    updated_at?: Date;
}

interface IncomeEntry {
    id: string;
    name: string;
    amount: number;
}

interface SupplyExpenseEntry {
    id: string;
    name: string;
    amount: number;
}

interface SalaryExpenseEntry {
    id: string;
    name: string;
    amount: number;
}
