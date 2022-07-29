#!/usr/bin/env bash

###############
# generates javadocs on the command line
# greps out package names
# then runs javadoc
# files stored in local directory
# for reference on javadoc http://www.manpagez.com/man/1/javadoc/
###############

GenJavaDoc() {
  if [[ $# -lt 2 ]] ; then
      echo 'NOT ENOUGH ARGS: specify web root,  specify script dir'
      exit 1
  fi

  WEB_ROOT=$1
  # location to write docs
  DEST_DIR="${WEB_ROOT}/reference/javadocs"
  # place to clone repo
  WORKING_DIR="${2}/../working"
  # repo
  GIT_URL="https://github.com/eosnetworkfoundation/mandel-java.git"
  # location of java code inside repo
  SOURCE_PATH="./eosiojava/src/main/java"

  # pull from github
  # create working dir if it does not exist
  [ ! -d $WORKING_DIR ] && mkdir $WORKING_DIR

  # clean out old mandel directory if it exists
  [ -d "${WORKING_DIR}/mandel-java" ] && rm -rf "${WORKING_DIR}/mandel-java"
  # enter working directory and clone repo
  cd $WORKING_DIR && git clone $GIT_URL && cd mandel-java

  # grep out packages
  # first cut: split out the code with the package name
  # second cut: remove the trailing ';'
  # sort: dedup
  PACKAGES=$(grep -Ri '^package' ./* | cut -d: -f 2 | cut -d';' -f1 | sort -u )
  # remove package name at begining
  PACKAGES=${PACKAGES//package /}
  # translate ending newlines to spaces
  PACKAGES=${PACKAGES//[$'\t\r\n']/ }

  CMD="javadoc -sourcepath ${SOURCE_PATH} -d ${DEST_DIR} ${PACKAGES}"

  echo "running ${CMD}"
  ${CMD}
}
