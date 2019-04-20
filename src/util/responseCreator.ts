import { Response } from './types/response';

export const successResponse = (response: any): Response => ({
    response,
    status: 202,
    success: true,
});

export const errorResponse = (response: any): Response => ({
    response,
    status: 500,
    success: false,
});
