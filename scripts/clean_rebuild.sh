#!/usr/bin/env bash

Help() {
  echo "clean_rebuild.sh -d /path/to/build_root [-h host] [-i identity][-s] [-y]"
  echo "-h: user@host to install content"
  echo "-i: key for secure FTP to use"
  echo "-c: content directory defaults to ~/content"
  echo "-y: yes, override the prompt to confirm directories to clean out "
  echo "-s: output to staging location"
  echo "removes everything and rebuilds "
  echo "please specify absolute path"
  exit 1
}

# Get the options
while getopts "d:h:i:c:sy" option; do
   case $option in
      d) # set build dir
        ARG_BUILD_DIR=${OPTARG}
        ;;
      h) # set host
        ARG_HOST=${OPTARG}
        ;;
      i) # set identify key file
        ARG_IDENTITY=${OPTARG}
        ;;
      c) # set content file
        ARG_CONTENT_DIR=${OPTARG}
        ;;
      s) # set staging
        ARG_STAGING="True"
        ;;
      y) # no prompt
        ARG_YES="TRUE"
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
# better to have absolute paths
if [[ "${ARG_BUILD_DIR:0:1}" == / || "${ARG_BUILD_DIR:0:2}" == ~[/a-z] ]]
then
    if [ "$ARG_BUILD_DIR" == "/" ]; then
      echo "Root directory is not allowed, it will removal all files under /"
      exit 1
    fi
    echo "OK: Passed Build Path Checks"
else
    echo -e "Directory must be absolte path starting with / or ~"
    Help;
fi
## STAGING CHANGES
if [ -n "$ARG_STAGING" ]; then
  WEBROOT='/var/www/html/ENF/devrel_staging'
  DOCS_BRANCH="staging"
fi

# Remove Last Updates while we run job
# Set Lock File
UPDATE_DATETIME_FILE="${WEBROOT:-/var/www/html/ENF/production}"/updated.html
LOCK_FILE="${WEBROOT:-/var/www/html/ENF/production}"/clean_rebuild.lock

## Exit if lock file exists
#  Else Set lock file
#  remove date time file
#  add message that run has started
if [ -f "$LOCK_FILE" ]; then
  LOCK_PID=$(cat "$LOCK_FILE")
  printf 'EXITING Lock file %s exists with pid: %s\n' "$LOCK_FILE" "$LOCK_PID" && exit 1
else
  # local builds do not have WEBROOT
  if [ -d "$WEBROOT" ]; then
    printf '%s\n', "$$" > "$LOCK_FILE"
    [ -f "$UPDATE_DATETIME_FILE" ] && rm "$UPDATE_DATETIME_FILE"
    NOW=$(date -u "+%a %b %d %r")
    printf '\nCurrently Running Full Rebuild Started Run at UTC %s\n' "$NOW" > "$UPDATE_DATETIME_FILE"
  fi
fi

# local builds do not have WEBROOT
[ -d "$WEBROOT" ] && printf '%s\n' "$$" > "$LOCK_FILE"

# compute script dir for copying files from here to web directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# move script out of the way so it doesn't get picked up
# generate_documents.sh will pick up
#   - docusaurus.config.js.new
# and fall back to
#   - docusaurus.config.js
[ -f "${SCRIPT_DIR}"/../config/docusaurus.config.js.new ] && mv "${SCRIPT_DIR}"/../config/docusaurus.config.js.new "${SCRIPT_DIR}"/../config/docusaurus.config.js.next

# create dir if it does not exist
[ ! -d "$ARG_BUILD_DIR" ] && mkdir -p "$ARG_BUILD_DIR"

# if ARG_YES not set do it
# if ARG_YES set skip
if [ -z "$ARG_YES" ]; then
  # remove everthing under the build dir
  echo "Removing All Files under ${ARG_BUILD_DIR:?} Continue? (Y/N): "
  read -r confirm
  [[ "$confirm" == [yY] || "$confirm" == [yY][eE][sS] ]] || exit 1
fi

