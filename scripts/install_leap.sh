#!/usr/bin/env bash

# Populates the following directories
# leap
#

DoxygenLeap() {
  BUILD_ROOT=$1
  DOXYFILE=$2
  LOGO=$3
  # location to write docs
  DEST_DIR="${BUILD_ROOT}/reference/leap"

  # pull from github
  # create reference dir if it does not exist
  [ ! -d $DEST_DIR ] && mkdir -p $DEST_DIR

  # copy in doxygen config file
  cp ${DOXYFILE} Doxyfile
  # copy in logo
  cp ${LOGO} docs
  # run doxygen
  doxygen 2>&1>/dev/null

  # copy files to staging area
  cp -R doxygen_out/html/* $DEST_DIR
}

Install_Leap() {
  SCRIPT_DIR=$1
  ARG_GIT_REPO=$2
  ARG_BUILD_DIR=$3
  ARG_BRANCH=$4
  ARG_TAG=$5

  TUTORIAL_DOC_ROOT="${ARG_BUILD_DIR}/devdocs/eosdocs/welcome/03_tutorials"

  # copy out to keep docs clean and process idempotent
  [ ! -d markdown_out ] && mkdir markdown_out
  cp -R docs/* markdown_out

  # process and copy markdown
  find markdown_out -type f | xargs -I{} ${SCRIPT_DIR}/add_title.py {}
  find markdown_out -type f | xargs -I{} ${SCRIPT_DIR}/process_admonitions.py {}

  # fix paths for dev tools
  for file in $(find markdown_out -type f -name "*.md")
  do
    sed 's/(\/glossary.md/(\/welcome\/latest\/glossary/g' $file > tempG.md

    FIND="(\/protocol-guides\/01_consensus_protocol.md"
    REPLACE="(\/welcome\/latest\/protocol\/consensus_protocol"
    sed "s/${FIND}/${REPLACE}/g" tempG.md > tempCP.md

    FIND="(\/protocol-guides\/02_transactions_protocol.md"
    REPLACE="(\/welcome\/latest\/protocol\/transactions_protocol"
    sed "s/${FIND}/${REPLACE}/g" tempCP.md  > tempTP.md

    FIND="(\/protocol-guides\/03_network_peer_protocol.md"
    REPLACE="(\/welcome\/latest\/protocol\/network_peer_protocol"
    sed "s/${FIND}/${REPLACE}/g" tempTP.md > tempPP.md

    FIND="(\/protocol-guides\/04_accounts_and_permissions.md"
    REPLACE="(\/welcome\/latest\/protocol\/accounts_and_permissions"
    sed "s/${FIND}/${REPLACE}/g" tempPP.md > tempAP.md

    FIND="\/tutorials\/bios-boot-tutorial.md"
    REPLACE="\/welcome\/latest\/tutorials\/bios-boot-tutorial"
    sed "s/${FIND}/${REPLACE}/g" tempAP.md > tempTT.md

    mv tempTT.md $file
  done

  # fix plugin reference
  sed 's/https:\/\/docs.eosnetwork.com\/reference\/mandel-plugins\//\/leap-plugins\/latest\//g' \
      markdown_out/01_nodeos/03_plugins/net_api_plugin/index.md > tempPlugin.md
  mv tempPlugin.md markdown_out/01_nodeos/03_plugins/net_api_plugin/index.md
  # fix reasource path
  sed 's/\/resources\/index.md/\/welcome\/latest\/resources\//' \
      02_cleos/02_how-to-guides/how-to-get-block-information.md > tempRes.md
  mv tempRes.md 02_cleos/02_how-to-guides/how-to-get-block-information.md


  # move tutorial to welcome
  cp tutorials/bios-boot-tutorial/README.md "${TUTORIAL_DOC_ROOT}/bios-boot-tutorial.md"

  # copy the YAML Files
  [ ! -d ${ARG_BUILD_DIR}/devdocs/openapi/leap-plugins/latest/ ] && mkdir -p ${ARG_BUILD_DIR}/devdocs/openapi/leap-plugins/latest/
  for i in $(find plugins -name "*.yaml")
  do
    cp $i ${ARG_BUILD_DIR}/devdocs/openapi/leap-plugins/latest/
  done

  # Finally copy docs into place
  cp -R markdown_out/* $ARG_BUILD_DIR/devdocs/eosdocs/leap

  # three args, build_root, doxyfile, and path to logo
  #DoxygenLeap $ARG_BUILD_DIR \
  #   ${SCRIPT_DIR}/mandle.cdt-doxyfile \
  #   ${SCRIPT_DIR}/../web/eosn_logo.png

}
