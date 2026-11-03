// Switches which copy of Verity the site uses, or says which one it's using.
//
//   npm run verity:local   your Verity folder (../verity-design-system), linked
//   npm run verity:tag     the version in package.json (a GitHub tag)
//   npm run verity:which   which one is in node_modules now
//
// Neither switch changes package.json or package-lock.json, so they always
// name the tag. A plain `npm install` also goes back to the tag.

import { execSync } from 'node:child_process';
import { lstatSync, readFileSync, realpathSync } from 'node:fs';

const INSTALLED = 'node_modules/verity-design-system';
const LOCAL = '../verity-design-system';

function which() {
  let stats;
  try {
    stats = lstatSync(INSTALLED);
  } catch {
    return 'Verity isn’t installed. Run npm install.';
  }
  if (stats.isSymbolicLink()) {
    return `Local: linked to ${realpathSync(INSTALLED)}\nKeep \`npm run build:watch\` running in Verity so changes show up.`;
  }
  const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  const commit = lock.packages[INSTALLED]?.resolved?.split('#')[1]?.slice(0, 7);
  return `Tag: ${pkg.dependencies['verity-design-system']} (commit ${commit})`;
}

const run = (command) => execSync(command, { stdio: 'inherit' });

switch (process.argv[2]) {
  case 'local':
    run(`npm install --no-save ${LOCAL}`);
    break;
  case 'tag':
    // Remove the link first, so npm reinstalls the tagged copy from the lockfile
    run(`rm -rf ${INSTALLED}`);
    run('npm install');
    break;
}
console.log(which());
