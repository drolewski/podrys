import * as fs from 'fs/promises';
import * as path from 'path';

const directoryToRemove: string = path.resolve(__dirname, 'dist/dist');

async function removeDirectory(): Promise<void> {
    try {
        await fs.rm(directoryToRemove, { recursive: true, force: true });
        console.log(`Successfully removed directory: ${directoryToRemove}`);
    } catch (error) {
        console.error(`Error removing directory ${directoryToRemove}:`, error);
    }
}

removeDirectory().catch((error) => {
    console.error('Unhandled error during directory removal:', error);
    process.exit(1);
});