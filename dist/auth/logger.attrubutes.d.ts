export interface LoggerAttributes {
    id?: number;
    level: string;
    message: string;
    trace?: string;
    request_id: string;
}
