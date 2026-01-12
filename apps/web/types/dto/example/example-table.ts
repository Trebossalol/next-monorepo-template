export enum ExampleStatus {
    Active = "active",
    Inactive = "inactive",
    Pending = "pending",
}

export interface ExampleItem {
    id: string;
    name: string;
    email: string;
    status: ExampleStatus;
    description?: string;
    createdAt: Date;
}