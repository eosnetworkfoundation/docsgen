#!/usr/bin/env bash

# This script is not destructive. It initialized web documentation.
# It creates diretory structure when dirs do not exist
# It copies over a few static web files (html, css, js)
# created July 2022
# author @ericpassmore

########
# FUNCTIONS
Help() {
  echo "Creates directories and installs inital templates"
  echo "  Not destructive will only create if items do not exist"
  echo ""
  echo "Syntax: initialize_repository [-h|d]"
  echo "options:"
  echo "-h: print this help"
  echo "-d: specificy web root directory and destination"
  exit 1
}

########
# Get the options
while getopts "hd:" option; do
   case $option in
      h) # display Help
         Help
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

######
# main
# check for parameters
if [ -z $ROOT_DIR ]; then
  echo "missing '-d' directory, '-h' for help"; exit 1;
fi
# compute script dir for copying files from here to web directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

echo "installing initial docusarus"
npx create-docusaurus@latest "${ROOT_DIR}/devdocs" classic --typescript

echo "creating directories and adding templates under ${ROOT_DIR}"

# reference directories for static html files
[ ! -d "${ROOT_DIR}/reference" ] && mkdir "${ROOT_DIR}/reference"
[ ! -d "${ROOT_DIR}/reference/openapi" ] && mkdir "${ROOT_DIR}/reference/openapi"
[ ! -d "${ROOT_DIR}/reference/openapi/mandel-plugins" ] && mkdir "${ROOT_DIR}/reference/openapi/mandel-plugins"
[ ! -d "${ROOT_DIR}/reference/mandel-plugins" ] && mkdir "${ROOT_DIR}/reference/mandel-plugins"
[ ! -d "${ROOT_DIR}/reference/mandel-contracts" ] && mkdir "${ROOT_DIR}/reference/mandel-contracts"
[ ! -d "${ROOT_DIR}/reference/mandel-cdt" ] && mkdir "${ROOT_DIR}/reference/mandel-cdt"
[ ! -d "${ROOT_DIR}/reference/javadocs" ] && mkdir "${ROOT_DIR}/reference/javadocs"
[ ! -d "${ROOT_DIR}/reference/swiftdocs" ] && mkdir "${ROOT_DIR}/reference/swiftdocs"
# devdocs root for docusaurus
[ ! -d "${ROOT_DIR}/devdocs" ] && mkdir "${ROOT_DIR}/devdocs"
# devdocs/eosdocs for markdown file, served via docusaurus
# NOTE: single git repository can have both devdocs/eosdocs and reference
#    reference for doxygen comments and code reference
#    devdocs/eosdocs for readme
[ ! -d "${ROOT_DIR}/devdocs/eosdocs" ] && mkdir "${ROOT_DIR}/devdocs/eosdocs"
# top level directories smart-contract client-side developer-tools
[ ! -d "${ROOT_DIR}/devdocs/eosdocs/smart-contracts" ] && mkdir "${ROOT_DIR}/devdocs/eosdocs/smart-contracts"
[ ! -d "${ROOT_DIR}/devdocs/eosdocs/client-side" ] && mkdir "${ROOT_DIR}/devdocs/eosdocs/client-side"
[ ! -d "${ROOT_DIR}/devdocs/eosdocs/developer-tools" ] && mkdir "${ROOT_DIR}/devdocs/eosdocs/developer-tools"
# directory for guides, glossary, and tutorial
[ ! -d "${ROOT_DIR}/devdocs/eosdocs/general_info" ] && mkdir "${ROOT_DIR}/devdocs/eosdocs/general_info"
[ ! -d "${ROOT_DIR}/devdocs/eosdocs/general_info/protocol-guides" ] && mkdir "${ROOT_DIR}/devdocs/eosdocs/general_info/protocol-guides"
[ ! -d "${ROOT_DIR}/devdocs/eosdocs/tutorials" ] && mkdir "${ROOT_DIR}/devdocs/eosdocs/tutorials"
# smart contracts
[ ! -d "${ROOT_DIR}/devdocs/eosdocs/smart-contracts/mandel-cdt" ] && mkdir "${ROOT_DIR}/devdocs/eosdocs/smart-contracts/mandel-cdt"
[ ! -d "${ROOT_DIR}/devdocs/eosdocs/smart-contracts/mandel-contracts" ] && mkdir "${ROOT_DIR}/devdocs/eosdocs/smart-contracts/mandel-contracts"
# clients code
[ ! -d "${ROOT_DIR}/devdocs/eosdocs/client-side/jsdocs" ] && mkdir "${ROOT_DIR}/devdocs/eosdocs/client-side/jsdocs"
[ ! -d "${ROOT_DIR}/devdocs/eosdocs/client-side/swiftdocs" ] && mkdir "${ROOT_DIR}/devdocs/eosdocs/client-side/swiftdocs"
# developer tools
[ ! -d "${ROOT_DIR}/devdocs/eosdocs/developer-tools" ] && mkdir "${ROOT_DIR}/devdocs/eosdocs/developer-tools"
# dune repo
[ ! -d "${ROOT_DIR}/devdocs/eosdocs/developer-tools/DUNE" ] && mkdir "${ROOT_DIR}/devdocs/eosdocs/developer-tools/DUNE"

