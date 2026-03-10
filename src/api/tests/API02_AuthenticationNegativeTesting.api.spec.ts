import { test, expect } from '@playwright/test';
import { APIClient } from '../clients/APICLient';
import * as user from '../clients/Users';


test('API001 - Register user successfully', async ({ request }) => {

    const api = new APIClient(request);
    const response = await api.register(user.registerUser);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toEqual(expect.any(Number));
    expect(body.id).toBeGreaterThan(0);
    expect(body.token).toBeTruthy();
    expect(body.token).toEqual(expect.any(String));
    expect(body.token.length).toBeGreaterThan(0);

});

test('API002 - Failed  password', async ({ request }) => {

    const api = new APIClient(request);
    const response = await api.register(user.registerUserNoPass);

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toBeDefined();
    expect(body.error).toEqual('Missing password');

});

test('API003 - Login', async ({ request }) => {

    const api = new APIClient(request);
    const response = await api.login(user.registerUser);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);

});

test('API004 - Login failed', async ({ request }) => {

    const api = new APIClient(request);
    const response = await api.login(user.registerUserNoPass);

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toBeDefined();
    expect(body.error).toEqual('Missing password');

});