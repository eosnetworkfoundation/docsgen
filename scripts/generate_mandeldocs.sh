#!/usr/bin/env bash

#GenOpenAPI /path/to/web /path/to/script

# clones the mandel repo and copies yaml files into web root dir
GenOpenAPI() {
  if [[ $# -lt 2 ]] ; then
      echo 'NOT ENOUGH ARGS: specify web root,  specify script dir '
      exit 1
  fi
  WEB_ROOT=$1
  WORKING_DIR="${2}/../working"
  GIT_URL="https://github.com/eosnetworkfoundation/mandel"

  # pull from github
  # create working dir if it does not exist
  [ ! -d $WORKING_DIR ] && mkdir $WORKING_DIR

  # clean out old mandel directory if it exists
  [ -d "${WORKING_DIR}/mandel" ] && rm -rf "${WORKING_DIR}/mandel"
  # enter working directory and clone repo
  cd $WORKING_DIR && git clone $GIT_URL

  # this copy is destructive
  for i in $(find mandel -name "*.yaml")
  do
    cp $i "${WEB_ROOT}/reference/openapi/mandel-plugins/"
  done
}

# protocol guides, tutorials, and command references
GenMandelToolDoc() {
  if [[ $# -lt 2 ]] ; then
      echo 'NOT ENOUGH ARGS: specify web root,  specify script dir '
      exit 1
  fi
  DEVTOOL_DOC_ROOT="${1}/devdocs/eosdocs/developer-tools"
  TUTORIAL_DOC_ROOT="${1}/devdocs/eosdocs/tutorials"
  WORKING_DIR="${2}/../working"
  GIT_URL="https://github.com/eosnetworkfoundation/mandel"

  # assume working directory with git clone already exists
  # if not create it and re-clone
  if [ ! -d ${WORKING_DIR}/mandel ]; then
    mkdir -p ${WORKING_DIR}/mandel
    # enter working directory and clone repo
    cd $WORKING_DIR && git clone $GIT_URL
  else
    cd $WORKING_DIR
  fi

  cd mandel
  [ -d markdown_out ] && rm -rf markdown_out
  mkdir markdown_out



  # general_info does not get copied to developer-tools
  [ -d markdown_out/general_info ] && rm -rf markdown_out/general_info

  # tutorial
  cp tutorials/bios-boot-tutorial/README.md "${TUTORIAL_DOC_ROOT}/bios-boot-tutorial.md"
  # dev tools nodeos, cleos, keosd
  cp -R docs/* markdown_out/
  cp -R markdown_out/* $DEVTOOL_DOC_ROOT
}
