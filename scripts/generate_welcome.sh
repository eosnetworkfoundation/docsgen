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
CopyWelcome() {
  if [[ $# -lt 2 ]] ; then
      echo 'NOT ENOUGH ARGS: specify web root,  specify script dir '
      exit 1
  fi
  WEB_ROOT=$1
  WORKING_DIR="${2}/../working"
  GIT_URL="https://github.com/eosnetworkfoundation/welcome"
  IMG_DIR="${WEB_ROOT}/devdocs/static/welcome"
  GETSTARTED_DIR="${WEB_ROOT}/devdocs/eosdocs/welcome/getting-started"
  OVERVIEW_DIR="${WEB_ROOT}/devdocs/eosdocs/welcome/overview"
  BLOCKCHAIN_NETWORK_DIR="${WEB_ROOT}/devdocs/eosdocs/welcome/eosio-blockchain-networks"
  GETINVOLVED_DIR="${WEB_ROOT}/devdocs/eosdocs/welcome/get-involved"
  PROTOCOL_DIR="${WEB_ROOT}/devdocs/eosdocs/welcome/protocol"
  TUTORIAL_DIR="${WEB_ROOT}/devdocs/eosdocs/welcome/tutorials"
  COMMUNITY_TOOLS_DIR="${WEB_ROOT}/devdocs/eosdocs/welcome/community-developer-tools"
  SMARTCONTRACT_DIR="${WEB_ROOT}/devdocs/eosdocs/welcome/getting-started/smart-contract-development"
  DEV_ENV_DIR="${WEB_ROOT}/devdocs/eosdocs/welcome/getting-started/development-environment"

  # pull from github
  # create working dir if it does not exist
  [ ! -d $WORKING_DIR ] && mkdir $WORKING_DIR

  # clean out old directory if it exists
  [ -d "${WORKING_DIR}/welcome" ] && rm -rf "${WORKING_DIR}/welcome"
  # enter working directory and clone repo
  cd $WORKING_DIR && git clone $GIT_URL
  cd welcome

  # Copy Overview
  cp -r docs/01_overview/images/* $IMG_DIR
  # move it out of the way so it doens't get copied as doc
  mv docs/01_overview/images ./overview-images
  # update image paths
  for i in $(find docs/01_overview -type f -name "*.md"); do
    sed 's/(\.\/images\//(\/welcome\//g' $i > tmpO.md
    mv tmpO.md $i
  done
  cp -r docs/01_overview/* $OVERVIEW_DIR

  # copy community dev tools
  cp -r docs/06_eosio-blockchain-networks/* $BLOCKCHAIN_NETWORK_DIR

  # Copy Getting Started
  cp -r docs/02_getting-started/images/* $IMG_DIR
  # move it out of the way so it doens't get copied as doc
  mv docs/02_getting-started/images ./getting-started-images
  # update paths
  for i in $(find docs/02_getting-started -type f -name "*.md"); do
    sed 's/(\.\.\/images\//(\/welcome\//g' $i > tmpG.md
    mv tmpG.md $i
  done
  # Copy Getting Started
  cp docs/02_getting-started/*.md $GETSTARTED_DIR
  # Copy Smart Contracts
  cp -r docs/02_getting-started/03_smart-contract-development/* $SMARTCONTRACT_DIR
  # Copy developer environment
  cp -r docs/02_getting-started/02_development-environment/* $DEV_ENV_DIR

  # copy get involved
  # move images
  mv docs/get-involved/*.png $IMG_DIR
  # update image paths
  for i in $(find docs/get-involved -type f -name "*.md"); do
    sed 's/(\.\/\([^.]*\)\.png/(\/welcome\/\1\.png/g' $i > tmpGI.md
    mv tmpGI.md $i
  done
  cp docs/get-involved/*.md $GETINVOLVED_DIR

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

  # Copy Tutorials
  cp -r docs/03_tutorials/* $TUTORIAL_DIR

  # copy community dev tools
  cp -r docs/05_community-developer-tools/* $COMMUNITY_TOOLS_DIR

}
