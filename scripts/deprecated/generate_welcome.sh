#!/usr/bin/env bash

# Populates the following directories
# images go into static/welcome
#
#  eosdocs/welcome
#     getting-started (has images)
#     getting-started
#            development-environment
#            smart-contract-development
#     overview (has images)
#     eosio-blockchain-networks
#     get-involved
#     tutorials
#     protocol (has images)
#     community-developer-tools
#  static
#     welcome
InstallGlossary() {
  if [[ $# -lt 2 ]] ; then
      echo 'NOT ENOUGH ARGS: specify web root,  specify script dir '
      exit 1
  fi
  WEB_ROOT=$1
  SCRIPT_DIR=$2
  WORKING_DIR="${2}/../working"
  GIT_URL="https://github.com/eosnetworkfoundation/welcome"

  # pull from github
  # create working dir if it does not exist
  [ ! -d $WORKING_DIR ] && mkdir $WORKING_DIR

  # clean out old directory if it exists
  [ -d "${WORKING_DIR}/welcome" ] && rm -rf "${WORKING_DIR}/welcome"
  # enter working directory and clone repo
  cd $WORKING_DIR && git clone $GIT_URL
  cd welcome

  # Copy over glossary
  # unfortunetly it needs to be converted to markdown first
  ${SCRIPT_DIR}/glossary-yaml-to-markdown.py glossary.yaml > ${WEB_ROOT}/devdocs/eosdocs/glossary.md
}

# clones repo and copies yaml files into web root dir
CopyProtocol() {
  if [[ $# -lt 2 ]] ; then
      echo 'NOT ENOUGH ARGS: specify web root,  specify script dir '
      exit 1
  fi
  WEB_ROOT=$1
  WORKING_DIR="${2}/../working"
  GIT_URL="https://github.com/eosnetworkfoundation/welcome"
  IMG_DIR="${WEB_ROOT}/devdocs/static/welcome"
  PROTOCOL_DIR="${WEB_ROOT}/devdocs/eosdocs/protocol-guides"

  # pull from github
  # create working dir if it does not exist
  [ ! -d $WORKING_DIR ] && mkdir $WORKING_DIR

  # clean out old directory if it exists
  [ -d "${WORKING_DIR}/welcome" ] && rm -rf "${WORKING_DIR}/welcome"
  # enter working directory and clone repo
  cd $WORKING_DIR && git clone $GIT_URL
  cd welcome

  # Copy Protocols
  cp -r docs/04_protocol/images/* $IMG_DIR
  # move it out of the way so it doens't get copied as doc
  mv docs/04_protocol/images ./protocol-images
  # update image paths
  for i in $(find docs/04_protocol -type f -name "*.md"); do
    sed 's/(images\//(\/welcome\//g' $i > tmpP.md
    mv tmpP.md $i
  done
  cp -r docs/04_protocol/* $PROTOCOL_DIR

}
