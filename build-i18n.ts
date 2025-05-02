import * as fs from 'fs/promises';
import * as path from 'path';

const localesDir = path.resolve(__dirname, 'locales');
const templateFile = path.resolve(__dirname, 'index.html');
const outputDir = path.resolve(__dirname, 'dist');

interface LocaleData {
    [key: string]: string | undefined;
}

async function buildI18n(): Promise<void> {
    try {
        const template = await fs.readFile(templateFile, 'utf-8');
        const locales = await fs.readdir(localesDir);

        await fs.rm(outputDir, { recursive: true, force: true });
        await fs.mkdir(outputDir, { recursive: true });

        for (const localeFile of locales) {
            if (localeFile.endsWith('.json')) {
                const langCode = localeFile.slice(0, -5);
                try {
                    const localeData: LocaleData = JSON.parse(
                        await fs.readFile(path.join(localesDir, localeFile), 'utf-8')
                    );
                    let outputHtml = template;
                    for (const key in localeData) {
                        if (localeData.hasOwnProperty(key)) {
                            outputHtml = outputHtml.replace(`{{${key}}}`, localeData[key] || '');
                        }
                    }

                    const langOutputDir = path.join(outputDir, langCode);
                    await fs.mkdir(langOutputDir, { recursive: true });
                    await fs.writeFile(path.join(langOutputDir, 'index.html'), outputHtml);
                } catch (error) {
                    console.error(`Error during localization file processing ${localeFile}:`, error);
                }
            }
        }

        console.log('i18n build successfully.');
    } catch (error) {
        console.error('Error during i18n building:', error);
    }
}

buildI18n().catch((error) => {
    console.error('Unsupported error', error);
    process.exit(1);
});