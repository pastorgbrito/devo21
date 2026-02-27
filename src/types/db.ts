export type Role = "SUPER_ADMIN" | "CHURCH_ADMIN" | "GROUP_ADMIN" | "MEMBER";

export type UserStatus = "PENDING" | "ACTIVE" | "INACTIVE";

export interface User {
    uid: string;
    email: string;
    displayName: string;
    role: Role;
    status: UserStatus;
    churchId: string | null;
    groupId: string | null;
    createdAt: number;
    lastLogin: number;
}

export interface Church {
    id: string;
    name: string;
    location: string;
    adminId: string; // Referencia al User (CHURCH_ADMIN)
    createdAt: number;
}

export interface Group {
    id: string;
    name: string;
    churchId: string;
    adminId: string; // Referencia al User (GROUP_ADMIN)
    createdAt: number;
}

export interface Study {
    id: string;
    title: string;
    content: string; // JSON completo o texto procesado
    dateToStudy: number;
}
