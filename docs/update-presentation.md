# Update Presentation

## Summary

The Docusaurus build process places all the content and presentation into a build directory. Then we run `npm build` to process all the code. The static files are then copied to production directory and served by a web server. The `generate_documents.sh` build script will do these

## Making Presentation Updates
In most cases just make updates in github, and the updates will flow through in the next build.

### Existing Directories
- CSS - `web/docusaurus/src/css`
- Hooks - hook into react lifecycle `web/docusaurus/src/hooks`
- Components  - react components `web/docusaurus/src/components`
- Pages - react pages `web/docusaurus/src/pages`
- Statics - images, fonts, icons, etc `web/docusaurus/static`

These are copied over in the `generate_documents.sh` script. You can see the copy logic below. Any additions to the directories listed above will get pulled over and copied
https://github.com/eosnetworkfoundation/docsgen/blob/main/scripts/generate_documents.sh#L128-L135

### Configuration
Config files live under `config` and are labled `docusaurus.config.js*`. The configuration files configure the cards on the home page, and the navigation menus.

## Hacking The Presentation

The existing code explicitly copies over files. This means you can hack the process, by writing your own script to copy over files. Here are the steps you need to take

1. Clone `docsgen` and checkout a new branch
2. Add your code and files under to `web/docusaurus/src` or `web/docusaurus/static`
3. Checking and push your Updates
4. Run `generate_documents.sh` to push the design changes. The actual markdown does not matter so you can run any repo.
   - example `generate_documents.sh -d ~/ENF/build_dir -c ~/ENF/content -f -r "AntelopeIO/DUNE"`

## Pro Tip

`-f` flag skips the content processing if the content in the working directory is less then 1 hour old. You can update the modification time by creating and dropping a file under the working directory. For example in the above example, do this

```
cd docsgen
if [ -d ./working/AntelopeIO/DUNE ]; then
   touch ./working/AntelopeIO/DUNE/foo.txt
   rm ./working/AntelopeIO/DUNE/foo.txt
else
   mkdir -p ./working/AntelopeIO/DUNE
fi
./scripts/generate_documents.sh -d ~/ENF/build_dir -c ~/ENF/content -f -r "AntelopeIO/DUNE -h 12.33aws.com -i me.pem"
```
