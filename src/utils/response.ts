export function makeResponse<T>(
    data: T,
    message: string,
    statusCode: number
) {
    return {
        data,
        message,
        statusCode
    };
}
