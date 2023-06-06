const fs = require('fs');
const fetch = require('node-fetch');

const { ENDPOINT } = require('../../config')();

module.exports = function() {
  return {
    SFTP_ADD: () => {
      const _CREATE = `mutation CreateSFTP {
        createSFtpInformation(data: {config: '${ data }', lastUpdatedMember: "mike", name: "${ name }"}) {
          id
        }
      }`;

      const _PUBLISH = `mutation PublishSFTP {
        publishSFtpInformation(where: {id: "clik1d9ytcq900b1cmpj0y1h7"}) {
          id
        }
      }`;
    }
  }  
}