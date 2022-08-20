#!/usr/bin/env bash

# Clones Git repos and processes Markdown and Code to produce static HTML documentation
# created Sep 2022
# author @ericpassmore

#############################################################################
# FUNCTIONS
#############################################################################
Help() {
  echo "Creates web version of documentation pulling together documentation from several gitrepositories across the EOS Networks"
  echo ""
  echo "Syntax: generate_documents.sh [-r|d|b|t|v|i|h]"
  echo "mandatory: -r owner/rep and -d directory"
  echo ""
  echo "options:"
  echo "-r: owner/repository name of the git repository and source for documentation"
  echo "-d: specify directory for building the static HTML documentation"
  echo "-b: branch to use for git"
  echo "-t: tag to use for git"
  echo "-v: the version of documentation, as seen by end users, that is updated"
  echo "-i: private key for web host, needed to install files"
  echo "-h: destination host(s) where to install files"
  echo "-f: fast, skip git clone if files less then 1 hour old"
  echo ""
  echo "example: generate_documents.sh -r eosnetworkfoundation/mandel -b ericpassmore-working -t v3.1.1 -r 3.1 -d /path/to/build_root -i aws_identity -h hostA -h hostB"
  echo "Run script to build mandel docs and update production site , with branch ericpassmore-working and tag v3.1.1, documentation version shown to user will be 3.1. So this updates the 3.1 documentation on the documentation website using ericpassmore-working branch and the tag v3.1.1"
  exit 1
}

####
# Create Top Level Directories
Create_Top_Level_Dir() {
  # devdocs is for docusarus , reference for non-markdown content
  [ ! -d "${ARG_BUILD_DIR}/devdocs" ] && mkdir -p "${ARG_BUILD_DIR}/devdocs"
    [ ! -d "${ARG_BUILD_DIR}/devdocs/welcome" ] && mkdir -p "${ARG_BUILD_DIR}/devdocs/welcome"
  # i18n directories zh and ko, english is the default and not included
  [ ! -d "${ARG_BUILD_DIR}/devdocs/i18n" ] && mkdir "${ARG_BUILD_DIR}/devdocs/i18n"
  [ ! -d "${ARG_BUILD_DIR}/devdocs/i18n/ko" ] && mkdir "${ARG_BUILD_DIR}/devdocs/i18n/ko"
  [ ! -d "${ARG_BUILD_DIR}/devdocs/i18n/zh" ] && mkdir "${ARG_BUILD_DIR}/devdocs/i18n/zh"
  [ ! -d "${ARG_BUILD_DIR}/devdocs/i18n/zh/docusaurus-plugin-content-docs" ] && mkdir "${ARG_BUILD_DIR}/devdocs/i18n/zh/docusaurus-plugin-content-docs"
  [ ! -d "${ARG_BUILD_DIR}/devdocs/i18n/zh/docusaurus-plugin-content-docs/current" ] && mkdir "${ARG_BUILD_DIR}/devdocs/i18n/zh/docusaurus-plugin-content-docs/current"
  [ ! -d "${ARG_BUILD_DIR}/devdocs/i18n/ko/docusaurus-plugin-content-docs" ] && mkdir "${ARG_BUILD_DIR}/devdocs/i18n/ko/docusaurus-plugin-content-docs/"
  [ ! -d "${ARG_BUILD_DIR}/devdocs/i18n/ko/docusaurus-plugin-content-docs/current" ] && mkdir "${ARG_BUILD_DIR}/devdocs/i18n/ko/docusaurus-plugin-content-docs/current"
}

####
# Copy over logos
Install_Branding_Logos() {
  # copy over the logo these directories created when docusarus site is build
  [ ! -f "${ARG_BUILD_DIR}/devdocs/static/img/eosn_logo.png" ] && cp "${SCRIPT_DIR}/../web/eosn_logo.png" "${ARG_BUILD_DIR}/devdocs/static/img/eosn_logo.png"
  SMALL_LOGO="cropped-EOS-Network-Foundation-Site-Icon-1-150x150.png"
  [ ! -f "${ARG_BUILD_DIR}/devdocs/static/img/${SMALL_LOGO}" ] && cp "${SCRIPT_DIR}/../web/${SMALL_LOGO}" "${ARG_BUILD_DIR}/devdocs/static/img/${SMALL_LOGO}"
}

