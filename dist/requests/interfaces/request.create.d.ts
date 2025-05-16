export interface RequestCreatingAttributes {
    id?: number;
    title: string;
    email: string;
    userId: number;
    subject?: string;
    message: string;
    active?: boolean;
}
