import { request } from "../utils/request"

interface SendVerificationCode {
    email: string
}

interface RegisterRequest {
    password: string;
    email: string;
    code: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

export function sendVerificationCodeAPI(data: SendVerificationCode) {
    return request({
        url: '/user/send-code',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    })
}

export function registerAPI(data: RegisterRequest) {
    return request({
        url: '/user/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    })
}

export function loginAPI(data: LoginRequest) {
    return request({
        url: '/user/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    })
}
