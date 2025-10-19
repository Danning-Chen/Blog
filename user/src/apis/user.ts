import { request } from "../utils/request"

interface SendVerificationCode {
    email: string
}

export function sendVerificationCode(data: SendVerificationCode) {
    return request({
        url: '/user/send-code',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    })
}
