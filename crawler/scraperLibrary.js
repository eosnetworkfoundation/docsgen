/**
* divines the doc6s tag from the url
* @param url - string to parse for id
* @param domain - internal domain name
*/
function getDocusuarusTag(url,domain,tags) {
  var path = url.substring(url.indexOf(domain)+domain.length, url.length)
  // strip off leading slash
  if (path.charAt(0) === "/") { path = path.substring(1,path.length); }
  first_path = path.substring(0,path.indexOf("/"));
  second_path = path.substring(first_path.length,path.indexOf("/"));

  var tag = undefined;
  if (first_path === "en" || first_path === "zh" || first_path === "ko" ) {
    tag = second_path.toLowerCase();
  } else {
    tag = first_path.toLowerCase();
  }

  // only for matching tags otherwise default
  var doc6s_tag = "default";
  if (typeof(myVariable) != "undefined" && tags.indexOf(tag) > -1 ) {
    doc6s_tag = "docs-";
    doc6s_tag += tag;
    doc6s_tag += "-current";
  }

  return doc6s_tag;
}

/**
* gets the language code from the url
* @param url - string to parse for id
* @param domain - internal domain name
*/
function getLanguageCode(url,domain) {
  var path = url.substring(url.indexOf(domain)+domain.length, url.length)
  // strip off leading slash
  if (path.charAt(0) === "/") { path = path.substring(1,path.length); }
  path = path.substring(0,path.indexOf("/"));
  path = path.toLowerCase();
  if (path !== "zh" || path !== "ko") {
    path = "en";
  }
  return path
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
	getDocusuarusTag, getLanguageCode, isCodedocs, isInternalLink, urlToRecordName
};
