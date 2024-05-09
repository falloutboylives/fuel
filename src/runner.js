/*
 ** FUEL package runner
 */

const express = require("express");
const https = require("https");
const os = require('os');
const fs = require("fs");
const path = require('path');
const extensions = require('./extensions.js');
const { isPackageInstalled } = require('./manager.js');

function runPackage(packageName, port, guestMode) {
  const packageFolder = path.join(os.homedir(), ".fuel/installed", packageName);

  // check the package is installed
  if (!guestMode && !isPackageInstalled(packageName)) {
    console.error(`Package "${packageName}" is not installed. Please install it first.`);
    return;
  }

  // load the manifest
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(path.join(packageFolder, "manifest.json"), 'utf8'));
  } catch (err) {
    console.error(`Error reading manifest file for package ${packageName}: `, err);
    return;
  }

  // TODO validate the manifest file against the schema
  // TODO validate the manifest file signature
  // TODO validate the contents of the package folder against the manifest file
  // TODO validate the digests in the manifest file against the actual files

  const app = express();

  // Serve extensions if not in guest mode
  if (!guestMode) {
    app.get('/global/:extension/*', (req, res) => {
      extensions.callExtension(req.params.extension, true, req.params[0], req, res);
    });
    app.get('/package/:extension/*', (req, res) => {
      extensions.callExtension(req.params.extension, false, req.params[0], req, res);
    });
  } else {
    console.log('Running in guest mode');
  }

  // TODO add the main route for the entryPoint in manifest
  app.get('/', (req, res) => {
    const entryPointPath = path.join(packageFolder, manifest.entryPoint);
    res.sendFile(entryPointPath);
  });

  // Serve all files from the package folder
  // TODO confirm the file is in listed in the manifest AND is in the package folder
  console.log(`Serving app from ${packageFolder}`);
  app.use(express.static(packageFolder));

  // get the https credentials
  const options = {
    key: fs.readFileSync('./credentials/server.key'),
    cert: fs.readFileSync('./credentials/server.cert')
  };

  console.log(`Starting server on port ${port}`);
  https.createServer(options, app).listen(port, () => {
    console.log(`FUEL app "${packageName}" listening on port ${port}.\nGo to https://localhost:${port}/`);
  });
}

module.exports = {
  runPackage
};
