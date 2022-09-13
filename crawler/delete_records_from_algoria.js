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

objectIDs = ["a639e7c1-2786-459c-8a0a-c569132fc5b7","9489f4eb-d2a0-49b0-891e-26344097c520","6115f98a-3f7e-4976-96ef-8aa572b6627a"];
index.deleteObjects(objectIDs).then(({ objectIDs }) => {
  console.log(objectIDs);
});
