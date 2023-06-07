const fs = require('fs');
const fse = require('fs-extra');
const Table = require('cli-table');
const Confirm = require('prompt-confirm');
const { SFTP_ADD, SFTP_PUBLIC, SFTP_SHOW, SFTP_DELETE, SFTP_UPDATE, SFTP_LIST } = require('../api/index')();
const { isAuth } = require('../helpers')();

const actions = {
  'add': (user, name, path) => {
    if (fs.existsSync(path)) {
      fs.readFile(path, 'utf8', async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const id = await SFTP_ADD({
          name, 
          data,
          user
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
  'update': async (user, id, name, path) => {
    if (fs.existsSync(path)) {
      fs.readFile(path, 'utf8', async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const _id = await SFTP_UPDATE({
          id, 
          name,
          data,
          user
        });

        if(_id == false) {
          console.log("Error: Update failed, please try again!");
          return;
        }

        const id_publish = await SFTP_PUBLIC(_id);
        if(id_publish == false) {
          console.log("Error: Publish failed, please try again!");
          return;
        }

        console.log("Updated successful.");
      })
    }
    
  },
  'delete': async (user, id) => {
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
  'put': async (user, id, path) => {
    const { config } = await SFTP_SHOW(id);

    fse.outputFile(path, config)
      .then(() => {
        console.log("successfully.");
      })
      .catch(err => {
        console.error(err)
      });
  },
  'show': async (user, id) => {
    const result = await SFTP_SHOW(id);
    console.log(result);
  },
  'list': async (user, search) => {
    search = search ?? '';
    const result = await SFTP_LIST(search);

    if(result.length == 0) {
      console.log('No items found!');
      return;
    }

    var table = new Table({
      head: Object.keys(result[0])
    });

    result.forEach((item, _index) => {
      let _item = Object.values(item).map(_i => (_i ? _i : ''));
      table.push(_item);
    });

    console.log(table.toString());
  }
}

module.exports = async function sftpHelpers (action, ...args) {
  const Auth = await isAuth();
  if(Auth == false) {
    console.log('Please login.');
    return;
  }

  const { user } = Auth;

  if(actions[action]) {
    actions[action](user, ...args);
  } else {
    console.log('Action not found! :(');
  }
}