import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import { users } from '../schemas/Users.schema';
import { APIClient } from '../clients/APICLient';

test('API001 - User error', async ({ request }) => {

    const api = new APIClient(request);
    const response = await api.getUser(25);

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body).toEqual({});

});

test('API002 - Delay', async ({ request }) => {

    const delay = 3;
    const startTime = Date.now();

    //const response = await request.get(`/api/users?delay=${delay}`);
    const api = new APIClient(request);
    const response = await api.userDelay(delay);

    const endTime = Date.now();
    const time = endTime - startTime;

    expect(response.status()).toBe(200);

    expect(time).toBeGreaterThan(delay * 1000);
    expect(time).toBeLessThan((delay + 2) * 1000);

    const body = await response.json();

    expect(body.page).toBeDefined();
    expect(body.data).toBeDefined();
    expect(body.data.length).toBeGreaterThan(0);

});

test('API003 - Validate schema', async ({ request }) => {

    const api = new APIClient(request);
    const response = await api.getUsersPage(2);

    expect(response.status()).toBe(200);

    const body = await response.json();

    const ajv = new Ajv();
    const validate = ajv.compile(users);

    const valid = validate(body);
    expect(valid).toBe(true);

});