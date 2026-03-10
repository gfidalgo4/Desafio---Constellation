import { test, expect } from '@playwright/test';
import { validateTimestamp } from '../clients/Helper'
import * as user from '../clients/Users';


test('API001 - Verify page', async ({ request }) => {

    const response = await request.get('users?page=2');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.page).toBe(2);
    expect(body.per_page).toBeGreaterThan(0);
    expect(body.total).toBeGreaterThan(0);
    expect(body.total_pages).toBeGreaterThan(0);

    expect(body.data.length).toBeGreaterThan(0);

});

test('API002 - Verify single user', async ({ request }) => {
    const userId = 12;

    const response = await request.get(`users/${userId}`);

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

    const response = await request.post('/api/users', {
        data: user.newUser
    });

    // validar status
    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.name).toBe(user.newUser.name);
    expect(body.job).toBe(user.newUser.job);
    expect(parseInt(body.id)).toBeGreaterThan(0);

    validateTimestamp(body.createdAt);

});

test('API004 - Update user', async ({ request }) => {

    const userId = 2;

    const response = await request.put(`/api/users/${userId}`, {
        data: user.updateUser
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.name).toBe(user.updateUser.name);
    expect(body.job).toBe(user.updateUser.job);
    
    validateTimestamp(body.updatedAt);
});

test('API005 - Delete user', async ({ request }) => {

    const userId = 2;

    const response = await request.delete(`/api/users/${userId}`);

    expect(response.status()).toBe(204);

});