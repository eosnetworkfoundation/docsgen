#!/usr/bin/env bash

# Populates the following directories
# leap
#

DoxygenLeap() {
  BUILD_ROOT=$1
  LOGO=$2
  CONFIG_DIR=$3

  # location to write docs
  DEST_DIR="${BUILD_ROOT}/devdocs/eosdocs/leap/"

  # pull from github
  # create reference dir if it does not exist
  [ ! -d "$DEST_DIR" ] && mkdir -p "$DEST_DIR"

  # copy in doxygen config file
  cp "$CONFIG_DIR"/doxyfile/leap-doxyfile Doxyfile
  # copy in doxybook config file
  cp "$CONFIG_DIR"/doxybook/leap.doxybook.config.json .
  # copy in logo
  cp "${LOGO}" docs
  # run doxygen create doxybook
  { doxygen > /dev/null; } 2>&1

  [ -d reference ] && rm reference
  mkdir reference
  # convert XML to Markdown
  doxybook2 --input doxygen_out/xml --output reference --config leap.doxybook.config.json
  find reference -type f -print0 | while IFS= read -r -d '' i
  do
    echo "$i"
    # fix BR tags to close properly
    # shellcheck disable=SC2016
    sed 's/<br>/<br\/>/g' "$i" > temp.md
    # remove empty links
    # shellcheck disable=SC2016
    sed 's/\[\([a-z0-9:_-]*\)\]()/\1/g' temp.md > tempNOLINK.md
    mv tempNOLINK.md "$i"
  done

  # copy files to staging area
  cp -R reference "$DEST_DIR"
}

Install_Leap() {
  SCRIPT_DIR=$1
  # shellcheck disable=SC2034  # Unused variables to keep method call enforced
  ARG_GIT_REPO=$2
  ARG_BUILD_DIR=$3
  # shellcheck disable=SC2034  # Unused variables to keep method call enforced
  ARG_BRANCH=$4
  # shellcheck disable=SC2034  # Unused variables to keep method call enforced
  ARG_TAG=$5

  TUTORIAL_DOC_ROOT="${ARG_BUILD_DIR}/devdocs/eosdocs/welcome/03_tutorials"

  # copy out to keep docs clean and process idempotent
  [ ! -d markdown_out ] && mkdir markdown_out
  cp -R docs/* markdown_out

  # process and copy markdown
  find markdown_out -type f -print0 | xargs -0 -I{} "${SCRIPT_DIR}"/add_title.py {}
  find markdown_out -type f -print0 | xargs -0 -I{} "${SCRIPT_DIR}"/process_admonitions.py {}

  # fix paths for dev tools
  find markdown_out -type f -name "*.md" -print0 | while IFS= read -r -d '' file
  do
    sed 's/(\/glossary.md/(\/welcome\/latest\/glossary/g' "$file" > tempG.md

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

    mv tempTT.md "$file"
  done

  # fix reasource path
  sed 's/\/resources\/index.md/\/welcome\/latest\/resources\//' \
      markdown_out/02_cleos/02_how-to-guides/how-to-get-block-information.md > tempRes.md
  mv tempRes.md markdown_out/02_cleos/02_how-to-guides/how-to-get-block-information.md

  # move tutorial to welcome
  cp tutorials/bios-boot-tutorial/README.md "${TUTORIAL_DOC_ROOT}/bios-boot-tutorial.md"

  # copy the YAML Files
  [ ! -d "${ARG_BUILD_DIR}"/devdocs/openapi/leap-plugins/latest/ ] && mkdir -p "${ARG_BUILD_DIR}"/devdocs/openapi/leap-plugins/latest/
  find plugins -name "*.yaml" -print0 | while IFS= read -r -d '' i
  do
    cp "$i" "${ARG_BUILD_DIR}"/devdocs/openapi/leap-plugins/latest/
  done

  # Finally copy docs into place
  cp -R markdown_out/* "$ARG_BUILD_DIR"/devdocs/eosdocs/leap

  # three args, build_root, doxyfile, and path to logo
  #DoxygenLeap $ARG_BUILD_DIR \
  #   "${SCRIPT_DIR}"/../web/eosn_logo.png \
  #   "${SCRIPT_DIR}"/../config

}
