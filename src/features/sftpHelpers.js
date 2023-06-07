const fs = require('fs');
const Confirm = require('prompt-confirm');
const { SFTP_ADD, SFTP_PUBLIC, SFTP_SHOW, SFTP_DELETE } = require('../api/index')();

const actions = {
  'add': (name, path) => {
    if (fs.existsSync(path)) {
      fs.readFile(path, 'utf8', async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const id = await SFTP_ADD({
          name, 
          data
        });

        if(id == false) {
          console.log("Error: Add failed, please try again!");
          return;
        }

        const id_publish = await SFTP_PUBLIC(id);
        if(id_publish == false) {
          console.log("Error: Publish failed, please try again!");
          return;
        }

        console.log(`Added sFTP Information successfully! (ID: ${ id })`);
      });
    }
    
  },
  'update': (id, name, path) => {
    console.log(path)
  },
  'delete': async (id) => {
    const prompt = new Confirm(`Are you sure remove this ID?`);
    prompt.ask(async function(answer) {
      if(answer != true) return;

      const result = await SFTP_DELETE(id)
      if(result == true) {
        console.log(`Deleted #${ id } successfully.`)
      } else {
        console.log(`ERROR: Delete #${ id } failed. Please try again later!`);
      }
    });
    return;
  },
  'load': (id, path) => {
    console.log(id, path)
  },
  'show': async (id) => {
    const result = await SFTP_SHOW(id);
    console.log(result);
  }
}

module.exports = function sftpHelpers (action, ...args) {
  if(actions[action]) {
    actions[action](...args);
  } else {
    console.log('Action not found! :(');
  }
}