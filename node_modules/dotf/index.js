const fs = require('fs');
const jsonfile = require('jsonfile');
const os = require('os');
const path = require('path');

/**
 * Read, Write, or Exist Dotfiles
 * @param  {__dirname} dirname The relative dirname
 * @param  {string} name The dotfile name
 * @return {object} exists, read, or write Promises
 */
module.exports = (dirname, name) => {
  if (!name || !dirname) {
    return console.error('Both name and dirname parameters are required');
  }

  if (dirname.charAt(0) === '~') {
    dirname = os.homedir();
  }
  const filename = `.${name}`;
  const fullpath = path.join(dirname, filename);

  return {
    exists: () => new Promise((resolve, reject) => {
      fs.exists(fullpath, resolve);
    }),
    read: () => new Promise((resolve, reject) => {
      jsonfile.readFile(fullpath, (err, obj) => {
        if (err) return reject(err);
        resolve(obj);
      });
    }),
    write: (obj) => new Promise((resolve, reject) => {
      jsonfile.writeFile(fullpath, obj, (err) => {
        if (err) return reject(err);
        // if a platform is not Windows(include x64)
        if ('win32' !== process.platform) {
          // same as chmod 600
          fs.chmodSync(fullpath, fs.constants.S_IRUSR | fs.constants.S_IWUSR);
        }
        resolve(obj);
      });
    }),
    delete: () => new Promise((resolve, reject) => {
      fs.unlinkSync(fullpath);
      resolve();
    }),
  };
};
