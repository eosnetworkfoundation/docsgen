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

// Search for "tutorial" in the indexName
index.search('tutorial').then(({ hits }) => {
  console.log(hits);
  console.log(hits[0]['_highlightResult']);
}).catch(() => {
  console.log("Search Error");
});

/*
client.getLogs({
  offset: 0, // where to start from, default to 0
  length: 10, // how many lines you want, default to 10
  type: 'all' // which logs you want, default to no value (all)
}).then(({ logs }) => {
  console.log(logs);
}).catch(() => { console.log("Error fetching logs"); });
*/
