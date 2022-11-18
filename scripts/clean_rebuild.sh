#!/usr/bin/env bash
set -x
Help() {
  echo "clean_rebuild.sh -d /path/to/build_root"
  echo "removes everything and rebuilds "
  exit 1
}

# Get the options
while getopts "d:" option; do
   case $option in
      d) # set build dir
        ARG_BUILD_DIR=${OPTARG}
        ;;
      :) # no args
        Help;
        ;;
      *) # abnormal args
        Help;
        ;;
   esac
done
# check for required args
if [ -z "$ARG_BUILD_DIR" ]; then
  echo -e "Missing required argument -d directory"
  Help;
fi

# create dir if it does not exist
[ ! -d "$ARG_BUILD_DIR" ] && mkdir -p "$ARG_BUILD_DIR"

# remove everthing under the build dir
rm -rf "${ARG_BUILD_DIR:?}"/* || exit
# remove working directories
rm -rf ../working/*

for gitrepo in AntelopeIO/docs \
    AntelopeIO/cdt \
    AntelopeIO/reference-contracts \
    AntelopeIO/leap \
    AntelopeIO/DUNE \
    eosnetworkfoundation/mandel-eosjs \
    eosnetworkfoundation/mandel-java
do
  echo "working on ${gitrepo}"
  # empty out var
  unset branch
  if [ -z "$branch" ]; then
    ./generate_documents.sh -d "$ARG_BUILD_DIR" -r ${gitrepo} -x
  else
    ./generate_documents.sh -d "$ARG_BUILD_DIR" -r "${gitrepo}" -b "$branch" -x
  fi
done
# one last time without supress flag
# this last run builds the statics via "npm run build"
./generate_documents.sh -d "$ARG_BUILD_DIR" -r "eosnetworkfoundation/mandel-swift"
