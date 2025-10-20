export interface RegisterDTO {
  email: string;
  password: string;
  code: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface SendVerificationCodeDTO {
    email: string;
}