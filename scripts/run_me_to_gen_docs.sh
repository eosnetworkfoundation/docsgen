#!/usr/bin/env bash

# This script will overwrite existing files
# Creates the documentation in the specified web root direction
# created July 2022
# author @ericpassmore

########
# FUNCTIONS
Help() {
  echo "Creates web version of documentation pulling together documentation from several gitrepositories across the EOS Networks"
  echo ""
  echo "Syntax: initialize_repository [-h|d|u]"
  echo "options:"
  echo "-h: print this help"
  echo "-d: specificy web root directory and destination"
  echo "-u: unsecure mode, switch to http for external links"
  exit 1
}

# swich to http if certs not installed in destination domain
FixProtocol() {
  FILE=$1
  PROTOCOL=${2:-https}
  # already https , so no-op if new value is https
  if [ $PROTOCOL != "https" ]; then
    sed "s/https:\/\/docs.eosnetwork.com\//${PROTOCOL}:\/\/docs.eosnetwork.com\//g" $FILE > /tmp/fixprotocol.txt
    mv /tmp/fixprotocol.txt $FILE
  fi
}

# copy files, all global variables
CopyFiles() {
  # copy over api-listing
  FixProtocol ${SCRIPT_DIR}/../web/api-listing.md $PROTOCOL
  cp "${SCRIPT_DIR}/../web/api-listing.md" "${ROOT_DIR}/devdocs/eosdocs/api-listing.md"
  # Client Index Page
  FixProtocol ${SCRIPT_DIR}/../web/client-side/index.md $PROTOCOL
  cp -r ${SCRIPT_DIR}/../web/client-side/* ${ROOT_DIR}/devdocs/eosdocs/client-side/
  # Overwrite docusarus config
  FixProtocol ${SCRIPT_DIR}/../config/docusaurus.config.js $PROTOCOL
  cp "${SCRIPT_DIR}/../config/docusaurus.config.js" "${ROOT_DIR}/devdocs"
  # Overwrite entry page for docusarus
  cp "${SCRIPT_DIR}/../web/docusaurus/src/pages/index.tsx" "${ROOT_DIR}/devdocs/src/pages"
  cp "${SCRIPT_DIR}/../web/docusaurus/src/components/HomepageFeature/index.tsx" "${ROOT_DIR}/devdocs/src/components/HomepageFeatures"
  # Customer CSS for Doc6s
  cp "${SCRIPT_DIR}/../web/docusaurus/src/css/custom.css" "${ROOT_DIR}/devdocs/src/css"
}

########
# Get the options
while getopts "hud:" option; do
   case $option in
      h) # display Help
         Help
         ;;
      u) # set unsecure protocol
        PROTOCOL="http"
        ;;
      d) # set dir
        ROOT_DIR=${OPTARG}
        ;;
      :) # no args
        echo "missing '-d' directory, '-h' for help"; exit 1;
        ;;
      *) # abnormal args
        echo "unexpected arguments, '-h' for help"; exit 1;
        ;;
   esac
done

##################################
# main
# check for parameters
if [ -z $ROOT_DIR ]; then
  echo "missing '-d' directory, '-h' for help"; exit 1;
fi
# compute script dir for copying files from here to web directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# initialize copy over files
CopyFiles

##################################
# mandel repo
source ${SCRIPT_DIR}/generate_mandeldocs.sh
# build out OpenAPI Docs from yaml
GenOpenAPI $ROOT_DIR $SCRIPT_DIR
# build out developer-tool docs
GenMandelToolDoc $ROOT_DIR $SCRIPT_DIR
# build out glossary, guides, tutorials
CopyTutorialsAndGuides $ROOT_DIR $SCRIPT_DIR
# build out javadocs
source ${SCRIPT_DIR}/generate_javadoc.sh
GenJavaDoc $ROOT_DIR $SCRIPT_DIR
# move over markdown for swift
source ${SCRIPT_DIR}/generate_swiftdoc.sh
GenSwiftDoc $ROOT_DIR $SCRIPT_DIR $PROTOCOL
# use typedoc to generate JS documenation in markdown
source ${SCRIPT_DIR}/generate_jsdoc.sh
GenJSDoc $ROOT_DIR $SCRIPT_DIR
# build out smart contract documenation using doxygen
source ${SCRIPT_DIR}/generate_smartcontractdoc.sh
GenSmartContractDoc $ROOT_DIR $SCRIPT_DIR $PROTOCOL
GenCDTDoc $ROOT_DIR $SCRIPT_DIR
# build Dune docs
source ${SCRIPT_DIR}/generate_dune.sh
GenDuneDoc $ROOT_DIR $SCRIPT_DIR

find ${ROOT_DIR}/devdocs/eosdocs/developer-tools -type f | xargs -I{} ${SCRIPT_DIR}/add_title.py {}
find ${ROOT_DIR}/devdocs/eosdocs/client-side -type f | xargs -I{} ${SCRIPT_DIR}/add_title.py {}

# localization files
FixProtocol ${SCRIPT_DIR}/../web/docusaurus/i18n/ko/docusaurus-plugin-content-docs/current/api-listing.md $PROTOCOL
FixProtocol ${SCRIPT_DIR}/../web/docusaurus/i18n/zh/docusaurus-plugin-content-docs/current/api-listing.md $PROTOCOL
cp -r ${SCRIPT_DIR}/../web/docusaurus/i18n ${ROOT_DIR}/devdocs/

echo "NEXT STEPS *******"
cd ${ROOT_DIR}/devdocs
yarn build
# bring everything together like production
cp -r ${ROOT_DIR}/reference ${ROOT_DIR}/devdocs/build
echo "COPY static files ${ROOT_DIR}/devdocs/build to webroot"
echo "EXAMPLE cd ${ROOT_DIR}/devdocs/build; tar cvzf /tmp/docs.tgz *; sftp destination.host.com"
