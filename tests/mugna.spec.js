import {test, expect} from '@playwright/test';
import MainPage from '../pages/MainPage';
import Estimator from '../pages/Estimator';
import projects from '../data/estimatorData';
import { assert } from 'console';

test.describe('Mugna', () => {
    // Go to the main page before each test
    // test.beforeEach(async ({ page }) => {
    //     const main = new MainPage(page);
    //     await main.navigate();
    //     await expect(page).toHaveURL('https://www.mugna.tech/');

    // });

    // Test that the page scrolls down to the services section
    test('should scroll down to services', async ({ page }) => {
        // Click on the "Learn More" button
        await page.getByRole('button', { name: 'Learn More arrow left' }).click();
        // Check that the services section is visible
        await expect(page.locator('.bg-services')).toBeVisible();
    });

    // Test that the contact link is visible on all pages
    test('should see contact in all pages', async ({ page }) => {
        // List of pages to test
        const links = ['','services','portfolio','about','blog'];
        // Iterate over the pages
        for (const link of links) {
            // Go to the page
            const main = new MainPage(page);
            await main.navigate('https://www.mugna.tech/' + link);
            // Scroll down to the contact section
            await main.scroll_to_contact(page);
            // Check that the contact link is visible
            await expect(page.getByRole('link', { name: 'Contact Us' })).toBeVisible();
        }
    });

    test('should estimate correct amount', async ({ page }) => {
        const estimator = new Estimator(page);
        await estimator.navigate('https://www.mugna.tech/project-estimator');
        
        await estimator.input_staff(projects);
        

    });

});
