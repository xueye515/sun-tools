#!/usr/bin/env node
console.log('hello tools');

const program = require('commander');
const join = require('path').join;
const exists = require('fs').existsSync;
var fs = require('fs');

program
  .version(require('../package.json').version)
  .usage('[options] [project name]')
  .on('--help', printHelp)
  .option('-W, --without <str | array>', 'generate project without some models(value can be `sass`、`coffee`、`jade`)')
  .parse(process.argv);

const aliases = {
  c: 'create',
};

let subcmd = program.args[0];
if (aliases[subcmd]) subcmd = aliases[subcmd];
if (!subcmd) {
  program.help();
} else {
  const bin = executable(subcmd);
  if (bin) {
    console.log(bin);
    require(bin).init(program, {
      cwd: program.args.slice(1),
    });
    // wrap(spawn(bin, args, { stdio: 'inherit', customFds: [0, 1, 2] }));
  } else {
    program.help();
  }
}

function wrap(sp) {
  sp.on('close', function (code) {
    process.exit(code);
  });
}

function executable(subcmd) {
  var file = join(__dirname, `${subcmd}\\index.js`);
  if (exists(file)) {
    return file;
  }
}

function printHelp() {
  console.log('  Commands:');
  console.log();
  console.log('    init           Init a new dva application in the current folder');
  console.log('    new            Creates a new application');
  console.log('    generate       Generates new code (short-cut alias: "g")');
  console.log();
  console.log('  All commands can be run with -h (or --help) for more information.')
}