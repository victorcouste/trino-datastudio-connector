/* eslint-disable no-unused-vars */
import dotf from '.';
import test from 'ava';
const fs = require('fs');
const path = require('path');
const os = require('os');

// Creates
test('write', async (t) => {
  // overwrite data
  const dotglobalfullpath = path.join(os.homedir(), '.myrc1');
  const dotlocalfullpath = path.join(__dirname, '.myignore1');
  const dotglobal = dotf('~', 'myrc1'); // Global (~)
  const dotlocal = dotf(__dirname, 'myignore1'); // Local (./)
  const writeGlobal = await dotglobal.write({a: 1});
  const writeLocal = await dotlocal.write({a: 1});

  // if a platform is not Windows(include x64)
  if ('win32' !== process.platform) {
    // If file permission is incorrect,
    // {{file permission value} logical AND {777 in octal}}
    // !== {correct permission value}.
    if ((fs.statSync(dotglobalfullpath).mode & 0o777) !== (fs.constants.S_IRUSR
      | fs.constants.S_IWUSR)) {
      t.fail();
    }
    if ((fs.statSync(dotlocalfullpath).mode & 0o777) !== (fs.constants.S_IRUSR
      | fs.constants.S_IWUSR)) {
      t.fail();
    }
  }
  t.pass();
  await dotglobal.delete();
  await dotlocal.delete();
});
test('exists', async (t) => {
  const dotglobal = dotf('~', 'myrc2'); // Global (~)
  const dotlocal = dotf(__dirname, 'myignore2'); // Local (./)
  await dotglobal.write({a: 1});
  await dotlocal.write({a: 1});
  const existsGlobal = await dotglobal.exists();
  const existsLocal = await dotlocal.exists();
  t.pass();
  await dotglobal.delete();
  await dotlocal.delete();
});
test('read', async (t) => {
  const dotglobal = dotf('~', 'myrc3'); // Global (~)
  const dotlocal = dotf(__dirname, 'myignore3'); // Local (./)
  await dotglobal.write({a: 1});
  await dotlocal.write({a: 1});
  const readGlobal = await dotglobal.read();
  const readLocal = await dotlocal.read();
  t.pass();
  await dotglobal.delete();
  await dotlocal.delete();
});
test('delete', async (t) => {
  const dotglobal = dotf('~', 'myrc4'); // Global (~)
  const dotlocal = dotf(__dirname, 'myignore4'); // Local (./)
  dotglobal.write({a: 1}).then(() => {
    dotglobal.delete().then(() => {
      t.pass();
    });
  });
  dotlocal.write({a: 1}).then(() => {
    dotlocal.delete().then(() => {
      t.pass();
    });
  });
});
