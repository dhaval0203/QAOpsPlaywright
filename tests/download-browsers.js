const { execSync } = require('child_process');
const path = require('path');

// Force the environment variable inside the running node script
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(__dirname, '.playwright-browsers');

console.log('Starting offline browser download into .playwright-browsers...');
try {
  // Execute the install command using our locked-in environment variable
  execSync('npx playwright install', { stdio: 'inherit' });
  console.log('✓ Success! Browsers downloaded locally.');
} catch (error) {
  console.error('Download failed:', error);
}