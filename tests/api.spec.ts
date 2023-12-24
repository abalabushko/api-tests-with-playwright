import { test, expect } from '@playwright/test';

test.describe.parallel('Api testing', () => {
  const baseURL = 'https://reqres.in/api';

  test('Get user data', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/2`);
    const responseBody = JSON.parse(await response.text());
    
    expect(response.status()).toBe(200);
    expect(responseBody.data.id).toBe(2)
 
    expect(responseBody.data.first_name).toBe('Janet');
    expect(responseBody.data.last_name).toBe('Weaver');
    expect(responseBody.data.avatar).toBeTruthy();
  });

  test('POST create a new user', async ({ request }) => {
    const id = 500;
    const response = await request.post(`${baseURL}/users`, {
      data: {
        id: id,
      },
    });
    const responseBody = JSON.parse(await response.text());
    
    expect(response.status()).toBe(201);
    expect(responseBody.id).toBe(id)
    expect(responseBody.createdAt).toBeTruthy();
  });


  test('POST login', async ({ request }) => {

    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      },
    });
    const responseBody = JSON.parse(await response.text());
    
    expect(response.status()).toBe(200);
    expect(responseBody.token).toBeTruthy();
  });

  test('POST login failed', async ({ request }) => {

    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: "eve.holt@reqres.in"
      },
    });
    const responseBody = JSON.parse(await response.text());
    
    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe('Missing password');
  });
})
