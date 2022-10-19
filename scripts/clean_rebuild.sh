#!/usr/bin/env bash
set -x
Help() {
  echo "clean_rebuild.sh -d /path/to/build_root"
  echo "removes everything and rebuilds "
  echo "please specify absolute path"
  exit 1
}

# Get the options
while getopts "d:" option; do
   case $option in
      d) # set build dir
        ARG_BUILD_DIR=${OPTARG}
        ;;
      :) # no args
        Help;
        ;;
      *) # abnormal args
        Help;
        ;;
   esac
done
# check for required args
if [ -z "$ARG_BUILD_DIR" ]; then
  echo -e "Missing required argument -d directory"
  Help;
fi
# better to have absolute paths
if [[ "${ARG_BUILD_DIR:0:1}" == / || "${ARG_BUILD_DIR:0:2}" == ~[/a-z] ]]
then
    echo "OK: Build Dir Absolute Path"
else
    echo -e "Directory must be absolte path starting with / or ~"
    Help;
fi

# compute script dir for copying files from here to web directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

[ -f "${SCRIPT_DIR}"/../config/docusaurus.config.js.new ] && mv "${SCRIPT_DIR}"/../config/docusaurus.config.js.new "${SCRIPT_DIR}"/../config/docusaurus.config.js.next

# create dir if it does not exist
[ ! -d "$ARG_BUILD_DIR" ] && mkdir -p "$ARG_BUILD_DIR"

# remove everthing under the build dir
rm -rf "${ARG_BUILD_DIR:?}"/* || exit
# remove working directories
rm -rf "${SCRIPT_DIR:?}/working/*" || exit

for gitrepo in eosnetworkfoundation/docs \
    AntelopeIO/cdt \
    eosnetworkfoundation/eos-system-contracts \
    AntelopeIO/leap \
    AntelopeIO/DUNE \
    eosnetworkfoundation/mandel-eosjs \
    eosnetworkfoundation/mandel-java \
    eosnetworkfoundation/mandel-swift
do
  echo "working on ${gitrepo}"
  # empty out var
  unset branch
  if [ "${gitrepo}" == "AntelopeIO/leap" ]; then
    branch="v3.1.2"
    # later branch="v3.2.0-rc1"
  fi
  if [ "${gitrepo}" == "AntelopeIO/cdt" ]; then
    branch="v3.0.1"
  fi
  if [ "${gitrepo}" == "eosnetworkfoundation/eos-system-contracts" ]; then
    branch="v3.1.1"
  fi

  if [ -z "$branch" ]; then
    "${SCRIPT_DIR:?}"/generate_documents.sh -d "$ARG_BUILD_DIR" -r ${gitrepo} -x
  else
    "${SCRIPT_DIR:?}"/generate_documents.sh -d "$ARG_BUILD_DIR" -r "${gitrepo}" -b "$branch" -x
  fi
done

##
# CREATE VERSIONS: docusaurus copy content to versioned directories
pushd "$ARG_BUILD_DIR"/devdocs || exit
npm run docusaurus docs:version:leap 3.1
popd || exit

##
# Another Leap Version
"${SCRIPT_DIR:?}"/generate_documents.sh -d "$ARG_BUILD_DIR" -r "AntelopeIO/leap" -b "v3.2.0-rc1" -x
mv "${SCRIPT_DIR}"/../config/docusaurus.config.js.next "${SCRIPT_DIR}"/../config/docusaurus.config.js
# Configure version paths and banners
pushd "$ARG_BUILD_DIR"/devdocs || exit
# explict build
npm run build
popd || exit

# Final run to push to production Add Hosts and Identify
# USE DUNE because it is a one file change and its fast
# UC"${SCRIPT_DIR:?}"/generate_documents.sh -d "$ARG_BUILD_DIR" -x -f -r "AntelopeIO/DUNE" -h {fedevops@host} -i {fedevops.pem} -c ~/content
##
# Preserve our modify config after any final operations
cp "$ARG_BUILD_DIR"/devdocs/docusaurus.config.js.backup "$ARG_BUILD_DIR"/devdocs/docusaurus.config.js
