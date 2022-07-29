#!/usr/bin/env bash

###############
# generates swiftdocs
# clones directory then replaces URL paths
# this creates markdown
###############

GenSwiftDoc() {
  if [[ $# -lt 2 ]] ; then
      echo 'NOT ENOUGH ARGS: specify web root,  specify script dir'
      exit 1
  fi

  WEB_ROOT=$1
  # location to write docs
  DEST_DIR="${WEB_ROOT}/reference/swiftdocs"
  DEST_MD_DIR="${WEB_ROOT}/devdocs/eosdocs/client-side/swiftdocs"
  API_REF_ME="${DEST_MD_DIR}/Swift\ API\ Reference.md"

  # place to clone repo
  WORKING_DIR="${2}/../working"
  # repo
  GIT_URL="https://github.com/eosnetworkfoundation/mandel-swift.git"
  # location of markdown docs inside repo
  DOC_PATH="docs"
  PROTOCOL=${3:-https}

  # pull from github
  # create working dir if it does not exist
  [ ! -d $WORKING_DIR ] && mkdir $WORKING_DIR

  # clean out old mandel directory if it exists
  [ -d "${WORKING_DIR}/mandel-swift" ] && rm -rf "${WORKING_DIR}/mandel-swift"
  # enter working directory and clone repo
  cd $WORKING_DIR && git clone $GIT_URL && cd "mandel-swift/${DOC_PATH}"

  # update index with proper server url
  sed "s/https\:\/\/eosio.github.io\/eosio-swift\//${PROTOCOL}:\/\/docs.eosnetwork.com\/reference\/swiftdocs\//" index.md > tmp.md
  # cleanup some trailing junk
  sed 's/(\`.*\`)//' tmp.md > tmp2.md
  mv tmp2.md ${API_REF_ME}

  # copy files in, view framework will convert from Markdown to HTML
  cp -R * $DEST_DIR

  # back to main dir
  cd ${WORKING_DIR}/mandel-swift
  # copy sources
  cp -r Sources ${DEST_DIR}
  # copy other MD files inplace
  sed "s/Sources\/EosioSwift/${PROTOCOL}:\/\/docs.eosnetwork.com\/reference\/swiftdocs\/Sources\/EosioSwift/g" EXAMPLES.md > tmpA.md
  # collapse trailing slash in special case , slash added back next line
  sed 's/(README\.md\/#/(README.md#/g' tmpA.md > tmpB.md
  sed 's/(README\.md/(\/eosdocs\/client-side\/swiftdocs\//g' tmpB.md > tmpC.md
  # update title
  sed 's/^# EOSIO SDK for Swift Examples/# Examples/' tmpC.md > EXAMPLES.md
  sed "s/Sources\/EosioSwift/${PROTOCOL}:\/\/docs.eosnetwork.com\/reference\/swiftdocs\/Sources\/EosioSwift/g" README.md > tmp2.md
  sed "s/EosioSwift\/EosioTransaction/${PROTOCOL}:\/\/docs.eosnetwork.com\/reference\/swiftdocs\/Sources\/EosioSwift\/EosioTransaction/g" tmp2.md > tmp3.md
  mv tmp3.md index.md
  cp index.md EXAMPLES.md $DEST_MD_DIR

}
