
import { BaseEntity } from "../models/types";

export interface IRepository<T extends BaseEntity> {
    create(item: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
    update(id: string, item: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<T | null>;
    findAll(filter?: (item: T) => boolean): Promise<T[]>;
}
