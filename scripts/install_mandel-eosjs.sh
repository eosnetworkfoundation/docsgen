#!/usr/bin/env bash

Install_Mandel-eosjs() {
  SCRIPT_DIR=$1
  ARG_GIT_REPO=$2
  ARG_BUILD_DIR=$3
  ARG_BRANCH=$4
  ARG_TAG=$5

  # required dependancy
  npm install --save @types/text-encoding
  # generate the docs there is a typedoc.json config
  node_modules/typedoc/bin/typedoc --plugin typedoc-plugin-markdown

  # add contributing and license files
  mv ./CONTRIBUTING.md typedoc-out/
  # remove reference to LICENSE
  grep -v LICENSE typedoc-out/README.md > tmp_README.md
  mv tmp_README.md typedoc-out/README.md

  # copy files in, view framework will convert from Markdown to HTML
  [ -d ${ARG_BUILD_DIR}/devdocs/eosdocs/eosjs ] && rm -rf ${ARG_BUILD_DIR}/devdocs/eosdocs/eosjs
  mkdir -p ${ARG_BUILD_DIR}/devdocs/eosdocs/eosjs
  cp -R typedoc-out/* ${ARG_BUILD_DIR}/devdocs/eosdocs/eosjs
}
