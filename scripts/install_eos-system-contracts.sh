#!/usr/bin/env bash

# Populates the following directories
#

DoxygenSystemContracts() {
  BUILD_ROOT=$1
  LOGO=$2
  CONFIG_DIR=$3

  # remove this to publish License Agreement Under system-contract/reference/Pages
  SUPRESS_EULA=1

  # location to write docs
  DEST_DIR="${BUILD_ROOT}/devdocs/eosdocs/system-contracts/"

  # pull from github
  # create reference dir if it does not exist
  [ ! -d "$DEST_DIR" ] && mkdir -p "$DEST_DIR"

  # copy in doxygen config file
  cp "$CONFIG_DIR"/doxyfile/system-contracts-doxyfile Doxyfile
  # copy in doxybook config file
  cp "$CONFIG_DIR"/doxybook/system-contracts.doxybook.config.json .
  # copy in logo
  cp "${LOGO}" docs
  # run doxygen
  { doxygen > /dev/null; } 2>&1

  # convert doxybook XML to Markdown
  [ ! -d reference ] && mkdir reference
  # convert XML to Markdown
  doxybook2 --input doxygen_out/xml --output reference --config system-contracts.doxybook.config.json
  find reference -type f -print0 | while IFS= read -r -d '' i
  do
    echo "$i"
    # fix BR tags to close properly
    # shellcheck disable=SC2016
    sed 's/<br>/<br\/>/g' "$i" > tempBR.md
    # shellcheck disable=SC2016
    sed 's/<T>/`<T>`/g' tempBR.md > tempT.md
    # shellcheck disable=SC2016
    sed 's/<int>/`<int>`/g' tempBR.md > tempT.md
    # remove empty links
    # shellcheck disable=SC2016
    sed 's/\[\([a-z0-9:_-]*\)\]()/\1/g' tempT.md > tempNOLINK.md
    mv tempNOLINK.md "$i"
  done

  # remove bad files
  grep -R "title: @" reference | cut -d: -f1 | sort -u | xargs rm
  # remove bad file from indexes
  grep -v "\[@" reference/index_namespaces.md > reference/temp_namespace.md
  mv reference/temp_namespace.md reference/index_namespaces.md
  grep -v "\[@" reference/index_classes.md > reference/temp_classes.md
  mv reference/temp_classes.md reference/index_classes.md

  # lets fix this up a bit
  # rm empty examples/pages , if not empty move index file in
  rmdir reference/Examples && rm reference/index_examples.md
  [ -f reference/index_examples.md ] && mv reference/index_examples.md reference/Examples/index.md
  rmdir reference/Pages && rm reference/index_pages.md
  [ -f reference/index_pages.md ] && mv reference/index_pages.md reference/Pages/index.md
  # move index files in
  mv reference/index_classes.md reference/Classes/index.md
  mv reference/index_files.md reference/Files/index.md
  mv reference/index_namespaces.md reference/Namespaces/index.md


  if [ "$SUPRESS_EULA" -eq 1 ]; then
    rm -rf reference/Pages
  fi

  # copy directory
  cp -R reference "$DEST_DIR"
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
  REPLACE="\/system-contracts\/latest\/reference\/"
  FIND="contracts\/eosio\."
  sed "s/${FIND}/${REPLACE}/g" markdown_out/README.md > tmp_README.md
  mv tmp_README.md markdown_out/README.md

  FIND="action-reference\/eosio\.bios"
  REPLACE="\/system-contracts\/latest\/reference\/Classes\/classeosiobios_1_1bios"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  FIND="action-reference\/eosio\.system"
  REPLACE="\/system-contracts\/latest\/reference\/Classes\/classeosiosystem_1_1system__contract"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  FIND="action-reference\/eosio\.msig"
  REPLACE="\/system-contracts\/latest\/reference\/Classes\/classeosio_1_1multisig"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  FIND="action-reference\/eosio\.token"
  REPLACE="\/system-contracts\/latest\/reference\/Classes\/classeosio_1_1token"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  FIND="action-reference\/eosio\.wrap"
  REPLACE="\/system-contracts\/latest\/reference\/Classes\/classeosio_1_1wrap"
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  # updates the paths to avoid collisions with doc6s indexing
  mv markdown_out/README.md markdown_out/about_system_contracts.md
  rm markdown_out/LICENSE*
  # both index and README are titled "About System Contracts"
  sed 's/title: About System Contracts/title: Overview/' markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/index.md

  # process markdown
  find markdown_out -type f -print0 | xargs -0 -I{} "${SCRIPT_DIR}"/add_title.py {}
  find markdown_out -type f -print0 | xargs -0 -I{} "${SCRIPT_DIR}"/process_admonitions.py {}

  # copy into serving location
  cp -R markdown_out/* "${ARG_BUILD_DIR}"/devdocs/eosdocs/system-contracts
}

Install_Eos-system-contracts() {
  SCRIPT_DIR=$1
  ARG_GIT_REPO=$2
  ARG_BUILD_DIR=$3
  ARG_BRANCH=$4
  ARG_TAG=$5

  MarkdownSystemContracts "$SCRIPT_DIR" "$ARG_GIT_REPO" "$ARG_BUILD_DIR" "$ARG_BRANCH" "$ARG_TAG"

  # three args, build_root, doxyfile, and path to logo
  DoxygenSystemContracts "$ARG_BUILD_DIR" \
     "${SCRIPT_DIR}"/../web/eosn_logo.png \
     "${SCRIPT_DIR}"/../config
}