# i18n directories zh and ko, english is the default and not included
[ ! -d "${ROOT_DIR}/devdocs/i18n" ] && mkdir "${ROOT_DIR}/devdocs/i18n"
[ ! -d "${ROOT_DIR}/devdocs/i18n/ko" ] && mkdir "${ROOT_DIR}/devdocs/i18n/ko"
[ ! -d "${ROOT_DIR}/devdocs/i18n/zh" ] && mkdir "${ROOT_DIR}/devdocs/i18n/zh"
[ ! -d "${ROOT_DIR}/devdocs/i18n/zh/docusaurus-plugin-content-docs" ] && mkdir "${ROOT_DIR}/devdocs/i18n/zh/docusaurus-plugin-content-docs"
[ ! -d "${ROOT_DIR}/devdocs/i18n/zh/docusaurus-plugin-content-docs/current" ] && mkdir "${ROOT_DIR}/devdocs/i18n/zh/docusaurus-plugin-content-docs/current"
[ ! -d "${ROOT_DIR}/devdocs/i18n/ko/docusaurus-plugin-content-docs" ] && mkdir "${ROOT_DIR}/devdocs/i18n/ko/docusaurus-plugin-content-docs/"
[ ! -d "${ROOT_DIR}/devdocs/i18n/ko/docusaurus-plugin-content-docs/current" ] && mkdir "${ROOT_DIR}/devdocs/i18n/ko/docusaurus-plugin-content-docs/current"

echo "copying in static files, will not overwrite existing files"

# copy over the logo these directories created when docusarus site is build
[ ! -f "${ROOT_DIR}/devdocs/static/img/eosn_logo.png" ] && cp "${SCRIPT_DIR}/../web/eosn_logo.png" "${ROOT_DIR}/devdocs/static/img/eosn_logo.png"
SMALL_LOGO="cropped-EOS-Network-Foundation-Site-Icon-1-150x150.png"
[ ! -f "${ROOT_DIR}/devdocs/static/img/${SMALL_LOGO}" ] && cp "${SCRIPT_DIR}/../web/${SMALL_LOGO}" "${ROOT_DIR}/devdocs/static/img/${SMALL_LOGO}"

# copy over reference index file
[ ! -f "${ROOT_DIR}/reference/index.html" ] && cp "${SCRIPT_DIR}/../web/reference-index.html" "${ROOT_DIR}/reference/index.html"

# copy over the html with openapi documentation from mandel
for i in ${SCRIPT_DIR}/../web/mandel-plugins/*.html
do
  file_name=$(basename ${i})
  [ ! -f "${ROOT_DIR}/reference/mandel-plugins/${file_name}" ] && cp $i "${ROOT_DIR}/reference/mandel-plugins/${file_name}"
done
