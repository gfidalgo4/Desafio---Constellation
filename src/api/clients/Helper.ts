import { expect } from '@playwright/test';

export function validateTimestamp(
    timestamp: string,
    tolerance: number = 1200 * 1000 // 2 minuts
    ) {
        const time = new Date(timestamp).getTime();
        const now = Date.now();

        expect(time).toBeGreaterThanOrEqual(now - tolerance);
        expect(time).toBeLessThanOrEqual(now + tolerance);
}