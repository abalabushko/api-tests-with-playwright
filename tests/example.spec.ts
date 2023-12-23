import { test, expect } from '@playwright/test';

test.describe.parallel('Api testing', () => {
  const baseURL = 'https://reqres.in/api';

  test('Get user data', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/2`);
    const responseBody = JSON.parse(await response.text());
    
    expect(response.status()).toBe(200);
    expect(responseBody.data.id).toBe(2)
    console.log(responseBody)
 
    // expect(responseBody.data.first_name).toContainText('Janet');
    // expect(responseBody.data.last_name).toContainText('Weaver');
    expect(responseBody.data.avatar).toBeTruthy();
  });
})
