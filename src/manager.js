/*
 ** FUEL package manager
 */

const os = require('os');
const path = require('path');
const fs = require("fs");

function unzipPackage(packageName) {
  // TODO implement
}

function validatePackage(packageName) {
  // TODO implement
}

function isPackageInstalled(packageName) {
  const packageFolder = path.join(os.homedir(), ".fuel/installed", packageName);
  console.log(`Checking if package is installed @ ${packageFolder}`);
  return fs.existsSync(packageFolder);
}

function uninstallPackage(packageName) {
  const packageFolder = path.join(os.homedir(), ".fuel/installed", packageName);
  console.log(`Uninstalling package @ ${packageFolder}`);
  fs.rmdirSync(packageFolder, { recursive: true });
}

function installPackage(packageName) {
  const packageFolder = path.join(os.homedir(), ".fuel/installed", packageName);
  console.log(`Installing package @ ${packageFolder}`);
  // TODO unzip the package under ~/.fuel folder
  // call the runPackage function with the folder path
}

function listPackages() {
  // TODO list all the files with .fuel extension in ~/.fuel
  console.log('Listing all installed packages');
}

module.exports = {
  isPackageInstalled,
  installPackage,
  listPackages,
  uninstallPackage
};
