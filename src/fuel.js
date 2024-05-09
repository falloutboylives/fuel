/*
** FUEL entry point
*/

const commander = require('commander');

const { runPackage } = require('./runner.js');
const { installPackage, listPackages, uninstallPackage } = require('./manager.js');

const program = new commander.Command();

program
  .option('--run-guest <package>', 'Run the package provided in guest mode')
  .option('-i, --install <package>', 'Install the package provided')
  .option('-r, --run <packageName>', 'Run the installed package')
  .option('-l, --list', 'List all installed packages')
  .option('-u, --uninstall <packageName>', 'Uninstall the package provided')
  .option('-p, --port <type>', 'Specify the default port for the app to listen on', 3000)
  .option('-h, --help', 'Display help for the program')
  .parse(process.argv);

// confirm that only one of the exclusive options is provided
const options = program.opts();
const runOptions = [options.install, options.runGuest, options.run, options.list, options.uninstall];
const numOptions = runOptions.filter(Boolean).length;
if (numOptions > 1) {
  console.error('You can only use one of --install, --runGuest, --run, --list, --uninstall at a time');
  process.exit(1);
}

// confirm that port is a valid number if provided
if (options.port && isNaN(options.port)) {
  console.error('Port must be a number');
  process.exit(1);
}
if (options.port && (options.port < 1024 || options.port > 65535)) {
  console.error('Port must be a number between 1024 and 65535');
  process.exit(1);
}

// main logic

if (options.list) {
  listPackages();
  process.exit(0);
}

if (options.uninstall) {
  uninstallPackage(options.uninstall);
  process.exit(0);
}

if (options.install) {
  installPackage(options.install);
  process.exit(0);
}
console.log(`Running with options ${JSON.stringify(options)}`);

if (options.run) {
  // TODO unzip in a temp folder
  console.log(`Running package ${options.run}`);
  runPackage(options.run, options.port, false);
  // this never exits
}

if (options.runGuest) {
  // TODO implement using runPackage
  console.log(`Running package ${options.runGuest} in guest mode`);
  runPackage(options.run, options.port, true);
  // this never exits
}
