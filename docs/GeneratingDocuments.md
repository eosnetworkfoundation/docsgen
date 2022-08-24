# Generating Documents #
How to guide on generating the documents or regenerating

## Generation Steps ##
There are two steps to generating content
* **Pre-Build** - clones the repositories, performs some light manipulation of files, generates javadocs, generates doxygen file
* **Static-Content** - parses the markdown into static content

The static content will need to be supported by an HTTP service. These steps only build out the content. They don't serve the content via HTTP.

## Code Structure

Scripts are under the `scripts` directory. `generate_documents.sh` is called providing the repository and the build directory.
- Docusaurus is installed if it does not already exist
- The repository passed in by name is cloned
- The script enters into the working directory of the cloned content `cd ../working/owner/repo`
- The script sources `install_repo.sh`. It is a naming convention.
- The script calls the fundtion `Install_Repo`. It is a naming convention.

For example
-  Execute `generate_documents -d $HOME/build_root -r eosnetwork/welcome`
- Sources `install_welcome.sh`
- Function call `Install_Welcome`, see args below
  -  SCRIPT_DIR=$1
  -  ARG_GIT_REPO=$2
  -  ARG_BUILD_DIR=$3
  -  ARG_BRANCH=$4
  -  ARG_TAG=$5

### Adding a New Repo
If you want to add a new repo do the following
1. Create a files `install_repo.sh`
2. Create a function in the file named `Install_Repo`
  - copy markdown

```
mkdir $ARG_BUILD_DIR/devdocs/eosdocs/newhome
cp -R docs/* $ARG_BUILD_DIR/devdocs/eosdocs/
```

## Static Index Files ##

There are 2 static index files copied from the `devdocs` repo. These two files index the APIs and the SDKs.

| Code Repository | Pre-Build | Static Content |
| --------------- | --------- | ------- |
| devdocs/web/api-listing.md | /devdocs/eosdocs/api-listing.md | eosdocs/api-listing.html |
| devdocs/web/client-side/index.md | /devdocs/eosdocs/welcome/client-side/index.md | welcome/latest/client-side/index.html |

## Mandel Open APIs ##
These are the HTTP API documented in YAML files, and they are stored in the mandel github repository. Redocly HTML files are setup to read directly from the YAML files and parse them via javascript code loaded off a CDN. Specifically [Redocly](https://redocly.com/docs/redoc/quickstart/) is used.

These are not markdown files so you will find them under `reference/mandel-plugins/`

## Nodeos Cloes and Kloes ##
The markdown is pulled from github under the `leap` repo. A script is run to add meta-data to the document for better viewing.

## Mandel JavaDocs ##
The repo `mandel-java` is cloned and javadocs command is run to generate the docs.

These are not markdown files so you will find them under `reference/javadocs/`

## Mandel Swift ##
The repo `mandel-swift` is cloned and the pre-generated swiftdocs and the source code are copied into the specified directory.

These are not markdown files so you will find them under `reference/swiftdocs/`

There is one markdown file, an index of the top level interfaces in Swift. This markdown is copied from github, and it lives under `eosdocs/client-side/swiftdocs`

## Mandel Typescript ##
The repo `mandel-eosjs` is cloned and typedoc runs to generate the documentation.

Typedoc outputs as markdown, and all files are located under `eosdocs/client-side/jsdocs`

## Mandel Contract Reference ##
The `mandel-contracts` is cloned and doxygen is run to generate html files.

These are not markdown files so they are stored under `reference/mandel-contracts`

In addition the markdown docs from `mandel-contracts` are published into the folder `smart-contracts/mandel-contracts`

## Mandel Contract Developer Toolkit ##
The `mandel.cdt` is cloned and doxygen is run to generate html files.

These are not markdown files so they are stored under `reference/mandel.cdt`

In addition the markdown docs from `mandel-cdt` are published into the folder `smart-contracts/mandel-cdt`

## Setting up New Locales ##
**Docusaurus i18n configs**
If it is your first time run the write-translation plugin to generate the i18n files. Look at *root/i18n* for these files. These file support all of your theme stuff including navbar. Look at *root/i18n/xx* and start translating the expressions. These translations will be picked up by Docusaurus
```
npm run write-translations -- --locale en
```

## Translation ##
The translations come in two form
* **Static Markdown** - You will find these under source control under `i18n` directory as static markdown files
* **React Templates** - The React template will have strings wrapped with `<Translate>` tags.

The full path the to `i18n` folder, is found under the current *devdocs* reposiory.
`devdocs/web/docusarus/i18n`

## Updating Content ##
When changing content under the `devdocs/web` folder make sure to check for localized versions. You will find those versions under `i18n/xx/docusaurus-plugin-content-docs/current`. For example when you change `api-listing.md` you must also change `i18n/zh/docusaurus-plugin-content-docs/current/api-listing.md` and change `i18n/ko/docusaurus-plugin-content-docs/current/api-listing.md`.

## Running local site ##
You can run Docusaurus locally to debug. Cd to `/path/to/webroot/devdocs` and your port may differ. Note this won't pick up the files under references.
```
cd /path/to/webroot/devdocs
npm run serve -- --port 39999
```

After making direct changes to files under `/path/to/webroot/devdocs` you will need to rerun `npm run build` to generate the build directory.
