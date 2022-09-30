#!/usr/bin/env bash

Install_DUNE() {
  # shellcheck disable=SC2034  # Unused variables to keep method call enforced
  SCRIPT_DIR=$1
  # shellcheck disable=SC2034  # Unused variables to keep method call enforced
  ARG_GIT_REPO=$2
  ARG_BUILD_DIR=$3
  # shellcheck disable=SC2034  # Unused variables to keep method call enforced
  ARG_BRANCH=$4
  # shellcheck disable=SC2034  # Unused variables to keep method call enforced
  ARG_TAG=$5

  IMG_DIR="${ARG_BUILD_DIR}/devdocs/static/DUNE/images"
  DEST_DIR="${ARG_BUILD_DIR}/devdocs/eosdocs/DUNE"

  # copy over images into destination
  # doc6s needs images in static dir
  [ ! -d "$IMG_DIR" ] && mkdir -p "$IMG_DIR"
  cp docs/images/* "$IMG_DIR"

  # to keep docs clean and process idempotent
  [ ! -d markdown_out ] && mkdir markdown_out
  # need to update image paths
  sed 's/docs\/images\//\/DUNE\/images\//g' README.md > markdown_out/index.md
  # formally close html angle bracket by adding a slash
  # only happens for eol image tags thus the '$'
  sed 's/">$/"\/>/g' markdown_out/index.md > temp.md
  mv temp.md markdown_out/index.md

  [ ! -d "$DEST_DIR" ] && mkdir -p "$DEST_DIR"
  cp -R markdown_out/* "$DEST_DIR"

}
