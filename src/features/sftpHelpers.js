const fs = require('fs');
const { SFTP_ADD } = require('../api/index')();

const actions = {
  'add': (name, path) => {
    // console.log(name, path)
    if (fs.existsSync(path)) {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }


        
      });
    }
    
  },
  'update': (id, name, path) => {
    console.log(path)
  },
  'delete': (id) => {
    console.log(id)
  },
  'load': (id, path) => {
    console.log(id, path)
  },
}

module.exports = function sftpHelpers (action, ...args) {

  if(actions[action]) {
    actions[action](...args);
  } else {
    console.log('Action not found! :(');
  }
}