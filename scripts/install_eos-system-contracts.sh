#!/usr/bin/env bash

# Populates the following directories
# images go into static/welcome
#

DoxygenSystemContracts() {
  BUILD_ROOT=$1
  DOXYFILE=$2
  LOGO=$3
  # location to write docs
  DEST_DIR="${BUILD_ROOT}/devdocs/eosdocs/system-contracts/"

  # pull from github
  # create reference dir if it does not exist
  [ ! -d $DEST_DIR ] && mkdir -p $DEST_DIR

  # copy in doxygen config file
  cp ${DOXYFILE} Doxyfile
  # copy in logo
  cp ${LOGO} docs
  # run doxygen
  doxygen 2>&1>/dev/null

  # convert doxybook XML to Markdown
  [ ! -d reference ] && mkdir reference
  for xml_file in $(find doxygen_out/docbook/ -type f)
  do
    base_xml_file=$(basename $xml_file)
    md_file=$(echo $base_xml_file | cut -d'.' -f1).md
    echo "pandoc -f docbook -t markdown -o reference/${md_file} $xml_file"
    pandoc -f docbook -t markdown -o reference/${md_file} $xml_file
  done
  # copy images
  cp doxygen_out/docbook/*.png reference
  cp doxygen_out/docbook/*.jpg reference
  cp doxygen_out/docbook/*.jpeg reference

  # copy directory
  cp -R reference $DEST_DIR
}

MarkdownSystemContracts() {
  SCRIPT_DIR=$1
  ARG_GIT_REPO=$2
  ARG_BUILD_DIR=$3
  ARG_BRANCH=$4
  ARG_TAG=$5

  mkdir markdown_out
  mv README.md markdown_out
  mv LICENSE markdown_out/LICENSE.md
  # quick fix to path for License
  sed 's/LICENSE/https:\/\/github.com\/eosnetworkfoundation\/eos-system-contracts\/blob\/main\/LICENSE/' markdown_out/README.md > tmp_README.md
  mv tmp_README.md markdown_out/README.md

  # pull in markdown docs from git
  cp -R docs/* markdown_out

  # fix relative links
  REPLACE="https:\/\/docs.eosnetwork.com\/reference\/eos-system-contracts\/annotated.html"
  FIND="contracts\/eosio\."
  sed "s/${FIND}/${REPLACE}/g" markdown_out/README.md > tmp_README.md
  mv tmp_README.md markdown_out/README.md

  FIND="action-reference\/eosio\.bios"
  REPLACE="https:\/\/docs.eosnetwork.com\/reference\/eos-system-contracts\/classeosiobios_1_1bios\.html"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  FIND="action-reference\/eosio\.system"
  REPLACE="https:\/\/docs.eosnetwork.com\/reference\/eos-system-contracts\/classeosiosystem_1_1system__contract\.html"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  FIND="action-reference\/eosio\.msig"
  REPLACE="https:\/\/docs.eosnetwork.com\/reference\/eos-system-contracts\/classeosio_1_1multisig\.html"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  FIND="action-reference\/eosio\.token"
  REPLACE="https:\/\/docs.eosnetwork.com\/reference\/eos-system-contracts\/classeosio_1_1token\.html"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  FIND="action-reference\/eosio\.wrap"
  REPLACE="https:\/\/docs.eosnetwork.com\/reference\/eos-system-contracts\/classeosio_1_1wrap\.html"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  # updates the paths to avoid collisions with doc6s indexing
  mv markdown_out/README.md markdown_out/about_system_contracts.md
  rm markdown_out/LICENSE*

  # process markdown
  find markdown_out -type f | xargs -I{} ${SCRIPT_DIR}/add_title.py {}
  find markdown_out -type f | xargs -I{} ${SCRIPT_DIR}/process_admonitions.py {}

  # copy into serving location
  cp -R markdown_out/* ${ARG_BUILD_DIR}/devdocs/eosdocs/system-contracts
}

Install_Eos-system-contracts() {
  SCRIPT_DIR=$1
  ARG_GIT_REPO=$2
  ARG_BUILD_DIR=$3
  ARG_BRANCH=$4
  ARG_TAG=$5

  MarkdownSystemContracts $SCRIPT_DIR $ARG_GIT_REPO $ARG_BUILD_DIR $ARG_BRANCH $ARG_TAG

  # three args, build_root, doxyfile, and path to logo
  DoxygenSystemContracts $ARG_BUILD_DIR \
     ${SCRIPT_DIR}/system-contracts-doxyfile \
     ${SCRIPT_DIR}/../web/eosn_logo.png
}
