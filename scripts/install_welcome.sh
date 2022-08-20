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
Install_Welcome() {
  ARG_GIT_REPO=$1
  ARG_BUILD_DIR=$2
  ARG_BRANCH=$3
  ARG_TAG=$4
  ARG_DOC_VERSION=$5

  IMG_DIR=${ARG_BUILD_DIR}/devdocs/static/welcome
  # place for welcome static image files
  [ ! -d $IMG_DIR ] && mkdir $IMG_DIR

  # setup images
  cp -r docs/01_overview/images/* $IMG_DIR
  # move it out of the way so it doens't get copied as doc
  mv docs/01_overview/images ./overview-images
  # update image paths
  for i in $(find docs/01_overview -type f -name "*.md"); do
    sed 's/(\.\/images\//(\/welcome\//g' $i > tmpP.md
    mv tmpP.md $i
  done

  # setup images
  cp -r docs/02_getting-started/images/* $IMG_DIR
  # move it out of the way so it doens't get copied as doc
  mv docs/02_getting-started/images ./getting-started-images
  # update image paths
  for i in $(find docs/02_getting-started -type f -name "*.md"); do
    sed 's/(\.\.\/images\//(\/welcome\//g' $i > tmpP.md
    mv tmpP.md $i
  done

  # setup images
  cp -r docs/04_protocol/images/* $IMG_DIR
  # move it out of the way so it doens't get copied as doc
  mv docs/04_protocol/images ./protocol-images
  # update image paths
  for i in $(find docs/04_protocol -type f -name "*.md"); do
    sed 's/(images\//(\/welcome\//g' $i > tmpP.md
    mv tmpP.md $i
  done

  # patch up files titles
  ${SCRIPT_DIR}/add_title.py docs/index.md
  find docs -type f | xargs -I{} ${SCRIPT_DIR}/add_title.py {}
  find docs -type f | xargs -I{} ${SCRIPT_DIR}/process_admonitions.py {}

  # copy in the files to build root
  cp glossary.md $ARG_BUILD_DIR/devdocs/welcome
  cp docs/index.md $ARG_BUILD_DIR/devdocs/welcome
  for d in 01_overview 02_getting-started 03_tutorials 04_protocol \
      05_community-developer-tools 06_eosio-blockchain-networks \
      07_migration-guides
  do
    cp -r docs/${d} $ARG_BUILD_DIR/devdocs/welcome
  done

}
