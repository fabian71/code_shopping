export interface FieldsOptions {
    [field: string]: {
        id: string,
        label: string,
        validationsMessage?: {
            [error: string]: any
        }
    }
}

