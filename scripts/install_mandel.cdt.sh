#!/usr/bin/env bash

# Alias to install mandel
Install_Mandel.cdt() {
SCRIPT_DIR=$1
ARG_GIT_REPO="AntelopeIO/cdt"
ARG_BUILD_DIR=$3
ARG_BRANCH=$4
ARG_TAG=$5
source "${SCRIPT_DIR:?}"/install_cdt.sh || exit
Install_Cdt $SCRIPT_DIR ${ARG_GIT_REPO:?} $ARG_BUILD_DIR $ARG_BRANCH $ARG_TAG || exit
}