rm -rf "${ARG_BUILD_DIR:?}"/* || exit
# remove working directories
rm -rf "${SCRIPT_DIR:?}/working/*" || exit

# build up arguments no npm build
CMD_FLAGS="-x"
if [ -n "$ARG_STAGING" ]; then
  # add staging flag
  CMD_FLAGS="-xs"
fi

dune_branch="main"

for gitrepo in eosnetworkfoundation/docs \
    AntelopeIO/cdt \
    eosnetworkfoundation/eos-system-contracts \
    AntelopeIO/leap \
    AntelopeIO/DUNE \
    eosnetworkfoundation/mandel-eosjs \
    eosnetworkfoundation/mandel-java \
    eosnetworkfoundation/mandel-swift
do
  echo "working on ${gitrepo}"
  # empty out var
  unset branch
  if [ "${gitrepo}" == "eosnetworkfoundation/docs" ]; then
    branch=${DOCS_BRANCH:-main}
  fi
  if [ "${gitrepo}" == "AntelopeIO/leap" ]; then
    branch="release/3.1"
  fi
  if [ "${gitrepo}" == "AntelopeIO/cdt" ]; then
    branch="release/3.1"
  fi
  if [ "${gitrepo}" == "eosnetworkfoundation/eos-system-contracts" ]; then
    branch="release/3.1"
  fi
  if [ "${gitrepo}" == "AntelopeIO/DUNE" ]; then
    branch="v1.1.0"
    dune_branch=${branch}
  fi

  if [ -z "$branch" ]; then
    "${SCRIPT_DIR:?}"/generate_documents.sh -d "$ARG_BUILD_DIR" -r ${gitrepo} "$CMD_FLAGS"
  else
    "${SCRIPT_DIR:?}"/generate_documents.sh -d "$ARG_BUILD_DIR" -r "${gitrepo}" -b "$branch" "$CMD_FLAGS"
  fi
done

##
# CREATE VERSIONS: docusaurus copy content to versioned directories
pushd "$ARG_BUILD_DIR"/devdocs || exit
if ! npm run docusaurus docs:version:leap 3.1;
then
  >&2 echo "FATAL: npm run build failed exiting"
  exit 1
fi
popd || exit

##
# Another Leap Version
# update config for v3.1
# Configure version paths and banners
mv "${SCRIPT_DIR}"/../config/docusaurus.config.js.next "${SCRIPT_DIR}"/../config/docusaurus.config.js.new
"${SCRIPT_DIR:?}"/generate_documents.sh -d "$ARG_BUILD_DIR" -r "AntelopeIO/leap" -b "release/3.2" "$CMD_FLAGS"

pushd "$ARG_BUILD_DIR"/devdocs || exit
# explict build
if ! npm run build;
then
  >&2 echo "FATAL: npm run build failed exiting"
  exit 1
fi
popd || exit

set -x
# Final run to push to production Add Hosts and Identify
# USE DUNE because it is a one file change and its fast
# note generate documents can take multiple hosts args -h u@host1 -h u@host2 ...
if [ -n "$ARG_HOST" ] && [ -n "${ARG_IDENTITY}" ]; then
  "${SCRIPT_DIR:?}"/generate_documents.sh -d "$ARG_BUILD_DIR" -f -r "AntelopeIO/DUNE" -b "$dune_branch" -h "$ARG_HOST" -i "$ARG_IDENTITY" -c "${ARG_CONTENT_DIR:-~/content}" "$CMD_FLAGS"
fi

## All done, remove the lock file, and set last updated times
# local builds do not have webroot so skip
if [ -d "${WEBROOT:-/var/www/html/ENF/production}" ]; then
  if [ -f "$LOCK_FILE" ]; then
    rm -f $LOCK_FILE
  fi
  if [ -f "$UPDATE_DATETIME_FILE" ]; then
    rm "$UPDATE_DATETIME_FILE"
  fi
  "${SCRIPT_DIR}"/set_update_time.sh > "$UPDATE_DATETIME_FILE"
fi
