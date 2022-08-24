#!/usr/bin/env bash

# Populates the following directories
# images go into static/welcome
#

DoxygenCDT() {
  BUILD_ROOT=$1
  DOXYFILE=$2
  LOGO=$3
  # location to write docs
  DEST_DIR="${BUILD_ROOT}/reference/mandel-cdt"

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

Install_Cdt() {
  SCRIPT_DIR=$1
  ARG_GIT_REPO=$2
  ARG_BUILD_DIR=$3
  ARG_BRANCH=$4
  ARG_TAG=$5

  [ ! -d markdown_out ] && mkdir markdown_out
  cp -R docs/* markdown_out

  # process and copy markdown
  find markdown_out -type f | xargs -I{} ${SCRIPT_DIR}/add_title.py {}
  find markdown_out -type f | xargs -I{} ${SCRIPT_DIR}/process_admonitions.py {}
  # get rid of HR tags messes up MDX parsing
  sed 's/<hr>//g' markdown_out/09_tutorials/01_binary-extension.md > temp.md
  mv temp.md markdown_out/09_tutorials/01_binary-extension.md
  sed 's/<hr>//g' markdown_out/05_features/30_binary-extension.md > temp.md
  mv temp.md markdown_out/05_features/30_binary-extension.md
  cp -R markdown_out/* $ARG_BUILD_DIR/devdocs/eosdocs/cdt

  # three args, build_root, doxyfile, and path to logo
  DoxygenCDT $ARG_BUILD_DIR \
     ${SCRIPT_DIR}/mandle.cdt-doxyfile \
     ${SCRIPT_DIR}/../web/eosn_logo.png

}
