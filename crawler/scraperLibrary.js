/**
* gets the id from the url
* @param url - string to parse for id
* @param domain - internal domain name
*/
function getParentId(url,domain) {
  var path = url.substring(url.indexOf(domain)+domain.length, url.length)
  // strip off leading slash
  if (path.charAt(0) === "/") { path = path.substring(1,path.length); }
  path = path.substring(0,path.indexOf("/"));
  return path.toLowerCase();
}

/**
* Make pretty name from id
* @param id - string to prettify
*/
function getParentName(id) {
  return id.charAt(0).toUpperCase() + id.slice(1);
}

/**
* Checks if this is code reference otherwise manual
* @param url - string to check
*/
function isCodedocs(url) {
  return url.indexOf("reference") > 0
}

/**
* is the link internal, we only want to follow internal links
* @param url - string to parse for id
* @param domain - internal domain name
*/
function isInternalLink(url,domain) {
  return url.indexOf(domain) > 0
}

/**
* transforms url into something we can use as a file name
* returns .json extension
* @param url
*/
function urlToRecordName(url) {
  // remove http(s)
  url = url.replace(/(http:\/\/|https:\/\/)/g, '');
  // remove trailing slash
  url = url.replace(/\/+$/, '');
  // replace slashes and dots with hyphen
  url = url.replace(/(\/|\.)/g, '-');
  return url + ".json";
}

module.exports = {
	getParentId, getParentName, isCodedocs, isInternalLink, urlToRecordName
};
