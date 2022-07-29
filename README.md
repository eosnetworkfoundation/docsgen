# Automated Documentation #
Scripts to generate Web Documentation Portal. Goal of this project is create a single documentation portal linking together documentation across the EOS Network's code repositories. This portal will make an effort to make it easy to build and maintain EOS projects.
* Single place EOS documentation
* Unified presentation of documentation
* Single navigation hierarchy covering documentation
* Consistent UI for documentation

In addition, tools are included to help maintain documentation in source repositories. An example is broken link crawlers, looking for bad links in .md files.

## Organization ##

Overview of documentation folder structure:
* devdocs - docusarus
   * eosdocs - toplevel markdown folder
      * client-side - code repositories for developing clients
      * smart-contracts - markdown documentation on contracts, and cdt
      * developer-tools - markdown documentation on nodeos, cleos, and DUNE
      * general_info - glossary, guides
      * tutorial - a walk through
* reference - static html root (*sub dirs one-2-one with git repos*)
   * mandel-contracts
   * mandel-cdt
   * ...
   * swiftdocs


### `Coverage` ###

|   Topic  |  Source Repository  | Top Level Path | Delivered By |
|  ------- | ------------------- | -------------- | ------------ |
| Nodeos HTTP API | [mandel](https://github.com/eosnetworkfoundation/mandel) | reference/mandel-plugins | static html with redocly |
| JS and Node Documentation | [mandel-eosjs](https://github.com/eosnetworkfoundation/mandel-eosjs) | eosdocs/client-side/jsdocs | docusaurus |
| Swift Documentation | [mandel-swift](https://github.com/eosnetworkfoundation/mandel-swift) | reference/swiftdocs | static html |
| Java Documenation | [mandel-java](https://github.com/eosnetworkfoundation/mandel-java) | reference/javadocs | static html |
| Smart Contracts | [mandel-contracts](https://github.com/eosnetworkfoundation/mandel-contracts) | reference/mandel-contracts | static html |
| Contract Developer Tools | [mandel.cdt](https://github.com/eosnetworkfoundation/mandel.cdt) | reference/mandel-cdt | static html |
| DUNE -local host | [DUNE](https://github.com/eosnetworkfoundation/DUNE.git) | eosdocs/developer-tools/dune | docusarus |
| Nodeos | [Mandel](https://github.com/eosnetworkfoundation/mandel.git) | eosdocs/developer-tools/01_nodeos | docusarus |
| Cleos | [Mandel](https://github.com/eosnetworkfoundation/mandel.git) | eosdocs/developer-tools/02_cleos | docusarus |
| Mandel Install | [Mandel](https://github.com/eosnetworkfoundation/mandel.git) | eosdocs/developer-tools/00_install | docusarus |
| General Info | [Mandel](https://github.com/eosnetworkfoundation/mandel.git) | eosdocs/developer-tools/general_info | docusarus |
| Tutorial | [Mandel](https://github.com/eosnetworkfoundation/mandel.git) | eosdocs/tutorials | docusarus |

## Initialize Content Repository ##
See [First Install Software](docs/FirstInstallSoftware.md) for all the dependancies.

The initialization script is not destructive, copies in files and creates directories when they do not exist. If they do exist does nothing.
```
cd scripts
./initialize_repository.sh -d /path/to/build_dir
```

After running you will find two directories under `/path/to/build_dir` `devdocs` and `reference`.
* `devdocs` root for docusaurus project
* `reference` static html/js/css served directly by webserver, mostly the output from doxygen runs

## Generating Content ##
There are two steps
* **Pre-Build** - pulling the content together from various repos
* **Static Content** - running Docusaurus `build` to generate static html, css, js

Clones various git repos, extracts documentation and then copies to `/path/to/build_dir folder`. The `-u` option switches protocol to http for docs.eosnetwork.com, because https is not supported at this time. Without the `-u` option protocol reverts to https.
```
cd scripts
./run_me_to_gen_docs.sh -u -d /path/to/build_dir
```

This script runs the Docusaurus build command. This script also copies the `reference` directory into the static HTML directory.

After running there will be many static HTML, CSS, JS files under `/path/to/build_dir/devdocs/build`.

## Last Step ##
Last step is to copy the data to the source webroot on the desired host

```
cd /path/to/build_dir/devdocs/build
tar czf /home/me/newbuild.tgz *
scp /home/me/newbuild.tgz user@destination_host:/path/to/webroot
```
unpack tar with
```
cd /path/to/webroot
tar xzf ./newbuild.tgz
```

See [Generating Documents](docs/GeneratingDocuments.md) for additional details
