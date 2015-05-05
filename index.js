#!/usr/bin/env node

'use strict';

require('supererror');

var program = require('commander'),
    fs = require('fs'),
    execSync = require('child_process').execSync,
    _ = require('underscore'),
    util = require('util'),
    path = require('path');

program.version('0.2.0')
    .option('--env <environment>', 'Environment', 'dev')
    .option('--app <name>', 'Run within a specified app environment')
    .option('--cmd <command>', 'Run command')
    .option('--ecosystem <ecosystem.json>', 'The ecosystem to work with', path.join(__dirname, 'ecosystem.json'))
    .parse(process.argv);

function exit(error) {
    if (error instanceof Error) console.log(error.message);
    else if (error) console.log(error);
    process.exit(error ? 1 : 0);
}

if (!program.cmd) exit('--cmd is mandatory');
if (!fs.existsSync(program.ecosystem)) exit('not such file ' + program.ecosystem);

var eco = null;
var app = null;

try {
    eco = JSON.parse(fs.readFileSync(program.ecosystem, 'utf8'));
} catch (e) {
    exit(util.format('Failed to parse ecosystem:', e));
}

if (program.app) {
    eco.apps.some(function (a) {
        if (a.name === program.app) {
            app = a;
            return true;
        }

        return false;
    });
} else {
    app = eco.apps[0];
}

if (!app) exit(util.format('Unable to find app %s in %s', program.app, program.ecosystem));
if (!app['env_' + program.env]) exit(util.format('Application %s does not have an %s environment', program.app, program.env));

var env = _.extend(app['env'], app['env_' + program.env]);

try {
    console.log(execSync(program.cmd, { env: env }).toString('utf8'));
} catch (e) {
    exit(e);
}
