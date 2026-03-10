import { APIRequestContext } from '@playwright/test';

export class APIClient {
    constructor(private request: APIRequestContext) {}

    async getUsersPage(page: number) {
        return this.request.get(`/api/users?page=${page}`);
    }

    async getUser(id: number) {
        return this.request.get(`/api/users/${id}`);
    }

    async createUser(data: { name: string; job: string }) {
        return this.request.post('/api/users', { data });
    }

    async updateUser(id: number, data: any) {
        return this.request.put(`/api/users/${id}`, { data });
    }

    async deleteUser(id: number) {
        return this.request.delete(`/api/users/${id}`);
    }

    async userDelay(delay: number) {
        return this.request.delete(`/api/users?${delay}`);
    }

    async login(data: any) {
        return this.request.post('/api/login', { data });
    }

    async register(data: any) {
        return this.request.post('/api/register', { data });
    }
}