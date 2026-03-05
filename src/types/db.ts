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

export interface StudyHeader {
    titulo: string;
    descripcion: string;
    tematica: string;
    fecha_creacion: string;
    autor: string;
    duracion_dias: number;
}

export interface StudyObservation {
    ayuda_ia: string;
    resumen: string;
}

export interface StudyInterpretation {
    ayuda_ia: string;
    armonia_biblica: string;
}

export interface StudyApplication {
    contexto_real: string;
    contexto_actual: string;
    examen_personal: string;
    accion_24h: string;
    oracion_de_sellado: string;
}

export interface StudyDay {
    dia: number;
    titulo: string;
    cita_biblica?: string; // Nuevo campo sugerido por el usuario
    lectura_base: string;
    observacion: StudyObservation;
    interpretacion: StudyInterpretation;
    aplicacion: StudyApplication;
}

export interface Study {
    id?: string;
    cabecera: StudyHeader;
    cuerpo_del_estudio: StudyDay[];
    createdAt?: number;
}
