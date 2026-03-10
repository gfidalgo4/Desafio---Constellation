import { test, expect } from '@playwright/test';
import { validateTimestamp } from '../clients/Helper'
import { APIClient } from '../clients/APICLient';
import * as user from '../clients/Users';


test('API001 - Verify page', async ({ request }) => {

    const api = new APIClient(request);
    const response = await api.getUsersPage(2);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.page).toBe(2);
    expect(body.per_page).toBeGreaterThan(0);
    expect(body.total).toBeGreaterThan(0);
    expect(body.total_pages).toBeGreaterThan(0);
    expect(body.data.length).toBeGreaterThan(0);

});

test('API002 - Verify user', async ({ request }) => {
    const userId = 12;

    const api = new APIClient(request);
    const response = await api.getUser(userId);

    expect(response.status()).toBe(200);

    const body = await response.json();
    const user = body.data;

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
    expect(user).toHaveProperty('avatar');

    expect(user.id).toBe(userId);
    expect(user.email).toContain('@');
    expect(user.first_name.length).toBeGreaterThan(0);
    expect(user.last_name.length).toBeGreaterThan(0);
    expect(user.avatar).toContain('jpg');
});

test('API003 - Create new user', async ({ request }) => {

    const userG = user.generateUser();
    const api = new APIClient(request);
    const response = await api.createUser(userG);

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.name).toBe(userG.name);
    expect(body.job).toBe(userG.job);
    expect(parseInt(body.id)).toBeGreaterThan(0);
    validateTimestamp(body.createdAt);

});

test('API004 - Update user', async ({ request }) => {

    const userG = user.generateUser();
    const api = new APIClient(request);
    const response = await api.updateUser(2,userG);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.name).toBe(userG.name);
    expect(body.job).toBe(userG.job);
    
    validateTimestamp(body.updatedAt);
});

test('API005 - Delete user', async ({ request }) => {

    const api = new APIClient(request);
    const response = await api.deleteUser(2);

    expect(response.status()).toBe(204);

});


for (const userData of user.nUsers) {
    test(`API006 - Get user ${userData.id}`, async ({ request }) => {

        const response = await request.get(`/api/users/${userData.id}`);

        expect(response.status()).toBe(200);

    });
}