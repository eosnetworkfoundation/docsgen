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
      i) # set identity
        ARG_ID_FILE=${OPTARG}
        ;;
      h) # set host
        ARG_HOST+=("${OPTARG}")
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
if [ -z $ARG_BUILD_DIR ]; then
  echo -e "Missing required argument -d directory"
  Help;
fi

# create dir if it does not exist
[ ! -d $ARG_BUILD_DIR ] && mkdir -p $ARG_BUILD_DIR

# remove everthing under the build dir
rm -rf $ARG_BUILD_DIR/*
# remove working directories
rm -rf ../working/*

for gitrepo in eosnetworkfoundation/welcome \
    AntelopeIO/cdt \
    eosnetworkfoundation/eos-system-contracts \
    AntelopeIO/leap \
    AntelopeIO/DUNE
do
  echo "working on ${gitrepo}"
  # empty out var
  unset branch
  if [ -z $branch ]; then
    ./generate_documents.sh -d $ARG_BUILD_DIR -r ${gitrepo}
  else
    ./generate_documents.sh -d $ARG_BUILD_DIR -r ${gitrepo} -b $branch
  fi
done
