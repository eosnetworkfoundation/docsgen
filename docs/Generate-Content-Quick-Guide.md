# Generate Content Quick Guide

## quick guide 
Run clean_rebuild.sh -d /path/to/build_root to rebuild a clean local version. This script iterates through the repositories running generate_documents.sh

The script generate_documents.sh clones various git repos, extracts documentation and then copies to /path/to/build_dir folder. The scripts are designed to be called once for each git repository.

Creates web version of documentation pulling together documentation from several git repositories across the EOS Networks

## Syntax: generate_documents.sh [-r|d|b|t|i|h|c|s|x|f]
mandatory: -r owner/rep and -d directory

options:
-r: owner/repository name of the git repository and source for documentation
-d: specify directory for building the static HTML documentation
-b: branch to use for git
-t: tag to use for git
-i: private key for web host, needed to install files
-h: destination user@host(s) where to install files
-c: context directory for backups and archives
-s: staging, put content into staging web root
-x: suppress build statics process
-f: fast, skip git checkout if files less then 1 hour old

example: generate_documents.sh -r eosnetworkfoundation/mandel -b ehp-working -t v3.1.1 -d /path/to/build_root -i aws_identity -h eric@hostA -h eric@hostB -c /path/to/backup_dir
Run script to build mandel docs and update production site , with branch ehp-working and tag v3.1.1. This updates latest documentation version
When you provide host and identify the content will be deployed to a production server
   Default location for files is /var/www/html/ENF/production
   Staging location for files is /var/www/html/ENF/devrel_staging
   Currently these locations are not configurable
After running there will be many static HTML, CSS, JS files under /path/to/build_dir/devdocs/build. The files are served as the current production version.

See Generating Documents for additional details