#!/usr/bin/env bash

# This script is destructive. It deletes the doc build folder altogether.
# It initialized web documentation.
# It creates diretory structure when dirs do not exist
# It copies over a few static web files (html, css, js)
# created August 2022
# author @iamveritas

########
# FUNCTIONS
Help() {
  echo "DELETES the specified directory!"
  echo "Then it creates directories and installs initial templates."
  echo "Creates web version of documentation pulling together documentation from several gitrepositories across the EOS Networks."
  echo ""
  echo "Syntax: clean_gen_docs [-h|d]"
  echo "options:"
  echo "-h: print this help"
  echo "-d: specificy web root directory and destination"
  exit 1
}

########
# Get the options
while getopts "hd:" option; do
   case $option in
      h) # display Help
         Help
         ;;
      d) # set dir
        ROOT_DIR=${OPTARG}
        ;;
      :) # no args
        echo "missing '-d' directory, '-h' for help"; exit 1;
        ;;
      *) # abnormal args
        echo "unexpected arguments, '-h' for help"; exit 1;
        ;;
   esac
done

######
# main
# check for parameters
if [ -z $ROOT_DIR ]; then
  echo "missing '-d' directory, '-h' for help"; exit 1;
fi

echo "delete directory ${ROOT_DIR}"

rm -rf "${ROOT_DIR}"

# compute script dir for copying files from here to web directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

echo "change dir to ${SCRIPT_DIR}"

pushd "${SCRIPT_DIR}"

pwd

echo "run ./initialize_repository.sh -d ${ROOT_DIR}"
./initialize_repository.sh -d "${ROOT_DIR}"

echo "run ./run_me_to_gen_docs.sh -u -d "${ROOT_DIR}""
./run_me_to_gen_docs.sh -u -d "${ROOT_DIR}"

echo "Done"

popd
