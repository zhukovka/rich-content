/* eslint-disable no-console */
const execSync = require('child_process').execSync;
const chalk = require('chalk');
const semver = require('semver');
const memoize = require('lodash/memoize');
const get = require('lodash/get');
const lernaPackages = require('lerna-packages');

const LATEST_TAG = 'latest';
const NEXT_TAG = 'next';
const OLD_TAG = 'old';

const getPackageDetails = memoize(pkg => {
  try {
    const npmShowCommand = `npm show ${pkg.name} --registry=${pkg.registry} --json`;
    return JSON.parse(
      execSync(npmShowCommand, { stdio: ['pipe', 'pipe', 'ignore'] }),
    );
  } catch (error) {
    if (!error.stdout.toString().includes('E404')) {
      console.error(chalk.red(`\nError: ${error}`));
    }
  }
});

function getPublishedVersions(pkg) {
  return get(getPackageDetails(pkg), 'versions', []);
}

function getLatestVersion(pkg) {
  return get(getPackageDetails(pkg), 'dist-tags.latest');
}

function shouldPublishPackage(pkg) {
  const remoteVersionsList = getPublishedVersions(pkg);

  return !remoteVersionsList.includes(pkg.version);
}

function getTag(pkg) {
  const latestVersion = getLatestVersion(pkg);

  const isLessThanLatest = () => latestVersion && semver.lt(pkg.version, latestVersion);

  const isPreRelease = () => semver.prerelease(pkg.version) !== null;

  if (isLessThanLatest()) {
    return OLD_TAG;
  }

  if (isPreRelease()) {
    return NEXT_TAG;
  }

  return LATEST_TAG;
}

function publish(pkg) {
  const publishCommand = `npm publish ${pkg.path} --tag=${getTag(pkg)} --registry=${pkg.registry}`;

  if (!process.env.IS_BUILD_AGENT) {
    console.log(
      chalk.yellow(`${pkg.name}@${pkg.version} will not be published because we're not running in a CI build agent`),
    );
    return false;
  }

  console.log(
    chalk.magenta(`Running: "${publishCommand}" for ${pkg.name}@${pkg.version}`),
  );

  execSync(publishCommand, { stdio: 'inherit' });
  return true;
}

function release(pkg) {
  console.log(`\nStarting the release process for ${chalk.bold(pkg.name)}`);

  if (!shouldPublishPackage(pkg)) {
    console.log(
      chalk.blue(
        `${pkg.name}@${pkg.version} already exists on registry ${pkg.registry}`,
      ),
    );
    console.log('No publish performed');
    return;
  }

  const published = publish(pkg);
  if (published) {
    console.log(
      chalk.green(`Published "${pkg.name}@${pkg.version}" succesfully to ${pkg.registry}`),
    );
  } else {
    console.log('No publish performed');
  }
}

lernaPackages()
  .filter(p => !p.private)
  .forEach(p => release(p));
