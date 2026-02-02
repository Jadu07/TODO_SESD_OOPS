
export enum Department {
    CS = "CS",
    IT = "IT",
    ECE = "ECE",
    MECH = "MECH",
    CIVIL = "CIVIL"
}

export enum StudentStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

export enum EnrollmentStatus {
    ENROLLED = "enrolled",
    DROPPED = "dropped"
}

export enum ExamType {
    MIDTERM = "midterm",
    ENDTERM = "endterm",
    QUIZ = "quiz",
    LAB = "lab"
}

export interface BaseEntity {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
}
