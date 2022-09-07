#!/usr/bin/env bash

###############
# generates javascript/typescripts docs
# this creates markdown
###############

GenJSDoc() {
  if [[ $# -lt 2 ]] ; then
      echo 'NOT ENOUGH ARGS: specify web root,  specify script dir'
      exit 1
  fi

  WEB_ROOT=$1
  # location to write docs
  DEST_DIR="${WEB_ROOT}/devdocs/eosdocs/client-side/jsdocs"
  # place to clone repo
  WORKING_DIR="${2}/../working"
  # repo, use personal until pull request accepted
  GIT_URL="https://github.com/ericpassmore/mandel-eosjs"
  # location of markdown docs inside repo
  DOC_PATH="docs"

  # pull from github
  # create working dir if it does not exist
  [ ! -d $WORKING_DIR ] && mkdir $WORKING_DIR

  # clean out old mandel directory if it exists
  [ -d "${WORKING_DIR}/mandel-eosjs" ] && rm -rf "${WORKING_DIR}/mandel-eosjs"
  # enter working directory and clone repo
  cd $WORKING_DIR && git clone $GIT_URL && cd "mandel-eosjs"

  # required dependancy
  npm install --save @types/text-encoding
  # generate the docs there is a typedoc.json config
  node_modules/typedoc/bin/typedoc --plugin typedoc-plugin-markdown

  # add contributing and license files
  mv ./CONTRIBUTING.md typedoc-out/
  mv ./LICENSE typedoc-out/LICENSE.md
  # quick fix to path for License
  sed 's/\.\/LICENSE/\/eosdocs\/client-side\/jsdocs\/LICENSE.md/' typedoc-out/README.md > tmp_README.md
  mv tmp_README.md typedoc-out/README.md

  # copy files in, view framework will convert from Markdown to HTML
  cp -R typedoc-out/* $DEST_DIR
}
