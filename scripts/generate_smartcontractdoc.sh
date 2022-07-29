#!/usr/bin/env bash

###############
# generates docs on smart contracts from c++ source files
# this creates markdown
###############

GenCDTDoc() {
  if [[ $# -lt 2 ]] ; then
      echo 'NOT ENOUGH ARGS: specify web root,  specify script dir'
      exit 1
  fi

  WEB_ROOT=$1
  # location to write docs
  DEST_DIR="${WEB_ROOT}/reference/mandel-cdt"
  DOC_DIR="${WEB_ROOT}/devdocs/eosdocs/smart-contracts/mandel-cdt"
  # place to clone repo
  SCRIPT_DIR=$2
  WORKING_DIR="${SCRIPT_DIR}/../working"
  # repo, use personal until pull request accepted
  GIT_URL="https://github.com/eosnetworkfoundation/mandel.cdt"
  # location of markdown docs inside repo
  DOC_PATH="docs"

  # pull from github
  # create working dir if it does not exist
  [ ! -d $WORKING_DIR ] && mkdir $WORKING_DIR

  # clean out old mandel directory if it exists
  [ -d "${WORKING_DIR}/mandel.cdt" ] && rm -rf "${WORKING_DIR}/mandel.cdt"
  # enter working directory and clone repo
  cd $WORKING_DIR && git clone $GIT_URL && cd "mandel.cdt"
  # copy in doxygen config file
  cp ${SCRIPT_DIR}/mandle.cdt-doxyfile Doxyfile
  # copy in logo
  cp ${SCRIPT_DIR}/../web/eosn_logo.png $DOC_PATH
  # run doxygen
  doxygen

  # copy file
  cp -R doxygen_out/html/* $DEST_DIR

  mkdir markdown_out
  mv README.md markdown_out
  mv LICENSE markdown_out/LICENSE.md
  # quick fix to path for License
  sed 's/\.\/LICENSE/\/eosdocs\/smart-contracts\/mandel-cdt\/LICENSE.md/' markdown_out/README.md > tmp_README.md
  mv tmp_README.md markdown_out/README.md

  # pull in markdown docs from git
  cp -R docs/* markdown_out
  # copy into serving location
  # too many issues to fix ....
  # cp -R markdown_out/* $DOC_DIR
}

GenSmartContractDoc() {
  if [[ $# -lt 2 ]] ; then
      echo 'NOT ENOUGH ARGS: specify web root,  specify script dir'
      exit 1
  fi

  WEB_ROOT=$1
  # location to write docs
  DEST_DIR="${WEB_ROOT}/reference/mandel-contracts"
  DOC_DIR="${WEB_ROOT}/devdocs/eosdocs/smart-contracts/mandel-contracts"
  # place to clone repo
  SCRIPT_DIR=$2
  WORKING_DIR="${SCRIPT_DIR}/../working"
  # repo, use personal until pull request accepted
  GIT_URL="https://github.com/eosnetworkfoundation/mandel-contracts"
  # location of markdown docs inside repo
  DOC_PATH="docs"
  PROTOCOL=${3:-https}

  # pull from github
  # create working dir if it does not exist
  [ ! -d $WORKING_DIR ] && mkdir $WORKING_DIR

  # clean out old mandel directory if it exists
  [ -d "${WORKING_DIR}/mandel-contracts" ] && rm -rf "${WORKING_DIR}/mandel-contracts"
  # enter working directory and clone repo
  cd $WORKING_DIR && git clone $GIT_URL && cd "mandel-contracts"
  # copy in doxygen config file
  cp ${SCRIPT_DIR}/mandel-contracts-doxyfile Doxyfile
  # copy in logo
  cp ${SCRIPT_DIR}/../web/eosn_logo.png $DOC_PATH
  # run doxygen
  doxygen

  # copy files
  cp -R doxygen_out/html/* $DEST_DIR

  mkdir markdown_out
  mv README.md markdown_out
  mv LICENSE markdown_out/LICENSE.md
  # quick fix to path for License
  sed 's/LICENSE/\/eosdocs\/smart-contracts\/mandel-cdt\/LICENSE.md/' markdown_out/README.md > tmp_README.md
  mv tmp_README.md markdown_out/README.md

  # pull in markdown docs from git
  cp -R docs/* markdown_out

  # fix relative links
  REPLACE="${PROTOCOL}:\/\/docs.eosnetwork.com\/reference\/mandel-contracts\/annotated.html"
  FIND="contracts\/eosio\."
  sed "s/${FIND}/${REPLACE}/g" markdown_out/README.md > tmp_README.md
  mv tmp_README.md markdown_out/README.md

  FIND="action-reference\/eosio\.bios"
  REPLACE="${PROTOCOL}:\/\/docs.eosnetwork.com\/reference\/mandel-contracts\/classeosiobios_1_1bios\.html"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  FIND="action-reference\/eosio\.system"
  REPLACE="${PROTOCOL}:\/\/docs.eosnetwork.com\/reference\/mandel-contracts\/classeosiosystem_1_1system__contract\.html"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  FIND="action-reference\/eosio\.msig"
  REPLACE="${PROTOCOL}:\/\/docs.eosnetwork.com\/reference\/mandel-contracts\/classeosio_1_1multisig\.html"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  FIND="action-reference\/eosio\.token"
  REPLACE="${PROTOCOL}:\/\/docs.eosnetwork.com\/reference\/mandel-contracts\/classeosio_1_1token\.html"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  FIND="action-reference\/eosio\.wrap"
  REPLACE="${PROTOCOL}:\/\/docs.eosnetwork.com\/reference\/mandel-contracts\/classeosio_1_1wrap\.html"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  # copy into serving location
  #cp -R markdown_out/* $DOC_DIR
}
