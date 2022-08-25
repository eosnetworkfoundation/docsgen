#!/usr/bin/env bash

Install_Mandel-swift() {
  SCRIPT_DIR=$1
  ARG_GIT_REPO=$2
  ARG_BUILD_DIR=$3
  ARG_BRANCH=$4
  ARG_TAG=$5

  # copy files in, view framework will convert from Markdown to HTML
  [ ! -d ${ARG_BUILD_DIR}/reference/swiftdocs ] && mkdir -p ${ARG_BUILD_DIR}/reference/swiftdocs

  [ ! -d markdown_out ] && mkdir markdown_out
  cp -r docs/* markdown_out
  # update index with proper server url
  sed "s/https\:\/\/eosio.github.io\/eosio-swift\//https:\/\/docs.eosnetwork.com\/reference\/swiftdocs\//" markdown_out/index.md > tmp.md
  # cleanup some trailing junk
  sed 's/(\`.*\`)//' tmp.md > tmp2.md
  # yikes keep the quotes around API_REF_ME, spaces in name will break unquoted mv
  mv tmp2.md "markdown_out/Swift API Reference.md"

  # copy files in, view framework will convert from Markdown to HTML
  [ -d ${ARG_BUILD_DIR}/devdocs/eosdocs/swift-sdk ] && rm -rf ${ARG_BUILD_DIR}/devdocs/eosdocs/swift-sdk
  mkdir -p ${ARG_BUILD_DIR}/devdocs/eosdocs/swift-sdk
  cp -R markdown_out/* ${ARG_BUILD_DIR}/devdocs/eosdocs/swift-sdk/

  [ -d ${ARG_BUILD_DIR}/reference/swiftdocs ] && rm -rf ${ARG_BUILD_DIR}/reference/swiftdocs
  mkdir -p ${ARG_BUILD_DIR}/reference/swiftdocs
  # copy sources
  cp -r Sources ${ARG_BUILD_DIR}/reference/swiftdocs
  # copy other MD files inplace
  sed "s/Sources\/EosioSwift/https:\/\/docs.eosnetwork.com\/reference\/swiftdocs\/Sources\/EosioSwift/g" EXAMPLES.md > tmpA.md
  # collapse trailing slash in special case , slash added back next line
  sed 's/(README\.md\/#/(README.md#/g' tmpA.md > tmpB.md
  sed 's/(README\.md/(\/eosdocs\/client-side\/swiftdocs\//g' tmpB.md > tmpC.md
  # update title
  sed 's/^# EOSIO SDK for Swift Examples/# Examples/' tmpC.md > EXAMPLES.md
  sed "s/Sources\/EosioSwift/https:\/\/docs.eosnetwork.com\/reference\/swiftdocs\/Sources\/EosioSwift/g" README.md > tmp2.md
  sed "s/EosioSwift\/EosioTransaction/https:\/\/docs.eosnetwork.com\/reference\/swiftdocs\/Sources\/EosioSwift\/EosioTransaction/g" tmp2.md > tmp3.md
  mv tmp3.md index.md
  cp index.md EXAMPLES.md ${ARG_BUILD_DIR}/devdocs/eosdocs/swift-sdk/
}
