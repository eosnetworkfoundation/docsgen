const algoliasearch = require('algoliasearch')

// init prop reader object
const propertiesReader = require('properties-reader');
// init argument parser
const envArguments = require('./arguments');
// get env file
let property_file_name = envArguments.parse();
console.log(`opening prop file ${property_file_name}`)
// get the properties
const properties = propertiesReader(property_file_name);
// set properties
const publicApiKey = properties.get('algolia.publicApiKey');
const privateApiKey = properties.get('algolia.privateApiKey');
const appId = properties.get('algolia.appId');
const indexName = properties.get('algolia.indexName');

// Connect and authenticate with your Algolia app
const client = algoliasearch(appId, privateApiKey)
const index = client.initIndex(indexName)

objectIDs = ["welcome-latest-overview-","welcome-latest-overview-1","welcome-latest-overview-2","welcome-latest-overview","welcome-latest-overview--2","welcome-latest-overview--1"];
index.deleteObjects(objectIDs).then(({ objectIDs }) => {
  console.log(objectIDs);
});