#####
# Setup docusaurus
Install_Docusaurus() {
  DOC6S_CORE_PACKAGE="node_modules/@docusaurus/core/package.json"
  # eat the error
  version=$(grep version ${ARG_BUILD_DIR}/devdocs/${DOC6S_CORE_PACKAGE} \
         | cut -d: -f2 | tr -d " ,\"") 2>/dev/null
  semver=( ${version//./ } )
  # no version
  if [ -z ${semver[0]} ]; then
    npx create-docusaurus@latest "${ARG_BUILD_DIR}/devdocs" classic --typescript
  fi
  cp "${SCRIPT_DIR}/../config/docusaurus.config.js" "${ARG_BUILD_DIR}/devdocs"
}

####
# Bootstrap repo
#  git clone into working directory
#  sources bash script naming convention install_${repo}.sh
#  calls function Install_${Repo} passes in arguments
Bootstrap_Repo() {
  WORKING_DIR="${SCRIPT_DIR}/../working"
  GIT_URL="https://github.com/${ARG_GIT_REPO}"
  GIT_OWNER=$(echo $ARG_GIT_REPO | cut -d'/' -f1)
  GIT_BASE_REPO=$(basename $ARG_GIT_REPO)

  # source script
  if [ -f "${SCRIPT_DIR}/install_${GIT_BASE_REPO}.sh" ]; then
    source ${SCRIPT_DIR}/install_${GIT_BASE_REPO}.sh
  else
    echo -e "${Red_Text}${On_White}Can not source ${SCRIPT_DIR}/install_${GIT_BASE_REPO}.sh"
    echo -e "Does File Exist"
    echo -e "${ResetColor}"
    exit 1
  fi

  # if dir exists
  #    if fast_flag and (state -f %m less date +%s < 60*60); then no op
  #    else 
  #       clean out old directory
  #    fi
  # else
  #    make -p dir
  # fi
  [ -d "${WORKING_DIR}/${ARG_GIT_REPO}" ] && rm -rf "${WORKING_DIR}/${ARG_GIT_REPO}"
  # create working dir if it does not exist
  [ ! -d "${WORKING_DIR}/${ARG_GIT_REPO}" ] && mkdir -p "${WORKING_DIR}/${ARG_GIT_REPO}"
  # move to owner directory and clone
  cd ${WORKING_DIR}/${GIT_OWNER} && git clone $GIT_URL
  # move into newly cloned dir
  cd ${WORKING_DIR}/${ARG_GIT_REPO}

  # This weird command upper cases the first letter of GIT_BASE_REPO
  GIT_BASE_REPO="$(tr '[:lower:]' '[:upper:]' <<< ${GIT_BASE_REPO:0:1})${GIT_BASE_REPO:1}"
  COMMAND="Install_${GIT_BASE_REPO} $ARG_GIT_REPO $ARG_BUILD_DIR $ARG_BRANCH $ARG_TAG ${ARG_DOC_VERSION:-latest}"
  $COMMAND
}


############################################################################
# Global Vars
# Debug
DEBUG=1
# compute script dir for copying files from here to web directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
Red_Text='\033[1;31m'
On_White='\033[47m'
Reset_Color='\033[0m' # No Color

############################################################################
# Get the options
while getopts "r:d:b:t:v:i:h:f:" option; do
   case $option in
      r) # repository
        ARG_GIT_REPO=${OPTARG}
        ;;
      d) # set build dir
        ARG_BUILD_DIR=${OPTARG}
        ;;
      b) # set branch
        ARG_BRANCH=${OPTARG}
        ;;
      t) # set tag
        ARG_TAG=${OPTARG}
        ;;
      v) # set version
        ARG_DOC_VERSION=${OPTARG}
        ;;
      i) # set identity
        ARG_ID_FILE=${OPTARG}
        ;;
      h) # set host
        ARG_HOST+=("${OPTARG}")
        ;;
      f) # set fast
        ARG_FAST=${OPTARG}
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
if [ -z $ARG_GIT_REPO ] || [ -z $ARG_BUILD_DIR ]; then
  echo -e "${Red_Text}${On_White}Missing required arguments -r repo or -d directory"
  echo -e "${Reset_Color}"
  Help;
fi

##############################################################################
# Initialize
##############################################################################

if [ $DEBUG ]; then
  echo "git repo " $ARG_GIT_REPO
  echo "build dir " $ARG_BUILD_DIR
  echo "branch " $ARG_BRANCH
  echo "tag " $ARG_TAG
  echo "doc version " $ARG_DOC_VERSION
  echo "identity " $ARG_ID_FILE
  echo "fast flag" $ARG_FAST

  echo "host "
  for val in "${ARG_HOST[@]}"; do
      echo " $val"
    done
fi

Create_Top_Level_Dir
Install_Docusaurus
Install_Branding_Logos

##############################################################################
# Main
##############################################################################
Bootstrap_Repo
