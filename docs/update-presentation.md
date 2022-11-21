# Update Presentation

## Summary

The Docusaurus build process places all the content and presentation into a build directory. Then we run `npm build` to process all the code. The static files are then copied to production directory and served by a web server.

## Making Updates
Updating existing files works file. Adding new files will require a slight modification to the scripts.

### Existing Files
- CSS - `web/docusaurus/src/css`
- JS - current no location
- React components - `web/docusaurus/src/components`
- React pages - `web/docusaurus/src/pages`

These are copied over in the `generate_documents.sh` script. You can see the copy logic below
https://github.com/eosnetworkfoundation/devdocs/blob/f505964c5a616d337170a8e6db4748832e5b413f/scripts/generate_documents.sh#L108-L126

### Configuration

Config files live under `config` and are labled `docusaurus.config.js*`

## Hacking The Update

The existing code explicitly copies over files. This means you can hack the process, by writing your own script to copy over files. Here are the steps you need to take

1. Clone `devdocs` and checkout a new branch
2. Add your code and files to `web/docusaurus/root`
3. Remove the `npm run build` line from `scripts/clean_rebuild.sh`
   - this saves time by stopping the doc6s build
   - for production we will need to re-enable this
4. Write a code to copy over your files
   - ex: `${SCRIPT_DIR}/../web/docusaurus/src/mystuff/* ${BUILD_ROOT}/devdocs/static`
   - put this where #3 `npm run build` used to be
5. Save changes run `scripts/clean_rebuild.sh`
6. change to build root direction and go to `devdocs` Directory
   - build root is the argument you supplied to `clean_rebuild.sh`
   - you will find `devdocs` directory under build root
7. now run `npm run build `
8. if no errors run `npm run server`
   - this will serve localhosted version on port 3000
