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

  # add front matter for README: one off special
  echo "---" > markdown_out/README.md
  BRANCH=$(Calculate_Branch "${ARG_BRANCH}" "${ARG_TAG}")
  RAW_PATH="${ARG_GIT_REPO:?}/tree/${BRANCH:-main}/"
  META="  - ${ARG_GIT_REPO}\n  - ${BRANCH:-main}"
  THIS_FILE_META=$(printf 'tags:\n  - %s/README.md\n%s' "${RAW_PATH}" "${META}" | sed 's#///#/#g' | sed 's#//#/#g')
  # shellcheck disable=SC2129
  printf '%s\n' "${THIS_FILE_META}" >> markdown_out/README.md
  echo "---" >> markdown_out/README.md
  cat README.md >> markdown_out/README.md

  # need to update image paths
  sed 's/docs\/images\//\/DUNE\/images\//g' markdown_out/README.md > markdown_out/index.md
  # do not need README
  rm markdown_out/README.md
  # formally close html angle bracket by adding a slash
  # only happens for eol image tags thus the '$'
  sed 's/">$/"\/>/g' markdown_out/index.md > temp.md
  mv temp.md markdown_out/index.md

  [ ! -d "$DEST_DIR" ] && mkdir -p "$DEST_DIR"
  cp -R markdown_out/* "$DEST_DIR"

}
