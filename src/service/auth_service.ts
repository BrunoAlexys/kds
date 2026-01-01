import { apiClient } from "./api";

interface LoginResponse {
    accessToken: string;
    user?: {
        id: string;
        email: string;
        name: string;
    }
}

class AuthService {
    
    private readonly LOGIN_ENDPOINT = '/auth/login';
    private readonly GOOGLE_LOGIN_ENDPOINT = '/auth/google';

    public async login(email: string, password: string): Promise<boolean> {
        try {
            const data = await apiClient.post<LoginResponse>(this.LOGIN_ENDPOINT, {
                email,
                password
            });

            if (data && data.accessToken) {
                localStorage.setItem('authToken', data.accessToken);

                if (data.user) {
                    localStorage.setItem('userInfo', JSON.stringify(data.user));
                }

                return true;
            }

            return false;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    }

    public async loginWithGoogle(code: string): Promise<boolean> {
        try {
            const data = await apiClient.post<LoginResponse>(this.GOOGLE_LOGIN_ENDPOINT, {
                code
            });

            return this.handleSession(data);
        } catch (error) {
            console.error('Google login failed:', error);
            return false;
        }
    }

    private handleSession(data: LoginResponse): boolean {
        if (data && data.accessToken) {
            localStorage.setItem('authToken', data.accessToken);
            if (data.user) {
                localStorage.setItem('userInfo', JSON.stringify(data.user));
            }

            return true;
        }

        return false;
    }

    public logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');

    }

    public isAuthenticated(): boolean {
        return !!localStorage.getItem('authToken');
    }
}

export default new AuthService();
