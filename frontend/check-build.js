// check-build.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
require('dotenv').config();

console.log('\n🔍 Running pre-build checks (final version)...\n');

let hasError = false;

// Helper function to safely parse JSON
function safeParseJSON(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (err) {
        return { __parseError: err.message };
    }
}

// 1️⃣ Check i18n files + parse them
const i18nLocales = ['en.json', 'fr.json', 'es.json', 'it.json', 'ko.json', 'zh.json'];
const i18nPath = path.join(__dirname, 'i18n/locales');

console.log('Checking i18n files:');
i18nLocales.forEach(file => {
    const filePath = path.join(i18nPath, file);
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Missing i18n file: ${file}`);
        hasError = true;
    } else {
        console.log(`✅ Found: ${file}`);
        // Try to parse JSON
        const jsonResult = safeParseJSON(filePath);
        if (jsonResult.__parseError) {
            console.error(`❌ Invalid JSON in ${file}: ${jsonResult.__parseError}`);
            hasError = true;
        } else {
            console.log(`✅ Valid JSON: ${file}`);
        }
    }
});


// 3️⃣ Check /content/blog/ folder and content validity
const blogContentPath = path.join(__dirname, 'content', 'en');

console.log('\nChecking /content/ folder:');
if (fs.existsSync(blogContentPath)) {
    const files = fs.readdirSync(blogContentPath).filter(f =>
        f.endsWith('.md') || f.endsWith('.mdx') || f.endsWith('.json')
    );

    if (files.length === 0) {
        console.error('❌ No content found in /content/. At least one file is required.');
        hasError = true;
    } else {
        console.log(`✅ Found ${files.length} blog content files`);

        // Check content validity
        files.forEach(file => {
            const filePath = path.join(blogContentPath, file);
            if (file.endsWith('.json')) {
                const jsonResult = safeParseJSON(filePath);
                if (jsonResult.__parseError) {
                    console.error(`❌ Invalid JSON in blog file ${file}: ${jsonResult.__parseError}`);
                    hasError = true;
                } else {
                    // Check required fields
                    const requiredFields = ['title', 'slug'];
                    requiredFields.forEach(field => {
                        if (!jsonResult[field]) {
                            console.error(`❌ Missing required field "${field}" in blog file: ${file}`);
                            hasError = true;
                        }
                    });
                }
            } else {
                // For .md or .mdx: parse frontmatter
                const content = fs.readFileSync(filePath, 'utf-8').trim();
                if (!content) {
                    console.error(`❌ Empty blog file: ${file}`);
                    hasError = true;
                } else {
                    try {
                        const parsed = matter(content);
                        const data = parsed.data;
                        const requiredFields = ['title', 'slug'];

                        requiredFields.forEach(field => {
                            if (!data[field]) {
                                console.error(`❌ Missing required frontmatter field "${field}" in blog file: ${file}`);
                                hasError = true;
                            }
                        });

                        if (!hasError) {
                            console.log(`✅ Blog file OK: ${file}`);
                        }
                    } catch (err) {
                        console.error(`❌ Error parsing frontmatter in file ${file}: ${err.message}`);
                        hasError = true;
                    }
                }
            }
        });
    }
} else {
    console.warn('⚠️ Folder /content/blog/ does not exist. If you use /blog/** route, this may cause build errors.');
}

// Final result
console.log('\n✅ Pre-build check completed.\n');

if (hasError) {
    console.error('❌ Errors detected. Please fix them before running "npm run generate" or "npm run build".\n');
    process.exit(1);
} else {
    console.log('🎉 All checks passed! Safe to proceed with build.\n');
}
