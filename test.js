var assert = require('assert');

console.log('Run tests');

console.log('=> check environment');
assert.strictEqual(process.env['PM2_TEST'], 'tester');

console.log('=> check cwd');
assert.strictEqual(process.cwd(), '/tmp');

console.log('Done');
