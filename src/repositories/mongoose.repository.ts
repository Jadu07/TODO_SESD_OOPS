
import { Model, Document } from "mongoose";
import { IRepository } from "./repository.interface";
import { BaseEntity } from "../models/types";
import { v4 as uuidv4 } from "uuid";

export class MongooseRepository<T extends BaseEntity> implements IRepository<T> {
    private model: Model<T & Document>;

    constructor(model: Model<T & Document>) {
        this.model = model;
    }

    async create(item: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
        const _id = uuidv4();
        // Use new this.model() then save()
        const doc = new this.model({ ...item, _id });
        const saved = await doc.save();
        return saved.toObject() as unknown as T;
    }

    async update(id: string, updates: Partial<T>): Promise<T | null> {
        const updated = await this.model.findByIdAndUpdate(id, updates as any, { new: true });
        return updated ? (updated.toObject() as unknown as T) : null;
    }

    async delete(id: string): Promise<boolean> {
        const res = await this.model.findByIdAndDelete(id);
        return !!res;
    }

    async findById(id: string): Promise<T | null> {
        const res = await this.model.findById(id);
        return res ? (res.toObject() as unknown as T) : null;
    }

    async findAll(filter?: (item: T) => boolean): Promise<T[]> {
        // Warning: In-memory filter cannot be applied to DB query efficiently.
        // We will fetch all and filter in memory to maintain interface compatibility 
        // OR we should have changed the interface to accept a query object.
        // Given the constraints, fetching all is okay for small datasets but bad for prod.
        // However, I will check if 'filter' is being passed.
        // Services currently pass lambdas: `s => s.email === ...`.
        // This is incompatible with Mongoose `find({})`.
        // I must fetch all and filter in JS to keep the service logic working without rewrite.
        const all = await this.model.find();
        const objects = all.map(d => d.toObject() as T);
        if (filter) {
            return objects.filter(filter);
        }
        return objects;
    }
}
