#!/usr/bin/env bash

# Populates the following directories
# images go into static/welcome
#
#  eosdocs/welcome
#     getting-started (has images)
#     getting-started
#            development-environment
#            smart-contract-development
#     overview (has images)
#     eosio-blockchain-networks
#     get-involved
#     tutorials
#     protocol (has images)
#     community-developer-tools
#  static
#     welcome
Install_Welcome() {
  ARG_GIT_REPO=$1
  ARG_BUILD_DIR=$2
  ARG_BRANCH=$3
  ARG_TAG=$4
  ARG_DOC_VERSION=$5

  echo "inside Welcome Script"
}
