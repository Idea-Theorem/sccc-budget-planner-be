export const USER_ROLES = {
    HR: "HR",
    SUPER_ADMIN: "Super_Admin",
    ADMIN: "Admin",
    DEPARTMENT_HEAD: "Department_Head",
    PROGRAM_HEAD: "Program_Head"
};

export const BUDGET_STATUSES = {
    PENDING: 'PENDING',
    REJECTED: 'REJECTED',
    APPROVED: 'APPROVED',
    DRAFTED: 'DRAFTED'
};

export const PROGRAM_STATUSES = {
    PENDING: 'PENDING',
    REJECTED: 'REJECTED',
    APPROVED: 'APPROVED',
    DRAFTED: 'DRAFTED'
};

export const RESPONSE_MESSAGES = {
    OK: 200,
    NO_CONTENT: 204,
    ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
};

export const ROLES = [
    { name: 'HR' },
    { name: 'Super_Admin' },
    { name: 'Admin' },
    { name: 'Department_Head' },
    { name: 'Program_Head' },
];

export const PERMISSIONS = [
    { name: "create_employee" },
    { name: "view_employee" },
    { name: "edit_employee" },
    { name: "delete_employee" },
    { name: "create_department" },
    { name: "view_department" },
    { name: "edit_department" },
    { name: "delete_department" },
    { name: "create_center" },
    { name: "view_center" },
    { name: "edit_center" },
    { name: "delete_center" },
    { name: "create_program" },
    { name: "view_program" },
    { name: "edit_program" },
    { name: "delete_program" },
];

export const ROLEANDPERMISSIONS = {
    HR: [
        "create_employee",
        "view_employee",
        "edit_employee",
        "delete_employee",
    ],
    Super_Admin: [
        "view_employee",
        "view_program",
    ],
    Admin: [
        "view_employee",
        "view_program",
    ],
    Department_Head: [
        "create_department",
        "view_department",
        "edit_department",
        "delete_department",
        "view_employee",
    ],
    Program_Head: [
        "create_program",
        "view_program",
        "edit_program",
        "delete_program",
    ]
};
