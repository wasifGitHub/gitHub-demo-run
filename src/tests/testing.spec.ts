import {test, expect, Page} from '@playwright/test';

test('Testing', async ({page}) => {
    await page.goto('https://www.google.com')
    console.log('open')
});