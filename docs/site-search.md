# Site Search

Site search is powered by Algoria. We push search records to Algoria instead of using the crawler. This has two advantages
- faster indexing update only the changed pages
- better control the ability to control attributes

## Overview

Site is a single page app, need to use crawler to extract content. Use puppeteer to crawl site. Hash site contents and updates search index if there are any changes.

Use javascript API to push data records up.

## Search Document

What we upload to Algoria. Structured as JSON

### Required Fields

- name - H1 of the page
- parentId - source repository default *welcome*, used to filter
- parentName - prettier version of id
- type - either *codedocs* or *manual* allows filtering to code reference

### Optional Fields

- content - body of markdown
- headings - nested list of headings in document
   - level1 - list of H1 tags (may duplicate with name)
   - level2 - list of H2 tags
   - level3 - list of H3 tags
   - level4 - list of H4 tags
   - level5 - list of H5 tags
- role - TBD default smart-contract developer

## crawler

Using puppeteer

## Test Data
Under `testing/search/data`
