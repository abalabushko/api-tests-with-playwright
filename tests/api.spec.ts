import { test, expect } from '@playwright/test';

test.describe.parallel('Api testing', () => {

  const USERS_URL = 'users/';
  const USER_ID = '2';
  const LOGIN_URL = 'login';

  test('Get user data', async ({ request }) => {
    const response = await request.get(USERS_URL + USER_ID, {
      headers : {'x-api-key': 'reqres-free-v1'},
    });
    const responseBody = JSON.parse(await response.text());
    
    expect(response.ok()).toBeTruthy();
    expect(responseBody.data.id).toBe(2);
 
    expect(responseBody.data.first_name).toBe('Janet');
    expect(responseBody.data.last_name).toBe('Weaver');
    expect(responseBody.data.avatar).toBeTruthy();
  });

  test('POST create a new user', async ({ request }) => {
    const id = 500;
    const response = await request.post(USERS_URL, {
      headers : {'x-api-key': 'reqres-free-v1'},
      data: {
        id: id,
      },
    });
    const responseBody = JSON.parse(await response.text());
    
    expect(response.ok()).toBeTruthy();
    expect(responseBody.id).toBe(id);
    expect(responseBody.createdAt).toBeTruthy();
  });


  test('POST login', async ({ request }) => {

    const response = await request.post(LOGIN_URL, {
      headers : {'x-api-key': 'reqres-free-v1'},
      data: {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.ok()).toBeTruthy();
    expect(responseBody.token).toBeTruthy();
  });

  test('POST login failed', async ({ request }) => {

    const response = await request.post(LOGIN_URL, {
      headers : {'x-api-key': 'reqres-free-v1'},
      data: {
        email: "eve.holt@reqres.in"
      },
    });
    const responseBody = JSON.parse(await response.text());
    
    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe('Missing password');
  });

  test('PUT update user', async ({ request }) => {
    const name = 'Eva';
    const job = 'rezident';
    const response = await request.put(USERS_URL + USER_ID, {
      headers : {'x-api-key': 'reqres-free-v1'},
      data: {
        name: name,
        job: job
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.ok()).toBeTruthy();
    expect(responseBody.name).toBe(name);
    expect(responseBody.job).toBe(job);
    expect(responseBody.updatedAt).toBeTruthy();
  });

  test('DELETE user', async ({ request }) => {

    const response = await request.delete(USERS_URL + USER_ID, {
      headers : {'x-api-key': 'reqres-free-v1'},
    });
    
    expect(response.ok()).toBeTruthy();
  });
})
