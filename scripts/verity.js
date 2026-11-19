// Switches which copy of Verity the site uses, or says which one it's using.
//
//   npm run verity:local   your Verity folder (../verity-design-system), linked
//   npm run verity:tag     the version in package.json (a GitHub tag)
//   npm run verity:which   which one is in node_modules now
//   node scripts/verity.js https   (runs on its own after every npm install,
//                                   as postinstall in package.json)
//
// To update Verity, change the tag at the end of verity-design-system's
// address in package.json (…#v0.11.2), then run `npm run verity:tag`.
//
// verity:local doesn't change package.json or package-lock.json, so they
// always name the tag. verity:tag installs the tag by name, so the lock file
// records the tag's commit (a plain `npm install` can keep an older commit
// for a changed tag), then makes sure the lock file fetches Verity over
// HTTPS. npm writes GitHub addresses as SSH (git+ssh://git@github.com/…),
// which needs an SSH key; Vercel's build machine has none.

import { execSync } from 'node:child_process';
import { lstatSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';

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

// Point Verity's address in package-lock.json at HTTPS instead of SSH. The
// same repo and commit, so nothing else changes.
function useHttps() {
  const SSH = 'git+ssh://git@github.com/';
  const HTTPS = 'git+https://github.com/';
  const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
  const entry = lock.packages[INSTALLED];
  if (entry?.resolved?.startsWith(SSH)) {
    entry.resolved = HTTPS + entry.resolved.slice(SSH.length);
    writeFileSync('package-lock.json', JSON.stringify(lock, null, 2) + '\n');
  }
}

switch (process.argv[2]) {
  case 'local':
    run(`npm install --no-save ${LOCAL}`);
    break;
  case 'https':
    // After any npm install: npm may have written SSH again
    useHttps();
    process.exit(0);
  case 'tag': {
    // Remove the link first, then install the tag named in package.json
    run(`rm -rf ${INSTALLED}`);
    const spec = JSON.parse(readFileSync('package.json', 'utf8')).dependencies['verity-design-system'];
    run(`npm install ${spec}`);
    useHttps();
    break;
  }
}
console.log(which());
