const fs = require('fs');
const { PATH_AUTH_LOG } = require('../config')();

module.exports = function() {
  return {
    isAuth: async () => {
      const _auth = await new Promise((resolve, reject) => {
        if (fs.existsSync(PATH_AUTH_LOG)) {
          fs.readFile(PATH_AUTH_LOG, 'utf8', async (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
  
            const { user, pass } = JSON.parse(data);
            resolve({ user, pass })
          })
        } else {
          resolve(false)
        }
      });
      
      return _auth;
    }
  }
}