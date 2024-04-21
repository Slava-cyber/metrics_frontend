export type Response<T> = {
    status: boolean,
    message: string,
    statusCode: number,
    data?: T
};