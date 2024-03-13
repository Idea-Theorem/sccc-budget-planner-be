const constants = {
    USER_ROLES: {
        HR: "HR",
        SUPER_ADMIN: "Super_Admin",
        ADMIN: "Admin",
        DEPARTMENT_HEAD: "Department_Head",
        PROGRAM_HEAD: "Program_Head"
    },
    USER_STATUSES: {
        ACTIVE: "Active",
        INACTIVE: "Inactive",
        REJECTED: "Rejected",
        SUSPENDED: "Suspended"
    },
    BUDGET_STATUSES: {
        PENDING: "Pending",
        RECEIVED: "Received",
        APPROVED: "Approved",
        REJECTED: "Rejected"
    },
    RESPONSE_MESSAGES: {
        OK: 200,
        NO_CONTENT: 204,
        ERROR: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
        INTERNAL_SERVER_ERROR: 500
    }
};

module.exports = constants;
