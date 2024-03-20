export const USER_ROLES = {
    HR: "HR",
    SUPER_ADMIN: "Super_Admin",
    ADMIN: "Admin",
    DEPARTMENT_HEAD: "Department_Head",
    PROGRAM_HEAD: "Program_Head"
};

export const USER_STATUSES = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    REJECTED: "Rejected",
    SUSPENDED: "Suspended"
};

export const BUDGET_STATUSES = {
    PENDING: "Pending",
    RECEIVED: "Received",
    APPROVED: "Approved",
    REJECTED: "Rejected"
};

export const PROGRAM_STATUSES = {
    PENDING: "Pending",
    REJECTED: "Rejected",
    APPROVED: "Approved",
    RECEIVED: "Drafted"
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
