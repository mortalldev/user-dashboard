export type ROLE = 'super_admin' | 'user';

export type AuthData = {
    email: string;
    role: ROLE;
};

export type LoginResponse = {
    access_token: string;
    refresh_token: string;
};
