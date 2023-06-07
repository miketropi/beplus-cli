const fs = require('fs');
const fetch = require('node-fetch');
const { ENDPOINT, TOKEN } = require('../../config')();

const _Request = async (query, variables = {}, method = 'POST') => {
  const result = await fetch(ENDPOINT, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })
  
  return await result.json();
}

module.exports = function() {
  return {
    SFTP_ADD: async ({ name, data, user }) => {
      const _CREATE = `mutation CreateSFTP($config: String!) {
        createSFtpInformation(data: {config: $config, lastUpdatedMember: "${ user }", name: "${ name }"}) {
          id
        }
      }`;

      const variables = { config: data };
      try {
        const result = await _Request(_CREATE, variables);
        return result.data.createSFtpInformation.id;
      } catch (e) {
        console.error(e.message);
        return false;
      }
      
    },
    SFTP_PUBLIC: async (id) => {
      const _PUBLISH = `mutation PublishSFTP {
        publishSFtpInformation(where: {id: "${ id }"}) {
          id
        }
      }`;

      try {
        const result = await _Request(_PUBLISH);
        return result.data.publishSFtpInformation.id;
      } catch (e) {
        console.error(e.message);
        return false;
      }
    },
    SFTP_SHOW: async (id) => {
      const _QUERY = `query GetSFTP {
        sFtpInformation(where: {id: "${ id }"}) {
          id
          name
          lastUpdatedMember
          config
          createdAt
          updatedAt
        }
      }`;

      try {
        const result = await _Request(_QUERY);
        return result.data.sFtpInformation;
      } catch (e) {
        console.error(e.message);
        return false;
      }
    },
    SFTP_DELETE: async (id) => {
      const _QUERY = `mutation SftpDelete {
        deleteSFtpInformation(where: {id: "${ id }"}) {
          id
        }
      }`;

      try {
        const result = await _Request(_QUERY);
        return true;
      } catch (e) {
        console.error(e.message);
        return false;
      }
    },
    SFTP_UPDATE: async ({ id, name, data, user }) => {
      const _QUERY = `mutation SftpUpdate($config: String, $lastUpdatedMember:String, $name: String, $id: ID) {
        updateSFtpInformation(
          data: {config: $config, lastUpdatedMember: $lastUpdatedMember, name: $name}
          where: {id: $id}
        ) {
          id
        }
      }`;

      const variables = {
        "config": data,
        "lastUpdatedMember": user,
        name,
        id
      }

      try {
        const result = await _Request(_QUERY, variables);
        return result.data.updateSFtpInformation.id;
      } catch (e) {
        console.error(e.message);
        return false;
      }
    },
    SFTP_LIST: async (search) => {
      const _QUERY = `query searchsFtpConfig {
        sFtpInformations(where: {_search: "${ search }"}) {
          id
          name
          lastUpdatedMember
        }
      }`;

      try {
        const result = await _Request(_QUERY);
        return result.data.sFtpInformations;
      } catch (e) {
        console.error(e.message);
        return false;
      }
    }
  }  
}