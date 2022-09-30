#!/usr/bin/env bash

# Alias to install mandel
Install_Mandel() {
SCRIPT_DIR=$1
ARG_GIT_REPO="AntelopeIO/leap"
ARG_BUILD_DIR=$3
ARG_BRANCH=$4
ARG_TAG=$5
source "${SCRIPT_DIR:?}"/install_leap.sh || exit
Install_Leap "$SCRIPT_DIR" "${ARG_GIT_REPO:?}" "$ARG_BUILD_DIR" "$ARG_BRANCH" "$ARG_TAG" || exit
}
