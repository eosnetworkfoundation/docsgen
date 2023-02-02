# Internal - Build and Release Process for a New Version of the Docs and Index for Devdocs




This process provides instructions to set up and configure the [EOS Documentation Portal](https://docs.eosnetwork.com).


## How to Build a New Document Repository
The following link provides instructions on how to build a new document repository. Use this procedure to initiate a new document repository for EOS Documentation (infrastructure), when necessary. 

[How to Build a New Repository](https://github.com/eosnetworkfoundation/docsgen/blob/main/docs/How-To-Do-A-Full-Release.md)


## How to Generate Documentation
The following link provides instructions on how to generate EOS Documentation. 

Link to Generate Conten Quick Guide

### Generate Content Using clean_rebuild.sh Script
Run clean_rebuild.sh -d /path/to/build_root to rebuild a clean local version. This script iterates through the repositories running generate_documents.sh

### Generate Content Using generate_documents.sh Script
The script generate_documents.sh clones various git repos, extracts documentation and then copies to /path/to/build_dir folder. The scripts are designed to be called once for each git repository.

[How to Generate Documents](https://github.com/eosnetworkfoundation/devdocs/blob/main/docs/GeneratingDocuments.md)


## How to Make Changes to EOS Documentation Navigation
The following link provides instructions on how to make changes to EOS Documentation navigation, such as the left sidebar site index, the right sidebar document table of contents, and the footer. 

[How to Make Changes to the EOS Dev Portal Navigation](https://github.com/eosnetworkfoundation/devdocs/blob/main/docs/SiteNavigation.md)



## Initialize Content Repository
See First Install Software for all the dependancies.

## Updating Presentation
See Updating Presentation for a guide on updating the look and feel of the site.

## Updating Site Navigation
See Updating Site Navigation

## Testing
see Testing

## Production Setup
see Production Setup for details on setting up a webserve to serve the content.

## How To Do a Full Release

## How to Mount s3 bucket as file

## Site Search