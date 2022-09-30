# Ignore This Page on Site Search

**This page is only relevant if we want to run our own indexing of content.**
Site search is powered by Algoria. We use the Algoria crawler. This has the advantage of not requiring engineering resources.

**The following describes how to run our own Puppeteer based crawler to index documents in Alogria. We are not using this indexing code**

## Overview

Site is a single page app, need to use crawler to extract content. Use puppeteer to crawl site. Hash site contents and updates search index if there are any changes.

Use javascript API to push data records up.
**How To Run**
`npm run start env=dev`

## Search Document

What we upload to Algoria. Structured as JSON

### Required Fields

**Used for Search**
- hierarchy.lvl0 - "Documentation"
- hierarchy.lvl1 - all  H1 tags
- hierarchy.lvl2 - all H2 tags
- hierarchy.lvl3 - all H3 tags
- hierarchy.lvl4 - all H4 tags
- hierarchy.lvl5 - all H5 tags
- hierarchy.lvl6 - all H6 tags
- content - body of markdown

**Used for Filters**
- type - not sure what Algoria uses here , we use either *codedocs* or *manual* allows filtering to code reference
- language - [en|zh|ko]
- docusaurus_tag: the repository and version

**Other Tags**
- url - url of content

**Docusaurus Tags**
- default
- docs-leap-current
- docs-dune-current
- docs-default-current
- docs-system-contracts-current
- docs-cdt-current
- docs-swift-sdk-current
- docs-eosjs-current


## crawler
Using puppeteer

## Test Data
Under `testing/search/data`

## Other Commands
`node delete_records_from_algoria.js env=dev`
