#!/usr/bin/env bash

# Populates the following directories
# images go into static/welcome
#

DoxygenCDT() {
  BUILD_ROOT=$1
  LOGO=$2
  CONFIG_DIR=$3

  # location to write docs
  DEST_DIR="${BUILD_ROOT}/devdocs/eosdocs/cdt/"

  # pull from github
  # create reference dir if it does not exist
  [ ! -d $DEST_DIR ] && mkdir -p $DEST_DIR

  # copy in doxygen config file
  cp $CONFIG_DIR/doxyfile/cdt-doxyfile Doxyfile
  # copy in doxybook config file
  cp $CONFIG_DIR/doxybook/cdt.doxybook.config.json .
  # copy in logo
  cp ${LOGO} docs
  # run doxygen create doxybook
  doxygen 2>&1>/dev/null

  [ ! -d reference ] && mkdir reference
  # convert XML to Markdown
  doxybook2 --input doxygen_out/xml --output reference --config cdt.doxybook.config.json
  for i in $(find reference -type f)
  do
    echo $i
    # fix BR tags to close properly
    sed 's/<br>/<br\/>/g' $i > temp.md
    # remove empty links
    sed 's/\[\([a-z0-9:_-]*\)\]()/\1/g' temp.md > tempNOLINK.md
    mv tempNOLINK.md $i
  done

  # spot fixes
  sed 's/<Word>/`<Word>`/g' reference/Classes/classeosio_1_1fixed__bytes.md > temp.md
  mv temp.md reference/Classes/classeosio_1_1fixed__bytes.md

  sed 's/<int>/`<int>`/g' reference/Classes/structeosio_1_1ignore.md > temp.md
  mv temp.md reference/Classes/structeosio_1_1ignore.md

  sed 's/<T>/`<T>`/g' reference/Namespaces/namespaceeosio.md > temp.md
  mv temp.md reference/Namespaces/namespaceeosio.md

  sed 's/<Stream>/`<Stream>`/g' reference/Classes/structeosio_1_1multi__index_1_1index.md > temp.md
  mv temp.md reference/Classes/structeosio_1_1multi__index_1_1index.md

  sed 's/<Stream>/`<Stream>`/g' reference/Namespaces/namespaceeosio.md > temp.md
  mv temp.md reference/Namespaces/namespaceeosio.md

  # Note need to fix summary
  sed 's/summary:\(.*\)Example:/summary:\1/' reference/Classes/structeosio_1_1action__wrapper.md > temp.md
  mv temp.md reference/Classes/structeosio_1_1action__wrapper.md
  # reference/Classes/structeosio_1_1action__wrapper.md

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



  # copy directory
  cp -R reference $DEST_DIR

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
     ${SCRIPT_DIR}/../web/eosn_logo.png \
     ${SCRIPT_DIR}/../config
}
