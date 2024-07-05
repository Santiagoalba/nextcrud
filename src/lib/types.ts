
export interface SimpleTask {
    id: number;
    name: string | null;
    description: string | null;
    priority: string | null;
    createdAt: Date;
    updatedAt: Date;
}