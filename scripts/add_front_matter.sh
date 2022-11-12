#!/usr/bin/env bash

Calculate_Branch() {
  ARG_BRANCH=$1
  ARG_TAG=$2

  BRANCH="main"
  if [ -z "$ARG_BRANCH" ] && [ -n "$ARG_TAG" ]; then
    # hard tag
    BRANCH="$ARG_TAG"
  fi
  # ONLY BRANCH
  if [ -n "$ARG_BRANCH" ] && [ -z "$ARG_TAG" ]; then
    # single branch
    BRANCH="$ARG_BRANCH"
  fi
  # BOTH BRANCH AND TAG
  if [ -n "$ARG_BRANCH" ] && [ -n "$ARG_TAG" ]; then
    BRANCH="${ARG_BRANCH}"
  fi

  echo "${BRANCH}"
}

Add_Front_Matter() {
  ARG_GIT_REPO=$1
  CONTENT_DIR=$2
  ARG_BRANCH=$3
  ARG_TAG=$4

  BRANCH=$(Calculate_Branch "${ARG_BRANCH}" "${ARG_TAG}")

  RAW_PATH="${ARG_GIT_REPO:?}/tree/${BRANCH:-main}/docs/"
  META="  - ${ARG_GIT_REPO}\n  - ${BRANCH}"

  find "$CONTENT_DIR" -type f -name "*.md" -print0 | while IFS= read -r -d '' file
  do
    # add raw path
    THIS_FILE_META=""
    # remove working directory
    git_file=$(echo "$file" | sed "s#${CONTENT_DIR}##")
    # sed cleans up excess directory slashes
    THIS_FILE_META=$(echo "tags:\n  - ${RAW_PATH}/${git_file}\n${META}" | sed 's#///#/#g' | sed 's#//#/#g')
    HAS_FRONT_MATTER=$(head -10 $file | egrep '^\---$' | wc -l)
    # Replace
    if [ "$HAS_FRONT_MATTER" -eq 2 ]; then
      awk -v THIS_META="$THIS_FILE_META" '/^---$/ && !done { gsub(/^---$/, "---\n"THIS_META); done=1 }; 1;' "$file" > "${file}_tmp"
      mv "${file}_tmp" "$file"
    fi
    # no front matter add it
    if [ "$HAS_FRONT_MATTER" -eq 0 ]; then
      echo "---" > "${file}_tmp"
      printf "${THIS_FILE_META}\n" >> "${file}_tmp"
      echo "---" >> "${file}_tmp"
      cat "$file" >> "${file}_tmp"
      mv "${file}_tmp" "$file"
    fi
  done

}
