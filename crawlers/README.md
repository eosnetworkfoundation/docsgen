# Crawlers
Tools to help maintain documentation in repositories. Built in python using scrapy.

## Current Tools

### `GitHub Markdown Broken Link Checker`
Provide name of repository as an input and it outputs the links that break and their source.

Runs the crawler named `markdown` and searches the repository `mandel_contracts`. Outputs to the file `output.json`
*Note:* must be in crawler directory to run script.

**Arguments**
* `-O` file to write output
* `-a` arguments in this case passed as name=value
```console
$ scrapy crawl markdown -O output.json -a search_urls=mandel_contracts
```

### `Docs Broken Link Checker`
Provide name of repository as an input and it outputs the links that break and their source.

Runs the crawler named `docscheck` and searches the repository `localhost:3999`. Outputs to the file `output.json`
*Note:* must be in crawler directory to run script.

**Arguments**
* `-O` file to write output
* `-a` arguments in this case passed as name=value options below
  * localhost (default)
  * production (docs.eosnetwork.com)
  * integration (beta.docs.eosnetwork.com)
```console
$ scrapy crawl docscheck -O output.json -a search_urls=production
```
