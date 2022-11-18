# How To Do a Full Release

This document goes over how to build a new document repository, staring from nothing.

## Overview of Steps

- update docusaurus.config.js
- for each repository
   - if needed create the version
   - run the generate_documents script
- publish to production
- re-index search

## Checkout DevDocs  
Main branch is the production version
```
git clone https://github.com/AntelopeIO/devdocs.git
```

## Update Config

Edit `config/docusaruus.config.js`. Look for the section `themeConfig -> navbar -> items`. You need to update the versions for the drop down menus. For example below we add a new 3.1 section, point it to latest and move 2.0 to a versioned URL.

**FROM**
```
{
  type: 'dropdown',
  label: 'Leap',
  position: 'left',
  items: [
    {
      label: '2.0',
      href: '/leap/latest/',
    },
    // ... more items
  ],
},
```
**TO**
```
{
  type: 'dropdown',
  label: 'Leap',
  position: 'left',
  items: [
    {
      label: '3.1',
      href: '/leap/latest/',
    },
    {
      label: '2.0',
      href: '/leap/2.0/',
    },
  ],
},
```

## Generate Documents

Run the `generate_documents.sh` script. You will need an empty build directory, the repository as your source, and the git branch or tag. The script will default to main if no branch or tag is provided. You can find all the scripts in the `scripts` directory.

**NOTE** in your first pass do the `oldest` version of your documents first. Makes it easier to set the versions and update.

For example:
- Build Directory: $HOME/AntelopeIO/build_root
- Repository: AntelopeIO/leap
- Tag: v3.1.0

Command: Note to save time the `-x` suppresses the `npm run build`. We will do many repos, and run the build at the end.
```
./generate_documents.sh -d $HOME/AntelopeIO/build_root -r AntelopeIO/leap -t v3.1.0 -x
```

The first run of `generate_documents.sh` will install docusaurus and any needed packages.

### Example Running Through All Repos

The last repo is run without the `-x` flag and that will run the build that generates the static files.
```
BUILD_DIR=$HOME/AntelopeIO/build_root
for gitrepo in AntelopeIO/docs \
    AntelopeIO/cdt \
    AntelopeIO/reference-contracts \
    AntelopeIO/leap \
    AntelopeIO/DUNE \
    eosnetworkfoundation/mandel-eosjs \
    eosnetworkfoundation/mandel-java
do
  echo "working on ${gitrepo}"
  ./generate_documents.sh -d "${BUILD_DIR:?}" -r ${gitrepo} -x
done
# one last time without supress flag
# this last run builds the statics via "npm run build"
./generate_documents.sh -d "${BUILD_DIR:?}" -r "eosnetworkfoundation/mandel-swift"
```

## Create Version

[Docusaurus Documentation on Versioning is the best reference](https://docusaurus.io/docs/versioning). We have separate versions for leap, cdt, and system-contracts and this requires multi-index. Look at [multi-index for the documentation on versioning across several document sets](https://docusaurus.io/docs/docs-multi-instance#tagging-new-versions).

Now that the documents are in place, version them. This command creates an archive and copies the documents to a new directory.
```
npm run docusaurus docs:version:leap 2.0
```

## Re-Run Document Generation

Run `generate_documents.sh` again with a newer branch or tag. Create a version if needed. Continue this process of generating documents and versioning until you get to your latest version. **Do not version your latest** If you do you will need to update the config.

## Pushing to Production Host

Running the generate script with a `-i` identify file and `-h` host will push the contents to productions. Specifically it does the following:
- tars up start files locally
- for each host
   - copies tar'd file to remote hosts
   - backups existing site to a tar file
   - untar new content
   - removes tar files (backups and new docs) older than 30 days 


```
./generate_documents.sh -d $HOME/AntelopeIO/build_root -r AntelopeIO/DUNE -i $HOME/me.pem -h me@host.compute-000.amazonaws.com
```
