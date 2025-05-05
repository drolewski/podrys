import * as fs from 'fs/promises';
import * as path from 'path';

const localesDir = path.resolve(__dirname, 'locales');
const templateFile = path.resolve(__dirname, 'dist-tmp' ,'index.html');
const outputDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'dist-tmp');
const baseLang = 'pl';

interface LocaleData {
    [key: string]: string | undefined;
}

async function buildI18n(): Promise<void> {
    try {
        const template = await fs.readFile(templateFile, 'utf-8');
        const locales = await fs.readdir(localesDir);

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
                            const regexpString = `{{${key}}}`
                            outputHtml = outputHtml.replace(RegExp(regexpString, 'ig'), localeData[key] || '');
                        }
                    }

                    let langOutputDir = outputDir;
                    if (langCode !== baseLang) {
                        langOutputDir = path.join(outputDir, langCode);
                        await fs.mkdir(langOutputDir, { recursive: true });
                    }

                    outputHtml = outputHtml.replace(RegExp('src="/assets/', 'g'), `src="/podrys/assets/`);
                    outputHtml = outputHtml.replace(RegExp('href="/assets/', 'g'), `href="/podrys/assets/`);

                    await fs.writeFile(path.join(langOutputDir, 'index.html'), outputHtml);

                    const buildFiles = await fs.readdir(srcDir);
                    const langs = locales.map(l => l.slice(0, -5));
                    for (const file of buildFiles) {
                        if (!file.endsWith('index.html') && !(langs.includes(langOutputDir.slice(-2)) && file.endsWith('assets'))) {
                            const filePath = path.join(srcDir, file);
                            const destPath = path.join(langOutputDir, file);
                            await fs.cp(filePath, destPath, {recursive: true});
                        }
                    }
                } catch (error) {
                    console.error(`Error during localization file processing ${localeFile}:`, error);
                }
            }
        }

        await fs.rm(srcDir, { recursive: true, force: true });

        console.log('i18n build successfully.');
    } catch (error) {
        console.error('Error during i18n building:', error);
    }
}

buildI18n().catch((error) => {
    console.error('Unsupported error', error);
    process.exit(1);
});