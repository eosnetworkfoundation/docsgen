#!/usr/bin/env bash

Install_Mandel-java() {
  SCRIPT_DIR=$1
  ARG_GIT_REPO=$2
  ARG_BUILD_DIR=$3
  ARG_BRANCH=$4
  ARG_TAG=$5

  # location of java code inside repo
  SOURCE_PATH="./eosiojava/src/main/java"

  # grep out packages
  # first cut: split out the code with the package name
  # second cut: remove the trailing ';'
  # sort: dedup
  PACKAGES=$(grep -Ri '^package' ./* | cut -d: -f 2 | cut -d';' -f1 | sort -u )
  # remove package name at begining
  PACKAGES=${PACKAGES//package /}
  # translate ending newlines to spaces
  PACKAGES=${PACKAGES//[$'\t\r\n']/ }

  # copy files in, view framework will convert from Markdown to HTML
  [ ! -d ${ARG_BUILD_DIR}/reference/javadocs ] && mkdir -p ${ARG_BUILD_DIR}/reference/javadocs
  CMD="javadoc -sourcepath ${SOURCE_PATH} -d ${ARG_BUILD_DIR}/reference/javadocs ${PACKAGES}"

  echo "running ${CMD}"
  ${CMD}
}
